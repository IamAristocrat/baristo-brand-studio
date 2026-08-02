import { createFileRoute } from "@tanstack/react-router";

const DEFAULT_SMTP_HOST = "smtp.hostinger.com";
const DEFAULT_SMTP_USER = "support@baristo.online";

export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: async () => {
        const smtpPasswordConfigured = Boolean(
          process.env.SMTP_PASS || process.env.EMAIL_PASSWORD || process.env.HOSTINGER_EMAIL_PASSWORD,
        );
        const smtpHost = process.env.SMTP_HOST || DEFAULT_SMTP_HOST;
        const smtpUser = process.env.SMTP_USER || DEFAULT_SMTP_USER;
        const smtpPort = Number(process.env.SMTP_PORT || 465);

        return Response.json(
          {
            ok: true,
            service: "baristo-online",
            runtime: "node",
            reservations: smtpPasswordConfigured ? "configured" : "smtp-password-missing",
            smtp: {
              host: smtpHost,
              port: smtpPort,
              user: smtpUser,
              passwordConfigured: smtpPasswordConfigured,
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
