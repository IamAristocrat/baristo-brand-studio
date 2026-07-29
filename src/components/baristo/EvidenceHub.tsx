import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Check, FileText, Clock, ShieldCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { proofDossiers } from "@/lib/evidence-data";

const filters = ["All proofs", "On demand", "On application"] as const;
type Filter = (typeof filters)[number];

export function EvidenceHub() {
  const [filter, setFilter] = useState<Filter>("All proofs");
  const [selected, setSelected] = useState<string[]>([]);
  const [batch, setBatch] = useState("");

  const visible = useMemo(
    () => proofDossiers.filter((d) => filter === "All proofs" || d.release === filter),
    [filter],
  );

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const submit = () => {
    if (selected.length === 0) {
      toast.error("Select at least one proof dossier to request.");
      return;
    }
    toast.success(
      `${selected.length} proof ${selected.length === 1 ? "dossier" : "dossiers"} requested${
        batch.trim() ? ` for batch ${batch.trim().toUpperCase()}` : ""
      }`,
      { description: "Release is on demand or on application — our roast desk responds by email." },
    );
    setSelected([]);
  };

  return (
    <section id="proofs" className="relative overflow-hidden bg-gradient-ivory py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--rosegold)/0.12),_transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <p className="smallcaps text-center text-xs text-primary">Proof, Released Deliberately</p>
        <h2 className="hairline hairline-center mt-3 text-center font-display text-4xl font-semibold sm:text-5xl">
          What Each Proof Includes
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-muted-foreground">
          Every pouch of premium ground coffee carries a batch code, a roast date and a packed date.
          The records behind them are not published in bulk — they are released per batch, on demand
          or on application, to the person holding the pack.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`smallcaps rounded-full border px-4 py-2 text-[10px] tracking-widest transition-all ${
                filter === f
                  ? "border-rosegold bg-gradient-rose text-espresso shadow-rose"
                  : "border-champagne bg-card text-espresso/70 hover:border-rosegold/60"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {visible.map((d) => {
            const active = selected.includes(d.id);
            return (
              <article
                key={d.id}
                className={`flex flex-col rounded-xl border bg-white/55 p-6 shadow-card-luxe backdrop-blur-xl transition-all ${
                  active ? "border-rosegold shadow-luxe" : "border-rosegold/25 hover:border-rosegold/60"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-rose text-espresso shadow-rose">
                    <FileText className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <span className="smallcaps rounded-full border border-champagne bg-ivory/70 px-2.5 py-1 text-[9px] text-primary">
                    {d.release}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-espresso">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-espresso/70">{d.summary}</p>

                <Accordion type="single" collapsible className="mt-3">
                  <AccordionItem value="includes" className="border-b-0">
                    <AccordionTrigger className="smallcaps py-2 text-[10px] tracking-widest text-primary hover:no-underline">
                      What it includes
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {d.includes.map((i) => (
                          <li key={i} className="flex gap-2 text-xs leading-relaxed text-espresso/75">
                            <Check className="mt-0.5 h-3 w-3 shrink-0 text-rosegold" strokeWidth={3} />
                            {i}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <p className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Clock className="h-3 w-3" /> {d.turnaround}
                </p>

                <button
                  type="button"
                  onClick={() => toggle(d.id)}
                  aria-pressed={active}
                  className={`smallcaps mt-5 w-full rounded-sm border px-4 py-2.5 text-[10px] tracking-widest transition-all ${
                    active
                      ? "border-rosegold bg-gradient-rose text-espresso shadow-rose"
                      : "border-rosegold/40 text-espresso hover:bg-rosegold/10"
                  }`}
                >
                  {active ? "Selected for request" : "Select this proof"}
                </button>
              </article>
            );
          })}
        </div>

        <div className="mt-12 rounded-xl border border-rosegold/30 bg-white/60 p-6 shadow-card-luxe backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
            <div className="flex-1">
              <p className="smallcaps text-[10px] text-primary">Request on application</p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-espresso">
                Raise a batch proof request
              </h3>
              <p className="mt-2 text-sm text-espresso/70">
                Enter the batch code printed beside the roast date on your pouch. Selected:{" "}
                <span className="font-semibold text-rosegold">{selected.length}</span>{" "}
                {selected.length === 1 ? "dossier" : "dossiers"}.
              </p>
            </div>
            <div className="flex w-full gap-2 sm:w-auto">
              <input
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                placeholder="Batch code"
                aria-label="Batch code"
                className="w-full rounded-sm border border-champagne bg-ivory/80 px-3 py-2.5 text-sm text-espresso placeholder:text-espresso/40 focus:border-rosegold focus:outline-none sm:w-40"
              />
              <button
                type="button"
                onClick={submit}
                className="smallcaps shrink-0 rounded-sm bg-gradient-rose px-5 py-2.5 text-[10px] tracking-widest text-espresso shadow-rose transition-transform hover:scale-[1.03]"
              >
                Request
              </button>
            </div>
          </div>
          <p className="mt-5 flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rosegold" />
            Records are sensory, provenance and process documents only. Baristo.Online premium ground
            coffee is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </div>
    </section>
  );
}
