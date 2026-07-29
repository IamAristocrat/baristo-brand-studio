import g1 from "@/assets/gallery/g1-espresso-glass.jpg";
import g2 from "@/assets/gallery/g2-altitude.jpg";
import g3 from "@/assets/gallery/g3-focus.jpg";
import g4 from "@/assets/gallery/g4-beans.jpg";
import g5 from "@/assets/gallery/g5-clarity.jpg";
import g6 from "@/assets/gallery/g6-vitality.jpg";
import g7 from "@/assets/gallery/g7-extraction.jpg";
import g8 from "@/assets/gallery/g8-ritual-tools.jpg";
import g9 from "@/assets/gallery/g9-cognition.jpg";
import g10 from "@/assets/gallery/g10-ritual-social.jpg";

const frames = [
  { src: g1, title: "The Elevated Shot", body: "A single espresso, poured with intent — the smallest ritual with the largest return on focus." },
  { src: g2, title: "Altitude First", body: "High-altitude Arabica matures slower, concentrating sweetness and structure in the bean." },
  { src: g3, title: "Composed Attention", body: "A measured cup steadies the morning — calm alertness instead of scattered energy." },
  { src: g4, title: "Purity in the Bean", body: "100% roasted Arabica. No chicory, no fillers, no artificial flavour — ever." },
  { src: g5, title: "Clarity at the Desk", body: "Espresso-minded people use coffee as an instrument, not a habit." },
  { src: g6, title: "Vitality Before Effort", body: "A short black, taken before training, is the oldest performance ritual there is." },
  { src: g7, title: "Extraction Discipline", body: "Grind, dose, time — precision is what separates a shot from a pour." },
  { src: g8, title: "Instruments of Ritual", body: "Moka pot, pour-over, press or machine — one roast ladder, many rituals." },
  { src: g9, title: "Cognitive Sharpness", body: "Antioxidant-rich, low-intervention coffee for minds that trade in attention." },
  { src: g10, title: "Shared Altitude", body: "The noble cup is social — poured slowly, discussed properly." },
];

export function BenefitGallery() {
  return (
    <section id="gallery" className="relative overflow-hidden bg-gradient-ivory py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--rosegold)/0.10),_transparent_65%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <p className="smallcaps text-center text-xs text-primary">Elevated Rituals</p>
        <h2 className="hairline hairline-center mt-3 text-center font-display text-4xl font-semibold sm:text-5xl">
          Altitude, Focus &amp; the Espresso Life
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-muted-foreground">
          Ten frames on why espresso-minded people choose Baristo — altitude, clarity, vitality and
          the quiet discipline of a well-made cup.
        </p>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {frames.map((f, i) => (
            <figure
              key={f.title}
              className={`group relative overflow-hidden rounded-xl border border-rosegold/25 bg-white/40 shadow-card-luxe backdrop-blur-xl transition-all hover:border-rosegold/60 hover:shadow-luxe ${
                i === 0 || i === 5 ? "lg:col-span-2" : ""
              }`}
            >
              <div className={`overflow-hidden ${i === 0 || i === 5 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                <img
                  src={f.src}
                  alt={`${f.title} — Baristo.Online premium ground coffee ritual`}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <figcaption className="border-t border-rosegold/15 bg-white/55 p-5 backdrop-blur-md">
                <h3 className="font-display text-lg font-semibold text-espresso">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-espresso/70">{f.body}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-[11px] leading-relaxed text-muted-foreground">
          Lifestyle and sensory language only — not intended to diagnose, treat, cure, or prevent any
          disease.
        </p>
      </div>
    </section>
  );
}
