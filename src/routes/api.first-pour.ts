import { createFileRoute } from "@tanstack/react-router";
import nodemailer from "nodemailer";

const DEFAULT_SMTP_HOST = "smtp.hostinger.com";
const DEFAULT_SMTP_USER = "support@baristo.online";
const DEFAULT_TO = "support@baristo.online";
const recentRequests = new Map<string, number[]>();

function clean(value: unknown, max = 500) {
  return String(value ?? "").trim().slice(0, max);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char] || char);
}

function leadId() {
  const date = new Date();
  const ymd = `${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(2, "0")}${String(date.getUTCDate()).padStart(2, "0")}`;
  const token = crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase();
  return `FP-${ymd}-${token}`;
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
      tls: { servername: host, minVersion: "TLSv1.2" },
    });

    try {
      await transport.verify();
      return { transport, host, port, user };
    } catch (error) {
      lastError = error;
      transport.close();
      console.error("First Pour SMTP verification failed", {
        host,
        port,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  throw lastError instanceof Error ? lastError : new Error("SMTP verification failed");
}

function csvCell(value: string) {
  const guarded = /^[=+\-@]/.test(value) ? `'${value}` : value;
  return `"${guarded.replace(/"/g, '""')}"`;
}

function sourceAttribution(page: string) {
  try {
    const url = new URL(page);
    return {
      source: url.searchParams.get("utm_source") || "direct / unknown",
      medium: url.searchParams.get("utm_medium") || "",
      campaign: url.searchParams.get("utm_campaign") || "",
    };
  } catch {
    return { source: "direct / unknown", medium: "", campaign: "" };
  }
}

export const Route = createFileRoute("/api/first-pour")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const origin = request.headers.get("origin");
          const host = request.headers.get("host");
          if (origin && host && new URL(origin).host !== host) {
            return Response.json({ ok: false, message: "Invalid signup origin." }, { status: 403 });
          }

          const ip = clean(request.headers.get("x-forwarded-for")?.split(",")[0] || request.headers.get("x-real-ip") || "unknown", 80);
          if (isRateLimited(ip)) {
            return Response.json({ ok: false, message: "Too many signup attempts. Please try again later." }, { status: 429 });
          }

          const body = await request.json();
          if (clean(body.company, 100)) return Response.json({ ok: true, leadId: leadId(), acknowledgementSent: false });

          const name = clean(body.name, 100);
          const email = clean(body.email, 160).toLowerCase();
          const countryCode = clean(body.countryCode, 8);
          const phone = clean(body.phone, 30);
          const country = clean(body.country, 80);
          const city = clean(body.city, 80);
          const preferredRoast = clean(body.preferredRoast, 40);
          const brewStyle = clean(body.brewStyle, 60);
          const coffeeFrequency = clean(body.coffeeFrequency, 60);
          const role = clean(body.role, 100);
          const interest = clean(body.interest, 100);
          const page = clean(body.page, 500);
          const consent = Boolean(body.marketingConsent);

          if (!name || !email || !countryCode || !phone || !country || !preferredRoast || !consent) {
            return Response.json({ ok: false, message: "Complete every required field and provide marketing consent." }, { status: 400 });
          }
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return Response.json({ ok: false, message: "Enter a valid email address." }, { status: 400 });
          }
          if (!/^\+[0-9]{1,4}$/.test(countryCode)) {
            return Response.json({ ok: false, message: "Enter the country code in international format, for example +91." }, { status: 400 });
          }
          if (!/^[0-9 ()\-]{6,20}$/.test(phone)) {
            return Response.json({ ok: false, message: "Enter a valid mobile or WhatsApp number." }, { status: 400 });
          }

          const id = leadId();
          const joinedAt = new Date().toISOString();
          const attribution = sourceAttribution(page);
          const safe = {
            id: escapeHtml(id),
            name: escapeHtml(name),
            email: escapeHtml(email),
            countryCode: escapeHtml(countryCode),
            phone: escapeHtml(phone),
            country: escapeHtml(country),
            city: escapeHtml(city),
            preferredRoast: escapeHtml(preferredRoast),
            brewStyle: escapeHtml(brewStyle),
            coffeeFrequency: escapeHtml(coffeeFrequency),
            role: escapeHtml(role),
            interest: escapeHtml(interest),
            page: escapeHtml(page),
          };

          const { transport, user } = await createVerifiedTransport();
          const from = process.env.SMTP_FROM || user;
          const inbox = process.env.FIRST_POUR_TO || process.env.RESERVATION_TO || DEFAULT_TO;

          const columns = [
            "lead_id", "joined_at", "name", "email", "country_code", "phone", "country", "city", "preferred_roast",
            "brew_style", "coffee_frequency", "role", "interest", "marketing_consent", "utm_source", "utm_medium", "utm_campaign", "source_page",
          ];
          const values = [
            id, joinedAt, name, email, countryCode, phone, country, city, preferredRoast, brewStyle, coffeeFrequency, role, interest,
            "yes", attribution.source, attribution.medium, attribution.campaign, page,
          ];
          const csv = `${columns.map(csvCell).join(",")}\n${values.map((value) => csvCell(String(value))).join(",")}\n`;

          await transport.sendMail({
            from: `Baristo First Pour <${from}>`,
            to: inbox,
            replyTo: email,
            subject: `New First Pour Lead — ${preferredRoast} — ${id}`,
            text: [
              `Lead ID: ${id}`,
              `Joined: ${joinedAt}`,
              "",
              `Name: ${name}`,
              `Email: ${email}`,
              `Phone: ${countryCode} ${phone}`,
              `Country: ${country}`,
              `City: ${city || "Not provided"}`,
              `Preferred roast: ${preferredRoast}`,
              `Brew style: ${brewStyle || "Not provided"}`,
              `Coffee frequency: ${coffeeFrequency || "Not provided"}`,
              `Role / identity: ${role || "Not provided"}`,
              `Primary interest: ${interest || "Not provided"}`,
              "Marketing consent: Yes",
              `UTM source: ${attribution.source}`,
              `UTM medium: ${attribution.medium}`,
              `UTM campaign: ${attribution.campaign}`,
              `Source page: ${page}`,
            ].join("\n"),
            html: `<h2>New Baristo First Pour Lead</h2><p><strong>Lead ID:</strong> ${safe.id}<br><strong>Joined:</strong> ${joinedAt}</p><table cellpadding="7" cellspacing="0" border="1" style="border-collapse:collapse"><tr><td>Name</td><td>${safe.name}</td></tr><tr><td>Email</td><td>${safe.email}</td></tr><tr><td>Phone</td><td>${safe.countryCode} ${safe.phone}</td></tr><tr><td>Country</td><td>${safe.country}</td></tr><tr><td>City</td><td>${safe.city || "Not provided"}</td></tr><tr><td>Preferred roast</td><td>${safe.preferredRoast}</td></tr><tr><td>Brew style</td><td>${safe.brewStyle || "Not provided"}</td></tr><tr><td>Coffee frequency</td><td>${safe.coffeeFrequency || "Not provided"}</td></tr><tr><td>Role / identity</td><td>${safe.role || "Not provided"}</td></tr><tr><td>Primary interest</td><td>${safe.interest || "Not provided"}</td></tr><tr><td>Marketing consent</td><td><strong>Yes</strong></td></tr></table><p><small>Source: ${safe.page}<br>UTM: ${escapeHtml(attribution.source)} / ${escapeHtml(attribution.medium)} / ${escapeHtml(attribution.campaign)}</small></p>`,
            attachments: [{ filename: `baristo-first-pour-${id}.csv`, content: csv, contentType: "text/csv; charset=utf-8" }],
          });

          let acknowledgementSent = true;
          try {
            await transport.sendMail({
              from: `Baristo.Online <${from}>`,
              to: email,
              replyTo: inbox,
              subject: `Welcome to the Baristo First Pour Circle — ${id}`,
              text: `Dear ${name},\n\nYou are now part of the Baristo First Pour Circle.\n\nReference: ${id}\nPreferred roast: ${preferredRoast}\n\nWe will use your preferences to make future communication more relevant: launch availability, Noble Dark and Truly Dark updates, selected recipes, evidence-led coffee intelligence and occasional private offers.\n\nThis signup is not a reservation or confirmed order. You can unsubscribe at any time by contacting support@baristo.online.\n\nBaristo.Online\nFor Expresso Noble Minds.`,
              html: `<p>Dear ${safe.name},</p><h2>You are now part of the Baristo First Pour Circle.</h2><p><strong>Reference:</strong> ${safe.id}<br><strong>Preferred roast:</strong> ${safe.preferredRoast}</p><p>We will use your preferences to make future communication more relevant: launch availability, Noble Dark and Truly Dark updates, selected recipes, evidence-led coffee intelligence and occasional private offers.</p><p>This signup is not a reservation or confirmed order. You can unsubscribe at any time by contacting support@baristo.online.</p><p>Baristo.Online<br><em>For Expresso Noble Minds.</em></p>`,
            });
          } catch (error) {
            acknowledgementSent = false;
            console.error("First Pour acknowledgement failed", error);
          } finally {
            transport.close();
          }

          return Response.json({ ok: true, leadId: id, acknowledgementSent });
        } catch (error) {
          console.error("First Pour signup failed", error);
          const missingPassword = error instanceof Error && error.name === "SmtpPasswordMissingError";
          return Response.json(
            {
              ok: false,
              message: missingPassword
                ? "First Pour email service is not configured yet. Please use the email fallback below."
                : "First Pour signup could not be submitted. Please try again or use the email fallback below.",
            },
            { status: missingPassword ? 503 : 500 },
          );
        }
      },
    },
  },
});
