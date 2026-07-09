import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useState } from "react";

const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export function CartDrawer() {
  const { items, open, setOpen, setQty, remove, count, subtotal, savings, clear } = useCart();
  const [placed, setPlaced] = useState(false);

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setPlaced(false);
      }}
    >
      <SheetContent className="flex w-full flex-col gap-0 border-l border-rosegold/20 bg-ivory p-0 text-espresso sm:max-w-md">
        <SheetHeader className="border-b border-rosegold/20 px-6 py-5">
          <SheetTitle className="flex items-center gap-3 font-display text-xl text-espresso">
            <span className="smallcaps text-[10px] text-rosegold-light">Your Ritual</span>
          </SheetTitle>
          <p className="font-display text-2xl font-semibold text-espresso">
            The Cart
            <span className="ml-2 text-sm text-espresso/50">
              {count} {count === 1 ? "item" : "items"}
            </span>
          </p>
        </SheetHeader>

        {placed ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-rose text-espresso shadow-rose">
              ✓
            </div>
            <h3 className="font-display text-2xl font-semibold">Ritual reserved</h3>
            <p className="text-sm text-espresso/60">
              This is a preview checkout. Your selection has been noted for the launch cohort.
            </p>
            <button
              onClick={() => {
                clear();
                setPlaced(false);
                setOpen(false);
              }}
              className="smallcaps mt-4 rounded-sm border border-rosegold/25 px-5 py-2.5 text-xs text-espresso hover:border-rosegold-light hover:text-rosegold-light"
            >
              Continue Browsing
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <ShoppingBag className="h-10 w-10 text-espresso/30" strokeWidth={1.2} />
            <h3 className="font-display text-xl">Your cart is empty</h3>
            <p className="text-sm text-espresso/50">
              Select a roast and size to begin your Baristo ritual.
            </p>
            <div className="mt-3 flex flex-col gap-2">
              <button
                onClick={() => setOpen(false)}
                className="smallcaps rounded-sm bg-gradient-rose px-5 py-2.5 text-xs font-semibold text-espresso shadow-rose"
              >
                Shop Roasts
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  setTimeout(() => {
                    document.getElementById("cases")?.scrollIntoView({ behavior: "smooth" });
                  }, 300);
                }}
                className="smallcaps rounded-sm border border-rosegold/25 px-5 py-2.5 text-xs font-semibold text-espresso hover:border-rosegold-light hover:text-rosegold-light"
              >
                Shop Case Collections
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="divide-y divide-ivory/10">
                {items.map((i) => (
                  <li key={i.id} className="flex gap-4 py-4">
                    {i.image ? (
                      <img
                        src={i.image}
                        alt={i.roastName}
                        className="h-20 w-16 shrink-0 rounded-sm object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-20 w-16 shrink-0 items-center justify-center rounded-sm bg-gradient-rose text-[10px] font-semibold uppercase tracking-widest text-espresso shadow-rose">
                        Kit
                      </div>
                    )}
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate font-display text-base font-semibold text-espresso">
                            {i.roastName}
                          </p>
                          <p className="smallcaps mt-0.5 text-[10px] text-rosegold-light">
                            {i.sizeLabel} · {i.sizeSub}
                          </p>
                        </div>
                        <button
                          onClick={() => remove(i.id)}
                          aria-label="Remove item"
                          className="text-espresso/40 hover:text-rosegold-light"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {i.isCasePack && (
                        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 rounded-sm border border-rosegold/15 bg-champagne/30 px-2.5 py-2">
                          <div>
                            <span className="block text-[9px] uppercase tracking-wider text-rosegold">Roast</span>
                            <span className="block text-[11px] text-espresso/80">
                              {i.roastKey === "case-medium"
                                ? "Medium Roast"
                                : i.roastKey === "case-medium-dark"
                                  ? "Medium-Dark Roast"
                                  : i.roastKey === "case-truly-dark"
                                    ? "Truly Dark Roast"
                                    : "Mixed Roasts"}
                            </span>
                          </div>
                          <div>
                            <span className="block text-[9px] uppercase tracking-wider text-rosegold">Qty</span>
                            <span className="block text-[11px] text-espresso/80">
                              {i.packsPerCase} pouches × {i.qty} case{i.qty > 1 ? "s" : ""}
                            </span>
                          </div>
                          <div className="col-span-2">
                            <span className="block text-[9px] uppercase tracking-wider text-rosegold">Pack</span>
                            <span className="block text-[11px] text-espresso/80">{i.packSplit}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="block text-[9px] uppercase tracking-wider text-rosegold">Batch</span>
                            <span className="block text-[11px] font-mono text-espresso/80">{i.batchQr}</span>
                          </div>
                        </div>
                      )}

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center rounded-sm border border-rosegold/25">
                          <button
                            onClick={() => setQty(i.id, i.qty - 1)}
                            aria-label="Decrease quantity"
                            className="flex h-8 w-8 items-center justify-center text-espresso/70 hover:text-rosegold-light"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium tabular-nums">
                            {i.qty}
                          </span>
                          <button
                            onClick={() => setQty(i.id, i.qty + 1)}
                            aria-label="Increase quantity"
                            className="flex h-8 w-8 items-center justify-center text-espresso/70 hover:text-rosegold-light"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-sm font-semibold text-espresso tabular-nums">
                            {fmt(i.price * i.qty)}
                          </p>
                          {i.mrp > i.price && (
                            <p className="text-[11px] text-espresso/40 line-through tabular-nums">
                              {fmt(i.mrp * i.qty)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-rosegold/20 bg-champagne/40 px-6 py-5">
              <div className="flex items-center justify-between text-sm text-espresso/70">
                <span>Subtotal</span>
                <span className="tabular-nums">{fmt(subtotal)}</span>
              </div>
              {savings > 0 && (
                <div className="mt-1 flex items-center justify-between text-xs text-rosegold-light">
                  <span>You save</span>
                  <span className="tabular-nums">−{fmt(savings)}</span>
                </div>
              )}
              <div className="mt-3 flex items-baseline justify-between border-t border-rosegold/20 pt-3">
                <span className="smallcaps text-[11px] text-espresso/60">Order Total</span>
                <span className="font-display text-2xl font-semibold text-espresso tabular-nums">
                  {fmt(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-espresso/40">
                Inclusive of all taxes. Shipping calculated at checkout.
              </p>

              <button
                onClick={() => setPlaced(true)}
                className="mt-4 w-full rounded-sm bg-gradient-rose px-5 py-3.5 text-xs font-bold tracking-widest text-espresso uppercase shadow-rose transition-transform hover:scale-[1.01]"
              >
                Secure Checkout · {fmt(subtotal)}
              </button>
              <button
                onClick={clear}
                className="smallcaps mt-2 w-full text-[10px] text-espresso/40 hover:text-rosegold-light"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
