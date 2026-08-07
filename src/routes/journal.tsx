import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Brain, Clock3, Mountain, Sparkles } from "lucide-react";
import { journalArticles } from "@/lib/journal-data";
import medallion from "@/assets/medallion.png";
import beansMacro from "@/assets/beans-macro.jpg";
import espressoExtraction from "@/assets/gallery/g7-extraction.jpg";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Baristo Journal — Noble Dark, Truly Dark & Espresso-Minded Coffee Intelligence" },
      {
        name: "description",
        content:
          "Long-form Baristo.Online guides to Noble Dark and Truly Dark: Indian Arabica, dark-roast sensory architecture, home espresso ritual, caffeine evidence and premium coffee culture in India.",
      },
      { property: "og:title", content: "Baristo Journal — Coffee Intelligence for Espresso-Minded Homes" },
      {
        property: "og:description",
        content: "Deep product guides to Baristo.Online Noble Dark and Truly Dark, written for India's premium home-coffee culture.",
      },
      { property: "og:url", content: "https://baristo.online/journal" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://baristo.online/journal" }],
  }),
  component: JournalIndex,
});

function JournalNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rosegold/15 bg-ivory/92 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="leading-none">
          <span className="font-display text-xl font-semibold text-espresso">
            Baristo<span className="text-gradient-rose">.Online</span>
          </span>
          <span className="smallcaps mt-1 block text-[9px] text-rosegold-light">Be Noble</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/" className="smallcaps hidden text-[10px] font-semibold text-espresso/60 hover:text-rosegold-light sm:inline-flex">
            Home
          </Link>
          <a href="#journal-articles" className="smallcaps hidden text-[10px] font-semibold text-espresso/60 hover:text-rosegold-light md:inline-flex">
            Product Essays
          </a>
          <a href="#first-pour" className="smallcaps rounded-sm bg-gradient-rose px-4 py-2 text-[10px] font-bold text-espresso shadow-rose">
            Join First Pour
          </a>
        </div>
      </div>
    </header>
  );
}

function JournalIndex() {
  return (
    <div className="min-h-screen bg-ivory text-espresso">
      <JournalNav />
      <main className="pt-16">
        <section className="relative overflow-hidden border-b border-rosegold/15 bg-obsidian py-20 text-ivory sm:py-28">
          <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-rosegold/15 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-champagne/10 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_.72fr] lg:items-center">
            <div>
              <p className="smallcaps text-xs text-rosegold-light">The Baristo Journal</p>
              <h1 className="mt-5 max-w-5xl font-display text-5xl font-semibold leading-[0.94] sm:text-7xl">
                Coffee intelligence for <span className="text-gradient-rose">espresso-minded homes.</span>
              </h1>
              <p className="mt-7 max-w-3xl text-sm leading-8 text-ivory/62 sm:text-base">
                Long-form product intelligence on Indian Arabica, dark-roast design, brewing, ritual, caffeine evidence and the premium-coffee culture Baristo is built to serve. No generic lifestyle filler. No fictional science.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="ritual-chip border-rosegold/25 bg-white/[0.04] text-ivory"><Mountain className="h-3.5 w-3.5" /> Indian origin</span>
                <span className="ritual-chip border-rosegold/25 bg-white/[0.04] text-ivory"><Brain className="h-3.5 w-3.5" /> Evidence-aware cognition</span>
                <span className="ritual-chip border-rosegold/25 bg-white/[0.04] text-ivory"><BookOpen className="h-3.5 w-3.5" /> Product education</span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute inset-8 rounded-full bg-rosegold/20 blur-3xl" />
              <img src={medallion} alt="Baristo.Online medallion" className="relative w-full rounded-full border border-rosegold/25 shadow-luxe" />
            </div>
          </div>
        </section>

        <section id="journal-articles" className="bg-gradient-ivory py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="smallcaps text-xs text-rosegold-light">The Two Product Essays</p>
              <h2 className="mt-4 font-display text-4xl font-semibold sm:text-6xl">One origin. Two deliberate depths. Two different buyers.</h2>
              <p className="mt-6 text-sm leading-8 text-espresso/60">
                These essays are designed to help a serious buyer understand the difference before reserving: flavour, preparation, use case, cognitive context, recipe compatibility and the reason each roast exists.
              </p>
            </div>

            <div className="mt-14 grid gap-7 lg:grid-cols-2">
              {journalArticles.map((article, index) => {
                const image = index === 0 ? beansMacro : espressoExtraction;
                const dark = article.product === "Truly Dark";
                return (
                  <article key={article.slug} className={`group overflow-hidden rounded-3xl border border-rosegold/20 shadow-luxe ${dark ? "bg-obsidian text-ivory" : "bg-white/80"}`}>
                    <div className="relative overflow-hidden">
                      <img src={image} alt={`${article.product} Baristo journal`} className="aspect-[16/9] w-full object-cover transition duration-700 group-hover:scale-[1.025]" />
                      <div className={`absolute inset-0 bg-gradient-to-t ${dark ? "from-obsidian via-obsidian/30" : "from-espresso/75 via-transparent"} to-transparent`} />
                      <div className="absolute inset-x-6 bottom-5 flex items-center justify-between gap-3 text-ivory">
                        <span className="smallcaps text-[10px]">{article.product}</span>
                        <span className="flex items-center gap-1 text-[10px] opacity-70"><Clock3 className="h-3 w-3" /> {article.readingTime}</span>
                      </div>
                    </div>
                    <div className="p-6 sm:p-8">
                      <p className="smallcaps text-[10px] text-rosegold-light">{article.eyebrow}</p>
                      <h3 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">{article.title}</h3>
                      <p className={`mt-4 text-sm leading-7 ${dark ? "text-ivory/58" : "text-espresso/60"}`}>{article.subtitle}</p>
                      <Link
                        to="/journal/$slug"
                        params={{ slug: article.slug }}
                        className="smallcaps mt-7 inline-flex items-center gap-2 text-[11px] font-bold text-rosegold-light hover:text-espresso"
                      >
                        Read the full product guide <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-rosegold/15 bg-ivory py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
            <div>
              <p className="smallcaps text-xs text-rosegold-light">Editorial Principle</p>
              <h2 className="mt-3 font-display text-4xl font-semibold">Evidence is part of the luxury.</h2>
            </div>
            <div className="premium-glass rounded-2xl border border-rosegold/18 p-6 sm:p-8">
              <p className="text-sm leading-8 text-espresso/62">
                Baristo distinguishes sensory product claims from scientific context. Caffeine research can inform a discussion of alertness and attention, but the Journal does not convert those findings into guaranteed Baristo-specific cognitive outcomes. Origin, roast, purity and sensory statements remain product claims; cognition remains educational context.
              </p>
            </div>
          </div>
        </section>

        <section id="first-pour" className="bg-obsidian py-20 text-center text-ivory sm:py-28">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <Sparkles className="mx-auto h-7 w-7 text-rosegold-light" />
            <p className="smallcaps mt-5 text-xs text-rosegold-light">The First Pour Circle</p>
            <h2 className="mt-4 font-display text-4xl font-semibold sm:text-6xl">Read first. Taste next.</h2>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-ivory/58">
              Join for launch access, roast intelligence, private tasting invitations and Baristo product updates. Joining the circle is not a reservation or confirmed order.
            </p>
            <a href="#first-pour" className="smallcaps mt-9 inline-flex items-center justify-center gap-2 rounded-sm bg-gradient-rose px-7 py-3 text-xs font-bold text-espresso shadow-rose">
              Join the First Pour <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-rosegold/15 bg-ivory py-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-end">
          <div>
            <p className="font-display text-2xl font-semibold">Baristo.Online</p>
            <p className="smallcaps mt-2 text-[10px] text-rosegold-light">Born at altitude. Roasted for ascent.</p>
          </div>
          <div className="text-xs leading-6 text-espresso/45 md:text-right">
            <p>support@baristo.online</p>
            <p>Educational content only; not intended to diagnose, treat, cure or prevent disease.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
