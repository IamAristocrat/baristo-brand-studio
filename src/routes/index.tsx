import { createFileRoute } from "@tanstack/react-router";
import heroMountains from "@/assets/hero-mountains.jpg";
import { StoreNav } from "@/components/baristo/StoreNav";
import { Hero } from "@/components/baristo/Hero";
import { RoastCollection } from "@/components/baristo/RoastCollection";
import { CasePacks } from "@/components/baristo/CasePacks";
import { RoastComparison } from "@/components/baristo/RoastComparison";
import { APlusModules } from "@/components/baristo/APlusModules";
import { VisualStory } from "@/components/baristo/VisualStory";
import { Evidence } from "@/components/baristo/Evidence";
import { EvidenceStrip } from "@/components/baristo/EvidenceStrip";
import { RecipeEcosystem } from "@/components/baristo/RecipeEcosystem";
import { AmazonCopy } from "@/components/baristo/AmazonCopy";
import { StoreFooter } from "@/components/baristo/StoreFooter";
import { CartProvider } from "@/hooks/use-cart";
import { CartDrawer } from "@/components/baristo/CartDrawer";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      {
        rel: "preload",
        as: "image",
        href: heroMountains,
        imageSrcset: undefined,
        imageSizes: undefined,
        fetchPriority: "high",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <CartProvider>
      <div className="min-h-screen">
        <StoreNav />
        <main>
          <Hero />
          <EvidenceStrip />
          <RoastCollection />
          <VisualStory />
          <RoastComparison />
          <CasePacks />
          <APlusModules />
          <Evidence />
          <RecipeEcosystem />
          <AmazonCopy />
          <LaunchSop />
        </main>
        <StoreFooter />
        <CartDrawer />

        {/* Floating launch CTA */}
        <a
          href="#launch-sop"
          className="smallcaps fixed right-4 bottom-4 z-40 rounded-full bg-gradient-rose px-6 py-3.5 text-xs font-bold text-espresso shadow-rose transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
        >
          Launch Checklist
        </a>
      </div>
    </CartProvider>
  );
}
