import { createFileRoute } from "@tanstack/react-router";
import nodemailer from "nodemailer";

const allowedRoasts = new Set(["Noble Dark", "Truly Dark"]);
const recentRequests = new Map<string, number[]>();
const DEFAULT_SMTP_HOST = "smtp.hostinger.com";
const DEFAULT_SMTP_USER = "support@baristo.online";
const DEFAULT_ORDER_INBOX = "support@baristo.online";

function clean(value: unknown, max = 500) {
  return String(value ?? "").trim().slice(0, max);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (char) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char] || char,
  );
}

function reservationId() {
  const date = new Date();
  const ymd = `${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(2, "0")}${String(date.getUTCDate()).padStart(2, "0")}`;
  const token = crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase();
  return `BR-${ymd}-${token}`;
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const windowStart = now - 15 * 60 * 1000;
  const attempts = (recentRequests.get(ip) || []).filter((time) => time > windowStart);
  attempts.push(now);
  recentRequests.set(ip, attempts);
  return attempts.length > 5;
}

function getSmtpPassword() {
  return process.env.SMTP_PASS || process.env.EMAIL_PASSWORD || process.env.HOSTINGER_EMAIL_PASSWORD || "";
}

async function createVerifiedTransport() {
  const host = process.env.SMTP_HOST || DEFAULT_SMTP_HOST;
  const user = process.env.SMTP_USER || DEFAULT_SMTP_USER;
  const pass = getSmtpPassword();
  const configuredPort = Number(process.env.SMTP_PORT || 0);
  const ports = configuredPort
    ? Array.from(new Set([configuredPort, configuredPort === 465 ? 587 : 465]))
    : [465, 587];
  let lastError: unknown;

  if (!pass) {
    const error = new Error("SMTP password is not configured");
    error.name = "SmtpPasswordMissingError";
    throw error;
  }

  for (const port of ports) {
    const secure = port === 465;
    const transport = nodemailer.createTransport({
      host,
      port,
      secure,
      requireTLS: !secure,
      auth: { user, pass },
      connectionTimeout: 12_000,
      greetingTimeout: 12_000,
      socketTimeout: 20_000,
      tls: { servername: host, minVersion: "TLSv1.2" },
    });

    try {
      await transport.verify();
      return { transport, host, port, user };
    } catch (error) {
      lastError = error;
      transport.close();
      console.error("Reservation SMTP verification failed", {
        host,
        port,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  throw lastError instanceof Error ? lastError : new Error("SMTP verification failed");
}

export const Route = createFileRoute("/api/reservations")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const origin = request.headers.get("origin");
          const host = request.headers.get("host");
          if (origin && host && new URL(origin).host !== host) {
            return Response.json({ ok: false, code: "INVALID_ORIGIN", message: "Invalid reservation origin." }, { status: 403 });
          }

          const ip = clean(
            request.headers.get("x-forwarded-for")?.split(",")[0] || request.headers.get("x-real-ip") || "unknown",
            80,
          );
          if (isRateLimited(ip)) {
            return Response.json(
              { ok: false, code: "RATE_LIMITED", message: "Too many attempts. Please try again in 15 minutes." },
              { status: 429 },
            );
          }

          const body = await request.json();
          if (clean(body.company, 100)) {
            return Response.json({ ok: true, reservationId: reservationId(), acknowledgementSent: false });
          }

          const name = clean(body.name, 100);
          const email = clean(body.email, 160).toLowerCase();
          const phone = clean(body.phone, 30);
          const address = clean(body.address, 300);
          const city = clean(body.city, 100);
          const state = clean(body.state, 100);
          const postalCode = clean(body.postalCode, 10);
          const roast = clean(body.roast, 40);
          const pack = clean(body.pack, 30);
          const page = clean(body.page, 300);
          const quantity = Number(body.quantity);
          const unitPrice = 4279;

          if (!name || !email || !phone || !address || !city || !state || !postalCode || !body.consent) {
            return Response.json(
              { ok: false, code: "INCOMPLETE_FORM", message: "Complete every required field and provide consent." },
              { status: 400 },
            );
          }
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return Response.json(
              { ok: false, code: "INVALID_EMAIL", message: "Enter a valid email address." },
              { status: 400 },
            );
          }
          if (!/^[0-9]{6}$/.test(postalCode)) {
            return Response.json(
              { ok: false, code: "INVALID_POSTAL_CODE", message: "Enter a valid six-digit Indian postal code." },
              { status: 400 },
            );
          }
          if (!allowedRoasts.has(roast) || pack !== "12 oz / 340 g" || !Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
            return Response.json(
              { ok: false, code: "INVALID_PRODUCT", message: "Invalid product reservation." },
              { status: 400 },
            );
          }

          const smtpFrom = process.env.SMTP_FROM || process.env.SMTP_USER || DEFAULT_SMTP_USER;
          const orderInbox = process.env.RESERVATION_TO || DEFAULT_ORDER_INBOX;
          const id = reservationId();
          const total = quantity * unitPrice;
          const safe = {
            id: escapeHtml(id),
            name: escapeHtml(name),
            email: escapeHtml(email),
            phone: escapeHtml(phone),
            address: escapeHtml(address),
            city: escapeHtml(city),
            state: escapeHtml(state),
            postalCode: escapeHtml(postalCode),
            roast: escapeHtml(roast),
            pack: escapeHtml(pack),
            page: escapeHtml(page),
          };

          let verified;
          try {
            verified = await createVerifiedTransport();
          } catch (error) {
            const missingPassword = error instanceof Error && error.name === "SmtpPasswordMissingError";
            console.error("Reservation email service unavailable", {
              code: missingPassword ? "SMTP_PASSWORD_MISSING" : "SMTP_CONNECTION_FAILED",
              error: error instanceof Error ? error.message : String(error),
            });
            return Response.json(
              {
                ok: false,
                code: missingPassword ? "SMTP_PASSWORD_MISSING" : "SMTP_CONNECTION_FAILED",
                message: missingPassword
                  ? "Reservation email is not configured yet. Please contact support@baristo.online."
                  : "The reservation email service could not connect. Please try again shortly or contact support@baristo.online.",
              },
              { status: 503 },
            );
          }

          const { transport } = verified;
          try {
            await transport.sendMail({
              from: `Baristo Reservations <${smtpFrom}>`,
              to: orderInbox,
              replyTo: email,
              subject: `New Baristo Reservation — ${roast} — ${id}`,
              text: `Reservation ID: ${id}\nProduct: ${roast}\nPack: ${pack}\nQuantity: ${quantity}\nPrice per pack: INR ${unitPrice}\nProvisional total: INR ${total}\n\nCustomer: ${name}\nEmail: ${email}\nMobile: ${phone}\nAddress: ${address}, ${city}, ${state} ${postalCode}\n\nStatus: Pending availability, delivery and payment verification\nSource: ${page}`,
              html: `<h2>New Baristo Reservation</h2><p><strong>Reservation ID:</strong> ${safe.id}</p><table cellpadding="6" cellspacing="0" border="1" style="border-collapse:collapse"><tr><td>Product</td><td>${safe.roast}</td></tr><tr><td>Pack</td><td>${safe.pack}</td></tr><tr><td>Quantity</td><td>${quantity}</td></tr><tr><td>Price per pack</td><td>₹${unitPrice.toLocaleString("en-IN")}</td></tr><tr><td>Provisional total</td><td><strong>₹${total.toLocaleString("en-IN")}</strong></td></tr></table><h3>Customer</h3><p>${safe.name}<br>${safe.email}<br>${safe.phone}<br>${safe.address}<br>${safe.city}, ${safe.state} ${safe.postalCode}</p><p><strong>Status:</strong> Pending availability, delivery and payment verification</p><p><small>Source: ${safe.page}</small></p>`,
            });
          } catch (error) {
            console.error("Reservation inbox delivery failed", error);
            return Response.json(
              {
                ok: false,
                code: "INBOX_DELIVERY_FAILED",
                message: "The reservation could not reach Baristo. Please try again shortly or contact support@baristo.online.",
              },
              { status: 502 },
            );
          }

          let acknowledgementSent = true;
          try {
            await transport.sendMail({
              from: `Baristo.Online <${smtpFrom}>`,
              to: email,
              replyTo: orderInbox,
              subject: `Baristo reservation received — ${id}`,
              text: `Dear ${name},\n\nYour reservation has been received.\n\nReference: ${id}\nProduct: ${roast}\nPack: ${pack}\nQuantity: ${quantity}\nProvisional merchandise total: INR ${total}\n\nThis is not yet a confirmed order. Baristo will verify availability, delivery eligibility and the final payable amount before sending a secure payment link. Dispatch begins only after payment confirmation.\n\nBaristo.Online\nFor Expresso Noble Minds.`,
              html: `<p>Dear ${safe.name},</p><h2>Your Baristo reservation has been received.</h2><p><strong>Reference:</strong> ${safe.id}</p><p>${safe.roast} · ${safe.pack}<br>Quantity: ${quantity}<br>Provisional merchandise total: <strong>₹${total.toLocaleString("en-IN")}</strong></p><p>This is not yet a confirmed order. Baristo will verify availability, delivery eligibility and the final payable amount before sending a secure payment link. Dispatch begins only after payment confirmation.</p><p>Baristo.Online<br><em>For Expresso Noble Minds.</em></p>`,
            });
          } catch (error) {
            acknowledgementSent = false;
            console.error("Customer acknowledgement email failed", error);
          } finally {
            transport.close();
          }

          return Response.json({ ok: true, reservationId: id, acknowledgementSent });
        } catch (error) {
          console.error("Reservation submission failed", error);
          return Response.json(
            {
              ok: false,
              code: "UNEXPECTED_ERROR",
              message: "Reservation could not be submitted. Please try again or contact support@baristo.online.",
            },
            { status: 500 },
          );
        }
      },
    },
  },
});
