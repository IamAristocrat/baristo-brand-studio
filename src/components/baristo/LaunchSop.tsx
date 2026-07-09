import { useState } from "react";
import { sopChecklist, sopPackaging } from "@/lib/baristo-data";

export function LaunchSop() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (item: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });

  const progress = Math.round((checked.size / sopChecklist.length) * 100);

  return (
    <section id="launch-sop" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="smallcaps text-center text-xs text-primary">India Retail Readiness</p>
        <h2 className="hairline hairline-center mt-3 text-center font-display text-4xl font-semibold sm:text-5xl">
          Launch SOP &amp; Compliance
        </h2>

        <div className="mt-14 grid gap-8 lg:grid-cols-[3fr_2fr]">
          <div className="rounded-lg border bg-card p-7 shadow-card-luxe">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-2xl font-semibold">Statutory Checklist</h3>
              <span className="smallcaps text-xs text-primary">{checked.size}/{sopChecklist.length} complete</span>
            </div>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-rose transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <ul className="mt-6 grid gap-1 sm:grid-cols-2">
              {sopChecklist.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => toggle(item)}
                    className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted"
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border text-[11px] transition-colors ${
                        checked.has(item)
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input bg-background"
                      }`}
                    >
                      {checked.has(item) ? "✓" : ""}
                    </span>
                    <span className={checked.has(item) ? "text-muted-foreground line-through" : ""}>{item}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <div className="rounded-lg border bg-card p-7 shadow-card-luxe">
              <h3 className="font-display text-2xl font-semibold">Packaging Recommendation</h3>
              <ul className="mt-5 space-y-3">
                {sopPackaging.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-rose" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg bg-gradient-ivory p-7 text-espresso shadow-luxe">
              <p className="smallcaps text-xs text-rosegold-light">Brand Hierarchy</p>
              <p className="mt-3 font-display text-xl font-semibold text-rosegold">
                Baristo.Online dominant on the front.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-espresso/70">
                LifeCodeOS and Aristoverse DeepTech appear in the statutory and story area — supporting
                the noble front-of-pack presence, never competing with it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
