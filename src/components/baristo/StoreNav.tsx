import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

const links = [
  { label: "Home", href: "#home" },
  { label: "Roasts", href: "#roasts" },
  { label: "Evidence", href: "#evidence" },
  { label: "Recipes", href: "#recipes" },
  { label: "Amazon Copy", href: "#amazon-copy" },
  { label: "Launch SOP", href: "#launch-sop" },
];

export function StoreNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();



  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-obsidian/95 shadow-luxe backdrop-blur-md" : "bg-obsidian/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#home" className="flex min-w-0 flex-col leading-none">
          <span className="truncate font-display text-base font-semibold tracking-wide text-ivory sm:text-lg">
            Baristo<span className="text-gradient-rose">.Online</span>
          </span>
          <span className="smallcaps mt-0.5 text-[9px] tracking-[0.3em] text-rosegold-light sm:text-[10px]">Be Noble</span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="smallcaps text-xs text-ivory/70 transition-colors hover:text-rosegold-light"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#roasts"
            className="hidden rounded-sm bg-gradient-rose px-4 py-2 text-xs font-semibold tracking-widest text-ivory uppercase shadow-rose transition-transform hover:scale-[1.03] sm:inline-block"
          >
            Shop Roasts
          </a>
          <button
            type="button"
            aria-label={`Open cart, ${count} items`}
            onClick={() => setCartOpen(true)}
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-ivory/20 text-ivory transition-colors hover:border-rosegold-light hover:text-rosegold-light"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gradient-rose px-1 text-[10px] font-bold text-ivory shadow-rose">
                {count}
              </span>
            )}
          </button>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-ivory/20 text-ivory lg:hidden"
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span className={`block h-px w-5 bg-current transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`block h-px w-5 bg-current transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-ivory/10 bg-obsidian px-4 py-4 lg:hidden">
          <div className="grid gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="smallcaps rounded-sm px-3 py-2.5 text-sm text-ivory/80 hover:bg-obsidian-soft hover:text-rosegold-light"
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
