import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock3, ExternalLink, ShieldCheck } from "lucide-react";
import { getJournalArticle, journalArticles, type JournalArticle } from "@/lib/journal-data";
import medallion from "@/assets/medallion.png";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const article = getJournalArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Article not found — Baristo.Online" }, { name: "robots", content: "noindex" }] };
    const article = loaderData.article;
    const url = `https://baristo.online/journal/${params.slug}`;
    return {
      meta: [
        { title: `${article.title} | Baristo.Online` },
        { name: "description", content: article.description },
        { name: "keywords", content: article.keywords.join(", ") },
        { property: "og:site_name", content: "Baristo.Online" },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "article:published_time", content: article.published },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: article.title },
        { name: "twitter:description", content: article.description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.description,
            datePublished: article.published,
            dateModified: article.published,
            author: { "@type": "Organization", name: "Baristo.Online" },
            publisher: {
              "@type": "Organization",
              name: "Baristo.Online",
              logo: { "@type": "ImageObject", url: "https://baristo.online/favicon.svg" },
            },
            mainEntityOfPage: url,
            keywords: article.keywords.join(", "),
          }),
        },
      ],
    };
  },
  component: JournalArticlePage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-4 text-center text-espresso">
      <div>
        <p className="smallcaps text-xs text-rosegold-light">Baristo Journal</p>
        <h1 className="mt-3 font-display text-4xl font-semibold">Article not found</h1>
        <Link to="/journal" className="smallcaps mt-6 inline-flex rounded-sm bg-gradient-rose px-5 py-3 text-xs font-bold text-espresso shadow-rose">
          Return to Journal
        </Link>
      </div>
    </div>
  ),
});

function JournalArticlePage() {
  const { article } = Route.useLoaderData() as { article: JournalArticle };
  const other = journalArticles.find((item) => item.slug !== article.slug)!;
  const isTrulyDark = article.product === "Truly Dark";

  return (
    <div className="min-h-screen bg-ivory text-espresso">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-rosegold/15 bg-ivory/92 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link to="/" className="leading-none">
            <span className="font-display text-xl font-semibold">Baristo<span className="text-gradient-rose">.Online</span></span>
            <span className="smallcaps mt-1 block text-[9px] text-rosegold-light">Experience Your Nobility.</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/journal" className="smallcaps hidden text-[10px] font-semibold text-espresso/58 hover:text-rosegold-light sm:inline-flex">Journal</Link>
            <a href="#reserve-product" className="smallcaps rounded-sm bg-gradient-rose px-4 py-2 text-[10px] font-bold text-espresso shadow-rose">Reserve {article.product}</a>
          </div>
        </div>
      </header>

      <main className="pt-16">
        <article>
          <header className={`relative overflow-hidden border-b border-rosegold/15 py-16 sm:py-24 ${isTrulyDark ? "bg-obsidian text-ivory" : "bg-gradient-ivory"}`}>
            <div className="absolute -right-20 top-8 h-64 w-64 rounded-full bg-rosegold/15 blur-3xl" />
            <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_.38fr] lg:items-center">
              <div>
                <Link to="/journal" className={`smallcaps inline-flex items-center gap-2 text-[10px] ${isTrulyDark ? "text-ivory/45" : "text-espresso/45"}`}>
                  <ArrowLeft className="h-3 w-3" /> Baristo Journal
                </Link>
                <p className="smallcaps mt-7 text-xs text-rosegold-light">{article.eyebrow}</p>
                <h1 className="mt-4 max-w-5xl font-display text-5xl font-semibold leading-[.98] sm:text-7xl">{article.title}</h1>
                <p className={`mt-7 max-w-4xl text-base leading-8 sm:text-lg ${isTrulyDark ? "text-ivory/62" : "text-espresso/62"}`}>{article.subtitle}</p>
                <div className={`mt-7 flex flex-wrap gap-4 text-xs ${isTrulyDark ? "text-ivory/42" : "text-espresso/42"}`}>
                  <span className="flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" /> {article.readingTime}</span>
                  <span>Published {article.published}</span>
                  <span>{article.product} · 12 oz / 340 g</span>
                </div>
              </div>
              <div className="relative mx-auto hidden w-full max-w-[280px] lg:block">
                <div className="absolute inset-8 rounded-full bg-rosegold/25 blur-3xl" />
                <img src={medallion} alt="Baristo.Online medallion" className="relative w-full rounded-full border border-rosegold/25 shadow-luxe" />
              </div>
            </div>
          </header>

          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-24 xl:grid-cols-[minmax(0,1fr)_280px]">
            <div className="mx-auto w-full max-w-3xl">
              <div className="space-y-6 font-display text-2xl leading-10 text-espresso/82 sm:text-[1.7rem] sm:leading-[1.6]">
                {article.opening.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>

              <div className="mt-14 space-y-14">
                {article.sections.map((section) => (
                  <section key={section.heading} className="scroll-mt-24">
                    <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">{section.heading}</h2>
                    <div className="mt-5 space-y-5 text-sm leading-8 text-espresso/68 sm:text-[15px]">
                      {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                    {section.bullets && (
                      <ul className="mt-6 space-y-3 rounded-2xl border border-rosegold/15 bg-white/65 p-5 sm:p-6">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3 text-sm leading-7 text-espresso/64">
                            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rosegold" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.callout && (
                      <blockquote className="mt-7 border-l-2 border-rosegold pl-5 font-display text-2xl italic leading-9 text-rosegold sm:text-3xl">
                        {section.callout}
                      </blockquote>
                    )}
                  </section>
                ))}
              </div>

              <section className="mt-16 border-t border-rosegold/18 pt-10">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-rosegold-light" />
                  <div>
                    <p className="smallcaps text-xs text-rosegold-light">Research & category references</p>
                    <p className="mt-2 text-xs leading-6 text-espresso/48">
                      External references provide market, caffeine or regulatory context. They do not convert general caffeine evidence into a product-specific medical or cognitive-performance claim.
                    </p>
                  </div>
                </div>
                <div className="mt-6 grid gap-3">
                  {article.sources.map((source) => (
                    <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="group rounded-xl border border-rosegold/14 bg-white/65 p-4 transition hover:border-rosegold/45">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-espresso group-hover:text-rosegold">{source.label}</p>
                          <p className="mt-1 text-xs leading-5 text-espresso/45">{source.note}</p>
                        </div>
                        <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-rosegold-light" />
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            </div>

            <aside className="hidden xl:block">
              <div className="sticky top-24 space-y-4">
                <div className="rounded-2xl border border-rosegold/18 bg-white/70 p-5 shadow-card-luxe">
                  <p className="smallcaps text-[10px] text-rosegold-light">Article map</p>
                  <nav className="mt-4 space-y-2">
                    {article.sections.map((section) => (
                      <p key={section.heading} className="text-[11px] leading-5 text-espresso/52">{section.heading}</p>
                    ))}
                  </nav>
                </div>
                <div className={`rounded-2xl border border-rosegold/18 p-5 ${isTrulyDark ? "bg-obsidian text-ivory" : "bg-champagne/40"}`}>
                  <p className="smallcaps text-[10px] text-rosegold-light">The product</p>
                  <p className="mt-2 font-display text-2xl font-semibold">{article.product}</p>
                  <p className={`mt-3 text-xs leading-6 ${isTrulyDark ? "text-ivory/55" : "text-espresso/55"}`}>12 oz / 340 g · 100% single-origin Indian Arabica · premium ground roasted coffee.</p>
                  <a href="#reserve-product" className="smallcaps mt-5 inline-flex w-full items-center justify-center rounded-sm bg-gradient-rose px-4 py-3 text-[10px] font-bold text-espresso shadow-rose">Reserve {article.product}</a>
                </div>
              </div>
            </aside>
          </div>

          <section id="reserve-product" className="bg-obsidian py-20 text-center text-ivory sm:py-24">
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
              <p className="smallcaps text-xs text-rosegold-light">Private Reservation</p>
              <h2 className="mt-4 font-display text-4xl font-semibold sm:text-6xl">You have read the argument. Now choose the cup.</h2>
              <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-ivory/58">A reservation records purchase intent. Baristo verifies availability and delivery before sending a secure payment link.</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a href="#reserve-product" className="smallcaps inline-flex items-center justify-center gap-2 rounded-sm bg-gradient-rose px-7 py-3 text-xs font-bold text-espresso shadow-rose">Reserve {article.product} <ArrowRight className="h-4 w-4" /></a>
                <a href="#first-pour" className="smallcaps inline-flex items-center justify-center gap-2 rounded-sm border border-rosegold/30 px-7 py-3 text-xs font-bold text-ivory">Join the First Pour</a>
              </div>
            </div>
          </section>

          <section className="bg-gradient-ivory py-16 sm:py-20">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <p className="smallcaps text-xs text-rosegold-light">Read the other side of the roast ladder</p>
              <Link to="/journal/$slug" params={{ slug: other.slug }} className="group mt-4 block rounded-2xl border border-rosegold/18 bg-white/70 p-6 shadow-card-luxe sm:p-8">
                <p className="smallcaps text-[10px] text-rosegold-light">{other.product}</p>
                <h2 className="mt-2 font-display text-3xl font-semibold group-hover:text-rosegold sm:text-4xl">{other.title}</h2>
                <p className="mt-4 text-sm leading-7 text-espresso/55">{other.subtitle}</p>
                <span className="smallcaps mt-5 inline-flex items-center gap-2 text-[10px] font-bold text-rosegold-light">Read next <ArrowRight className="h-4 w-4" /></span>
              </Link>
            </div>
          </section>
        </article>
      </main>

      <footer className="border-t border-rosegold/15 bg-ivory py-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-4 sm:px-6 md:flex-row md:items-end">
          <div>
            <p className="font-display text-2xl font-semibold">Baristo.Online</p>
            <p className="smallcaps mt-2 text-[10px] text-rosegold-light">For Expresso Noble Minds.</p>
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
