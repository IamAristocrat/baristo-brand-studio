import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { roasts, brewGuides, type RoastKey } from "@/lib/baristo-data";

type Focus = RoastKey | "all";

const intensityLabel = ["", "Whisper", "Elegant", "Balanced", "Structured", "Command"];

export function RoastComparison() {
  const [focus, setFocus] = useState<Focus>("all");

  return (
    <section
      id="compare"
      className="relative overflow-hidden bg-ivory py-20 text-espresso sm:py-28"
    >
      {/* Ambient rose-gold glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-rosegold/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="smallcaps text-xs text-rosegold-light">The Roast Atlas</p>
          <h2 className="hairline hairline-center mt-3 font-display text-4xl font-semibold sm:text-5xl">
            Compare the Three Masters
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-espresso/70 sm:text-base">
            Three calibrated expressions of single-origin Indian Arabica grown at high altitudes
            — weigh strength, flavor architecture, and ideal brew methods side by side and choose
            the cup tuned to your peak performance.
          </p>
        </div>

        {/* Focus toggle */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          <FocusChip active={focus === "all"} onClick={() => setFocus("all")}>
            All Three
          </FocusChip>
          {roasts.map((r) => (
            <FocusChip
              key={r.key}
              active={focus === r.key}
              onClick={() => setFocus(r.key)}
            >
              {r.name.replace(" Roast", "")}
            </FocusChip>
          ))}
        </div>

        {/* Comparison grid */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {roasts.map((roast) => {
            const guide = brewGuides[roast.key];
            const dimmed = focus !== "all" && focus !== roast.key;
            const spotlit = focus === roast.key;

            return (
              <article
                key={roast.key}
                className={`group relative flex flex-col overflow-hidden rounded-lg border bg-champagne/40 p-8 transition-all duration-500 ${
                  spotlit
                    ? "scale-[1.02] border-rosegold shadow-rose"
                    : dimmed
                      ? "border-ivory/5 opacity-40"
                      : "border-rosegold/20 hover:border-rosegold/50"
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="smallcaps text-[10px] text-rosegold-light">
                      Master No. {["medium", "dark", "truly-dark"].indexOf(roast.key) + 1}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-espresso">
                      {roast.name}
                    </h3>
                    <p className="mt-1 text-xs italic text-rosegold/80">{roast.tagline}</p>
                  </div>
                </div>

                {/* Strength meter */}
                <div className="mt-8">
                  <div className="flex items-baseline justify-between">
                    <p className="smallcaps text-[10px] text-espresso/50">Strength</p>
                    <p className="text-xs font-medium text-rosegold-light">
                      {intensityLabel[roast.intensity]}
                    </p>
                  </div>
                  <div className="mt-3 flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          i <= roast.intensity
                            ? "bg-gradient-rose"
                            : "bg-champagne/40"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Flavor notes */}
                <div className="mt-8">
                  <p className="smallcaps text-[10px] text-espresso/50">Flavor Architecture</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {roast.notes.map((note) => (
                      <span
                        key={note}
                        className="rounded-full border border-rosegold/30 bg-rosegold/5 px-3 py-1 text-[11px] font-medium text-rosegold"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cupping snapshot */}
                <div className="mt-8">
                  <p className="smallcaps text-[10px] text-espresso/50">Cupping Snapshot</p>
                  <dl className="mt-3 space-y-2 text-xs">
                    {guide.cupping.map((c) => (
                      <div
                        key={c.attribute}
                        className="flex items-center justify-between border-b border-ivory/5 pb-2 last:border-0"
                      >
                        <dt className="text-espresso/60">{c.attribute}</dt>
                        <dd className="font-medium text-espresso">{c.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Ideal brew methods */}
                <div className="mt-8 flex-1">
                  <p className="smallcaps text-[10px] text-espresso/50">Ideal Brew Methods</p>
                  <ul className="mt-3 space-y-3">
                    {guide.methods.map((m, i) => (
                      <li
                        key={m.method}
                        className={`rounded-sm border px-3 py-2.5 ${
                          i === 0
                            ? "border-rosegold/40 bg-gradient-to-r from-rosegold/10 to-transparent"
                            : "border-rosegold/20 bg-ivory/40"
                        }`}
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="text-sm font-semibold text-espresso">
                            {m.method}
                            {i === 0 && (
                              <span className="smallcaps ml-2 text-[9px] text-rosegold-light">
                                Signature
                              </span>
                            )}
                          </span>
                          <span className="shrink-0 font-mono text-[10px] text-espresso/50">
                            {m.ratio} · {m.temp}
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] leading-relaxed text-espresso/60">
                          {m.note}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Link
                  to="/roasts/$roastKey"
                  params={{ roastKey: roast.key }}
                  className="smallcaps mt-8 block rounded-sm border border-rosegold/60 py-3 text-center text-[11px] font-bold tracking-widest text-rosegold-light transition-colors hover:bg-rosegold/15 hover:text-espresso"
                >
                  Enter {roast.name.replace(" Roast", "")}
                </Link>
              </article>
            );
          })}
        </div>

        {/* Legend */}
        <p className="mt-10 text-center text-[11px] text-espresso/40">
          Signature method denotes the roast's calibrated expression — the pour we recommend first.
        </p>
      </div>
    </section>
  );
}

function FocusChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`smallcaps rounded-full border px-5 py-2 text-[11px] font-semibold transition-all ${
        active
          ? "border-rosegold bg-gradient-rose text-espresso shadow-rose"
          : "border-rosegold/25 text-espresso/60 hover:border-rosegold/50 hover:text-espresso"
      }`}
    >
      {children}
    </button>
  );
}
