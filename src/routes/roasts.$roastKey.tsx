import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import {
  roasts,
  brewGuides,
  recipes,
  roastRecipeName,
  type RoastKey,
} from "@/lib/baristo-data";
import { useCart } from "@/hooks/use-cart";
import { StoreNav } from "@/components/baristo/StoreNav";
import { StoreFooter } from "@/components/baristo/StoreFooter";
import { CartProvider } from "@/hooks/use-cart";
import { CartDrawer } from "@/components/baristo/CartDrawer";
import pouchMedium from "@/assets/pouch-medium.jpg";
import pouchMediumDark from "@/assets/pouch-medium-dark.jpg";
import pouchDark from "@/assets/pouch-dark.jpg";

const pouchImages: Record<RoastKey, string> = {
  medium: pouchMedium,
  "medium-dark": pouchMediumDark,
  "truly-dark": pouchDark,
};

const validKeys: RoastKey[] = ["medium", "medium-dark", "truly-dark"];

export const Route = createFileRoute("/roasts/$roastKey")({
  loader: ({ params }) => {
    if (!validKeys.includes(params.roastKey as RoastKey)) {
      throw notFound();
    }
    return { roastKey: params.roastKey as RoastKey };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Roast not found — Baristo.Online" }, { name: "robots", content: "noindex" }] };
    }
    const roast = roasts.find((r) => r.key === loaderData.roastKey)!;
    const title = `${roast.name} — Brew Guide & Ritual | Baristo.Online`;
    const desc = `${roast.tagline} Brew guidance, tasting notes, and the linked recipe ecosystem for ${roast.name}.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: RoastDetailPage,
  notFoundComponent: RoastNotFound,
});

function RoastNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-obsidian px-4 text-center text-ivory">
      <div>
        <p className="smallcaps text-xs text-rosegold-light">Not found</p>
        <h1 className="mt-3 font-display text-4xl font-semibold">This roast doesn't exist</h1>
        <Link
          to="/"
          className="smallcaps mt-6 inline-block rounded-sm bg-gradient-rose px-5 py-3 text-xs font-bold text-ivory shadow-rose"
        >
          Return to Store
        </Link>
      </div>
    </div>
  );
}

function RoastDetailPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-ivory">
        <StoreNav />
        <RoastDetailBody />
        <StoreFooter />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

function RoastDetailBody() {
  const { roastKey } = Route.useLoaderData();
  const roast = roasts.find((r) => r.key === roastKey)!;
  const guide = brewGuides[roastKey];
  const recipeName = roastRecipeName[roastKey];
  const linkedRecipes = recipes.filter((r) => r.roasts.includes(recipeName));

  const [sizeIdx, setSizeIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const { add, setOpen } = useCart();
  const size = roast.sizes[sizeIdx];

  const handleAdd = () => {
    add({
      id: `${roast.key}-${size.label}`,
      roastKey: roast.key,
      roastName: roast.name,
      sizeLabel: size.label,
      sizeSub: size.sub,
      price: size.price,
      mrp: size.mrp,
      image: pouchImages[roast.key],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
    setOpen(true);
  };

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="border-b border-champagne/40 bg-gradient-ivory">
        <div className="mx-auto max-w-6xl px-4 pt-10 pb-16 sm:px-6 sm:pt-14 sm:pb-24">
          <Link
            to="/"
            className="smallcaps inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-3 w-3" /> Back to Store
          </Link>

          <div className="mt-8 grid gap-10 md:grid-cols-2 md:items-center">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-luxe">
              <img
                src={pouchImages[roast.key]}
                alt={`${roast.name} pouch`}
                width={896}
                height={1152}
                className="h-full w-full object-cover"
              />
              <span className="smallcaps absolute top-5 left-5 rounded-sm bg-obsidian/85 px-3 py-1.5 text-[11px] text-champagne backdrop-blur-sm">
                Single-Origin Indian Arabica
              </span>
            </div>

            <div>
              <p className="smallcaps text-xs text-primary">The Master Roast Ladder</p>
              <h1 className="hairline mt-3 font-display text-5xl font-semibold sm:text-6xl">
                {roast.name}
              </h1>
              <p className="smallcaps mt-3 text-sm text-primary">{roast.tagline}</p>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                {roast.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {roast.notes.map((n) => (
                  <span
                    key={n}
                    className="rounded-sm bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground"
                  >
                    {n}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex gap-2">
                {roast.sizes.map((s, idx) => (
                  <button
                    key={s.label}
                    onClick={() => setSizeIdx(idx)}
                    className={`flex-1 rounded-sm border px-4 py-3 text-center transition-colors ${
                      sizeIdx === idx
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input bg-card hover:border-primary/60"
                    }`}
                  >
                    <span className="block text-sm font-semibold">{s.label}</span>
                    <span className="block text-[10px] opacity-75">{s.sub}</span>
                  </button>
                ))}
              </div>

              <div className="mt-5 flex items-baseline justify-between">
                <span className="font-display text-3xl font-semibold tabular-nums">
                  ₹{size.price.toLocaleString("en-IN")}
                </span>
                <span className="text-sm text-muted-foreground line-through tabular-nums">
                  ₹{size.mrp.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                onClick={handleAdd}
                className="mt-5 w-full rounded-sm bg-gradient-rose px-5 py-4 text-xs font-bold tracking-widest text-ivory uppercase shadow-rose transition-transform hover:scale-[1.01]"
              >
                {added ? "Added to Ritual ✓" : `Add ${size.label} to Cart`}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Ritual */}
      <section className="bg-obsidian py-16 text-ivory sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="smallcaps text-xs text-rosegold-light">The Ritual</p>
          <p className="mt-5 font-display text-2xl leading-relaxed sm:text-3xl">
            {guide.ritual}
          </p>
        </div>
      </section>

      {/* Cupping + Origin */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-8 shadow-card-luxe">
            <p className="smallcaps text-xs text-primary">Cupping Profile</p>
            <h2 className="mt-2 font-display text-3xl font-semibold">Tasting Notes</h2>
            <dl className="mt-6 divide-y">
              {guide.cupping.map((c) => (
                <div key={c.attribute} className="flex items-baseline justify-between py-3">
                  <dt className="smallcaps text-xs text-muted-foreground">{c.attribute}</dt>
                  <dd className="text-sm font-medium">{c.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-lg border bg-card p-8 shadow-card-luxe">
            <p className="smallcaps text-xs text-primary">Provenance</p>
            <h2 className="mt-2 font-display text-3xl font-semibold">Origin & Craft</h2>
            <dl className="mt-6 divide-y">
              {guide.origin.map((o) => (
                <div key={o.label} className="flex items-baseline justify-between py-3">
                  <dt className="smallcaps text-xs text-muted-foreground">{o.label}</dt>
                  <dd className="text-sm font-medium">{o.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-xs text-muted-foreground">
              <span className="smallcaps font-semibold text-foreground">Pairings</span> —{" "}
              {guide.pairings.join(" · ")}
            </p>
          </div>
        </div>
      </section>

      {/* Brew guidance */}
      <section className="bg-champagne/30 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="smallcaps text-center text-xs text-primary">Brew Guidance</p>
          <h2 className="hairline hairline-center mt-3 text-center font-display text-4xl font-semibold sm:text-5xl">
            How to Pour {roast.name}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-center text-muted-foreground">
            Three master methods calibrated for this roast — grind, ratio, temperature, time.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {guide.methods.map((m) => (
              <article
                key={m.method}
                className="flex flex-col rounded-lg border bg-card p-7 shadow-card-luxe transition-shadow hover:shadow-luxe"
              >
                <p className="smallcaps text-xs text-primary">Method</p>
                <h3 className="mt-1 font-display text-2xl font-semibold">{m.method}</h3>
                <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="smallcaps text-[10px] text-muted-foreground">Grind</dt>
                    <dd className="mt-1 font-medium">{m.grind}</dd>
                  </div>
                  <div>
                    <dt className="smallcaps text-[10px] text-muted-foreground">Ratio</dt>
                    <dd className="mt-1 font-medium tabular-nums">{m.ratio}</dd>
                  </div>
                  <div>
                    <dt className="smallcaps text-[10px] text-muted-foreground">Temp</dt>
                    <dd className="mt-1 font-medium tabular-nums">{m.temp}</dd>
                  </div>
                  <div>
                    <dt className="smallcaps text-[10px] text-muted-foreground">Time</dt>
                    <dd className="mt-1 font-medium tabular-nums">{m.time}</dd>
                  </div>
                </dl>
                <p className="mt-5 border-t pt-4 text-xs italic text-muted-foreground">
                  {m.note}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Linked recipes */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="smallcaps text-center text-xs text-primary">Linked Recipe Ecosystem</p>
          <h2 className="hairline hairline-center mt-3 text-center font-display text-4xl font-semibold sm:text-5xl">
            Rituals Built on {roast.name}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-center text-muted-foreground">
            {linkedRecipes.length} elevated recipes that begin with this roast.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {linkedRecipes.map((r) => (
              <article
                key={r.name}
                className="flex flex-col rounded-lg border bg-card p-7 shadow-card-luxe transition-all hover:-translate-y-1 hover:shadow-luxe"
              >
                <h3 className="font-display text-2xl font-semibold">{r.name}</h3>
                <p className="smallcaps mt-1 text-xs text-primary">{r.theme}</p>
                <p className="mt-3 text-sm leading-relaxed italic text-muted-foreground">
                  {r.copy}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {r.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="rounded-sm bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
                <p className="mt-auto pt-4 text-xs text-muted-foreground">
                  <span className="smallcaps font-semibold text-foreground">Best moment</span> —{" "}
                  {r.moment}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/"
              hash="recipes"
              className="smallcaps inline-block rounded-sm border border-primary px-6 py-3 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Explore All 12 Recipes
            </Link>
          </div>
        </div>
      </section>

      {/* Cross-sell other roasts */}
      <section className="border-t border-champagne/40 bg-gradient-ivory py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="smallcaps text-center text-xs text-primary">Continue the Ladder</p>
          <h2 className="mt-3 text-center font-display text-3xl font-semibold sm:text-4xl">
            Explore the Other Roasts
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {roasts
              .filter((r) => r.key !== roast.key)
              .map((r) => (
                <Link
                  key={r.key}
                  to="/roasts/$roastKey"
                  params={{ roastKey: r.key }}
                  className="group flex gap-5 overflow-hidden rounded-lg border bg-card p-5 shadow-card-luxe transition-all hover:-translate-y-1 hover:shadow-luxe"
                >
                  <img
                    src={pouchImages[r.key]}
                    alt={r.name}
                    className="h-28 w-24 shrink-0 rounded-sm object-cover"
                  />
                  <div className="flex flex-col justify-center">
                    <h3 className="font-display text-xl font-semibold">{r.name}</h3>
                    <p className="smallcaps mt-1 text-[11px] text-primary">{r.tagline}</p>
                    <span className="smallcaps mt-3 text-[11px] text-muted-foreground group-hover:text-primary">
                      View brew guide →
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
