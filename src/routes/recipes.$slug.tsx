import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, Users, Flame } from "lucide-react";
import { recipes, roasts, type RoastKey, type Recipe } from "@/lib/baristo-data";
import { StoreNav } from "@/components/baristo/StoreNav";
import { StoreFooter } from "@/components/baristo/StoreFooter";
import { CartProvider } from "@/hooks/use-cart";
import { CartDrawer } from "@/components/baristo/CartDrawer";
import { BrewKitBuilder } from "@/components/baristo/BrewKitBuilder";
import pouchMedium from "@/assets/pouch-medium.jpg";
import pouchMediumDark from "@/assets/pouch-medium-dark.jpg";
import pouchDark from "@/assets/pouch-dark.jpg";

const pouchImages: Record<RoastKey, string> = {
  medium: pouchMedium,
  "medium-dark": pouchMediumDark,
  "truly-dark": pouchDark,
};

const roastNameToKey: Record<"Medium" | "Medium-Dark" | "Truly Dark", RoastKey> = {
  Medium: "medium",
  "Medium-Dark": "medium-dark",
  "Truly Dark": "truly-dark",
};

export const Route = createFileRoute("/recipes/$slug")({
  loader: ({ params }) => {
    const recipe = recipes.find((r) => r.slug === params.slug);
    if (!recipe) throw notFound();
    return { recipe };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Recipe not found — Baristo.Online" }, { name: "robots", content: "noindex" }] };
    }
    const r = loaderData.recipe;
    const title = `${r.name} — ${r.theme} | Baristo.Online Recipe`;
    const desc = `${r.copy} A ${r.method.toLowerCase()} ritual built on ${r.roasts.join(" or ")} roast — ingredients, step-by-step brew, and tasting notes.`;
    const url = `https://baristo.lovable.app/recipes/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Recipe",
            name: r.name,
            description: r.copy,
            recipeCategory: r.theme,
            recipeCuisine: "Coffee",
            recipeYield: r.servings,
            totalTime: r.prepTime,
            recipeIngredient: r.ingredients,
            recipeInstructions: r.steps.map((s, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              text: s,
            })),
            author: { "@type": "Organization", name: "Baristo.Online" },
            url,
          }),
        },
      ],
    };
  },
  component: RecipeDetailPage,
  notFoundComponent: RecipeNotFound,
});

function RecipeNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-obsidian px-4 text-center text-ivory">
      <div>
        <p className="smallcaps text-xs text-rosegold-light">Not found</p>
        <h1 className="mt-3 font-display text-4xl font-semibold">This recipe doesn't exist</h1>
        <Link
          to="/"
          hash="recipes"
          className="smallcaps mt-6 inline-block rounded-sm bg-gradient-rose px-5 py-3 text-xs font-bold text-ivory shadow-rose"
        >
          Back to Recipes
        </Link>
      </div>
    </div>
  );
}

const difficultyBadge: Record<"Easy" | "Considered" | "Ritual", string> = {
  Easy: "bg-secondary text-secondary-foreground",
  Considered: "bg-champagne text-espresso",
  Ritual: "bg-obsidian text-champagne",
};

function RecipeDetailPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-ivory">
        <StoreNav />
        <RecipeDetailBody />
        <StoreFooter />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

function RecipeDetailBody() {
  const { recipe } = Route.useLoaderData() as { recipe: Recipe };
  const relatedRoasts = recipe.roasts.map((rn) => roasts.find((r) => r.key === roastNameToKey[rn])!);
  const otherRecipes = recipes
    .filter((r) => r.slug !== recipe.slug && r.roasts.some((rn) => recipe.roasts.includes(rn)))
    .slice(0, 3);

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="border-b border-champagne/40 bg-gradient-ivory">
        <div className="mx-auto max-w-6xl px-4 pt-10 pb-14 sm:px-6 sm:pt-14 sm:pb-20">
          <Link
            to="/"
            hash="recipes"
            className="smallcaps inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-3 w-3" /> Back to Recipe Ecosystem
          </Link>

          <div className="mt-8 grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-start">
            <div>
              <p className="smallcaps text-xs text-primary">Baristo Recipe · {recipe.method}</p>
              <h1 className="hairline mt-3 font-display text-5xl font-semibold sm:text-6xl">
                {recipe.name}
              </h1>
              <p className="smallcaps mt-3 text-sm text-primary">{recipe.theme}</p>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground italic sm:text-lg">
                {recipe.copy}
              </p>

              <dl className="mt-8 grid grid-cols-3 gap-4 rounded-lg border bg-card p-5 shadow-card-luxe">
                <div>
                  <dt className="smallcaps flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <Clock className="h-3 w-3" /> Time
                  </dt>
                  <dd className="mt-1.5 font-display text-lg font-semibold">{recipe.prepTime}</dd>
                </div>
                <div>
                  <dt className="smallcaps flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <Users className="h-3 w-3" /> Serves
                  </dt>
                  <dd className="mt-1.5 font-display text-lg font-semibold">{recipe.servings}</dd>
                </div>
                <div>
                  <dt className="smallcaps flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <Flame className="h-3 w-3" /> Craft
                  </dt>
                  <dd className="mt-1.5">
                    <span
                      className={`smallcaps inline-block rounded-sm px-2 py-1 text-[10px] font-semibold ${difficultyBadge[recipe.difficulty]}`}
                    >
                      {recipe.difficulty}
                    </span>
                  </dd>
                </div>
              </dl>

              <p className="mt-6 text-xs text-muted-foreground">
                <span className="smallcaps font-semibold text-foreground">Best moment</span> —{" "}
                {recipe.moment}
              </p>
            </div>

            {/* Roast basis card */}
            <aside className="rounded-lg border bg-card p-6 shadow-card-luxe">
              <p className="smallcaps text-xs text-primary">Built on the roast ladder</p>
              <h2 className="mt-2 font-display text-2xl font-semibold">Roast Basis</h2>
              <p className="mt-2 text-xs text-muted-foreground">
                Begin with any of the roasts below — the ritual is calibrated for each.
              </p>
              <div className="mt-5 space-y-3">
                {relatedRoasts.map((roast) => (
                  <Link
                    key={roast.key}
                    to="/roasts/$roastKey"
                    params={{ roastKey: roast.key }}
                    className="group flex items-center gap-4 rounded-sm border p-3 transition-colors hover:border-primary/60"
                  >
                    <img
                      src={pouchImages[roast.key]}
                      alt={roast.name}
                      className="h-16 w-14 shrink-0 rounded-sm object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-display text-base font-semibold">{roast.name}</p>
                      <p className="smallcaps text-[10px] text-muted-foreground">
                        {roast.tagline}
                      </p>
                    </div>
                    <span className="smallcaps text-[10px] text-muted-foreground group-hover:text-primary">
                      Open →
                    </span>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Ingredients + Steps */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[1fr_1.4fr]">
          {/* Ingredients */}
          <div className="md:sticky md:top-24 md:self-start">
            <p className="smallcaps text-xs text-primary">Mise en Place</p>
            <h2 className="mt-2 font-display text-3xl font-semibold">Ingredients</h2>
            <p className="mt-3 text-xs text-muted-foreground">
              Measure everything before you pour — precision is the ritual.
            </p>
            <ul className="mt-6 space-y-3">
              {recipe.ingredients.map((ing) => (
                <li key={ing} className="flex items-start gap-3 border-b border-champagne/50 pb-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-rose" />
                  <span className="text-sm leading-relaxed">{ing}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div>
            <p className="smallcaps text-xs text-primary">The Method · {recipe.method}</p>
            <h2 className="mt-2 font-display text-3xl font-semibold">Brew Instructions</h2>
            <p className="mt-3 text-xs text-muted-foreground">
              Follow the sequence in order — each step earns the next.
            </p>
            <ol className="mt-8 space-y-6">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex gap-5">
                  <span className="smallcaps flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-gradient-rose font-display text-sm font-semibold text-ivory shadow-rose">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="pt-2 text-sm leading-relaxed text-foreground">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Brew Kit builder */}
      <BrewKitBuilder recipe={recipe} />

      {/* Tasting notes */}
      <section className="bg-obsidian py-20 text-ivory sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="smallcaps text-center text-xs text-rosegold-light">The Cupping</p>
          <h2 className="hairline hairline-center mt-3 text-center font-display text-4xl font-semibold sm:text-5xl">
            Tasting Notes
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-center text-ivory/60">
            What to look for when you take the first sip.
          </p>

          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {recipe.tastingNotes.map((note, i) => (
              <li
                key={i}
                className="rounded-lg border border-ivory/10 bg-obsidian-soft p-6 transition-colors hover:border-rosegold/50"
              >
                <p className="smallcaps text-[10px] text-rosegold-light">Note {i + 1}</p>
                <p className="mt-3 text-sm leading-relaxed text-champagne">{note}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12 rounded-lg border border-rosegold/30 bg-gradient-to-r from-rosegold/10 to-transparent p-6 text-center">
            <p className="smallcaps text-[10px] text-rosegold-light">Suggested Pairing</p>
            <p className="mt-2 font-display text-xl text-ivory">{recipe.pairing}</p>
          </div>
        </div>
      </section>

      {/* Related recipes */}
      {otherRecipes.length > 0 && (
        <section className="border-t border-champagne/40 bg-gradient-ivory py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="smallcaps text-center text-xs text-primary">Continue the Ritual</p>
            <h2 className="mt-3 text-center font-display text-3xl font-semibold sm:text-4xl">
              More Recipes on the Same Roast
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherRecipes.map((r) => (
                <Link
                  key={r.slug}
                  to="/recipes/$slug"
                  params={{ slug: r.slug }}
                  className="group flex flex-col rounded-lg border bg-card p-7 shadow-card-luxe transition-all hover:-translate-y-1 hover:shadow-luxe"
                >
                  <h3 className="font-display text-2xl font-semibold group-hover:text-primary">
                    {r.name}
                  </h3>
                  <p className="smallcaps mt-1 text-xs text-primary">{r.theme}</p>
                  <p className="mt-3 text-sm leading-relaxed italic text-muted-foreground">
                    {r.copy}
                  </p>
                  <span className="smallcaps mt-auto pt-5 text-[11px] text-muted-foreground group-hover:text-primary">
                    Open recipe →
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-14 text-center">
              <Link
                to="/"
                hash="recipes"
                className="smallcaps inline-block rounded-sm border border-primary px-6 py-3 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                View All 12 Recipes
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
