import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { StoreNav } from "@/components/baristo/StoreNav";
import { StoreFooter } from "@/components/baristo/StoreFooter";
import { EvidenceHub } from "@/components/baristo/EvidenceHub";
import { RoastingHub } from "@/components/baristo/RoastingHub";
import { Testimonials } from "@/components/baristo/Testimonials";
import { EvidenceBadges } from "@/components/baristo/EvidenceBadges";
import { CartProvider } from "@/hooks/use-cart";
import { CartDrawer } from "@/components/baristo/CartDrawer";

const title = "Evidence Hub — Batch Traceability & Roasting | Baristo.Online";
const description =
  "Batch codes, roast dates and what each proof dossier includes for Baristo.Online premium ground coffee — released on demand or on application, plus the seven-stage roasting hub.";

export const Route = createFileRoute("/evidence-hub")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EvidenceHubPage,
});

function EvidenceHubPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-ivory">
        <StoreNav />
        <main className="pt-16">
          <section className="relative overflow-hidden bg-gradient-ivory pt-10 pb-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--rosegold)/0.14),_transparent_65%)]" />
            <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
              <Link
                to="/"
                className="smallcaps inline-flex items-center gap-2 text-[11px] text-espresso/60 transition-colors hover:text-rosegold"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to the store
              </Link>
              <p className="smallcaps mt-6 text-xs text-primary">Evidence Hub</p>
              <h1 className="hairline mt-3 max-w-3xl font-display text-4xl font-semibold text-espresso sm:text-5xl">
                Batch Traceability, Roasting Dates &amp; Proof — On Request
              </h1>
              <p className="mt-6 max-w-2xl text-muted-foreground">
                Every pouch of Baristo.Online premium ground coffee is batch-coded and dated. The
                documents behind those codes are released deliberately — on demand for provenance and
                roast records, on application for purity, sensory and compliance files.
              </p>
              <EvidenceBadges
                className="mt-8"
                heading="Quality Evidence"
              />
            </div>
          </section>
          <EvidenceHub />
          <RoastingHub />
          <Testimonials />
        </main>
        <StoreFooter />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
