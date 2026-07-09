import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { recipes, type RecipeRoast, type RecipeBrewMethod } from "@/lib/baristo-data";

const roastFilters: ("All" | RecipeRoast)[] = ["All", "Medium", "Medium-Dark", "Truly Dark"];
const brewFilters: ("All" | RecipeBrewMethod)[] = ["All", "Moka Pot", "French Press", "Pour-Over", "Espresso"];

const roastBadgeClasses: Record<RecipeRoast, string> = {
  Medium: "bg-secondary text-secondary-foreground",
  "Medium-Dark": "bg-taupe/30 text-espresso",
  "Truly Dark": "bg-obsidian text-champagne",
};

export function RecipeEcosystem() {
  const [roast, setRoast] = useState<(typeof roastFilters)[number]>("All");
  const [brew, setBrew] = useState<(typeof brewFilters)[number]>("All");

  const visible = recipes.filter((r) => {
    const roastOk = roast === "All" || r.roasts.includes(roast);
    const brewOk = brew === "All" || r.brewMethods.includes(brew);
    return roastOk && brewOk;
  });

  const resetFilters = () => {
    setRoast("All");
    setBrew("All");
  };

  const chipBase =
    "smallcaps rounded-full border px-5 py-2 text-xs font-semibold transition-colors";
  const chipActive =
    "border-primary bg-primary text-primary-foreground shadow-rose";
  const chipIdle =
    "border-input bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground";

  return (
    <section id="recipes" className="bg-gradient-ivory py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="smallcaps text-center text-xs text-primary">Functional Recipe Ecosystem</p>
        <h2 className="hairline hairline-center mt-3 text-center font-display text-4xl font-semibold sm:text-5xl">
          One Coffee. Twelve Elevated Recipes.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-center text-muted-foreground">
          Filter the ritual by roast and by brew method. Every combination pours a different mood.
        </p>

        <div className="mt-12 space-y-6">
          <div>
            <p className="smallcaps mb-3 text-center text-[10px] tracking-[0.24em] text-muted-foreground">
              By Roast
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {roastFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setRoast(f)}
                  className={`${chipBase} ${roast === f ? chipActive : chipIdle}`}
                  aria-pressed={roast === f}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="smallcaps mb-3 text-center text-[10px] tracking-[0.24em] text-muted-foreground">
              By Brew Method
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {brewFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setBrew(f)}
                  className={`${chipBase} ${brew === f ? chipActive : chipIdle}`}
                  aria-pressed={brew === f}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{visible.length}</span> of {recipes.length} rituals
          {(roast !== "All" || brew !== "All") && (
            <>
              {" "}
              ·{" "}
              <button
                onClick={resetFilters}
                className="smallcaps text-primary underline-offset-4 hover:underline"
              >
                Reset filters
              </button>
            </>
          )}
        </p>

        {visible.length === 0 ? (
          <div className="mt-10 rounded-lg border border-dashed bg-card/60 p-10 text-center">
            <p className="font-display text-xl text-foreground">No rituals match this pairing.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different roast or brew method combination.
            </p>
            <button
              onClick={resetFilters}
              className="smallcaps mt-6 rounded-full border border-primary px-5 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((recipe) => (
              <Link
                key={recipe.slug}
                to="/recipes/$slug"
                params={{ slug: recipe.slug }}
                className="group flex flex-col rounded-lg border bg-card p-7 shadow-card-luxe transition-all hover:-translate-y-1 hover:shadow-luxe"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-2xl font-semibold group-hover:text-primary">
                    {recipe.name}
                  </h3>
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
                  {recipe.brewMethods.map((m) => (
                    <span
                      key={m}
                      className="smallcaps rounded-sm border border-primary/30 bg-primary/5 px-2 py-1 text-[10px] font-semibold text-primary"
                    >
                      {m}
                    </span>
                  ))}
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {recipe.ingredients.slice(0, 4).map((ing) => (
                    <span
                      key={ing}
                      className="rounded-sm bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground"
                    >
                      {ing}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-end justify-between gap-3 pt-4">
                  <p className="text-xs text-muted-foreground">
                    <span className="smallcaps font-semibold text-foreground">Best moment</span> — {recipe.moment}
                  </p>
                  <span className="smallcaps shrink-0 text-[10px] text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Open →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
