import { useState } from "react";
import { casePacks } from "@/lib/baristo-data";
import { useCart } from "@/hooks/use-cart";
import { Minus, Plus } from "lucide-react";

export function CasePacks() {
  const { add, setOpen } = useCart();
  const [added, setAdded] = useState<string | null>(null);
  const [caseQty, setCaseQty] = useState<Record<string, number>>({});

  return (
    <section id="cases" className="relative bg-ivory py-20 text-espresso sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--rosegold)/0.12),_transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <p className="smallcaps text-center text-xs text-rosegold">10-Pack Noble Cases</p>
        <h2 className="hairline hairline-center mt-3 text-center font-display text-4xl font-semibold text-espresso sm:text-5xl">
          The Case Collection
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-espresso/70">
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
                className="group relative flex flex-col overflow-hidden rounded-lg border border-rosegold/25 bg-gradient-to-b from-ivory to-champagne p-6 shadow-luxe transition-all hover:border-rosegold/60 hover:shadow-rose"
              >
                <span className="smallcaps absolute top-4 right-4 rounded-sm bg-gradient-rose px-2.5 py-1 text-[10px] font-bold text-espresso">
                  −{discount}%
                </span>

                <p className="smallcaps text-[10px] text-rosegold">10-Pack Case</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-espresso">{c.name}</h3>

                <div className="mt-4 h-px bg-gradient-to-r from-rosegold/50 via-champagne/30 to-transparent" />

                <p className="mt-4 text-sm leading-relaxed text-espresso/75">{c.packSplit}</p>

                <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-sm border border-rosegold/20 bg-champagne/30 p-3">
                    <span className="smallcaps block text-[10px] text-rosegold">Total Coffee</span>
                    <span className="mt-1 block font-display text-lg text-espresso">{c.total}</span>
                  </div>
                  <div className="rounded-sm border border-rosegold/20 bg-champagne/30 p-3">
                    <span className="smallcaps block text-[10px] text-rosegold">Made For</span>
                    <span className="mt-1 block text-sm leading-tight text-espresso">{c.useCase}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <span className="smallcaps block text-[10px] text-espresso/50">Launch Price</span>
                    <span className="font-display text-3xl font-semibold text-espresso">{c.price}</span>
                    <span className="ml-2 text-sm text-espresso/40 line-through">{c.mrp}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <div className="flex items-center rounded-sm border border-rosegold/25">
                    <button
                      onClick={() => setCaseQty((prev) => Math.max(1, (prev[c.key] ?? 1) - 1))}
                      aria-label="Decrease cases"
                      className="flex h-9 w-9 items-center justify-center text-espresso/70 hover:text-rosegold-light"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-10 text-center text-sm font-medium tabular-nums">
                      {caseQty[c.key] ?? 1}
                    </span>
                    <button
                      onClick={() => setCaseQty((prev) => ({ ...prev, [c.key]: (prev[c.key] ?? 1) + 1 }))}
                      aria-label="Increase cases"
                      className="flex h-9 w-9 items-center justify-center text-espresso/70 hover:text-rosegold-light"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      const qty = caseQty[c.key] ?? 1;
                      add(
                        {
                          id: `case-${c.key}`,
                          roastKey: `case-${c.key}`,
                          roastName: c.name,
                          sizeLabel: "10-Pack Case",
                          sizeSub: c.total,
                          price: Number(c.price.replace(/[^\d]/g, "")),
                          mrp: Number(c.mrp.replace(/[^\d]/g, "")),
                          image: "",
                          isCasePack: true,
                          packsPerCase: 10,
                        },
                        qty
                      );
                      setOpen(true);
                      setAdded(c.key);
                      setTimeout(() => setAdded((v) => (v === c.key ? null : v)), 1600);
                    }}
                    className="smallcaps flex-1 rounded-sm bg-gradient-rose px-5 py-3 text-xs font-bold tracking-widest text-espresso shadow-rose transition-transform hover:scale-[1.02]"
                  >
                    {added === c.key ? "Added to Ritual ✓" : "Reserve This Case"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
