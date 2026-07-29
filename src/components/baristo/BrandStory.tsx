import { Link } from "@tanstack/react-router";
import nobleRitual from "@/assets/noble-ritual.jpg";
import beansMacro from "@/assets/beans-macro.jpg";
import medallion from "@/assets/medallion.png";

const chapters = [
  {
    no: "I",
    tag: "Why We Exist",
    title: "A cup built for espresso-minded people",
    body: "Baristo.Online began with a narrow, unfashionable conviction: most premium coffee is sold on scenery, not on structure. We wanted the opposite — a roast engineered for people who taste with intent, who pull a shot the same way they run a decision. No novelty. No noise. Two roasts, both dark, both accountable.",
  },
  {
    no: "II",
    tag: "Sourcing Principle",
    title: "Altitude first, always single-origin",
    body: "We buy only single-origin Indian Arabica grown high enough that the cherry ripens slowly. Slow ripening is what concentrates sugar and clarity — it is the one variable no roaster can fake later. Lots are cupped blind before purchase, and anything that scores below our internal floor is passed over, however good the story behind it.",
  },
  {
    no: "III",
    tag: "The Craft",
    title: "Roasted dark without roasting away the origin",
    body: "Dark roasting is where most coffee loses its identity. Our profiles are built in small batches with a long, controlled development phase and a deliberately short finish — enough time to build cacao, caramel, and body, not enough to flatten the bean into carbon. Every batch is logged, tasted against the reference curve, and rejected if it drifts.",
  },
  {
    no: "IV",
    tag: "Proof, Not Adjectives",
    title: "Traceable from lot to pour",
    body: "Each pouch carries a batch code and a documented record behind it: origin tier, process, roast profile, roast date, brewing guidance, and available testing documentation. If a claim cannot be evidenced on the pack, we do not print it. Purity is a standing policy — 100% roasted Arabica, no chicory, no fillers, no artificial flavour.",
  },
  {
    no: "V",
    tag: "Freshness Discipline",
    title: "Roast-to-dispatch, not roast-to-warehouse",
    body: "We roast against demand rather than stockpiling. Coffee is degassed, then sealed into a recyclable flat-bottom pouch with a one-way valve and a tear-off zipper, so the pack you open still behaves like a fresh batch on the twentieth pour, not just the first.",
  },
  {
    no: "VI",
    tag: "Who It's For",
    title: "Noble minds. Elite attitudes.",
    body: "This is not a coffee for everyone, and it was never priced to be. It is for the founder before a decisive morning, the operator mid-sprint, the home barista who owns a scale and uses it. If the ritual matters to you as much as the caffeine, you are exactly who we roast for.",
  },
];

const milestones = [
  { label: "Cupped before purchase", value: "Every lot" },
  { label: "Batch size ceiling", value: "Small-batch" },
  { label: "Roast records kept", value: "100%" },
  { label: "Roasts in the range", value: "Two" },
];

export function BrandStory() {
  return (
    <section id="story" className="relative overflow-hidden bg-ivory py-20 text-espresso sm:py-28">
      <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-rosegold/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-24 h-80 w-80 rounded-full bg-champagne/60 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <img
            src={medallion}
            alt="Baristo.Online medallion"
            width={1024}
            height={1024}
            loading="lazy"
            className="mx-auto h-16 w-16 opacity-90 drop-shadow-[0_8px_24px_rgba(183,112,84,0.35)]"
          />
          <p className="smallcaps mt-6 text-xs text-rosegold">The Brand Story</p>
          <h2 className="hairline hairline-center mt-3 font-display text-4xl font-semibold sm:text-5xl">
            Built dark. Built deliberate.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-espresso/70 sm:text-base">
            Six chapters on how Baristo.Online is sourced, roasted, evidenced and packed — written
            for people who read the spec before they read the label.
          </p>
        </div>

        {/* Editorial split */}
        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <figure className="relative overflow-hidden rounded-3xl border border-rosegold/25 shadow-card-luxe lg:col-span-2">
            <img
              src={nobleRitual}
              alt="A dark Baristo roast poured as part of a morning ritual"
              loading="lazy"
              className="h-full min-h-72 w-full object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ivory via-ivory/70 to-transparent p-6">
              <p className="smallcaps text-[10px] text-rosegold">The Standard</p>
              <p className="mt-1 font-display text-xl font-semibold">
                If it cannot be evidenced, it does not ship.
              </p>
            </figcaption>
          </figure>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-3">
            {chapters.slice(0, 4).map((c) => (
              <article
                key={c.no}
                className="rounded-2xl border border-rosegold/20 bg-white/70 p-6 shadow-card-luxe backdrop-blur transition-colors hover:border-rosegold/50"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-2xl text-rosegold/70">{c.no}</span>
                  <p className="smallcaps text-[10px] text-rosegold">{c.tag}</p>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-espresso/75">{c.body}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Closing chapters */}
        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          {chapters.slice(4).map((c) => (
            <article
              key={c.no}
              className="rounded-2xl border border-rosegold/20 bg-white/70 p-6 shadow-card-luxe backdrop-blur lg:col-span-2 lg:first:col-span-3"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display text-2xl text-rosegold/70">{c.no}</span>
                <p className="smallcaps text-[10px] text-rosegold">{c.tag}</p>
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-espresso/75">{c.body}</p>
            </article>
          ))}
        </div>

        {/* Standards strip */}
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-rosegold/25 bg-rosegold/20 sm:grid-cols-4">
          {milestones.map((m) => (
            <div key={m.label} className="bg-champagne/40 px-5 py-6 text-center">
              <p className="font-display text-2xl font-semibold text-espresso">{m.value}</p>
              <p className="smallcaps mt-1 text-[10px] text-rosegold">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Signature */}
        <div className="mt-10 grid items-center gap-6 rounded-3xl border border-rosegold/25 bg-gradient-to-r from-champagne/60 to-ivory p-8 sm:p-10 lg:grid-cols-3">
          <img
            src={beansMacro}
            alt="Macro view of dark-roasted single-origin Arabica beans"
            loading="lazy"
            className="h-40 w-full rounded-2xl object-cover lg:h-full"
          />
          <div className="lg:col-span-2">
            <p className="smallcaps text-[10px] text-rosegold">The Promise</p>
            <p className="mt-3 font-display text-2xl leading-snug font-semibold sm:text-3xl">
              Two roasts. One standard. Nothing on the pack we cannot show you the record for.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/roasts/$roastKey"
                params={{ roastKey: "dark" }}
                className="smallcaps rounded-sm bg-gradient-rose px-6 py-3 text-[11px] font-bold tracking-widest text-espresso shadow-rose transition-transform hover:scale-[1.03]"
              >
                Explore Dark Roast
              </Link>
              <Link
                to="/roasts/$roastKey"
                params={{ roastKey: "truly-dark" }}
                className="smallcaps rounded-sm border border-rosegold/60 px-6 py-3 text-[11px] font-bold tracking-widest text-rosegold-light transition-colors hover:bg-rosegold/15 hover:text-espresso"
              >
                Explore Truly Dark
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
