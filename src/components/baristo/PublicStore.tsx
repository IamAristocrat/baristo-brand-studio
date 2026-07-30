import { useEffect, useState } from "react";
import { ArrowRight, Bean, Check, Flame, Mail, Menu, Microscope, Mountain, ShieldCheck, X } from "lucide-react";
import medallion from "@/assets/medallion.png";
import heroMountains from "@/assets/hero-mountains.jpg";
import espressoExtraction from "@/assets/gallery/g7-extraction.jpg";
import ritualTools from "@/assets/gallery/g8-ritual-tools.jpg";
import beansMacro from "@/assets/beans-macro.jpg";

const price = "₹4,279";
const mrp = "₹4,779";
const waitlist = "mailto:support@baristo.online?subject=Join%20the%20Baristo%20First%20Pour&body=Please%20send%20me%20the%20Amazon%20India%20launch%20link.";

const roasts = [
  {
    name: "Noble Dark",
    descriptor: "Medium-Dark Roast",
    line: "Structure without harshness",
    copy: "Cacao warmth, toasted almond and restrained caramel carried into a long, polished finish.",
    notes: ["Cacao", "Toasted Almond", "Warm Caramel", "Long Finish"],
    dark: false,
  },
  {
    name: "Truly Dark",
    descriptor: "Intense Dark Roast",
    line: "Intensity without vulgar bitterness",
    copy: "Dark cacao, toasted walnut and smoke-kissed caramel carried by a dense body and deliberate finish.",
    notes: ["Dark Cacao", "Toasted Walnut", "Smoked Caramel", "Bold Finish"],
    dark: true,
  },
];

const rituals = ["Baristo Classic", "Sage", "Zen", "Harmony", "Glow", "Command", "Forge", "Focus", "Sigma", "Ignition", "Ascent", "Phoenix"];

function Pouch({ roast }: { roast: (typeof roasts)[number] }) {
  return (
    <div className={`relative mx-auto aspect-[0.72] w-full max-w-[300px] overflow-hidden rounded-[18px_18px_28px_28px] border border-rosegold/35 shadow-luxe ${roast.dark ? "bg-gradient-to-b from-[#29231f] to-[#0e0d0c] text-ivory" : "bg-gradient-to-b from-[#fffdf8] to-[#ead2c7] text-espresso"}`}>
      <div className="absolute inset-x-0 top-0 h-8 border-b border-current/10 bg-black/10" />
      <div className="absolute inset-x-7 top-4 h-px bg-current/20" />
      <div className="flex h-full flex-col items-center px-7 pt-14 pb-7 text-center">
        <img src={medallion} alt="Baristo.Online medallion" className="h-28 w-28 rounded-full object-cover shadow-rose" />
        <p className="smallcaps mt-6 text-[9px] text-rosegold-light">Single-Origin Indian Arabica</p>
        <h3 className="mt-2 font-display text-4xl font-semibold leading-none">{roast.name}</h3>
        <p className="smallcaps mt-3 text-[9px] opacity-65">{roast.descriptor}</p>
        <div className="my-5 h-px w-20 bg-gradient-rose" />
        <p className="text-xs opacity-70">Premium Ground Roasted Coffee</p>
        <p className="mt-auto font-display text-xl font-semibold">12 oz / 340 g</p>
        <p className="smallcaps mt-2 text-[9px] text-rosegold-light">Be Noble</p>
      </div>
    </div>
  );
}

export function PublicStore() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-ivory text-espresso">
      <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all ${scrolled ? "border-rosegold/15 bg-ivory/95 shadow-card-luxe backdrop-blur-xl" : "border-transparent bg-ivory/70 backdrop-blur-md"}`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <a href="#home" className="leading-none"><span className="font-display text-xl font-semibold">Baristo<span className="text-gradient-rose">.Online</span></span><span className="smallcaps mt-1 block text-[9px] text-rosegold-light">Be Noble</span></a>
          <nav className="hidden gap-7 lg:flex">{["Roasts", "Story", "Evidence", "Ritual Lab"].map((x) => <a key={x} href={`#${x.toLowerCase().replace(" ", "-")}`} className="smallcaps text-xs text-espresso/65 hover:text-rosegold-light">{x}</a>)}</nav>
          <div className="flex items-center gap-2"><a href={waitlist} className="smallcaps hidden rounded-sm bg-gradient-rose px-4 py-2 text-[10px] font-bold text-espresso shadow-rose sm:inline-flex">Join First Pour</a><button aria-label="Toggle navigation" onClick={() => setMenu(!menu)} className="flex h-10 w-10 items-center justify-center rounded-sm border border-rosegold/25 lg:hidden">{menu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}</button></div>
        </div>
        {menu && <nav className="border-t border-rosegold/15 bg-ivory px-4 py-4 lg:hidden">{["Roasts", "Story", "Evidence", "Ritual Lab"].map((x) => <a key={x} href={`#${x.toLowerCase().replace(" ", "-")}`} onClick={() => setMenu(false)} className="smallcaps block rounded-sm px-3 py-3 text-sm hover:bg-champagne/35">{x}</a>)}</nav>}
      </header>

      <main>
        <section id="home" className="relative min-h-[92vh] overflow-hidden pt-16">
          <img src={heroMountains} alt="Indian mountain coffee landscape" className="absolute inset-0 h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-b from-ivory/85 via-ivory/65 to-ivory" />
          <div className="relative mx-auto grid min-h-[calc(92vh-4rem)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr]">
            <div><p className="smallcaps text-xs text-rosegold-light">Single-Origin Indian Arabica</p><h1 className="mt-5 font-display text-5xl font-semibold leading-[.95] sm:text-7xl lg:text-[5.4rem]">Born at altitude.<span className="mt-2 block text-gradient-rose">Roasted for ascent.</span></h1><p className="mt-7 max-w-2xl text-base leading-8 text-espresso/72 sm:text-lg">A sovereign Indian expression of coffee luxury, developed into two dark-roast profiles for espresso-minded homes and private rituals of distinction.</p><p className="mt-5 font-display text-2xl italic text-rosegold-light">Elevated by nature. Roasted for perfection.</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href="#roasts" className="smallcaps inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-gradient-rose px-6 text-xs font-bold text-espresso shadow-rose">Discover the Two Roasts <ArrowRight className="h-4 w-4" /></a><a href={waitlist} className="smallcaps inline-flex h-12 items-center justify-center gap-2 rounded-sm border border-rosegold/45 px-6 text-xs font-bold"><Mail className="h-4 w-4" /> Amazon Launch Alert</a></div><div className="mt-9 grid max-w-xl grid-cols-2 gap-4 border-t border-rosegold/20 pt-6 sm:grid-cols-4">{["100% Arabica", "No Chicory", "No Fillers", "Batch Identified"].map((x) => <div key={x} className="flex items-center gap-2 text-xs text-espresso/65"><Check className="h-3.5 w-3.5 text-rosegold-light" />{x}</div>)}</div></div>
            <div className="relative mx-auto max-w-[470px]"><div className="absolute inset-10 rounded-full bg-rosegold/20 blur-3xl" /><img src={medallion} alt="Final Baristo.Online medallion logo" className="relative w-full rounded-full drop-shadow-[0_30px_50px_rgba(74,45,35,.24)]" /><div className="relative mx-auto -mt-4 w-fit rounded-full border border-rosegold/25 bg-ivory/90 px-5 py-2 text-center shadow-card-luxe"><p className="smallcaps text-[9px] text-rosegold-light">Ceremonial Brand Seal</p></div></div>
          </div>
        </section>

        <section className="border-y border-rosegold/15 bg-obsidian py-5 text-ivory"><div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-8 px-4">{["Purity", "Provenance", "Roast", "Evidence"].map((x) => <span key={x} className="smallcaps text-xs text-rosegold-light">{x}</span>)}</div></section>

        <section id="roasts" className="bg-gradient-ivory py-20 sm:py-28"><div className="mx-auto max-w-7xl px-4 sm:px-6"><div className="mx-auto max-w-3xl text-center"><p className="smallcaps text-xs text-rosegold-light">Two Expressions of the Noble Dark</p><h2 className="mt-4 font-display text-4xl font-semibold sm:text-6xl">One origin. Two deliberate depths.</h2><p className="mt-5 text-sm leading-7 text-espresso/65">Both roasts use one uncompromised format: 12 oz / 340 g premium ground roasted coffee at the same launch price.</p></div><div className="mt-14 grid gap-8 lg:grid-cols-2">{roasts.map((roast) => <article key={roast.name} className={`grid overflow-hidden rounded-2xl border border-rosegold/25 shadow-luxe md:grid-cols-[.9fr_1.1fr] ${roast.dark ? "bg-obsidian text-ivory" : "bg-white/70"}`}><div className={`p-8 ${roast.dark ? "bg-gradient-to-br from-[#312a25] to-black" : "bg-gradient-to-br from-white to-champagne/70"}`}><Pouch roast={roast} /></div><div className="flex flex-col p-8"><p className="smallcaps text-xs text-rosegold-light">{roast.descriptor}</p><h3 className="mt-3 font-display text-4xl font-semibold">{roast.name}</h3><p className="smallcaps mt-2 text-xs text-rosegold-light">{roast.line}</p><p className={`mt-5 text-sm leading-7 ${roast.dark ? "text-ivory/65" : "text-espresso/68"}`}>{roast.copy}</p><div className="mt-5 flex flex-wrap gap-2">{roast.notes.map((n) => <span key={n} className="rounded-full border border-rosegold/25 px-3 py-1 text-xs">{n}</span>)}</div><div className="mt-auto pt-8"><div className="flex items-end justify-between"><div><p className="smallcaps text-[9px] opacity-45">12 oz / 340 g</p><p className="mt-1 font-display text-3xl font-semibold">{price}</p></div><p className="text-sm opacity-30 line-through">{mrp}</p></div><a href={waitlist} className="smallcaps mt-5 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-gradient-rose px-5 py-3 text-xs font-bold text-espresso shadow-rose">Reserve {roast.name} <ArrowRight className="h-4 w-4" /></a></div></div></article>)}</div></div></section>

        <section id="story" className="bg-ivory py-20 sm:py-28"><div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div className="relative overflow-hidden rounded-2xl shadow-luxe"><img src={beansMacro} alt="Roasted Arabica beans" className="aspect-[4/5] w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-obsidian/75 to-transparent" /><p className="absolute right-7 bottom-7 left-7 font-display text-3xl text-ivory">A new luxury language, grown in India.</p></div><div><p className="smallcaps text-xs text-rosegold-light">Sovereign Indian Altitude</p><h2 className="mt-4 font-display text-4xl font-semibold sm:text-6xl">India does not imitate coffee luxury. It grows it.</h2><div className="mt-7 space-y-5 text-sm leading-8 text-espresso/68 sm:text-base"><p>Baristo begins with Indian mountain Arabica and develops it into Noble Dark and Truly Dark. The ambition is not imported mimicry; it is provenance, roast discipline and sensory refinement.</p><p>“Be Noble” means discernment, restraint, hospitality, integrity and excellence—not social rank.</p></div><div className="mt-8 grid gap-4 sm:grid-cols-3">{[[Mountain,"Altitude"],[Flame,"Roast"],[ShieldCheck,"Nobility"]].map(([Icon, label]) => { const I = Icon as typeof Mountain; return <div key={String(label)} className="rounded-xl border border-rosegold/18 bg-white/55 p-4"><I className="h-5 w-5 text-rosegold-light" /><p className="smallcaps mt-3 text-xs">{String(label)}</p></div>; })}</div></div></div></section>

        <section id="evidence" className="bg-obsidian py-20 text-ivory sm:py-28"><div className="mx-auto max-w-7xl px-4 sm:px-6"><p className="smallcaps text-xs text-rosegold-light">Evidence Without Theatre</p><h2 className="mt-4 max-w-4xl font-display text-4xl font-semibold sm:text-6xl">Premium is not an adjective. It is a trail.</h2><p className="mt-6 max-w-3xl text-sm leading-8 text-ivory/60">Baristo publishes only what genuinely exists for a batch: ingredient clarity, origin reference, roast identity and available quality records. No fictional laboratory spectacle.</p><div className="mt-12 grid gap-4 sm:grid-cols-3">{[[Bean,"Ingredient clarity","100% roasted Arabica. No chicory, fillers or artificial flavour."],[Flame,"Roast identity","Roast and packing information displayed when operationally verified."],[Microscope,"Available evidence","Testing records linked only when they exist for the batch."]].map(([Icon,title,copy]) => { const I = Icon as typeof Bean; return <article key={String(title)} className="rounded-xl border border-rosegold/20 bg-white/[.04] p-6"><I className="h-6 w-6 text-rosegold-light" /><h3 className="mt-5 font-display text-2xl">{String(title)}</h3><p className="mt-3 text-xs leading-6 text-ivory/55">{String(copy)}</p></article>; })}</div><p className="mt-8 text-xs leading-6 text-ivory/35">No medicinal, disease-management or guaranteed cognitive-performance claims.</p></div></section>

        <section className="bg-ivory py-20 sm:py-28"><div className="mx-auto max-w-7xl px-4 sm:px-6"><div className="mx-auto max-w-3xl text-center"><p className="smallcaps text-xs text-rosegold-light">The Private Café</p><h2 className="mt-4 font-display text-4xl font-semibold sm:text-6xl">Designed for the cup—not the cliché.</h2></div><div className="mt-12 grid gap-5 md:grid-cols-2"><figure className="overflow-hidden rounded-2xl shadow-card-luxe"><img src={espressoExtraction} alt="Espresso extraction" className="aspect-[16/10] w-full object-cover" /><figcaption className="bg-white p-5 font-display text-2xl">The coffee remains the protagonist.</figcaption></figure><figure className="overflow-hidden rounded-2xl bg-obsidian text-ivory shadow-card-luxe"><img src={ritualTools} alt="Home coffee tools" className="aspect-[16/10] w-full object-cover" /><figcaption className="p-5 font-display text-2xl">Espresso-minded equipment.</figcaption></figure></div></div></section>

        <section id="ritual-lab" className="bg-gradient-ivory py-20 sm:py-28"><div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[.75fr_1.25fr]"><div><p className="smallcaps text-xs text-rosegold-light">The Baristo Ritual Laboratory</p><h2 className="mt-4 font-display text-4xl font-semibold sm:text-6xl">One coffee. Twelve culinary expressions.</h2><p className="mt-6 text-sm leading-8 text-espresso/62">Recipes are secondary to the coffee and are culinary—not treatment protocols or synthetic biohacks.</p></div><div className="grid gap-3 sm:grid-cols-2">{rituals.map((name, i) => <article key={name} className="flex items-center gap-4 rounded-xl border border-rosegold/18 bg-white/65 p-4"><span className="font-display text-2xl text-rosegold-light">{String(i+1).padStart(2,"0")}</span><h3 className="font-display text-xl font-semibold">{name}</h3></article>)}</div></div></section>

        <section className="bg-obsidian py-20 text-center text-ivory sm:py-28"><div className="mx-auto max-w-4xl px-4 sm:px-6"><p className="smallcaps text-xs text-rosegold-light">The First Pour Circle</p><h2 className="mt-4 font-display text-4xl font-semibold sm:text-6xl">The reviews begin after the coffee does.</h2><p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-ivory/58">No invented surgeons, bankers or neuroscientists. Reviews will come from verified launch customers. Purchase opens when Amazon India FBA inventory is live.</p><a href={waitlist} className="smallcaps mt-9 inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-gradient-rose px-7 text-xs font-bold text-espresso shadow-rose"><Mail className="h-4 w-4" /> Join the First Pour</a><p className="smallcaps mt-5 text-[9px] text-ivory/35">Amazon India launch approaching · No false checkout</p></div></section>
      </main>

      <footer className="border-t border-rosegold/15 bg-ivory py-14"><div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-[1fr_auto]"><div><div className="font-display text-2xl font-semibold">Baristo.Online</div><p className="smallcaps mt-2 text-xs text-rosegold-light">Be Noble</p><p className="mt-5 max-w-2xl text-xs leading-6 text-espresso/48">A LifeCodeOS portfolio product. Roasted and packed for LifeCodeOS by Aristoverse DeepTech. Final statutory entity names, FSSAI information and batch details must be completed before sale.</p></div><div className="md:text-right"><a href="mailto:support@baristo.online" className="text-sm text-rosegold-light">support@baristo.online</a><p className="mt-4 text-[9px] text-espresso/35">Not intended to diagnose, treat, cure or prevent disease.</p></div></div></footer>
    </div>
  );
}
