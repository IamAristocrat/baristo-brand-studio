import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import medallion from "@/assets/medallion.png";
import { PackagingRepresentationNotice } from "@/components/baristo/PackagingRepresentation";
import { RoastProfileDetail } from "@/components/baristo/RoastArchitecture";
import { BrewingScienceSection } from "@/components/baristo/BrewingScience";
import { OnDemandBatchSection } from "@/components/baristo/OnDemandBatch";
import type { RoastScienceKey } from "@/lib/roast-science";

type RoastKey = "dark" | "truly-dark";

const roasts = {
  dark: { key: "dark" as const, name: "Noble Dark", descriptor: "Medium-Dark Roast", tagline: "Structure without harshness", description: "A composed medium-dark roast with cacao warmth, toasted almond and restrained caramel carried into a long, polished finish.", notes: ["Cacao", "Toasted Almond", "Warm Caramel", "Long Finish"] },
  "truly-dark": { key: "truly-dark" as const, name: "Truly Dark", descriptor: "Intense Dark Roast", tagline: "Intensity without vulgar bitterness", description: "An intense dark roast with dark cacao, toasted walnut and smoke-kissed caramel carried by a dense body and deliberate finish.", notes: ["Dark Cacao", "Toasted Walnut", "Smoked Caramel", "Bold Finish"] },
};

const price = 4279;
const mrp = 4779;

export const Route = createFileRoute("/roasts/$roastKey")({
  loader: ({ params }) => { const key=params.roastKey as RoastKey; const roast=roasts[key]; if(!roast) throw notFound(); return { roast }; },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Roast not found — Baristo.Online" }] };
    const { roast }=loaderData; const title=`${roast.name} — 12 oz / 340 g | Baristo.Online`; const url=`https://baristo.online/roasts/${params.roastKey}`;
    return { meta: [{ title }, { name:"description", content:roast.description }, { property:"og:title", content:title }, { property:"og:description", content:roast.description }], links:[{ rel:"canonical", href:url }] };
  },
  component: RoastPage,
});

function RoastPage() {
  const { roast }=Route.useLoaderData() as { roast:(typeof roasts)[RoastKey] };
  const isDark=roast.key==="truly-dark";
  const scienceKey: RoastScienceKey=isDark?"truly-dark":"noble-dark";
  return (
    <div className={isDark?"bg-obsidian":"bg-gradient-ivory"}>
      <main className={`min-h-screen px-4 py-14 sm:px-6 sm:py-20 ${isDark?"text-ivory":"text-espresso"}`}>
        <div className="mx-auto max-w-6xl">
          <Link to="/" hash="roasts" className="smallcaps inline-flex items-center gap-2 text-xs text-rosegold-light"><ArrowLeft className="h-4 w-4" /> Back to the two roasts</Link>
          <div className="mt-12 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <div className={`rounded-2xl border border-rosegold/25 p-10 text-center shadow-luxe ${isDark?"bg-white/[0.04]":"bg-white/65"}`}><img src={medallion} alt="Baristo.Online packaging design representation" className="mx-auto h-56 w-56 rounded-full object-cover shadow-rose"/><p className="smallcaps mt-7 text-xs text-rosegold-light">Premium Ground Roasted Coffee</p><p className="mt-3 font-display text-3xl font-semibold">12 oz / 340 g</p></div>
              <div className="mt-4"><PackagingRepresentationNotice dark={isDark} compact /></div>
            </div>
            <article>
              <p className="smallcaps text-xs text-rosegold-light">{roast.descriptor}</p><h1 className="mt-4 font-display text-5xl font-semibold sm:text-7xl">{roast.name}</h1><p className="smallcaps mt-3 text-xs text-rosegold-light">{roast.tagline}</p><p className={`mt-7 text-base leading-8 ${isDark?"text-ivory/62":"text-espresso/68"}`}>{roast.description}</p>
              <div className="mt-7 flex flex-wrap gap-2">{roast.notes.map((note)=><span key={note} className="rounded-full border border-rosegold/25 px-3 py-1 text-xs">{note}</span>)}</div>
              <ul className={`mt-8 grid gap-3 text-sm ${isDark?"text-ivory/65":"text-espresso/65"}`}>{["100% roasted Arabica coffee","No chicory or fillers","One size: 12 oz / 340 g","On-Demand Batch presentation","Same launch price across both roasts"].map((item)=><li key={item} className="flex items-center gap-3"><Check className="h-4 w-4 text-rosegold-light" /> {item}</li>)}</ul>
              <div className="mt-10 flex items-end gap-4"><p className="font-display text-4xl font-semibold">₹{price.toLocaleString("en-IN")}</p><p className={`pb-1 text-sm line-through ${isDark?"text-ivory/30":"text-espresso/35"}`}>₹{mrp.toLocaleString("en-IN")}</p></div>
              <a href="#reserve" className="smallcaps mt-7 inline-flex h-12 items-center justify-center rounded-sm bg-gradient-rose px-7 text-xs font-bold text-espresso shadow-rose">Reserve {roast.name} — On-Demand Batch</a>
              <p className={`mt-4 text-xs leading-6 ${isDark?"text-ivory/35":"text-espresso/38"}`}>Reservation records purchase intent. Availability, delivery eligibility and final payable amount are verified before a secure payment link is sent.</p>
            </article>
          </div>
          <div className="mt-16"><RoastProfileDetail roastKey={scienceKey} /></div>
        </div>
      </main>
      <BrewingScienceSection />
      <OnDemandBatchSection />
    </div>
  );
}