import { Check, Sparkles } from "lucide-react";
import { ON_DEMAND_BATCH_COPY, PACKAGING_REPRESENTATION_COPY } from "@/lib/roast-science";
import { PackagingRepresentationNotice } from "./PackagingRepresentation";

export function PackagingStrategyPanel() {
  const standards = ["Large primary label proportion", "Consistent top and side margins", "Bubble-free application", "Clean edges and corners", "Premium barrier pouch", "Batch identity retained"];
  return (
    <section className="bg-[#f8f0e9] py-16 text-espresso sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div><p className="smallcaps text-xs text-rosegold-light">Signature Label Standard</p><h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Premium perception is controlled by execution, not by whether graphics are printed directly on the pouch.</h2><p className="mt-5 text-sm leading-8 text-espresso/60">The applied label is treated as the intended visual face of the On-Demand Batch pack. Alignment, proportion, pouch finish and consistency are therefore quality-control variables, not casual finishing steps.</p></div>
          <div className="grid gap-3 sm:grid-cols-2">{standards.map((item)=><div key={item} className="flex items-center gap-3 rounded-xl border border-rosegold/18 bg-white/70 p-4 text-xs text-espresso/62"><Check className="h-4 w-4 shrink-0 text-rosegold-light" />{item}</div>)}</div>
        </div>
      </div>
    </section>
  );
}

export function OnDemandBatchSection() {
  const steps = [
    "Demand is recorded through reservation or launch-interest signals.",
    "A deliberately limited production lot is scheduled rather than carrying continuous mass inventory.",
    "Roast identity and batch records are checked against the intended product architecture.",
    "Coffee is packed in a premium barrier pouch and finished with a signature Baristo label.",
    "Label placement is controlled for alignment, clean edges, consistent margins and bubble-free application.",
    "Availability, delivery eligibility and final payable amount are confirmed before payment and dispatch.",
  ];
  return (
    <section id="on-demand-batch" className="bg-[#151210] py-20 text-ivory sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div><p className="smallcaps text-xs text-rosegold-light">On-Demand Batch</p><h2 className="mt-4 font-display text-4xl font-semibold sm:text-6xl">The signature label is part of the presentation system, not an apology.</h2><p className="mt-6 text-sm leading-8 text-ivory/58">{ON_DEMAND_BATCH_COPY}</p><div className="mt-7"><PackagingRepresentationNotice dark /></div></div>
        <div><img src="/roast-science/on-demand-signature-label.svg" alt="Baristo On-Demand Batch signature-label packaging representation" className="w-full rounded-2xl border border-rosegold/20 shadow-luxe" /><ol className="mt-6 grid gap-3">{steps.map((step,index)=><li key={step} className="flex gap-4 rounded-xl border border-rosegold/12 bg-white/[0.035] p-4 text-xs leading-6 text-ivory/58"><span className="font-display text-xl text-rosegold-light">{String(index+1).padStart(2,"0")}</span><span>{step}</span></li>)}</ol></div>
      </div>
    </section>
  );
}

export function RoastFaqSection() {
  const faqs = [
    ["Why may the delivered pouch look slightly different from the website image?", PACKAGING_REPRESENTATION_COPY],
    ["Does a signature applied label make the coffee lower quality?", "No. The label is a presentation layer. Coffee specification, roast target, pack quantity and quality-control requirements are independent of whether graphics are printed directly on the pouch or applied as a finished label."],
    ["What does On-Demand Batch mean?", ON_DEMAND_BATCH_COPY],
    ["Why does Baristo not publish one universal roast temperature?", "Probe placement, roaster design, airflow, batch mass and heat-transfer conditions change recorded temperatures. Baristo therefore specifies roast architecture through multiple measurable variables rather than presenting one machine-specific number as a universal standard."],
    ["What is the difference between Noble Dark and Truly Dark?", "Noble Dark targets balanced medium-dark development, medium-full body and controlled bitterness. Truly Dark targets lower brightness, denser body, higher extraction friendliness and a more assertive dark-roast aromatic profile."],
    ["Are the roast-science graphics production charts?", "No. They are scientific representations that explain control logic. Release decisions must use the actual production roast record, calibrated color measurement where available, mass loss, surface condition and sensory evaluation."],
  ];
  return (
    <section id="roast-faq" className="bg-ivory py-20 text-espresso sm:py-28"><div className="mx-auto max-w-5xl px-4 sm:px-6"><div className="text-center"><p className="smallcaps text-xs text-rosegold-light">Packaging & Roast FAQ</p><h2 className="mt-4 font-display text-4xl font-semibold sm:text-6xl">Precision where it matters.</h2></div><div className="mt-12 grid gap-3">{faqs.map(([question,answer])=><details key={question} className="group rounded-2xl border border-rosegold/18 bg-white/70 p-5 sm:p-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl font-semibold sm:text-2xl"><span>{question}</span><Sparkles className="h-4 w-4 shrink-0 text-rosegold-light transition group-open:rotate-45" /></summary><p className="mt-4 max-w-4xl text-xs leading-7 text-espresso/58">{answer}</p></details>)}</div></div></section>
  );
}
