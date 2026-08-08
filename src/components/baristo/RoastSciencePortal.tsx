import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { RoastComparisonSection } from "./RoastArchitecture";
import { BrewingScienceSection } from "./BrewingScience";
import { OnDemandBatchSection, PackagingStrategyPanel, RoastFaqSection } from "./OnDemandBatch";
import { PackagingRepresentationNotice } from "./PackagingRepresentation";

export function RoastSciencePortal() {
  const [packagingMount, setPackagingMount] = useState<HTMLElement | null>(null);
  const [roastMount, setRoastMount] = useState<HTMLElement | null>(null);
  const [brewingMount, setBrewingMount] = useState<HTMLElement | null>(null);
  const [closingMount, setClosingMount] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const home = document.getElementById("home");
    const roasts = document.getElementById("roasts");
    const ritualLab = document.getElementById("ritual-lab");
    const footer = document.querySelector("footer");
    if (!home || !roasts || !ritualLab || !footer) return;

    const packaging = document.createElement("div");
    packaging.dataset.baristoScience = "packaging";
    home.insertAdjacentElement("afterend", packaging);

    const roast = document.createElement("div");
    roast.dataset.baristoScience = "roast-architecture";
    roasts.insertAdjacentElement("afterend", roast);

    const brewing = document.createElement("div");
    brewing.dataset.baristoScience = "brewing";
    ritualLab.insertAdjacentElement("afterend", brewing);

    const closing = document.createElement("div");
    closing.dataset.baristoScience = "on-demand";
    footer.parentNode?.insertBefore(closing, footer);

    setPackagingMount(packaging);
    setRoastMount(roast);
    setBrewingMount(brewing);
    setClosingMount(closing);

    return () => {
      packaging.remove(); roast.remove(); brewing.remove(); closing.remove();
    };
  }, []);

  return <>
    {packagingMount && createPortal(<section className="border-y border-rosegold/15 bg-ivory py-6"><div className="mx-auto max-w-7xl px-4 sm:px-6"><PackagingRepresentationNotice compact /></div></section>, packagingMount)}
    {roastMount && createPortal(<><RoastComparisonSection /><PackagingStrategyPanel /></>, roastMount)}
    {brewingMount && createPortal(<BrewingScienceSection />, brewingMount)}
    {closingMount && createPortal(<><OnDemandBatchSection /><RoastFaqSection /></>, closingMount)}
  </>;
}
