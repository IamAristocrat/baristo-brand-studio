import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { StoreNav } from "@/components/baristo/StoreNav";
import { StoreFooter } from "@/components/baristo/StoreFooter";
import { BrandStory } from "@/components/baristo/BrandStory";
import { CartProvider } from "@/hooks/use-cart";
import { CartDrawer } from "@/components/baristo/CartDrawer";

const title = "Our Story — Dark & Truly Dark Single-Origin | Baristo.Online";
const description =
  "How Baristo.Online sources high-altitude single-origin Indian Arabica, roasts it dark in small batches, and evidences every pouch with batch codes and documented records.";

export const Route = createFileRoute("/story")({
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
  component: StoryPage,
});

function StoryPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-ivory">
        <StoreNav />
        <main className="pt-16">
          <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
            <Link
              to="/"
              className="smallcaps inline-flex items-center gap-2 text-[11px] text-espresso/60 transition-colors hover:text-rosegold"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to the store
            </Link>
            <h1 className="mt-6 font-display text-4xl font-semibold text-espresso sm:text-5xl">
              The Baristo.Online Story
            </h1>
          </div>
          <BrandStory />
        </main>
        <StoreFooter />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
