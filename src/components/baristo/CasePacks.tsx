import { useState } from "react";
import { casePacks } from "@/lib/baristo-data";

export function CasePacks() {
  const [added, setAdded] = useState<string | null>(null);

  return (
    <section id="cases" className="relative bg-obsidian py-20 text-ivory sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--rosegold)/0.12),_transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <p className="smallcaps text-center text-xs text-champagne">10-Pack Noble Cases</p>
        <h2 className="hairline hairline-center mt-3 text-center font-display text-4xl font-semibold text-ivory sm:text-5xl">
          The Case Collection
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-ivory/70">
          Ten pouches per case — curated for daily drinkers, espresso minds, offices, and dark-roast
          loyalists. Launch pricing, quality-tested, batch-coded.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {casePacks.map((c) => {
            const discount = Math.round(
              (1 -
                Number(c.price.replace(/[^\d]/g, "")) /
                  Number(c.mrp.replace(/[^\d]/g, ""))) *
                100
            );
            return (
              <article
                key={c.key}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-rosegold/25 bg-gradient-to-b from-obsidian-soft to-obsidian p-6 shadow-luxe transition-all hover:border-rosegold/60 hover:shadow-rose"
              >
                <span className="smallcaps absolute top-4 right-4 rounded-sm bg-gradient-rose px-2.5 py-1 text-[10px] font-bold text-ivory">
                  −{discount}%
                </span>

                <p className="smallcaps text-[10px] text-champagne">10-Pack Case</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-ivory">{c.name}</h3>

                <div className="mt-4 h-px bg-gradient-to-r from-rosegold/50 via-champagne/30 to-transparent" />

                <p className="mt-4 text-sm leading-relaxed text-ivory/75">{c.packSplit}</p>

                <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-sm border border-ivory/10 bg-ivory/5 p-3">
                    <span className="smallcaps block text-[10px] text-champagne">Total Coffee</span>
                    <span className="mt-1 block font-display text-lg text-ivory">{c.total}</span>
                  </div>
                  <div className="rounded-sm border border-ivory/10 bg-ivory/5 p-3">
                    <span className="smallcaps block text-[10px] text-champagne">Made For</span>
                    <span className="mt-1 block text-sm leading-tight text-ivory">{c.useCase}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <span className="smallcaps block text-[10px] text-ivory/50">Launch Price</span>
                    <span className="font-display text-3xl font-semibold text-ivory">{c.price}</span>
                    <span className="ml-2 text-sm text-ivory/40 line-through">{c.mrp}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setAdded(c.key);
                    setTimeout(() => setAdded((v) => (v === c.key ? null : v)), 1600);
                  }}
                  className="smallcaps mt-6 rounded-sm bg-gradient-rose px-5 py-3 text-xs font-bold tracking-widest text-ivory shadow-rose transition-transform hover:scale-[1.02]"
                >
                  {added === c.key ? "Added to Ritual ✓" : "Reserve This Case"}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
