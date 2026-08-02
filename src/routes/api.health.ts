import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: async () => {
        const smtpConfigured = Boolean(
          process.env.SMTP_HOST &&
          process.env.SMTP_USER &&
          process.env.SMTP_PASS &&
          (process.env.SMTP_FROM || process.env.SMTP_USER),
        );

        return Response.json(
          {
            ok: true,
            service: "baristo-online",
            runtime: "node",
            reservations: smtpConfigured ? "ready" : "smtp-not-configured",
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
