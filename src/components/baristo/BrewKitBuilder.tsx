import { useMemo, useState } from "react";
import { Check, Plus, Sparkles } from "lucide-react";
import { roasts, type Recipe, type RoastKey } from "@/lib/baristo-data";
import { useCart } from "@/hooks/use-cart";
import pouchMedium from "@/assets/pouch-medium.jpg";
import pouchMediumDark from "@/assets/pouch-medium-dark.jpg";
import pouchDark from "@/assets/pouch-dark.jpg";

const pouchImages: Record<RoastKey, string> = {
  medium: pouchMedium,
  "medium-dark": pouchMediumDark,
  "truly-dark": pouchDark,
};

const roastNameToKey: Record<"Medium" | "Medium-Dark" | "Truly Dark", RoastKey> = {
  Medium: "medium",
  "Medium-Dark": "medium-dark",
  "Truly Dark": "truly-dark",
};

interface Accessory {
  id: string;
  name: string;
  sub: string;
  price: number;
  mrp: number;
}

const ALL_ACCESSORIES: Record<string, Accessory> = {
  scale: { id: "acc-scale", name: "Precision Brew Scale", sub: "0.1g · timer", price: 1899, mrp: 2499 },
  kettle: { id: "acc-kettle", name: "Gooseneck Kettle", sub: "Matte black · 1L", price: 3499, mrp: 4499 },
  grinder: { id: "acc-grinder", name: "Hand Grinder", sub: "Conical burr · 40 clicks", price: 4499, mrp: 5999 },
  v60: { id: "acc-v60", name: "V60 Dripper Set", sub: "Ceramic · 02 size", price: 1299, mrp: 1699 },
  filters: { id: "acc-filters", name: "Filter Papers", sub: "Unbleached · 100 ct", price: 349, mrp: 449 },
  french: { id: "acc-french", name: "French Press", sub: "Double-wall · 600ml", price: 2499, mrp: 3199 },
  moka: { id: "acc-moka", name: "Moka Pot", sub: "Stovetop · 3 cup", price: 1999, mrp: 2599 },
  aeropress: { id: "acc-aeropress", name: "AeroPress Set", sub: "Original + filters", price: 3199, mrp: 3899 },
  coldbrew: { id: "acc-coldbrew", name: "Cold Brew Carafe", sub: "1L · steel mesh", price: 2299, mrp: 2999 },
  frother: { id: "acc-frother", name: "Milk Frother", sub: "Handheld · rose gold", price: 899, mrp: 1199 },
  glass: { id: "acc-glass", name: "Ritual Glass Set", sub: "Pair · double-wall", price: 1499, mrp: 1899 },
};

function suggestFor(method: string): string[] {
  const m = method.toLowerCase();
  if (m.includes("pour")) return ["v60", "filters", "kettle", "scale"];
  if (m.includes("espresso")) return ["scale", "grinder", "glass"];
  if (m.includes("moka") || m.includes("stovetop")) return ["moka", "frother"];
  if (m.includes("french")) return ["french", "kettle"];
  if (m.includes("aero")) return ["aeropress", "kettle", "scale"];
  if (m.includes("cold")) return ["coldbrew", "glass"];
  if (m.includes("blender") || m.includes("shake") || m.includes("whipped")) return ["frother", "glass", "scale"];
  if (m.includes("steamed") || m.includes("latte")) return ["frother", "glass"];
  return ["scale", "kettle", "glass"];
}

const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export function BrewKitBuilder({ recipe }: { recipe: Recipe }) {
  const { add, setOpen } = useCart();

  const availableRoasts = recipe.roasts.map((rn) => roasts.find((r) => r.key === roastNameToKey[rn])!);
  const [roastKey, setRoastKey] = useState<RoastKey>(availableRoasts[0].key);
  const roast = roasts.find((r) => r.key === roastKey)!;

  const [sizeIdx, setSizeIdx] = useState(0);
  const size = roast.sizes[sizeIdx];

  const suggested = suggestFor(recipe.method);
  const [selected, setSelected] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(suggested.map((k) => [k, true])),
  );

  const accessoryKeys = useMemo(() => {
    const set = new Set([...suggested, "grinder", "scale", "kettle", "frother", "glass"]);
    return Array.from(set);
  }, [suggested]);

  const total = useMemo(() => {
    let n = size.price;
    for (const k of accessoryKeys) {
      if (selected[k]) n += ALL_ACCESSORIES[k].price;
    }
    return n;
  }, [size.price, selected, accessoryKeys]);

  const totalMrp = useMemo(() => {
    let n = size.mrp;
    for (const k of accessoryKeys) {
      if (selected[k]) n += ALL_ACCESSORIES[k].mrp;
    }
    return n;
  }, [size.mrp, selected, accessoryKeys]);

  const kitCount = 1 + accessoryKeys.filter((k) => selected[k]).length;

  const handleAdd = () => {
    add({
      id: `${roast.key}-${size.label}`,
      roastKey: roast.key,
      roastName: roast.name,
      sizeLabel: size.label,
      sizeSub: size.sub,
      price: size.price,
      mrp: size.mrp,
      image: pouchImages[roast.key],
    });
    for (const k of accessoryKeys) {
      if (!selected[k]) continue;
      const a = ALL_ACCESSORIES[k];
      add({
        id: a.id,
        roastKey: "kit",
        roastName: a.name,
        sizeLabel: "Brew Kit",
        sizeSub: a.sub,
        price: a.price,
        mrp: a.mrp,
        image: "",
      });
    }
    setOpen(true);
  };

  return (
    <section className="border-t border-champagne/40 bg-ivory py-20 text-espresso sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <span className="smallcaps inline-flex items-center gap-2 rounded-full border border-rosegold/40 bg-rosegold/10 px-3 py-1 text-[10px] text-rosegold-light">
            <Sparkles className="h-3 w-3" /> One-Tap Ritual
          </span>
          <h2 className="hairline hairline-center mt-4 font-display text-4xl font-semibold sm:text-5xl">
            Add the Brew Kit
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-espresso/60">
            Everything the {recipe.method.toLowerCase()} needs — the roast, the tools, and the small
            luxuries. Adjust the kit, then add it to your cart in one motion.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          {/* Roast + size picker */}
          <div className="rounded-lg border border-rosegold/20 bg-champagne/40 p-7 shadow-luxe">
            <p className="smallcaps text-[10px] text-rosegold-light">Step 01 · The Coffee</p>
            <h3 className="mt-2 font-display text-2xl font-semibold">Choose your roast</h3>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {availableRoasts.map((r) => {
                const active = r.key === roastKey;
                return (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => setRoastKey(r.key)}
                    className={`group flex items-center gap-3 rounded-sm border p-3 text-left transition-all ${
                      active
                        ? "border-rosegold bg-gradient-to-br from-rosegold/15 to-transparent"
                        : "border-rosegold/20 hover:border-rosegold/50"
                    }`}
                  >
                    <img
                      src={pouchImages[r.key]}
                      alt={r.name}
                      className="h-14 w-11 shrink-0 rounded-sm object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-sm font-semibold text-espresso">
                        {r.name}
                      </p>
                      <p className="smallcaps text-[9px] text-espresso/50">{r.tagline}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="smallcaps mt-8 text-[10px] text-rosegold-light">Step 02 · The Pour Size</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {roast.sizes.map((s, i) => {
                const active = i === sizeIdx;
                return (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setSizeIdx(i)}
                    className={`flex items-center justify-between rounded-sm border p-4 text-left transition-all ${
                      active
                        ? "border-rosegold bg-gradient-to-br from-rosegold/15 to-transparent"
                        : "border-rosegold/20 hover:border-rosegold/50"
                    }`}
                  >
                    <div>
                      <p className="font-display text-base font-semibold">{s.label}</p>
                      <p className="smallcaps text-[9px] text-espresso/50">{s.sub}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold tabular-nums">{fmt(s.price)}</p>
                      <p className="text-[10px] text-espresso/40 line-through tabular-nums">
                        {fmt(s.mrp)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accessories */}
          <div className="rounded-lg border border-rosegold/20 bg-champagne/40 p-7 shadow-luxe">
            <p className="smallcaps text-[10px] text-rosegold-light">Step 03 · The Instruments</p>
            <h3 className="mt-2 font-display text-2xl font-semibold">Complete the ritual</h3>
            <p className="mt-2 text-xs text-espresso/50">
              Suggested for {recipe.method.toLowerCase()} — untick anything you already own.
            </p>

            <ul className="mt-5 divide-y divide-ivory/10">
              {accessoryKeys.map((k) => {
                const a = ALL_ACCESSORIES[k];
                const on = !!selected[k];
                const isSuggested = suggested.includes(k);
                return (
                  <li key={k}>
                    <button
                      type="button"
                      onClick={() => setSelected((s) => ({ ...s, [k]: !s[k] }))}
                      className="flex w-full items-center gap-4 py-3.5 text-left"
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border transition-all ${
                          on
                            ? "border-rosegold bg-gradient-rose text-espresso shadow-rose"
                            : "border-ivory/25"
                        }`}
                      >
                        {on && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate font-display text-sm font-semibold text-espresso">
                            {a.name}
                          </p>
                          {isSuggested && (
                            <span className="smallcaps rounded-full border border-rosegold/40 px-1.5 py-0.5 text-[8px] text-rosegold-light">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="smallcaps text-[9px] text-espresso/45">{a.sub}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold tabular-nums">{fmt(a.price)}</p>
                        <p className="text-[10px] text-espresso/40 line-through tabular-nums">
                          {fmt(a.mrp)}
                        </p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Total bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-lg border border-rosegold/30 bg-gradient-to-r from-rosegold/15 via-champagne/40 to-transparent p-6 sm:flex-row">
          <div>
            <p className="smallcaps text-[10px] text-rosegold-light">
              Kit Total · {kitCount} {kitCount === 1 ? "piece" : "pieces"}
            </p>
            <div className="mt-1 flex items-baseline gap-3">
              <span className="font-display text-3xl font-semibold text-espresso tabular-nums">
                {fmt(total)}
              </span>
              {totalMrp > total && (
                <span className="text-sm text-espresso/40 line-through tabular-nums">
                  {fmt(totalMrp)}
                </span>
              )}
              {totalMrp > total && (
                <span className="smallcaps rounded-sm bg-rosegold/20 px-2 py-0.5 text-[10px] text-rosegold-light">
                  Save {fmt(totalMrp - total)}
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="smallcaps inline-flex items-center gap-2 rounded-sm bg-gradient-rose px-6 py-3.5 text-xs font-bold tracking-widest text-espresso uppercase shadow-rose transition-transform hover:scale-[1.02]"
          >
            <Plus className="h-4 w-4" /> Add Brew Kit to Cart
          </button>
        </div>
      </div>
    </section>
  );
}
