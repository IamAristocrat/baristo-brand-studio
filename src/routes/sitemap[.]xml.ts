import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://baristo.online";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/story", changefreq: "monthly", priority: "0.8" },
          { path: "/evidence-hub", changefreq: "monthly", priority: "0.8" },
          { path: "/roasts/dark", changefreq: "weekly", priority: "0.9" },
          { path: "/roasts/truly-dark", changefreq: "weekly", priority: "0.9" },
        ];

        const urls = entries.map((entry) =>
          [
            "  <url>",
            `    <loc>${BASE_URL}${entry.path}</loc>`,
            `    <changefreq>${entry.changefreq}</changefreq>`,
            `    <priority>${entry.priority}</priority>`,
            "  </url>",
          ].join("\n"),
        );

        return new Response(
          [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
            ...urls,
            "</urlset>",
          ].join("\n"),
          {
            headers: {
              "Content-Type": "application/xml",
              "Cache-Control": "public, max-age=3600",
            },
          },
        );
      },
    },
  },
});
