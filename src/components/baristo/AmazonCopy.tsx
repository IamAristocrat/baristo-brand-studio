import { useState } from "react";
import { listingTitles, listingBullets } from "@/lib/baristo-data";

const tabs = ["Medium Roast", "Medium-Dark Roast", "Truly Dark Roast"];

export function AmazonCopy() {
  const [tab, setTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const copyAll = async () => {
    const text = [listingTitles[tab], "", ...listingBullets.map((b) => `• ${b.lead}: ${b.body}`)].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section id="amazon-copy" className="bg-obsidian py-20 text-ivory sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <p className="smallcaps text-center text-xs text-rosegold-light">Listing-Ready Copy</p>
        <h2 className="hairline hairline-center mt-3 text-center font-display text-4xl font-semibold sm:text-5xl">
          Amazon Listing Copy
        </h2>

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`smallcaps rounded-full border px-5 py-2 text-xs font-semibold transition-colors ${
                tab === i
                  ? "border-rosegold bg-gradient-rose text-ivory shadow-rose"
                  : "border-ivory/20 text-ivory/60 hover:border-rosegold/50 hover:text-ivory"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-ivory/10 bg-obsidian-soft p-6 sm:p-8">
          <p className="smallcaps text-[11px] text-rosegold-light">Product Title</p>
          <p className="mt-2 font-medium leading-relaxed text-champagne">{listingTitles[tab]}</p>

          <p className="smallcaps mt-8 text-[11px] text-rosegold-light">Five Bullet Points</p>
          <ul className="mt-3 space-y-4">
            {listingBullets.map((b) => (
              <li key={b.lead} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-rose" />
                <p className="text-sm leading-relaxed text-ivory/75">
                  <span className="font-semibold text-ivory">{b.lead}:</span> {b.body}
                </p>
              </li>
            ))}
          </ul>

          <button
            onClick={copyAll}
            className="mt-8 rounded-sm border border-rosegold/60 px-5 py-2.5 text-xs font-semibold tracking-widest text-rosegold-light uppercase transition-colors hover:bg-rosegold/15"
          >
            {copied ? "Copied ✓" : "Copy Listing Text"}
          </button>
        </div>
      </div>
    </section>
  );
}
