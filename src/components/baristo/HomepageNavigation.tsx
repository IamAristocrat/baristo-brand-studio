import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "Roasts", href: "#roasts" },
  { label: "Story", href: "#story" },
  { label: "Evidence", href: "#evidence" },
  { label: "Ritual Lab", href: "#ritual-lab" },
  { label: "Journal", href: "/journal" },
] as const;

export function HomepageNavigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const legacyHeader = document.querySelector<HTMLElement>("header:not(.baristo-primary-nav)");
    const previousDisplay = legacyHeader?.style.display ?? "";
    const previousAriaHidden = legacyHeader?.getAttribute("aria-hidden");

    if (legacyHeader) {
      legacyHeader.style.display = "none";
      legacyHeader.setAttribute("aria-hidden", "true");
    }

    return () => {
      if (!legacyHeader) return;
      legacyHeader.style.display = previousDisplay;
      if (previousAriaHidden === null) legacyHeader.removeAttribute("aria-hidden");
      else legacyHeader.setAttribute("aria-hidden", previousAriaHidden);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`baristo-primary-nav fixed inset-x-0 top-0 z-[70] border-b transition-all ${
        scrolled
          ? "border-rosegold/15 bg-ivory/95 shadow-card-luxe backdrop-blur-xl"
          : "border-transparent bg-ivory/78 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <a href="#home" className="shrink-0 leading-none" onClick={() => setOpen(false)}>
          <span className="font-display text-xl font-semibold text-espresso">
            Baristo<span className="text-gradient-rose">.Online</span>
          </span>
          <span className="smallcaps mt-1 block text-[9px] text-rosegold-light">Experience Your Nobility.</span>
        </a>

        <nav aria-label="Primary navigation" className="hidden items-center gap-4 xl:flex 2xl:gap-6">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="smallcaps whitespace-nowrap text-[10px] font-semibold text-espresso/62 transition-colors hover:text-rosegold-light"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#first-pour"
            className="smallcaps ml-1 inline-flex min-h-10 items-center justify-center rounded-sm bg-gradient-rose px-4 py-2 text-[10px] font-bold text-espresso shadow-rose transition-transform hover:-translate-y-0.5"
          >
            Join First Pour
          </a>
        </nav>

        <div className="flex items-center xl:hidden">
          <button
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-rosegold/25 bg-ivory/80 text-espresso"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile navigation" className="border-t border-rosegold/15 bg-ivory/98 px-4 py-4 shadow-luxe xl:hidden">
          <div className="mx-auto grid max-w-7xl gap-1">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="smallcaps flex min-h-11 items-center rounded-lg px-4 text-sm font-semibold text-espresso/75 transition-colors hover:bg-champagne/35 hover:text-rosegold-light"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#first-pour"
              onClick={() => setOpen(false)}
              className="smallcaps mt-2 flex min-h-12 items-center justify-center rounded-sm bg-gradient-rose px-5 text-xs font-bold text-espresso shadow-rose"
            >
              Join First Pour
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
