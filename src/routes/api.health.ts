import { createFileRoute } from "@tanstack/react-router";
import nodemailer from "nodemailer";

const DEFAULT_SMTP_HOST = "smtp.hostinger.com";
const DEFAULT_SMTP_USER = "support@baristo.online";

function smtpPassword() {
  return process.env.SMTP_PASS || process.env.EMAIL_PASSWORD || process.env.HOSTINGER_EMAIL_PASSWORD || "";
}

async function verifySmtp(host: string, user: string, pass: string, port: number) {
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
    return { port, ok: true, secure };
  } catch (error) {
    const err = error as Error & { code?: string; command?: string; responseCode?: number };
    return {
      port,
      ok: false,
      secure,
      code: err.code || err.name || "SMTP_VERIFY_FAILED",
      command: err.command || null,
      responseCode: err.responseCode || null,
      message: err.message ? err.message.slice(0, 180) : "SMTP verification failed",
    };
  } finally {
    transport.close();
  }
}

export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const pass = smtpPassword();
        const smtpPasswordConfigured = Boolean(pass);
        const smtpHost = process.env.SMTP_HOST || DEFAULT_SMTP_HOST;
        const smtpUser = process.env.SMTP_USER || DEFAULT_SMTP_USER;
        const configuredPort = Number(process.env.SMTP_PORT || 465);
        const url = new URL(request.url);
        const runSmtpCheck = url.searchParams.get("smtp") === "1";
        const ports = Array.from(new Set([configuredPort, configuredPort === 465 ? 587 : 465]));

        const smtpDiagnostics =
          runSmtpCheck && smtpPasswordConfigured
            ? await Promise.all(ports.map((port) => verifySmtp(smtpHost, smtpUser, pass, port)))
            : undefined;

        return Response.json(
          {
            ok: true,
            service: "baristo-online",
            runtime: "node",
            reservations: smtpPasswordConfigured ? "configured" : "smtp-password-missing",
            firstPour: smtpPasswordConfigured ? "configured" : "smtp-password-missing",
            smtp: {
              host: smtpHost,
              port: configuredPort,
              user: smtpUser,
              passwordConfigured: smtpPasswordConfigured,
              ...(smtpDiagnostics ? { diagnostics: smtpDiagnostics } : {}),
            },
            timestamp: new Date().toISOString(),
          },
          {
            headers: {
              "Cache-Control": "no-store",
              "X-Content-Type-Options": "nosniff",
            },
          },
        );
      },
    },
  },
});
