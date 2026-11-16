import Link from "next/link";

const FACTS = [
  { value: "+1 325 202 4074", label: "United States", href: "tel:+13252024074" },
  { value: "+44 7988 576086", label: "United Kingdom", href: "tel:+447988576086" },
  { value: "+92 332 5394285", label: "Pakistan", href: "tel:+923325394285" },
  { value: "Case studies", label: "Published outcomes", href: "/case-studies" },
];

export function ResultsSection() {
  return (
    <section className="relative py-10">
      <div className="layout-container px-4 sm:px-6 md:px-10">
        <h2 className="text-display text-[clamp(1.8rem,5vw,4rem)] text-ink max-w-3xl mx-auto">
          Reach the desk for <span className="text-violet-soft">your market.</span>
        </h2>

        <div className="mt-12 md:mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((fact, i) => (
            <Link
              key={fact.label}
              href={fact.href}
              className="relative bg-surface-1 p-6 sm:p-8 md:p-10 transition-all duration-300 ease-out hover:bg-surface-2 hover:shadow-lg hover:shadow-primary/5"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-violet-soft">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mt-6 text-2xl font-semibold tracking-tight text-ink md:mt-8 md:text-3xl">
                {fact.value}
              </div>
              <div className="mt-3 text-xs text-ink-mute sm:text-sm md:mt-4">{fact.label}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}