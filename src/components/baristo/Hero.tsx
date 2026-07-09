import { brandSubtitle } from "@/lib/baristo-data";
import heroMountains from "@/assets/hero-mountains.jpg";
import medallion from "@/assets/medallion.png";

const promises = ["Purity", "Provenance", "Roast", "Evidence"];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-ivory text-espresso">
      <img
        src={heroMountains}
        alt="Misty Indian high-altitude coffee mountains at golden hour"
        width={1920}
        height={1080}
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ivory/80 via-ivory/40 to-champagne" />

      {/* Consciousness glow field */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center" style={{ paddingTop: 'clamp(4rem, 10vh, 8rem)' }}>
        <div className="relative">
          {/* Core aura */}
          <div
            className="absolute -inset-12 rounded-full blur-3xl sm:-inset-16 lg:-inset-20"
            style={{
              background: 'radial-gradient(circle, oklch(0.72 0.075 45 / 0.35) 0%, oklch(0.6 0.085 42 / 0.12) 50%, transparent 70%)',
              animation: 'pulse-glow 8s ease-in-out infinite',
            }}
          />
          {/* Outer ring */}
          <div
            className="absolute -inset-24 rounded-full border border-rosegold/10 sm:-inset-32 lg:-inset-40"
            style={{ animation: 'rotate-slow 60s linear infinite' }}
          >
            <div className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-rosegold/30 blur-[1px]" />
          </div>
          {/* Inner ring */}
          <div
            className="absolute -inset-16 rounded-full border border-rosegold/15 sm:-inset-20 lg:-inset-28"
            style={{ animation: 'rotate-slow 40s linear infinite reverse' }}
          >
            <div className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-rosegold/25 blur-[1px]" />
          </div>
          {/* Geometric hex hint */}
          <div
            className="absolute -inset-8 opacity-0 sm:-inset-12 lg:-inset-16"
            style={{
              opacity: 0.08,
              background: `repeating-conic-gradient(from 0deg, oklch(0.72 0.075 45) 0deg 60deg, transparent 60deg 120deg)`,
              maskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
              animation: 'breathe 10s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      {/* Readability mask — soft radial clearing behind logo & headings */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 70% at 50% 35%, oklch(0.977 0.011 85 / 0.78) 0%, oklch(0.977 0.011 85 / 0.35) 45%, transparent 75%)',
        }}
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 pt-16 pb-12 text-center sm:px-6 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-20">
        <img
          src={medallion}
          alt="Baristo.Online rose-gold medallion — crown, coffee bean, Indian altitude mountains, Be Noble"
          width={1024}
          height={1024}
          fetchPriority="high"
          className="aspect-square w-[min(72vw,18rem)] max-w-full rounded-full drop-shadow-[0_16px_48px_rgba(183,112,84,0.5)] sm:w-[min(52vw,22rem)] md:w-[26rem] lg:w-[30rem]"
        />

        <p className="smallcaps mt-5 text-[10px] text-rosegold-light sm:mt-6 sm:text-xs">
          LifeCodeOS Portfolio Product
        </p>

        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:mt-4 sm:text-6xl md:text-7xl">
          Baristo<span className="text-gradient-rose">.Online</span>
        </h1>

        <p className="smallcaps mt-2 text-sm text-rosegold sm:mt-3 sm:text-base">Be Noble</p>

        <p className="mx-auto mt-4 max-w-[36ch] text-base leading-relaxed text-espresso/80 sm:mt-5 sm:max-w-2xl sm:text-lg sm:leading-relaxed text-balance">
          {brandSubtitle}
        </p>

        <p className="font-display mt-3 text-lg italic text-rosegold sm:mt-4 sm:text-2xl text-balance">
          Elite by nature. Roasted for perfection.
        </p>

        <div className="mt-8 grid w-full max-w-md grid-cols-1 gap-3 sm:mt-10 sm:max-w-none sm:grid-cols-3 sm:gap-4">
          <a
            href="#roasts"
            className="inline-flex h-12 items-center justify-center rounded-sm bg-gradient-rose px-6 text-xs font-semibold uppercase tracking-widest text-espresso shadow-rose transition-transform hover:scale-[1.03]"
          >
            Shop Medium Roast
          </a>
          <a
            href="#roasts"
            className="inline-flex h-12 items-center justify-center rounded-sm border border-rosegold/60 px-6 text-xs font-semibold uppercase tracking-widest text-rosegold-light transition-colors hover:bg-rosegold/15"
          >
            Shop Medium-Dark
          </a>
          <a
            href="#roasts"
            className="inline-flex h-12 items-center justify-center rounded-sm border border-rosegold/40 px-6 text-xs font-semibold uppercase tracking-widest text-espresso transition-colors hover:bg-champagne/40"
          >
            Shop Truly Dark
          </a>
        </div>

        <div className="mt-12 w-full border-t border-rosegold/20 pt-6 sm:mt-14 sm:pt-8">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-10">
            {promises.map((p, i) => (
              <li key={p} className="flex items-center gap-x-6 sm:gap-x-10">
                <span className="smallcaps text-xs text-rosegold sm:text-sm">{p}</span>
                {i < promises.length - 1 && (
                  <span aria-hidden className="text-rosegold/60">•</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
