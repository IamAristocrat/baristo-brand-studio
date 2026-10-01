import { createFileRoute } from "@tanstack/react-router";
import nodemailer from "nodemailer";
import { inquiryCustomerEmail } from "../lib/baristo-email";

const DEFAULT_SMTP_HOST = "smtp.hostinger.com";
const DEFAULT_SMTP_USER = "support@baristo.online";
const DEFAULT_TO = "support@baristo.online";
const allowedRoasts = new Set(["Noble Dark", "Truly Dark", "Both", "Not sure yet"]);
const recentRequests = new Map<string, number[]>();

function clean(value: unknown, max = 500) {
  return String(value ?? "").trim().slice(0, max);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (char) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char] || char,
  );
}

function inquiryId() {
  const date = new Date();
  const ymd = `${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(2, "0")}${String(date.getUTCDate()).padStart(2, "0")}`;
  const token = crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase();
  return `BI-${ymd}-${token}`;
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const windowStart = now - 15 * 60 * 1000;
  const attempts = (recentRequests.get(ip) || []).filter((time) => time > windowStart);
  attempts.push(now);
  recentRequests.set(ip, attempts);
  return attempts.length > 8;
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
      dnsTimeout: 10_000,
      family: 4,
      tls: { servername: host, minVersion: "TLSv1.2" },
    });

    try {
      await transport.verify();
      return { transport, user };
    } catch (error) {
      lastError = error;
      transport.close();
      console.error("Buyer inquiry SMTP verification failed", {
        host,
        port,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  throw lastError instanceof Error ? lastError : new Error("SMTP verification failed");
}

export const Route = createFileRoute("/api/inquiries")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const origin = request.headers.get("origin");
          const host = request.headers.get("host");
          if (origin && host && new URL(origin).host !== host) {
            return Response.json({ ok: false, code: "INVALID_ORIGIN", message: "Invalid inquiry origin." }, { status: 403 });
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
            return Response.json({ ok: true, inquiryId: inquiryId(), acknowledgementSent: false });
          }

          const name = clean(body.name, 100);
          const email = clean(body.email, 160).toLowerCase();
          const phone = clean(body.phone, 40);
          const city = clean(body.city, 80);
          const postalCode = clean(body.postalCode, 10);
          const preferredRoast = clean(body.preferredRoast, 40) || "Not sure yet";
          const topic = clean(body.topic, 100) || "Product and roast guidance";
          const question = clean(body.question, 1600);
          const page = clean(body.page, 500);

          if (!name || !email || !question) {
            return Response.json(
              { ok: false, code: "INCOMPLETE_FORM", message: "Enter your name, email address and question." },
              { status: 400 },
            );
          }
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return Response.json({ ok: false, code: "INVALID_EMAIL", message: "Enter a valid email address." }, { status: 400 });
          }
          if (postalCode && !/^[0-9]{6}$/.test(postalCode)) {
            return Response.json(
              { ok: false, code: "INVALID_POSTAL_CODE", message: "Enter a valid six-digit Indian postal code." },
              { status: 400 },
            );
          }
          if (!allowedRoasts.has(preferredRoast)) {
            return Response.json({ ok: false, code: "INVALID_ROAST", message: "Choose a valid roast preference." }, { status: 400 });
          }
          if (question.length < 8) {
            return Response.json({ ok: false, code: "QUESTION_TOO_SHORT", message: "Add a little more detail to your question." }, { status: 400 });
          }

          const id = inquiryId();
          const { transport, user } = await createVerifiedTransport();
          const from = process.env.SMTP_FROM || user;
          const inbox = process.env.INQUIRY_TO || process.env.RESERVATION_TO || DEFAULT_TO;

          const safe = {
            id: escapeHtml(id),
            name: escapeHtml(name),
            email: escapeHtml(email),
            phone: escapeHtml(phone),
            city: escapeHtml(city),
            postalCode: escapeHtml(postalCode),
            preferredRoast: escapeHtml(preferredRoast),
            topic: escapeHtml(topic),
            question: escapeHtml(question),
            page: escapeHtml(page),
          };

          try {
            await transport.sendMail({
              from: `Baristo Buyer Concierge <${from}>`,
              to: inbox,
              replyTo: email,
              subject: `Baristo Buyer Inquiry — ${topic} — ${id}`,
              text: [
                `Inquiry ID: ${id}`,
                `Name: ${name}`,
                `Email: ${email}`,
                `Phone: ${phone || "Not provided"}`,
                `City: ${city || "Not provided"}`,
                `Postal code: ${postalCode || "Not provided"}`,
                `Preferred roast: ${preferredRoast}`,
                `Topic: ${topic}`,
                "",
                "Question:",
                question,
                "",
                `Source: ${page}`,
              ].join("\n"),
              html: `<h2>Baristo Buyer Inquiry</h2><p><strong>Inquiry ID:</strong> ${safe.id}</p><table cellpadding="7" cellspacing="0" border="1" style="border-collapse:collapse"><tr><td>Name</td><td>${safe.name}</td></tr><tr><td>Email</td><td>${safe.email}</td></tr><tr><td>Phone</td><td>${safe.phone || "Not provided"}</td></tr><tr><td>City</td><td>${safe.city || "Not provided"}</td></tr><tr><td>Postal code</td><td>${safe.postalCode || "Not provided"}</td></tr><tr><td>Preferred roast</td><td>${safe.preferredRoast}</td></tr><tr><td>Topic</td><td>${safe.topic}</td></tr></table><h3>Question</h3><p style="white-space:pre-wrap">${safe.question}</p><p><small>Source: ${safe.page}</small></p>`,
            });
          } catch (error) {
            console.error("Buyer inquiry inbox delivery failed", error);
            transport.close();
            return Response.json(
              {
                ok: false,
                code: "INBOX_DELIVERY_FAILED",
                message: "Your question could not reach Baristo. Please try again or email support@baristo.online.",
              },
              { status: 502 },
            );
          }

          let acknowledgementSent = true;
          try {
            const buyerMessage = inquiryCustomerEmail({
              name,
              id,
              preferredRoast,
              topic,
              question,
            });
            await transport.sendMail({
              from: `Baristo.Online <${from}>`,
              to: email,
              replyTo: inbox,
              subject: buyerMessage.subject,
              text: buyerMessage.text,
              html: buyerMessage.html,
            });
          } catch (error) {
            acknowledgementSent = false;
            console.error("Buyer inquiry acknowledgement failed", error);
          } finally {
            transport.close();
          }

          return Response.json({ ok: true, inquiryId: id, acknowledgementSent });
        } catch (error) {
          console.error("Buyer inquiry submission failed", error);
          const err = error as Error & { code?: string; responseCode?: number };
          const missingPassword = err?.name === "SmtpPasswordMissingError";
          const authFailed = err?.code === "EAUTH" || err?.responseCode === 535;
          return Response.json(
            {
              ok: false,
              code: missingPassword
                ? "SMTP_PASSWORD_MISSING"
                : authFailed
                  ? "SMTP_AUTH_FAILED"
                  : "INQUIRY_SUBMISSION_FAILED",
              message: missingPassword
                ? "Baristo email service is not configured yet. Please email support@baristo.online directly."
                : authFailed
                  ? "Baristo email service is temporarily unavailable. Please email support@baristo.online directly."
                  : "Your question could not be submitted. Please try again or email support@baristo.online.",
            },
            { status: missingPassword || authFailed ? 503 : 500 },
          );
        }
      },
    },
  },
});
