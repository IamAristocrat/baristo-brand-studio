import { roastStages } from "@/lib/evidence-data";
import g7 from "@/assets/gallery/g7-extraction.jpg";
import g4 from "@/assets/gallery/g4-beans.jpg";

export function RoastingHub() {
  return (
    <section id="roasting-hub" className="relative overflow-hidden bg-background py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(var(--rosegold)/0.10),_transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <p className="smallcaps text-center text-xs text-primary">The Roasting Hub</p>
        <h2 className="hairline hairline-center mt-3 text-center font-display text-4xl font-semibold sm:text-5xl">
          Roasted for Perfection, Step by Step
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-muted-foreground">
          Seven controlled stages stand between a green lot and a sealed pouch of premium ground
          coffee. Each one is logged, dated and available in the roast record.
        </p>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <ol className="relative space-y-4 border-l border-rosegold/25 pl-6">
            {roastStages.map((s) => (
              <li key={s.step} className="relative">
                <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full bg-gradient-rose text-[9px] font-bold text-espresso shadow-rose">
                  {s.step}
                </span>
                <div className="rounded-lg border border-rosegold/20 bg-white/55 p-5 shadow-card-luxe backdrop-blur-xl transition-all hover:border-rosegold/60 hover:shadow-luxe">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold text-espresso">{s.title}</h3>
                    <span className="smallcaps rounded-full border border-champagne bg-ivory/70 px-2.5 py-1 text-[9px] text-primary">
                      {s.metric}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-espresso/70">{s.detail}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="space-y-6">
            <figure className="overflow-hidden rounded-xl border border-rosegold/25 shadow-card-luxe">
              <img
                src={g4}
                alt="Premium ground coffee beans from a single-origin high-altitude Indian Arabica lot"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </figure>
            <figure className="overflow-hidden rounded-xl border border-rosegold/25 shadow-card-luxe">
              <img
                src={g7}
                alt="Espresso extraction from freshly roasted premium ground coffee"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </figure>
            <div className="rounded-xl border border-rosegold/30 bg-white/60 p-6 shadow-card-luxe backdrop-blur-xl">
              <p className="smallcaps text-[10px] text-primary">Printed on every pouch</p>
              <dl className="mt-3 space-y-2 text-sm">
                {[
                  ["Batch code", "Traces the lot and roast session"],
                  ["Roast date", "The day the batch was dropped"],
                  ["Packed date", "The day it was ground and sealed"],
                  ["Best before", "Freshness window from packing"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-champagne/60 pb-2 last:border-0">
                    <dt className="font-medium text-espresso">{k}</dt>
                    <dd className="text-right text-xs text-espresso/65">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
