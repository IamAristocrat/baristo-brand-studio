import { cn } from "@/lib/utils";

interface ConsciousnessOverlayProps {
  /**
   * Visual intensity: subtle = gentle aura only,
   * standard = aura + geometric pulse,
   * full = aura + rings + geometric pulse
   */
  intensity?: "subtle" | "standard" | "full";
  /**
   * Size of the glow field relative to container.
   * xs=compact, sm=modest, md=balanced, lg=expansive
   */
  spread?: "xs" | "sm" | "md" | "lg";
  /** Show the soft radial readability mask behind content */
  readabilityMask?: boolean;
  /** Extra className on the wrapper */
  className?: string;
  /** Extra styles for fine-tuned positioning */
  style?: React.CSSProperties;
  /** Children render in front of the overlay */
  children?: React.ReactNode;
}

const spreadMap = {
  xs: { aura: "-inset-8", outer: "-inset-10", inner: "-inset-8", geo: "-inset-6" },
  sm: { aura: "-inset-12", outer: "-inset-16", inner: "-inset-12", geo: "-inset-8" },
  md: { aura: "-inset-16 sm:-inset-20 lg:-inset-24", outer: "-inset-24 sm:-inset-32 lg:-inset-40", inner: "-inset-16 sm:-inset-20 lg:-inset-28", geo: "-inset-10 sm:-inset-14 lg:-inset-18" },
  lg: { aura: "-inset-20 sm:-inset-28 lg:-inset-36", outer: "-inset-32 sm:-inset-44 lg:-inset-52", inner: "-inset-24 sm:-inset-32 lg:-inset-40", geo: "-inset-14 sm:-inset-20 lg:-inset-24" },
};

export function ConsciousnessOverlay({
  intensity = "standard",
  spread = "md",
  readabilityMask = false,
  className,
  style,
  children,
}: ConsciousnessOverlayProps) {
  const s = spreadMap[spread];

  return (
    <div className={cn("relative", className)} style={style}>
      {/* Glow field */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ contain: "layout paint" }}
      >
        <div className="relative">
          {/* Core aura */}
          <div
            className={cn("absolute rounded-full blur-2xl", s.aura)}
            style={{
              background:
                "radial-gradient(circle, oklch(0.72 0.075 45 / 0.32) 0%, oklch(0.6 0.085 42 / 0.1) 55%, transparent 75%)",
              animation: "pulse-glow 8s ease-in-out infinite",
              willChange: "transform, opacity",
            }}
          />

          {/* Outer ring */}
          {intensity === "full" && (
            <div
              className={cn("absolute rounded-full border border-rosegold/10", s.outer)}
              style={{ animation: "rotate-slow 60s linear infinite", willChange: "transform" }}
            >
              <div className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-rosegold/30" />
            </div>
          )}

          {/* Inner ring */}
          {intensity === "full" && (
            <div
              className={cn("absolute rounded-full border border-rosegold/15", s.inner)}
              style={{ animation: "rotate-slow 40s linear infinite reverse", willChange: "transform" }}
            >
              <div className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-rosegold/25" />
            </div>
          )}

          {/* Geometric pulse */}
          {intensity !== "subtle" && (
            <div
              className={cn("absolute rounded-full", s.geo)}
              style={{
                background:
                  "radial-gradient(circle, oklch(0.72 0.075 45 / 0.06) 0%, transparent 60%)",
                animation: "breathe 10s ease-in-out infinite",
                willChange: "opacity",
              }}
            />
          )}
        </div>
      </div>

      {/* Readability mask */}
      {readabilityMask && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 50% 35%, oklch(0.977 0.011 85 / 0.78) 0%, oklch(0.977 0.011 85 / 0.35) 45%, transparent 75%)",
          }}
        />
      )}

      {children}
    </div>
  );
}
