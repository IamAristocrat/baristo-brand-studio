import { useState } from "react";
import { Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/evidence-data";

const tabs = ["All", "Dark Roast", "Truly Dark Roast"] as const;

export function Testimonials() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const list = testimonials.filter((t) => tab === "All" || t.roast === tab);

  return (
    <section id="testimonials" className="relative overflow-hidden bg-gradient-ivory py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--rosegold)/0.10),_transparent_65%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <p className="smallcaps text-center text-xs text-primary">Expresso Noble Minds</p>
        <h2 className="hairline hairline-center mt-3 text-center font-display text-4xl font-semibold sm:text-5xl">
          Voices From the Ritual
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-muted-foreground">
          Architects, analysts, surgeons and researchers across India — on what a single pouch of
          premium ground coffee changed about their morning.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`smallcaps rounded-full border px-4 py-2 text-[10px] tracking-widest transition-all ${
                tab === t
                  ? "border-rosegold bg-gradient-rose text-espresso shadow-rose"
                  : "border-champagne bg-card text-espresso/70 hover:border-rosegold/60"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {list.map((t) => (
            <figure
              key={t.name}
              className="break-inside-avoid rounded-xl border border-rosegold/25 bg-white/55 p-6 shadow-card-luxe backdrop-blur-xl transition-all hover:border-rosegold/60 hover:shadow-luxe"
            >
              <div className="flex items-center justify-between">
                <Quote className="h-5 w-5 text-rosegold" strokeWidth={1.6} />
                <div className="flex gap-0.5" aria-label="5 out of 5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-rosegold text-rosegold" />
                  ))}
                </div>
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-espresso/80">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-champagne/60 pt-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-rose font-display text-xs font-semibold text-espresso shadow-rose">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-display text-sm font-semibold text-espresso">
                    {t.name}
                  </span>
                  <span className="block truncate text-[11px] text-muted-foreground">
                    {t.role} · {t.city}
                  </span>
                </span>
                <span className="smallcaps ml-auto shrink-0 rounded-full border border-champagne bg-ivory/70 px-2 py-1 text-[9px] text-primary">
                  {t.roast === "Dark Roast" ? "Dark" : "Truly Dark"}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-[11px] leading-relaxed text-muted-foreground">
          Testimonials describe personal ritual and sensory experience only — not intended to
          diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </section>
  );
}
