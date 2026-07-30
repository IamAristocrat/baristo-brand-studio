import { createFileRoute } from "@tanstack/react-router";
import heroMountains from "@/assets/hero-mountains.jpg";
import { PublicStore } from "@/components/baristo/PublicStore";
import "@/hero-slogan.css";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      {
        rel: "preload",
        as: "image",
        href: heroMountains,
        fetchPriority: "high",
      },
    ],
  }),
  component: PublicStore,
});
