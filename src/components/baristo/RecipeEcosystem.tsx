import { useState } from "react";
import { recipes, type RecipeRoast } from "@/lib/baristo-data";

const filters: ("All" | RecipeRoast)[] = ["All", "Medium", "Medium-Dark", "Truly Dark"];

const roastBadgeClasses: Record<RecipeRoast, string> = {
  Medium: "bg-secondary text-secondary-foreground",
  "Medium-Dark": "bg-taupe/30 text-espresso",
  "Truly Dark": "bg-obsidian text-champagne",
};

export function RecipeEcosystem() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");

  const visible = active === "All" ? recipes : recipes.filter((r) => r.roasts.includes(active));

  return (
    <section id="recipes" className="bg-gradient-ivory py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="smallcaps text-center text-xs text-primary">Functional Recipe Ecosystem</p>
        <h2 className="hairline hairline-center mt-3 text-center font-display text-4xl font-semibold sm:text-5xl">
          One Coffee. Twelve Elevated Recipes.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-center text-muted-foreground">
          Every ritual begins with a roast. Choose your altitude.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`smallcaps rounded-full border px-5 py-2 text-xs font-semibold transition-colors ${
                active === f
                  ? "border-primary bg-primary text-primary-foreground shadow-rose"
                  : "border-input bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((recipe) => (
            <article
              key={recipe.name}
              className="flex flex-col rounded-lg border bg-card p-7 shadow-card-luxe transition-all hover:-translate-y-1 hover:shadow-luxe"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-2xl font-semibold">{recipe.name}</h3>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  {recipe.roasts.map((r) => (
                    <span
                      key={r}
                      className={`smallcaps rounded-sm px-2 py-0.5 text-[10px] font-semibold ${roastBadgeClasses[r]}`}
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              <p className="smallcaps mt-1 text-xs text-primary">{recipe.theme}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground italic">{recipe.copy}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {recipe.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="rounded-sm bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground"
                  >
                    {ing}
                  </span>
                ))}
              </div>

              <p className="mt-auto pt-4 text-xs text-muted-foreground">
                <span className="smallcaps font-semibold text-foreground">Best moment</span> — {recipe.moment}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
