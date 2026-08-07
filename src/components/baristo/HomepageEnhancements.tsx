import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Brain, ChevronDown, Clock3, ExternalLink, Eye, Gauge, ShieldCheck, Sparkles } from "lucide-react";
import { recipes } from "@/lib/baristo-data";

const displayNames: Record<string, string> = {
  alpha: "Command",
  rage: "Forge",
  cage: "Focus",
  burst: "Ignition",
  charge: "Ascent",
};

const displayRoast = (value: string) => (value === "Dark" ? "Noble Dark" : "Truly Dark");

function CognitiveEvidenceSection() {
  const points = [
    {
      icon: Eye,
      title: "Alertness",
      copy: "Caffeine is a central nervous system stimulant. EFSA states that, in moderate doses, caffeine increases alertness and reduces sleepiness.",
    },
    {
      icon: Brain,
      title: "Attention accuracy",
      copy: "A 2025 systematic review and meta-analysis of 31 randomized, double-blind, placebo-controlled trials in 1,455 rested healthy adults found a small acute improvement in attention accuracy with caffeine.",
    },
    {
      icon: Gauge,
      title: "Reaction time",
      copy: "The same 2025 meta-analysis found a small acute improvement in reaction time. The effect is about caffeine research generally, not a guaranteed Baristo-specific performance outcome.",
    },
    {
      icon: ShieldCheck,
      title: "Cognition with restraint",
      copy: "Dose, tolerance, sleep, medications and individual sensitivity matter. FDA cites 400 mg/day for most adults as an amount not generally associated with negative effects; EFSA notes even 100 mg near bedtime may affect sleep in some adults.",
    },
  ];

  return (
    <section id="cognitive-intelligence" className="cognition-section relative overflow-hidden bg-[#151210] py-20 text-ivory sm:py-28">
      <div className="ambient-orb ambient-orb-one" aria-hidden="true" />
      <div className="ambient-orb ambient-orb-two" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="smallcaps text-xs text-rosegold-light">Caffeine · Cognition · Evidence</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[0.98] sm:text-6xl">
              For Expresso Noble Minds. The evidence behind the attentive cup.
            </h2>
          </div>
          <div className="premium-glass-dark rounded-2xl border border-rosegold/20 p-6 sm:p-8">
            <p className="font-display text-2xl text-rosegold-light sm:text-3xl">Cognitive sharpness should be discussed precisely.</p>
            <p className="mt-4 text-sm leading-8 text-ivory/65">
              Baristo is designed as a ritual around moments where alertness, attention and deliberate work matter. The scientific context comes from caffeine research—not from invented laboratory theatre. Baristo does not claim to increase IQ, treat fatigue disorders, prevent disease or guarantee cognitive performance.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {points.map(({ icon: Icon, title, copy }) => (
            <article key={title} className="premium-glass-dark premium-shine-card rounded-2xl border border-rosegold/18 p-6">
              <Icon className="h-6 w-6 text-rosegold-light" />
              <h3 className="mt-5 font-display text-2xl">{title}</h3>
              <p className="mt-3 text-xs leading-6 text-ivory/58">{copy}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="rounded-2xl border border-rosegold/15 bg-white/[0.035] p-5 text-xs leading-6 text-ivory/52">
            <strong className="text-ivory/75">Baristo measurement policy:</strong> caffeine concentration varies with coffee dose, grind and brew method. Until a defined Baristo serving is analytically characterized, the site will not invent a caffeine-mg figure per cup. This section describes evidence on caffeine generally and is not a product-specific therapeutic claim.
          </div>
          <div className="flex flex-wrap gap-3">
            <a className="evidence-link" href="https://www.efsa.europa.eu/en/topics/topic/caffeine" target="_blank" rel="noreferrer">EFSA caffeine evidence <ExternalLink className="h-3 w-3" /></a>
            <a className="evidence-link" href="https://pubmed.ncbi.nlm.nih.gov/40335666/" target="_blank" rel="noreferrer">2025 attention meta-analysis <ExternalLink className="h-3 w-3" /></a>
            <a className="evidence-link" href="https://www.fda.gov/consumers/consumer-updates/spilling-beans-how-much-caffeine-too-much" target="_blank" rel="noreferrer">FDA caffeine guidance <ExternalLink className="h-3 w-3" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function RitualLibrarySection() {
  const ordered = useMemo(() => recipes.slice(0, 12), []);

  return (
    <section id="ritual-library" className="ritual-library relative overflow-hidden bg-gradient-ivory py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <p className="smallcaps text-xs text-rosegold-light">The Complete Baristo Ritual Library</p>
          <h2 className="mt-4 font-display text-4xl font-semibold sm:text-6xl">Twelve recipes, now opened in full.</h2>
          <p className="mx-auto mt-6 max-w-3xl text-sm leading-8 text-espresso/62">
            The original recipe architecture is preserved and expanded into a mobile-friendly reference. Five current public names—Command, Forge, Focus, Ignition and Ascent—map to the original development recipes Alpha, Rage, Cage, Burst and Charge so the complete Baristo recipe history remains intact.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-xs leading-6 text-espresso/45">
            Recipe names, moments and sensory language describe culinary rituals, not guaranteed physiological, medical, cognitive or sports-performance outcomes. Caffeine remains active regardless of calming or evening flavour cues.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {ordered.map((recipe, index) => {
            const currentName = displayNames[recipe.slug] || recipe.name;
            const renamed = currentName !== recipe.name;
            return (
              <details key={recipe.slug} className="recipe-detail-card group overflow-hidden rounded-2xl border border-rosegold/18 bg-white/72 shadow-card-luxe">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 p-5 sm:p-7">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-display text-2xl text-rosegold-light">{String(index + 1).padStart(2, "0")}</span>
                      <span className="smallcaps text-[10px] text-espresso/42">{recipe.roasts.map(displayRoast).join(" + ")}</span>
                    </div>
                    <h3 className="mt-2 font-display text-3xl font-semibold text-espresso sm:text-4xl">{currentName}</h3>
                    {renamed && <p className="mt-1 text-[11px] text-espresso/38">Original development recipe: {recipe.name}</p>}
                    <p className="smallcaps mt-2 text-[10px] text-rosegold-light">{recipe.theme}</p>
                    <p className="mt-3 text-sm leading-7 text-espresso/58">{recipe.copy}</p>
                  </div>
                  <span className="mt-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-rosegold/20 bg-ivory text-rosegold-light transition group-open:rotate-180">
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </summary>

                <div className="border-t border-rosegold/12 px-5 pb-6 pt-5 sm:px-7 sm:pb-8">
                  <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
                    <div>
                      <div className="flex flex-wrap gap-2 text-[11px] text-espresso/55">
                        <span className="ritual-chip"><Clock3 className="h-3 w-3" /> {recipe.prepTime}</span>
                        <span className="ritual-chip">{recipe.servings}</span>
                        <span className="ritual-chip">{recipe.method}</span>
                        <span className="ritual-chip">{recipe.difficulty}</span>
                      </div>
                      <p className="mt-5 text-xs leading-6 text-espresso/50"><strong className="text-espresso/72">Best moment:</strong> {recipe.moment}</p>

                      <h4 className="smallcaps mt-6 text-xs text-rosegold-light">Ingredients</h4>
                      <ul className="mt-3 space-y-2">
                        {recipe.ingredients.map((ingredient) => (
                          <li key={ingredient} className="flex gap-3 text-xs leading-6 text-espresso/65">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rosegold" />
                            <span>{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="smallcaps text-xs text-rosegold-light">Method</h4>
                      <ol className="mt-3 space-y-3">
                        {recipe.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="grid grid-cols-[28px_1fr] gap-3 text-xs leading-6 text-espresso/65">
                            <span className="font-display text-lg text-rosegold-light">{String(stepIndex + 1).padStart(2, "0")}</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>

                      <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border border-rosegold/12 bg-champagne/20 p-4">
                          <p className="smallcaps text-[10px] text-rosegold-light">Tasting notes</p>
                          <ul className="mt-2 space-y-2 text-[11px] leading-5 text-espresso/58">
                            {recipe.tastingNotes.map((note) => <li key={note}>• {note}</li>)}
                          </ul>
                        </div>
                        <div className="rounded-xl border border-rosegold/12 bg-champagne/20 p-4">
                          <p className="smallcaps text-[10px] text-rosegold-light">Pairing</p>
                          <p className="mt-2 text-xs leading-6 text-espresso/62">{recipe.pairing}</p>
                        </div>
                      </div>

                      <a href={`/recipes/${recipe.slug}`} className="smallcaps mt-5 inline-flex items-center gap-2 text-[10px] font-bold text-rosegold-light hover:text-espresso">
                        Open dedicated ritual page <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </details>
            );
          })}
        </div>

        <div className="premium-glass mt-10 rounded-2xl border border-rosegold/18 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <Sparkles className="mt-1 h-6 w-6 shrink-0 text-rosegold-light" />
            <div>
              <h3 className="font-display text-2xl font-semibold">One noble coffee. Twelve elevated rituals.</h3>
              <p className="mt-3 text-xs leading-6 text-espresso/55">
                The ritual system is designed to make the same two roast expressions behave differently through temperature, texture, dilution, spices, cacao, milk, botanicals and preparation technique. The coffee remains the protagonist; additions are culinary options, not treatment protocols.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomepageEnhancements() {
  const [cognitionMount, setCognitionMount] = useState<HTMLElement | null>(null);
  const [ritualMount, setRitualMount] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const evidence = document.getElementById("evidence");
    const ritualLab = document.getElementById("ritual-lab");
    if (!evidence || !ritualLab) return;

    const cognition = document.createElement("div");
    cognition.dataset.baristoEnhancement = "cognition";
    evidence.parentNode?.insertBefore(cognition, evidence);

    const rituals = document.createElement("div");
    rituals.dataset.baristoEnhancement = "ritual-library";
    ritualLab.insertAdjacentElement("afterend", rituals);

    setCognitionMount(cognition);
    setRitualMount(rituals);

    return () => {
      cognition.remove();
      rituals.remove();
    };
  }, []);

  return (
    <>
      {cognitionMount && createPortal(<CognitiveEvidenceSection />, cognitionMount)}
      {ritualMount && createPortal(<RitualLibrarySection />, ritualMount)}
    </>
  );
}
