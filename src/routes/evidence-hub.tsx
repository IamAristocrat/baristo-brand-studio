import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Bean, ExternalLink, Flame, MapPin, Microscope, ShieldCheck } from "lucide-react";
import { RoastProfileDetail } from "@/components/baristo/RoastArchitecture";
import { PackagingRepresentationNotice } from "@/components/baristo/PackagingRepresentation";
import { roastReferences } from "@/lib/roast-science";

const title = "Evidence Policy — Baristo.Online";
const description = "How Baristo.Online handles ingredient clarity, batch identity, origin information, roast records, packaging representation and available quality evidence without unsupported claims.";

export const Route = createFileRoute("/evidence-hub")({
  head: () => ({ meta: [{ title }, { name:"description", content:description }, { property:"og:title", content:title }, { property:"og:description", content:description }, { property:"og:type", content:"article" }], links:[{ rel:"canonical", href:"https://baristo.online/evidence-hub" }] }),
  component: EvidencePolicyPage,
});

const points = [
  { icon:Bean, title:"Ingredient clarity", copy:"100% roasted Arabica coffee. No chicory, fillers or artificial flavour in the coffee formulation." },
  { icon:MapPin, title:"Origin reference", copy:"Indian origin and available lot, estate or regional information are attached only after verification." },
  { icon:Flame, title:"Roast identity", copy:"Roast profile, roast date and packed date are published when the operating record is complete." },
  { icon:Microscope, title:"Available quality evidence", copy:"Third-party or internal quality records are linked only when they genuinely exist for the relevant batch." },
];

function EvidencePolicyPage() {
  return (
    <main className="min-h-screen bg-obsidian px-4 py-14 text-ivory sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Link to="/" hash="evidence" className="smallcaps inline-flex items-center gap-2 text-xs text-rosegold-light"><ArrowLeft className="h-4 w-4" /> Back to Baristo.Online</Link>
        <p className="smallcaps mt-14 text-xs text-rosegold-light">Evidence Without Theatre</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl font-semibold leading-tight sm:text-7xl">Premium is not an adjective. It is a trail.</h1>
        <p className="mt-7 max-w-3xl text-base leading-8 text-ivory/62">Baristo publishes what can be substantiated and withholds what cannot. Evidence should make the product clearer and more trustworthy, not stage a laboratory fantasy.</p>
        <div className="mt-10"><PackagingRepresentationNotice dark /></div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2">{points.map(({icon:Icon,title:pointTitle,copy})=><article key={pointTitle} className="rounded-xl border border-rosegold/20 bg-white/[0.04] p-7"><Icon className="h-6 w-6 text-rosegold-light"/><h2 className="mt-5 font-display text-3xl font-semibold">{pointTitle}</h2><p className="mt-4 text-sm leading-7 text-ivory/58">{copy}</p></article>)}</div>

        <section className="mt-20"><p className="smallcaps text-xs text-rosegold-light">Roast measurement policy</p><h2 className="mt-4 font-display text-4xl font-semibold sm:text-6xl">Roast degree is a system of measurements, not one temperature.</h2><p className="mt-6 max-w-4xl text-sm leading-8 text-ivory/58">Baristo uses target roast architecture: objective color where available, mass loss, post-first-crack development, surface condition, roast-curve behaviour and sensory acceptance. Machine temperatures and times are recorded operationally but are not published as universal definitions because roaster geometry, probe placement, airflow and batch size alter those readings.</p></section>
        <div className="mt-10 grid gap-7"><RoastProfileDetail roastKey="noble-dark"/><RoastProfileDetail roastKey="truly-dark"/></div>
        <section className="mt-10 rounded-2xl border border-rosegold/20 bg-white/[0.04] p-6"><p className="smallcaps text-[10px] text-rosegold-light">Scientific references</p><div className="mt-4 grid gap-3 md:grid-cols-2">{roastReferences.map((source)=><a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="rounded-xl border border-rosegold/12 p-4"><span className="flex items-center justify-between gap-3 text-sm text-ivory/72"><span>{source.label}</span><ExternalLink className="h-4 w-4 shrink-0 text-rosegold-light"/></span><span className="mt-2 block text-[11px] leading-5 text-ivory/42">{source.note}</span></a>)}</div></section>

        <section className="mt-14 rounded-2xl border border-rosegold/25 bg-white/[0.04] p-8 sm:p-10"><div className="flex items-start gap-4"><ShieldCheck className="mt-1 h-7 w-7 shrink-0 text-rosegold-light"/><div><h2 className="font-display text-3xl font-semibold">Claim discipline</h2><p className="mt-4 text-sm leading-7 text-ivory/58">Baristo does not promise to diagnose, treat, cure or prevent disease. It does not guarantee cognitive enhancement, immunity, detoxification, a jitter-free response or another physiological outcome. Sensory and lifestyle language describes the ritual, not a medical effect.</p></div></div></section>
      </div>
    </main>
  );
}