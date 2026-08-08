import { Coffee, Flame, Gauge, Timer } from "lucide-react";
import { roastScience, type RoastScienceKey } from "@/lib/roast-science";

export function BrewingScienceSection() {
  return (
    <section id="brewing-intelligence" className="bg-gradient-ivory py-20 text-espresso sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="smallcaps text-xs text-rosegold-light">Ritual Lab · Brewing Intelligence</p>
            <h2 className="mt-4 font-display text-4xl font-semibold sm:text-6xl">Extract the architecture, not just strength.</h2>
            <p className="mt-6 text-sm leading-8 text-espresso/62">Grind, water temperature, beverage ratio, contact time and agitation control how quickly soluble material leaves roasted coffee. Darker roasting can extract more readily, so a stronger-tasting cup is not automatically improved by grinding finer or brewing longer.</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {[[Gauge,"Ratio","Control coffee-to-water or beverage yield before changing several variables at once."],[Timer,"Contact time","Longer is not always better; stop when sweetness and body are being replaced by harshness."],[Flame,"Temperature","Use brew temperature as a tuning variable, especially for darker roasts that can release bitter compounds readily."],[Coffee,"Method","Espresso, moka, South Indian filter, AeroPress and French press each expose a different part of the roast architecture."]].map(([Icon,title,copy]) => { const I=Icon as typeof Gauge; return <div key={String(title)} className="rounded-xl border border-rosegold/18 bg-white/70 p-4"><I className="h-5 w-5 text-rosegold-light"/><p className="mt-3 text-sm font-semibold">{String(title)}</p><p className="mt-2 text-[11px] leading-5 text-espresso/50">{String(copy)}</p></div>; })}
            </div>
          </div>
          <div className="grid gap-5 xl:grid-cols-2">
            {(["noble-dark","truly-dark"] as RoastScienceKey[]).map((key) => {
              const roast=roastScience[key]; const dark=key==="truly-dark";
              return <article key={key} className={`rounded-2xl border border-rosegold/18 p-6 ${dark?"bg-obsidian text-ivory":"bg-white/75"}`}><p className="smallcaps text-[10px] text-rosegold-light">{roast.name}</p><h3 className="mt-2 font-display text-3xl font-semibold">Brewing matrix</h3><div className="mt-5 space-y-4">{roast.brew.map((item)=><div key={item.method} className="border-t border-rosegold/12 pt-4 first:border-t-0 first:pt-0"><div className="flex items-center justify-between gap-3"><p className="text-sm font-semibold">{item.method}</p><span className="smallcaps text-[9px] text-rosegold-light">{item.grind}</span></div><p className={`mt-2 text-[11px] leading-5 ${dark?"text-ivory/52":"text-espresso/52"}`}>{item.startingPoint}</p></div>)}</div></article>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
