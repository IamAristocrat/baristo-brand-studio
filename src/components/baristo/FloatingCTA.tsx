import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const SECTIONS = [
  { id: "roasts", label: "Roasts", longLabel: "Explore Roasts" },
  { id: "evidence", label: "Evidence", longLabel: "Quality Evidence" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

function getActiveSection(): SectionId | null {
  const scrollY = window.scrollY + window.innerHeight * 0.4; // 40% viewport as threshold

  for (let i = SECTIONS.length - 1; i >= 0; i--) {
    const el = document.getElementById(SECTIONS[i].id);
    if (el && el.offsetTop <= scrollY) {
      return SECTIONS[i].id;
    }
  }
  return null;
}

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [targetId, setTargetId] = useState<SectionId>("roasts");

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("home");
      const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
      const passedHero = heroBottom < 0;

      const active = getActiveSection();

      // Determine next target
      let next: SectionId | null = null;
      if (!active) {
        next = "roasts";
      } else if (active === "roasts") {
        next = "evidence";
      } else {
        next = null; // past evidence
      }

      if (next) {
        setTargetId(next);
        setVisible(passedHero);
      } else {
        setVisible(false);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const target = SECTIONS.find((s) => s.id === targetId)!;

  const scrollToTarget = () => {
    const el = document.getElementById(targetId);
    if (!el) return;

    // Clear highlight on all destination sections first
    SECTIONS.forEach((s) => {
      document.getElementById(s.id)?.classList.remove("scroll-highlight");
    });

    el.scrollIntoView({ behavior: "smooth", block: "start" });

    // Trigger highlight after scroll settles
    let lastY = window.scrollY;
    const checkSettled = () => {
      if (window.scrollY === lastY) {
        el.classList.add("scroll-highlight");
        setTimeout(() => el.classList.remove("scroll-highlight"), 1400);
      } else {
        lastY = window.scrollY;
        requestAnimationFrame(checkSettled);
      }
    };
    requestAnimationFrame(checkSettled);
  };

  return (
    <button
      onClick={scrollToTarget}
      aria-label={target.longLabel}
      className={`consciousness-motion fixed bottom-4 right-4 z-50 flex items-center gap-1.5 rounded-full border border-champagne bg-white/90 px-3.5 py-2 text-[11px] font-semibold tracking-widest text-espresso uppercase shadow-luxe backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:border-rosegold/70 hover:shadow-rose active:scale-[0.98] sm:bottom-6 sm:right-6 sm:gap-2 sm:px-5 sm:py-3 sm:text-xs ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"}`}
    >
      <span className="hidden sm:inline">{target.longLabel}</span>
      <span className="sm:hidden">{target.label}</span>
      <ChevronDown className="h-3 w-3 text-rosegold sm:h-3.5 sm:w-3.5" />
    </button>
  );
}
