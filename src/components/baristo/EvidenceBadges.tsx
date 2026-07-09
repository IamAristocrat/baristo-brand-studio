import { Leaf, ShieldCheck, QrCode, BadgeCheck, Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { evidencePoints } from "@/lib/baristo-data";

const icons = [Leaf, ShieldCheck, QrCode, BadgeCheck] as const;

const proofs = [
  "Sourced from single-estate Indian Arabica lots. Every pouch is traceable to the origin region on the QR code.",
  "Zero chicory, zero fillers, zero flavour additives. Verified against every batch's ingredient declaration.",
  "Batch code + roast date + packed date + best-before printed on pack. Scan the QR for the full dossier.",
  "Sensory and lifestyle language only. FSSAI-compliant labeling — no medicinal or disease claims.",
];

interface Props {
  variant?: "light" | "dark";
  align?: "start" | "center";
  className?: string;
  heading?: string;
}

export function EvidenceBadges({
  variant = "light",
  align = "start",
  className = "",
  heading = "Quality Evidence",
}: Props) {
  const dark = variant === "dark";
  const chipBase = dark
    ? "border-rosegold/25 bg-champagne/40/70 text-espresso hover:border-rosegold hover:bg-rosegold/10"
    : "border-champagne bg-card text-espresso hover:border-primary hover:bg-primary/5";
  const iconWrap = dark
    ? "bg-gradient-rose text-espresso shadow-rose"
    : "bg-gradient-rose text-espresso shadow-rose";
  const labelSub = dark ? "text-espresso/50" : "text-muted-foreground";
  const headingColor = dark ? "text-rosegold-light" : "text-primary";

  return (
    <div className={className}>
      <p className={`smallcaps text-[10px] ${headingColor}`}>
        {heading} · Tap each to reveal
      </p>
      <div className={`mt-3 flex flex-wrap gap-2 ${align === "center" ? "justify-center" : ""}`}>
        {evidencePoints.map((point, i) => {
          const Icon = icons[i] ?? BadgeCheck;
          return (
            <Popover key={point.title}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={`group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${chipBase}`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${iconWrap}`}
                  >
                    <Icon className="h-3 w-3" strokeWidth={2.4} />
                  </span>
                  <span className="smallcaps text-[10px] tracking-widest">{point.title}</span>
                  <Info className={`h-3 w-3 opacity-50 ${labelSub}`} />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align={align === "center" ? "center" : "start"}
                className="w-72 border border-champagne/60 bg-card p-0 shadow-luxe"
              >
                <div className="border-b border-champagne/60 bg-gradient-to-br from-rosegold/10 to-transparent px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-rose text-espresso shadow-rose">
                      <Icon className="h-3.5 w-3.5" strokeWidth={2.4} />
                    </span>
                    <p className="font-display text-sm font-semibold text-espresso">
                      {point.title}
                    </p>
                  </div>
                </div>
                <div className="px-4 py-3">
                  <p className="text-xs leading-relaxed text-espresso/80">{point.body}</p>
                  <div className="mt-3 rounded-sm border border-champagne bg-ivory/60 p-3">
                    <p className="smallcaps text-[9px] text-primary">How we prove it</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                      {proofs[i]}
                    </p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          );
        })}
      </div>
    </div>
  );
}
