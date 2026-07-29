import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export interface CartItem {
  id: string; // roastKey + sizeLabel
  roastKey: string;
  roastName: string;
  sizeLabel: string;
  sizeSub: string;
  price: number;
  mrp: number;
  qty: number;
  image: string;
  isCasePack?: boolean;
  packsPerCase?: number;
  packSplit?: string;
}

interface CartCtx {
  items: CartItem[];
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  savings: number;
  lastAddedId: string | null;
  lastAddedAt: number;
}

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<{ id: string | null; at: number }>({
    id: null,
    at: 0,
  });

  const value = useMemo<CartCtx>(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);
    const savings = items.reduce((n, i) => n + (i.mrp - i.price) * i.qty, 0);
    return {
      items,
      open,
      setOpen,
      count,
      subtotal,
      savings,
      lastAddedId: lastAdded.id,
      lastAddedAt: lastAdded.at,
      add: (item, qty = 1) => {
        setItems((cur) => {
          const idx = cur.findIndex((c) => c.id === item.id);
          if (idx >= 0) {
            const next = cur.slice();
            next[idx] = { ...next[idx], qty: next[idx].qty + qty };
            return next;
          }
          return [...cur, { ...item, qty }];
        });
        setLastAdded({ id: item.id, at: Date.now() });
      },
      remove: (id) => setItems((cur) => cur.filter((c) => c.id !== id)),
      setQty: (id, qty) =>
        setItems((cur) =>
          qty <= 0
            ? cur.filter((c) => c.id !== id)
            : cur.map((c) => (c.id === id ? { ...c, qty } : c)),
        ),
      clear: () => setItems([]),
    };
  }, [items, open, lastAdded]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be used inside CartProvider");
  return v;
}
