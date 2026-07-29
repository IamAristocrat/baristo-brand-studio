import { createFileRoute } from "@tanstack/react-router";
import heroMountains from "@/assets/hero-mountains.jpg";
import { StoreNav } from "@/components/baristo/StoreNav";
import { Hero } from "@/components/baristo/Hero";
import { RoastCollection } from "@/components/baristo/RoastCollection";
import { CasePacks } from "@/components/baristo/CasePacks";
import { RoastComparison } from "@/components/baristo/RoastComparison";
import { APlusModules } from "@/components/baristo/APlusModules";
import { BrandStory } from "@/components/baristo/BrandStory";
import { VisualStory } from "@/components/baristo/VisualStory";
import { Evidence } from "@/components/baristo/Evidence";
import { EvidenceStrip } from "@/components/baristo/EvidenceStrip";
import { RecipeEcosystem } from "@/components/baristo/RecipeEcosystem";
import { AmazonCopy } from "@/components/baristo/AmazonCopy";
import { StoreFooter } from "@/components/baristo/StoreFooter";
import { FloatingCTA } from "@/components/baristo/FloatingCTA";
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
          <BrandStory />
          <RoastComparison />
          <CasePacks />
          <APlusModules />
          <Evidence />
          <RecipeEcosystem />
          <AmazonCopy />
        </main>
        <StoreFooter />
        <CartDrawer />
        <FloatingCTA />
      </div>
    </CartProvider>
  );
}
