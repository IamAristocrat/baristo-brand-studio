import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, BookOpen, Clock3 } from "lucide-react";
import { journalArticles } from "@/lib/journal-data";

function JournalPreview() {
  return (
    <section id="journal-preview" className="relative overflow-hidden bg-obsidian py-20 text-ivory sm:py-28">
      <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-rosegold/14 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-champagne/8 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
          <div>
            <p className="smallcaps text-xs text-rosegold-light">The Baristo Journal</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[.98] sm:text-6xl">Read the roast before you reserve it.</h2>
            <p className="mt-6 max-w-xl text-sm leading-8 text-ivory/58">
              Detailed product intelligence for buyers who want more than tasting-note adjectives: sensory architecture, who each roast is for, home brewing, Indian premium-coffee context, caffeine evidence and the complete Baristo ritual logic.
            </p>
            <a href="/journal" className="smallcaps mt-7 inline-flex items-center gap-2 text-[11px] font-bold text-rosegold-light hover:text-ivory">
              Open the Baristo Journal <BookOpen className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {journalArticles.map((article) => (
              <a key={article.slug} href={`/journal/${article.slug}`} className="premium-glass-dark premium-shine-card group rounded-2xl border border-rosegold/18 p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <p className="smallcaps text-[10px] text-rosegold-light">{article.product}</p>
                  <span className="flex items-center gap-1 text-[10px] text-ivory/34"><Clock3 className="h-3 w-3" /> {article.readingTime}</span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-ivory sm:text-3xl">{article.title}</h3>
                <p className="mt-4 line-clamp-4 text-xs leading-6 text-ivory/52">{article.subtitle}</p>
                <span className="smallcaps mt-6 inline-flex items-center gap-2 text-[10px] font-bold text-rosegold-light group-hover:text-ivory">
                  Read full guide <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function JournalPortal() {
  const [mount, setMount] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;

    const place = () => {
      if (cancelled) return;
      const ritualEnhancement = document.querySelector<HTMLElement>('[data-baristo-enhancement="ritual-library"]');
      const ritualLab = document.getElementById("ritual-lab");
      const anchor = ritualEnhancement || ritualLab;

      if (anchor) {
        const node = document.createElement("div");
        node.dataset.baristoEnhancement = "journal";
        anchor.insertAdjacentElement("afterend", node);
        setMount(node);
        return;
      }

      attempts += 1;
      if (attempts < 40) window.setTimeout(place, 50);
    };

    place();
    return () => {
      cancelled = true;
      setMount((node) => {
        node?.remove();
        return null;
      });
    };
  }, []);

  return mount ? createPortal(<JournalPreview />, mount) : null;
}
