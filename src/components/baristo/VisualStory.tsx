import nobleRitual from "@/assets/noble-ritual.jpg";
import ritualFlatlay from "@/assets/ritual-flatlay.jpg";
import beansMacro from "@/assets/beans-macro.jpg";
import medallionAsset from "@/assets/baristo-logo.png.asset.json";

const medallion = medallionAsset.url;

const cards = [
  {
    img: nobleRitual,
    tag: "The Altitude",
    title: "Sourced from the peaks",
    body: "Single-origin Arabica hand-picked at high Indian altitudes where slow ripening concentrates sweetness and clarity.",
  },
  {
    img: beansMacro,
    tag: "The Roast",
    title: "Roasted gracefully",
    body: "Small-batch profile roasting engineered for cognitive sharpness — never bitter, always brilliant.",
  },
  {
    img: ritualFlatlay,
    tag: "The Ritual",
    title: "For elite attitudes",
    body: "Noble minds aspiring to peak performance — every pour is a signature of taste, discipline and craft.",
  },
];

export function VisualStory() {
  return (
    <section className="relative overflow-hidden bg-gradient-ivory py-20 sm:py-28">
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-rosegold/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-champagne/60 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <img
            src={medallion}
            alt="Baristo.Online medallion"
            width={140}
            height={140}
            className="mx-auto h-20 w-20 rounded-full drop-shadow-[0_8px_24px_rgba(183,112,84,0.45)] sm:h-24 sm:w-24"
            loading="lazy"
          />
          <p className="smallcaps mt-6 text-xs text-rosegold">The Noble Standard</p>
          <h2 className="hairline hairline-center mt-3 font-display text-4xl font-semibold text-espresso sm:text-5xl">
            Elite by nature.
            <span className="text-gradient-rose"> Roasted for perfection.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-espresso/75 sm:text-lg">
            Every pouch carries the same promise — single-origin Arabica from high altitudes, gracefully roasted, and evidence at every step. Made for Noble minds with Elite attitudes chasing peak performance and cognitive sharpness.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <article
              key={c.title}
              className="group relative overflow-hidden rounded-3xl border border-rosegold/25 bg-white/70 shadow-card-luxe backdrop-blur transition-transform hover:-translate-y-1"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={c.img}
                  alt={c.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/10 to-transparent" />
                <img
                  src={medallion}
                  alt=""
                  aria-hidden
                  className="absolute top-4 right-4 h-14 w-14 rounded-full opacity-90 drop-shadow-[0_4px_14px_rgba(183,112,84,0.55)]"
                />
              </div>
              <div className="relative p-6">
                <p className="smallcaps text-[11px] text-rosegold">{c.tag}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-espresso">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-espresso/75">{c.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
