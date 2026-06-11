import { useEffect, useRef } from "react";
import { useGsap } from "@/lib/gsap";
import saasImg from "@/assets/work-saas.jpg";
import fintechImg from "@/assets/work-fintech.jpg";
import ecomImg from "@/assets/work-ecom.jpg";
import corpImg from "@/assets/work-corp.jpg";

const PROJECTS = [
  { name: "Helix Analytics", industry: "SaaS · B2B", img: saasImg, desc: "An AI-native analytics dashboard that turns raw product data into narrative insights.", tech: ["React", "Next.js", "tRPC", "Postgres"], result: "+212% activation" },
  { name: "Northwind Pay", industry: "Fintech", img: fintechImg, desc: "A consumer fintech app that re-imagines balances, budgets and savings with cinematic motion.", tech: ["React Native", "GraphQL", "Stripe"], result: "1.2M MAU" },
  { name: "Maison Atelier", industry: "Luxury E-commerce", img: ecomImg, desc: "A headless commerce experience for a couture fashion house with editorial storytelling.", tech: ["Shopify Hydrogen", "Three.js", "GSAP"], result: "+87% AOV" },
  { name: "Orbital Group", industry: "Corporate", img: corpImg, desc: "A flagship marketing site for a global aerospace conglomerate with rich interactive case studies.", tech: ["Astro", "WebGL", "Sanity"], result: "Awwwards SOTD" },
];

export function WorkSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = useGsap();
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".work-panel");
      panels.forEach((panel, i) => {
        if (i === panels.length - 1) return;
        gsap.to(panel, {
          scale: 0.92,
          yPercent: -8,
          opacity: 0.4,
          scrollTrigger: {
            trigger: panel,
            start: "top 5%",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="work" className="relative py-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="text-eyebrow mb-4">/ Selected work</div>
        <h2 className="text-display text-[clamp(2rem,5vw,4rem)] text-ink max-w-3xl">
          Recent products we've shaped, shipped <span className="text-violet-soft">and scaled.</span>
        </h2>
      </div>

      <div className="mt-16 space-y-10 px-4 md:px-10">
        {PROJECTS.map((p, i) => (
          <article
            key={p.name}
            className="work-panel sticky top-24 mx-auto max-w-[1300px] overflow-hidden rounded-3xl border border-white/5 bg-surface-1"
            style={{ zIndex: i + 1 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-[16/10] md:aspect-auto">
                <img src={p.img} alt={p.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-1/60 to-transparent" />
              </div>
              <div className="flex flex-col justify-between p-8 md:p-14">
                <div className="flex items-start justify-between text-xs uppercase tracking-[0.3em] text-ink-mute">
                  <span className="text-violet-soft">0{i + 1}</span>
                  <span>{p.industry}</span>
                </div>
                <div>
                  <h3 className="text-display mt-10 text-[clamp(2rem,4vw,3.6rem)] text-ink">
                    {p.name}
                  </h3>
                  <p className="mt-5 max-w-md text-ink-soft">{p.desc}</p>
                </div>
                <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="rounded-full border border-white/10 px-3 py-1 text-xs text-ink-soft">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="text-right">
                    <div className="text-display text-2xl text-violet-soft">{p.result}</div>
                    <div className="text-xs uppercase tracking-widest text-ink-mute">Outcome</div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}