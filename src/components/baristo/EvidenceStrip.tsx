import { Leaf, ShieldCheck, QrCode, BadgeCheck } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { evidencePoints } from "@/lib/baristo-data";

const icons = [Leaf, ShieldCheck, QrCode, BadgeCheck] as const;

export function EvidenceStrip() {
  return (
    <TooltipProvider delayDuration={150}>
      <div className="relative z-10 border-y border-champagne/60 bg-ivory/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-3 sm:gap-x-10 sm:py-4">
          {evidencePoints.map((point, i) => {
            const Icon = icons[i] ?? BadgeCheck;
            return (
              <Tooltip key={point.title}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="group inline-flex items-center gap-2 rounded-full border border-champagne bg-white/70 px-3 py-1.5 text-[11px] font-medium tracking-wider text-espresso uppercase transition-all hover:border-rosegold/60 hover:bg-rosegold/10 hover:shadow-sm"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-rose text-espresso shadow-rose">
                      <Icon className="h-2.5 w-2.5" strokeWidth={2.5} />
                    </span>
                    <span className="smallcaps">{point.title}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  sideOffset={8}
                  className="max-w-[16rem] rounded-md border border-champagne bg-white px-4 py-3 text-xs leading-relaxed text-espresso shadow-luxe"
                >
                  <p className="font-display text-[11px] font-semibold text-rosegold">
                    {point.title}
                  </p>
                  <p className="mt-1 text-espresso/80">{point.body}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}
