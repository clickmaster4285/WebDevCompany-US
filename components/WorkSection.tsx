"use client";


import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useGsap } from "@/lib/gsap";

const PROJECTS = [
  {
    name: "PropTech portfolio platform",
    industry: "PropTech",
    img: "/assets/casestudy/proptech.jpg",
    href: "/case-studies/proptech-build-to-rent-portfolio-management",
    desc: "Portfolio management platform for a UK build-to-rent landlord. Scope and stated outcomes are in the project write-up.",
    tech: ["React", "Node.js/Fastify", "PostgreSQL"],
  },
  {
    name: "FinTech wealth platform",
    industry: "FinTech",
    img: "/assets/casestudy/fintech.jpg",
    href: "/case-studies/fintech-wealth-management-platform",
    desc: "Wealth management platform for a UK discretionary investment manager. Scope and stated outcomes are in the project write-up.",
    tech: ["React", "Node.js/Fastify", "PostgreSQL"],
  },
  {
    name: "Housing allocations platform",
    industry: "GovTech",
    img: "/assets/casestudy/govtech.jpg",
    href: "/case-studies/govtech-housing-allocations-platform",
    desc: "Housing allocations platform for a UK district council. Scope and stated outcomes are in the project write-up.",
    tech: ["React", "GOV.UK Design System", "Node.js/Fastify"],
  },
  {
    name: "Frailty assessment tool",
    industry: "HealthTech",
    img: "/assets/casestudy/healthtech.jpg",
    href: "/case-studies/healthtech-frailty-assessment-tool",
    desc: "Frailty assessment tool for an NHS community trust. Scope and stated outcomes are in the project write-up.",
    tech: ["React", "Node.js/Fastify", "PostgreSQL"],
  },
  {
    name: "Fashion marketplace",
    industry: "eCommerce",
    img: "/assets/casestudy/ecommerce.jpg",
    href: "/case-studies/ecommerce-fashion-marketplace-platform",
    desc: "Multi-brand marketplace for a UK retailer. Scope and stated outcomes are in the project write-up.",
    tech: ["Next.js", "React", "Shopify Plus"],
  },
];

export function WorkSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const { gsap } = useGsap();
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
    <section ref={root} id="work" className="relative py-10 md:py-20">
      <div className="layout-container px-4 sm:px-6 md:px-10">
        <h2 className="text-display mx-auto text-[clamp(2rem,5vw,4rem)] text-ink max-w-3xl">
          Recent products we&apos;ve shaped, shipped <span className="text-violet-soft">and scaled.</span>
        </h2>
      </div>

      <div className="mt-12 sm:mt-16 space-y-8 sm:space-y-10 px-4 sm:px-6 md:px-10">
        {PROJECTS.map((p, i) => (
          <article
            key={p.href}
            className="work-panel sticky top-20 sm:top-24 mx-auto max-w-[1300px] overflow-hidden rounded-3xl border border-white/5 bg-surface-1"
            style={{ zIndex: i + 1 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-[16/10] md:aspect-auto">
                <Image src={p.img} alt={p.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" fill sizes="(max-width: 768px) 100vw, 650px" quality={60} />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-1/60 to-transparent" />
              </div>
              <div className="flex flex-col justify-between p-6 sm:p-8 md:p-14">
                <div className="flex items-start justify-between text-xs uppercase tracking-[0.3em] text-ink-mute">
                  <span className="text-violet-soft">{String(i + 1).padStart(2, "0")}</span>
                  <span>{p.industry}</span>
                </div>
                <div>
                  <h3 className="text-display mt-6 sm:mt-10 text-[clamp(1.8rem,4vw,3.6rem)] text-ink">
                    <Link href={p.href} className="hover:text-violet-soft">
                      {p.name}
                    </Link>
                  </h3>
                  <p className="mt-4 sm:mt-5 max-w-md text-sm sm:text-base text-ink-soft">{p.desc}</p>
                </div>
                <div className="mt-8 sm:mt-10 flex flex-wrap items-end justify-between gap-4 sm:gap-6">
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-ink-soft min-h-[32px] flex items-center">
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link href={p.href} className="text-sm text-violet-soft hover:text-primary">
                    Read the write-up
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
