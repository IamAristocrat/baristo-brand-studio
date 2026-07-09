import heroMountains from "@/assets/hero-mountains.jpg";
import medallionAsset from "@/assets/baristo-logo.png.asset.json";
const medallion = medallionAsset.url;

const promises = ["Purity", "Provenance", "Roast", "Evidence"];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-obsidian text-ivory">
      <img
        src={heroMountains}
        alt="Misty Indian high-altitude coffee mountains at golden hour"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/40 to-obsidian" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pt-32 pb-16 text-center sm:px-6 sm:pt-40 sm:pb-24">
        <img
          src={medallion}
          alt="Baristo.Online rose-gold medallion — crown, coffee bean, Indian altitude mountains, evidence seal"
          width={1024}
          height={1024}
          className="h-36 w-36 drop-shadow-[0_12px_40px_rgba(183,112,84,0.45)] sm:h-48 sm:w-48"
        />

        <p className="smallcaps mt-8 text-xs text-rosegold-light">LifeCodeOS Portfolio Product</p>

        <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-7xl">
          Baristo<span className="text-gradient-rose">.Online</span>
        </h1>

        <p className="smallcaps mt-3 text-lg text-champagne">Be Noble</p>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/80 sm:text-lg">
          Indian altitude Arabica for noble coffee rituals.
        </p>
        <p className="font-display mt-2 text-xl text-champagne italic sm:text-2xl">
          Elite by nature. Roasted for perfection.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#roasts"
            className="rounded-sm bg-gradient-rose px-6 py-3 text-xs font-semibold tracking-widest uppercase shadow-rose transition-transform hover:scale-[1.03]"
          >
            Shop Medium Roast
          </a>
          <a
            href="#roasts"
            className="rounded-sm border border-rosegold/60 px-6 py-3 text-xs font-semibold tracking-widest text-rosegold-light uppercase transition-colors hover:bg-rosegold/15"
          >
            Shop Medium-Dark
          </a>
          <a
            href="#roasts"
            className="rounded-sm border border-ivory/25 px-6 py-3 text-xs font-semibold tracking-widest text-ivory uppercase transition-colors hover:bg-ivory/10"
          >
            Shop Truly Dark
          </a>
        </div>

        <div className="mt-16 w-full border-t border-ivory/10 pt-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {promises.map((p, i) => (
              <span key={p} className="flex items-center gap-10">
                <span className="smallcaps text-sm text-champagne">{p}</span>
                {i < promises.length - 1 && <span className="hidden text-rosegold sm:inline">•</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
