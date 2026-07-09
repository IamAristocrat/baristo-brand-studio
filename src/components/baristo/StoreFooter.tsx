import medallion from "@/assets/medallion.png";

export function StoreFooter() {
  return (
    <footer className="bg-obsidian py-14 text-ivory">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <img
          src={medallion}
          alt="Baristo.Online medallion"
          loading="lazy"
          width={1024}
          height={1024}
          className="mx-auto h-16 w-16 opacity-90"
        />
        <p className="mt-5 font-display text-xl font-semibold">
          Baristo.Online <span className="mx-2 text-rosegold">|</span>
          <span className="smallcaps text-champagne">Be Noble</span>
          <span className="mx-2 text-rosegold">|</span>
          <span className="text-ivory/70">LifeCodeOS Portfolio</span>
        </p>
        <p className="mt-3 text-sm text-ivory/60">
          Roasted and packed for LifeCodeOS by Aristoverse DeepTech.
        </p>
        <p className="mx-auto mt-6 max-w-xl border-t border-ivory/10 pt-6 text-xs leading-relaxed text-ivory/40">
          Compliance note: All communication uses lifestyle and sensory ritual language only; Baristo
          products are not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </footer>
  );
}
