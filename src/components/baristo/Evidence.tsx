import { evidencePoints } from "@/lib/baristo-data";

const icons = ["☕", "✦", "◈", "✓"];

export function Evidence() {
  return (
    <section id="evidence" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="smallcaps text-center text-xs text-primary">Evidence-Based Noble Arabica</p>
        <h2 className="hairline hairline-center mt-3 text-center font-display text-4xl font-semibold sm:text-5xl">
          Evidence &amp; Quality
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-center text-muted-foreground">
          Purity, provenance, and roast — visible in every pack. Quality you can scan, not just read.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {evidencePoints.map((point, i) => (
            <article
              key={point.title}
              className="rounded-lg border bg-card p-7 text-center shadow-card-luxe transition-shadow hover:shadow-luxe"
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-rose text-xl text-espresso shadow-rose">
                {icons[i]}
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{point.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/evidence-hub"
            className="smallcaps inline-block rounded-sm bg-gradient-rose px-6 py-3 text-[10px] tracking-widest text-espresso shadow-rose transition-transform hover:scale-[1.03]"
          >
            Open the Evidence Hub
          </a>
        </div>

        <div className="mt-12 rounded-lg border border-primary/30 bg-secondary/50 p-6 text-center">
          <p className="smallcaps text-xs text-primary">Compliance Note</p>
          <p className="mt-2 text-sm text-muted-foreground">
            All Baristo communication uses lifestyle and sensory ritual language only. Baristo products
            are not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </div>
    </section>
  );
}
