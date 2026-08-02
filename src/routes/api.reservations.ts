import { createFileRoute } from "@tanstack/react-router";
import nodemailer from "nodemailer";

const allowedRoasts = new Set(["Noble Dark", "Truly Dark"]);
const recentRequests = new Map<string, number[]>();

function clean(value: unknown, max = 500) {
  return String(value ?? "").trim().slice(0, max);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char] || char);
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

export const Route = createFileRoute("/api/reservations")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const origin = request.headers.get("origin");
          const host = request.headers.get("host");
          if (origin && host && new URL(origin).host !== host) {
            return Response.json({ ok: false, message: "Invalid reservation origin." }, { status: 403 });
          }

          const ip = clean(request.headers.get("x-forwarded-for")?.split(",")[0] || request.headers.get("x-real-ip") || "unknown", 80);
          if (isRateLimited(ip)) {
            return Response.json({ ok: false, message: "Too many attempts. Please try again in 15 minutes." }, { status: 429 });
          }

          const body = await request.json();
          if (clean(body.company, 100)) return Response.json({ ok: true, reservationId: reservationId() });

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
            return Response.json({ ok: false, message: "Complete every required field and provide consent." }, { status: 400 });
          }
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return Response.json({ ok: false, message: "Enter a valid email address." }, { status: 400 });
          }
          if (!/^[0-9]{6}$/.test(postalCode)) {
            return Response.json({ ok: false, message: "Enter a valid six-digit Indian postal code." }, { status: 400 });
          }
          if (!allowedRoasts.has(roast) || pack !== "12 oz / 340 g" || !Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
            return Response.json({ ok: false, message: "Invalid product reservation." }, { status: 400 });
          }

          const smtpHost = process.env.SMTP_HOST;
          const smtpPort = Number(process.env.SMTP_PORT || 465);
          const smtpUser = process.env.SMTP_USER;
          const smtpPass = process.env.SMTP_PASS;
          const smtpFrom = process.env.SMTP_FROM || smtpUser;
          const orderInbox = process.env.RESERVATION_TO || "support@baristo.online";

          if (!smtpHost || !smtpUser || !smtpPass || !smtpFrom) {
            console.error("Reservation SMTP configuration is incomplete");
            return Response.json({ ok: false, message: "Reservations are temporarily unavailable. Please email support@baristo.online." }, { status: 503 });
          }

          const id = reservationId();
          const total = quantity * unitPrice;
          const transport = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: { user: smtpUser, pass: smtpPass },
          });

          const safe = {
            id: escapeHtml(id), name: escapeHtml(name), email: escapeHtml(email), phone: escapeHtml(phone),
            address: escapeHtml(address), city: escapeHtml(city), state: escapeHtml(state), postalCode: escapeHtml(postalCode),
            roast: escapeHtml(roast), pack: escapeHtml(pack), page: escapeHtml(page),
          };

          await transport.sendMail({
            from: `Baristo Reservations <${smtpFrom}>`,
            to: orderInbox,
            replyTo: email,
            subject: `New Baristo Reservation — ${roast} — ${id}`,
            text: `Reservation ID: ${id}\nProduct: ${roast}\nPack: ${pack}\nQuantity: ${quantity}\nPrice per pack: INR ${unitPrice}\nProvisional total: INR ${total}\n\nCustomer: ${name}\nEmail: ${email}\nMobile: ${phone}\nAddress: ${address}, ${city}, ${state} ${postalCode}\n\nStatus: Pending availability, delivery and payment verification\nSource: ${page}`,
            html: `<h2>New Baristo Reservation</h2><p><strong>Reservation ID:</strong> ${safe.id}</p><table cellpadding="6" cellspacing="0" border="1" style="border-collapse:collapse"><tr><td>Product</td><td>${safe.roast}</td></tr><tr><td>Pack</td><td>${safe.pack}</td></tr><tr><td>Quantity</td><td>${quantity}</td></tr><tr><td>Price per pack</td><td>₹${unitPrice.toLocaleString("en-IN")}</td></tr><tr><td>Provisional total</td><td><strong>₹${total.toLocaleString("en-IN")}</strong></td></tr></table><h3>Customer</h3><p>${safe.name}<br>${safe.email}<br>${safe.phone}<br>${safe.address}<br>${safe.city}, ${safe.state} ${safe.postalCode}</p><p><strong>Status:</strong> Pending availability, delivery and payment verification</p><p><small>Source: ${safe.page}</small></p>`,
          });

          await transport.sendMail({
            from: `Baristo.Online <${smtpFrom}>`,
            to: email,
            replyTo: orderInbox,
            subject: `Baristo reservation received — ${id}`,
            text: `Dear ${name},\n\nYour reservation has been received.\n\nReference: ${id}\nProduct: ${roast}\nPack: ${pack}\nQuantity: ${quantity}\nProvisional merchandise total: INR ${total}\n\nThis is not yet a confirmed order. Baristo will verify availability, delivery eligibility and the final payable amount before sending a secure payment link. Dispatch begins only after payment confirmation.\n\nBaristo.Online\nFor Expresso Noble Minds.`,
            html: `<p>Dear ${safe.name},</p><h2>Your Baristo reservation has been received.</h2><p><strong>Reference:</strong> ${safe.id}</p><p>${safe.roast} · ${safe.pack}<br>Quantity: ${quantity}<br>Provisional merchandise total: <strong>₹${total.toLocaleString("en-IN")}</strong></p><p>This is not yet a confirmed order. Baristo will verify availability, delivery eligibility and the final payable amount before sending a secure payment link. Dispatch begins only after payment confirmation.</p><p>Baristo.Online<br><em>For Expresso Noble Minds.</em></p>`,
          });

          return Response.json({ ok: true, reservationId: id });
        } catch (error) {
          console.error("Reservation submission failed", error);
          return Response.json({ ok: false, message: "Reservation could not be submitted. Please try again or email support@baristo.online." }, { status: 500 });
        }
      },
    },
  },
});
