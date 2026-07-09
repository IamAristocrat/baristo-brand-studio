import { useState } from "react";
import { roasts, type RoastKey } from "@/lib/baristo-data";
import pouchMedium from "@/assets/pouch-medium.jpg";
import pouchMediumDark from "@/assets/pouch-medium-dark.jpg";
import pouchDark from "@/assets/pouch-dark.jpg";

const pouchImages: Record<RoastKey, string> = {
  medium: pouchMedium,
  "medium-dark": pouchMediumDark,
  "truly-dark": pouchDark,
};

function IntensityDots({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`Intensity ${level} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 w-6 rounded-full ${i < level ? "bg-gradient-rose" : "bg-muted"}`}
        />
      ))}
    </div>
  );
}

export function RoastCollection() {
  const [selectedSizes, setSelectedSizes] = useState<Record<RoastKey, number>>({
    medium: 0,
    "medium-dark": 0,
    "truly-dark": 0,
  });
  const [added, setAdded] = useState<RoastKey | null>(null);

  return (
    <section id="roasts" className="bg-gradient-ivory py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="smallcaps text-center text-xs text-primary">The Master Roast Ladder</p>
        <h2 className="hairline hairline-center mt-3 text-center font-display text-4xl font-semibold sm:text-5xl">
          Roast Collection
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-center text-muted-foreground">
          Three roasts for three altitudes of taste — sculpted by master craftsmen from single-origin
          Indian Arabica.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {roasts.map((roast) => (
            <article
              key={roast.key}
              className="group flex flex-col overflow-hidden rounded-lg border bg-card shadow-card-luxe transition-shadow hover:shadow-luxe"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={pouchImages[roast.key]}
                  alt={`${roast.name} pouch`}
                  loading="lazy"
                  width={896}
                  height={1152}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span className="smallcaps absolute top-4 left-4 rounded-sm bg-obsidian/80 px-3 py-1.5 text-[11px] text-champagne backdrop-blur-sm">
                  Single-Origin Indian Arabica
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-2xl font-semibold">{roast.name}</h3>
                <p className="smallcaps mt-1 text-xs text-primary">{roast.tagline}</p>

                <div className="mt-4">
                  <IntensityDots level={roast.intensity} />
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{roast.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {roast.notes.map((n) => (
                    <span
                      key={n}
                      className="rounded-sm bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground"
                    >
                      {n}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                  <span className="smallcaps font-semibold text-foreground">Recipe base</span>
                  <br />
                  {roast.recipeBase}
                </p>

                <div className="mt-5 flex gap-2">
                  {roast.sizes.map((size, idx) => (
                    <button
                      key={size.label}
                      onClick={() => setSelectedSizes((s) => ({ ...s, [roast.key]: idx }))}
                      className={`flex-1 rounded-sm border px-3 py-2 text-center transition-colors ${
                        selectedSizes[roast.key] === idx
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input bg-background hover:border-primary/60"
                      }`}
                    >
                      <span className="block text-sm font-semibold">{size.label}</span>
                      <span className="block text-[10px] opacity-75">{size.sub}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setAdded(roast.key);
                    setTimeout(() => setAdded((v) => (v === roast.key ? null : v)), 1600);
                  }}
                  className="mt-4 rounded-sm bg-gradient-rose px-5 py-3 text-xs font-semibold tracking-widest text-ivory uppercase shadow-rose transition-transform hover:scale-[1.02]"
                >
                  {added === roast.key ? "Added to Ritual ✓" : roast.cta}
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Comparison table */}
        <div className="mt-16 overflow-x-auto rounded-lg border bg-card shadow-card-luxe">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="bg-obsidian text-ivory">
                <th className="smallcaps px-5 py-4 text-left text-xs font-semibold">Compare</th>
                {roasts.map((r) => (
                  <th key={r.key} className="smallcaps px-5 py-4 text-left text-xs font-semibold text-champagne">
                    {r.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="smallcaps px-5 py-4 text-xs font-semibold text-muted-foreground">Character</td>
                {roasts.map((r) => (
                  <td key={r.key} className="px-5 py-4">{r.tagline}</td>
                ))}
              </tr>
              <tr>
                <td className="smallcaps px-5 py-4 text-xs font-semibold text-muted-foreground">Intensity</td>
                {roasts.map((r) => (
                  <td key={r.key} className="px-5 py-4"><IntensityDots level={r.intensity} /></td>
                ))}
              </tr>
              <tr>
                <td className="smallcaps px-5 py-4 text-xs font-semibold text-muted-foreground">Tasting Notes</td>
                {roasts.map((r) => (
                  <td key={r.key} className="px-5 py-4 text-muted-foreground">{r.notes.join(", ")}</td>
                ))}
              </tr>
              <tr>
                <td className="smallcaps px-5 py-4 text-xs font-semibold text-muted-foreground">Recipe Base</td>
                {roasts.map((r) => (
                  <td key={r.key} className="px-5 py-4 text-muted-foreground">{r.recipeBase}</td>
                ))}
              </tr>
              <tr>
                <td className="smallcaps px-5 py-4 text-xs font-semibold text-muted-foreground">Sizes</td>
                {roasts.map((r) => (
                  <td key={r.key} className="px-5 py-4">250 g · 500 g</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
