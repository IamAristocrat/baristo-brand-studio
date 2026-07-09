import { aPlusModules } from "@/lib/baristo-data";
import medallion from "@/assets/medallion.png";

export function APlusModules() {
  return (
    <section id="aplus" className="bg-ivory py-20 text-espresso sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="smallcaps text-center text-xs text-rosegold-light">Amazon A+ Content</p>
        <h2 className="hairline hairline-center mt-3 text-center font-display text-4xl font-semibold sm:text-5xl">
          The Noble Story Modules
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {aPlusModules.map((mod, i) => (
            <article
              key={mod.title}
              className={`rounded-lg border border-rosegold/20 bg-champagne/40 p-8 transition-colors hover:border-rosegold/40 ${
                i === 0 ? "md:col-span-2 md:flex md:items-center md:gap-10" : ""
              }`}
            >
              {i === 0 && (
                <img
                  src={medallion}
                  alt="Baristo medallion emblem"
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="mb-6 h-28 w-28 shrink-0 md:mb-0 md:h-36 md:w-36"
                />
              )}
              <div>
                <span className="smallcaps text-[11px] text-rosegold-light">
                  Module {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-2xl font-semibold text-champagne sm:text-3xl">
                  {mod.title}
                </h3>
                <p className="mt-3 leading-relaxed text-espresso/70">{mod.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
