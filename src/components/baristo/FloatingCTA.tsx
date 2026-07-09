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
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <button
      onClick={scrollToRoasts}
      aria-label="Explore roast collection"
      className={`consciousness-motion fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-champagne bg-white/90 px-5 py-3 text-xs font-semibold tracking-widest text-espresso uppercase shadow-luxe backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:border-rosegold/70 hover:shadow-rose active:scale-[0.98] ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"}`}
    >
      <span className="hidden sm:inline">Explore Roasts</span>
      <span className="sm:hidden">Roasts</span>
      <ChevronDown className="h-3.5 w-3.5 text-rosegold" />
    </button>
  );
}
