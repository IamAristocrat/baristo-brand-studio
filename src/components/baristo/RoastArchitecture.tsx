import { ExternalLink } from "lucide-react";
import { roastComparison, roastReferences, roastScience, type RoastScienceKey } from "@/lib/roast-science";

function Metric({ label, value, dark = false }: { label: string; value: string; dark?: boolean }) {
  return <div className={`rounded-xl border border-rosegold/15 p-4 ${dark ? "bg-white/[0.04]" : "bg-white/65"}`}><p className="smallcaps text-[9px] font-semibold text-rosegold-light">{label}</p><p className={`mt-2 text-xs leading-6 ${dark ? "text-ivory/62" : "text-espresso/62"}`}>{value}</p></div>;
}

export function RoastProfileDetail({ roastKey }: { roastKey: RoastScienceKey }) {
  const roast = roastScience[roastKey];
  const dark = roastKey === "truly-dark";
  return (
    <section className={`rounded-3xl border border-rosegold/20 p-6 sm:p-9 ${dark ? "bg-obsidian text-ivory" : "bg-gradient-ivory text-espresso"}`}>
      <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="smallcaps text-[10px] text-rosegold-light">Target roast architecture</p>
          <h3 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">{roast.name}</h3>
          <p className="smallcaps mt-2 text-[10px] text-rosegold-light">{roast.classification} · {roast.expression}</p>
          <p className={`mt-5 text-sm leading-8 ${dark ? "text-ivory/62" : "text-espresso/64"}`}>{roast.intention}</p>
          <p className={`mt-5 rounded-2xl border border-rosegold/15 p-4 text-[11px] leading-6 ${dark ? "text-ivory/48" : "text-espresso/50"}`}><strong>Control note:</strong> Baristo does not treat one bean temperature or one roast time as a universal definition of roast degree. Production acceptance combines objective roast color, mass loss, roast-curve behaviour, surface condition and sensory approval.</p>
        </div>
        <figure>
          <img src={roast.image} alt={`${roast.name} roast architecture representation`} className="w-full rounded-2xl border border-rosegold/20 shadow-card-luxe" />
          <figcaption className={`mt-3 text-[10px] leading-5 ${dark ? "text-ivory/35" : "text-espresso/40"}`}>Scientific representation, not a production roast chart. Actual traces vary with roaster geometry, probe position, batch size, airflow and green-coffee properties.</figcaption>
        </figure>
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <Metric dark={dark} label="Roast degree / color" value={roast.colorTarget} />
        <Metric dark={dark} label="Agtron-style orientation" value={roast.agtronOrientation} />
        <Metric dark={dark} label="Indicative mass loss" value={roast.massLossTarget} />
        <Metric dark={dark} label="Development position" value={roast.developmentPosition} />
        <Metric dark={dark} label="Surface character" value={roast.surfaceCharacter} />
        <Metric dark={dark} label="Solubility orientation" value={roast.solubility} />
        <Metric dark={dark} label="Body" value={roast.body} />
        <Metric dark={dark} label="Acidity" value={roast.acidity} />
        <Metric dark={dark} label="Bitterness" value={roast.bitterness} />
        <Metric dark={dark} label="Aromatic family" value={roast.aromaticFamily} />
        <Metric dark={dark} label="Finish" value={roast.finish} />
        <Metric dark={dark} label="Best suited for" value={roast.bestFor.join(" · ")} />
      </div>
    </section>
  );
}

export function RoastComparisonSection() {
  return (
    <section id="roast-architecture" className="bg-[#f8f0e9] py-20 text-espresso sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center"><p className="smallcaps text-xs text-rosegold-light">Roast Architecture</p><h2 className="mt-4 font-display text-4xl font-semibold sm:text-6xl">Two deliberate roast systems, measured by more than darkness.</h2><p className="mt-6 text-sm leading-8 text-espresso/62">Coffee roasting changes color, moisture, mass, cell structure, volatile chemistry and extraction behaviour. Baristo therefore treats roast identity as a multi-variable control problem rather than a generic light-to-dark adjective.</p></div>
        <div className="mt-14 grid gap-7"><RoastProfileDetail roastKey="noble-dark" /><RoastProfileDetail roastKey="truly-dark" /></div>
        <div className="mt-12 overflow-hidden rounded-2xl border border-rosegold/20 bg-white/70 shadow-card-luxe"><div className="border-b border-rosegold/15 p-5 sm:p-6"><p className="smallcaps text-[10px] text-rosegold-light">Choose your roast</p><h3 className="mt-2 font-display text-3xl font-semibold">Noble Dark vs Truly Dark</h3></div><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-xs"><thead className="bg-espresso/[0.04] text-espresso/55"><tr><th className="px-5 py-4">Parameter</th><th className="px-5 py-4">Noble Dark</th><th className="px-5 py-4">Truly Dark</th></tr></thead><tbody>{roastComparison.map(([parameter,noble,truly]) => <tr key={parameter} className="border-t border-rosegold/10"><th className="px-5 py-4 font-semibold text-espresso/68">{parameter}</th><td className="px-5 py-4 text-espresso/58">{noble}</td><td className="px-5 py-4 text-espresso/58">{truly}</td></tr>)}</tbody></table></div></div>
        <div className="mt-10 rounded-2xl border border-rosegold/18 bg-white/60 p-6"><p className="smallcaps text-[10px] text-rosegold-light">Scientific references</p><div className="mt-4 grid gap-3 md:grid-cols-2">{roastReferences.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="rounded-xl border border-rosegold/12 p-4 transition hover:border-rosegold/40"><span className="flex items-center justify-between gap-3 text-sm text-espresso/72"><span>{source.label}</span><ExternalLink className="h-4 w-4 shrink-0 text-rosegold-light" /></span><span className="mt-2 block text-[11px] leading-5 text-espresso/45">{source.note}</span></a>)}</div></div>
      </div>
    </section>
  );
}
