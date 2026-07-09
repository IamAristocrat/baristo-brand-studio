import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("home");
      if (!hero) return;
      const heroBottom = hero.getBoundingClientRect().bottom;
      setVisible(heroBottom < 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToRoasts = () => {
    const el = document.getElementById("roasts");
    if (el) {
      el.classList.remove("scroll-highlight");
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // Trigger highlight after scroll completes (~smooth scroll duration)
      const onScrollEnd = () => {
        el.classList.add("scroll-highlight");
        window.removeEventListener("scroll", onScrollEnd);
        setTimeout(() => el.classList.remove("scroll-highlight"), 1400);
      };
      // Wait for scroll motion to settle
      let lastY = window.scrollY;
      const checkSettled = () => {
        if (window.scrollY === lastY) {
          onScrollEnd();
        } else {
          lastY = window.scrollY;
          requestAnimationFrame(checkSettled);
        }
      };
      requestAnimationFrame(checkSettled);
    }
  };

  return (
    <button
      onClick={scrollToRoasts}
      aria-label="Explore roast collection"
      className={`consciousness-motion fixed bottom-4 right-4 z-50 flex items-center gap-1.5 rounded-full border border-champagne bg-white/90 px-3.5 py-2 text-[11px] font-semibold tracking-widest text-espresso uppercase shadow-luxe backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:border-rosegold/70 hover:shadow-rose active:scale-[0.98] sm:bottom-6 sm:right-6 sm:gap-2 sm:px-5 sm:py-3 sm:text-xs ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"}`}
    >
      <span className="hidden sm:inline">Explore Roasts</span>
      <span className="sm:hidden">Roasts</span>
      <ChevronDown className="h-3 w-3 text-rosegold sm:h-3.5 sm:w-3.5" />
    </button>
  );
}
