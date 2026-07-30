import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import beansMacro from "@/assets/beans-macro.jpg";

const title = "Our Story — Sovereign Indian Dark Roast | Baristo.Online";
const description =
  "Baristo.Online crafts single-origin Indian Arabica into Noble Dark and Truly Dark: two deliberate dark-roast profiles for private home coffee rituals.";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "https://baristo.online/story" }],
  }),
  component: StoryPage,
});

function StoryPage() {
  return (
    <main className="min-h-screen bg-ivory px-4 py-14 text-espresso sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Link to="/" hash="story" className="smallcaps inline-flex items-center gap-2 text-xs text-rosegold-light">
          <ArrowLeft className="h-4 w-4" /> Back to Baristo.Online
        </Link>
        <div className="mt-12 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <img src={beansMacro} alt="Roasted Indian Arabica beans" className="aspect-[4/5] w-full rounded-2xl object-cover shadow-luxe" />
          <article>
            <p className="smallcaps text-xs text-rosegold-light">Sovereign Indian Altitude</p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-tight sm:text-7xl">
              India does not imitate coffee luxury. It grows it.
            </h1>
            <div className="mt-8 space-y-6 text-base leading-8 text-espresso/68">
              <p>
                Baristo.Online begins with single-origin Indian Arabica selected from mountain coffee landscapes. The coffee is developed into two deliberate expressions: Noble Dark, a medium-dark roast built around structure and polish; and Truly Dark, an intense dark roast built around depth and command.
              </p>
              <p>
                The brand rejects imported-prestige mythology without rejecting international standards. Its ambition is sharper: Indian provenance, disciplined roasting, transparent product information and a private home-café ritual presented with restraint.
              </p>
              <p>
                “Be Noble” describes conduct rather than status. It means discernment without arrogance, hospitality without performance, evidence without theatre and luxury without noise.
              </p>
            </div>
            <p className="mt-9 font-display text-2xl italic text-rosegold-light">Born at altitude. Roasted for ascent.</p>
          </article>
        </div>
      </div>
    </main>
  );
}
