import { createFileRoute } from "@tanstack/react-router";
import heroMountains from "@/assets/hero-mountains.jpg";
import { PublicStore } from "@/components/baristo/PublicStore";
import { HomepageEnhancements } from "@/components/baristo/HomepageEnhancements";
import { JournalPortal } from "@/components/baristo/JournalPortal";
import { HomepageNavigation } from "@/components/baristo/HomepageNavigation";
import { RoastSciencePortal } from "@/components/baristo/RoastSciencePortal";

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
  component: BaristoHomepage,
});

function BaristoHomepage() {
  return (
    <>
      <HomepageNavigation />
      <PublicStore />
      <HomepageEnhancements />
      <JournalPortal />
      <RoastSciencePortal />
    </>
  );
}
