import { ShieldCheck } from "lucide-react";
import { PACKAGING_REPRESENTATION_COPY } from "@/lib/roast-science";

export function PackagingRepresentationNotice({ compact = false, dark = false }: { compact?: boolean; dark?: boolean }) {
  return (
    <aside
      aria-label="Packaging representation notice"
      className={`rounded-2xl border border-rosegold/20 ${compact ? "p-4" : "p-5 sm:p-6"} ${
        dark ? "bg-white/[0.045] text-ivory" : "bg-white/70 text-espresso"
      }`}
    >
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-rosegold-light" />
        <div>
          <p className="smallcaps text-[10px] font-bold text-rosegold-light">Packaging representation</p>
          <p className={`mt-2 text-xs leading-6 ${dark ? "text-ivory/58" : "text-espresso/58"}`}>
            {PACKAGING_REPRESENTATION_COPY}
          </p>
        </div>
      </div>
    </aside>
  );
}

export function GlobalPackagingRepresentationNote() {
  return (
    <section className="border-t border-rosegold/15 bg-[#151210] px-4 py-5 text-ivory sm:px-6">
      <div className="mx-auto flex max-w-7xl items-start gap-3">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-rosegold-light" />
        <p className="text-[11px] leading-5 text-ivory/50">
          <strong className="font-semibold text-ivory/70">Packaging representation:</strong> {PACKAGING_REPRESENTATION_COPY}
        </p>
      </div>
    </section>
  );
}
