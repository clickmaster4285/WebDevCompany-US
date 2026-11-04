"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useGsap } from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";

// Import images
import devImg from "@/public/assets/service-dev.jpg";
import designImg from "@/public/assets/service-design.jpg";
import saasImg from "@/public/assets/work-saas.jpg";
import ecomImg from "@/public/assets/work-ecom.jpg";
import corpImg from "@/public/assets/work-corp.jpg";

// Featured services — image + real content from your services data file
const FEATURED_SERVICES = [
  {
    n: "01",
    title: "Web Development Services",
    slug: "web-development-services",
    img: devImg,
    desc: "Professional web development services for US businesses. We design, build, and scale fast, secure, SEO-ready websites that turn visitors into customers.",
    metric: ["99", "Lighthouse"],
  },
  {
    n: "02",
    title: "Web Design Services (UI/UX)",
    slug: "web-design-services",
    img: designImg,
    desc: "Professional web design services combining UI/UX best practices. We design websites for US businesses that are beautiful, usable, and built to convert.",
    metric: ["+38%", "Conversion"],
  },
  {
    n: "03",
    title: "SaaS Development",
    slug: "saas-development",
    img: saasImg,
    desc: "Full-cycle SaaS development services covering MVP to scale. We build secure, multi-tenant SaaS platforms for US startups and growth-stage companies.",
    metric: ["6w", "Avg. MVP"],
  },
  {
    n: "04",
    title: "eCommerce Development",
    slug: "ecommerce-development",
    img: ecomImg,
    desc: "Custom eCommerce development services that increase conversions and sales. We build fast, secure online stores for US retailers on any platform.",
    metric: ["3.2×", "AOV lift"],
  },
  {
    n: "05",
    title: "Website Speed Optimization",
    slug: "website-speed-optimization",
    img: corpImg,
    desc: "We make your site load faster, which helps both your visitors and your search rankings. Core Web Vitals, edge caching and rendering pipelines tuned to perfection.",
    metric: ["<200ms", "TTFB"],
  },
];

// Blueprint grid backdrop — fine 16px grid + coarse 96px grid, tinted with the theme's primary color
const BLUEPRINT_GRID: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px),
    linear-gradient(to right, rgba(94,168,255,0.10) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(94,168,255,0.10) 1px, transparent 1px)
  `,
  backgroundSize: "16px 16px, 16px 16px, 96px 96px, 96px 96px",
  maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
  WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
};

export function ServicesSection() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  // Horizontal scroll for featured services
  useEffect(() => {
    const { gsap } = useGsap();
    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia("(min-width: 900px)").matches;
      if (!isDesktop || !track.current || !root.current) return;

      const t = track.current;
      
      // The wrapper has padding, but the track itself is just the content.
      // So scrollWidth - window.innerWidth will stop the track perfectly 
      // at the right edge of the screen, leaving the last card fully in view.
      const getDistance = () => Math.max(0, t.scrollWidth - window.innerWidth);

      gsap.to(t, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="services" className="relative overflow-hidden py-10 md:py-20">
      {/* Blueprint grid backdrop */}
      <div className="pointer-events-none absolute inset-0" style={BLUEPRINT_GRID} aria-hidden="true" />

      <div className="layout-container relative px-4 sm:px-6 md:px-10">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-primary/70">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" />
            <span>Service Index</span>
            <span className="text-white/30">/ 05 featured</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Our Web Development Services
          </h2>
          <p className="text-base md:text-lg text-white/60 max-w-3xl">
            Here is a look at everything we offer, from custom web development to online stores and AI powered tools.
          </p>
        </div>

        {/* Featured Services - Horizontal Scroll */}
        <div className="mb-12">
          <div className="mb-6 flex items-center gap-3">
            <h3 className="text-xl font-semibold text-white/90">Featured Services</h3>
            <span className="h-px flex-1 bg-white/10" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
              Scroll to pan →
            </span>
          </div>

          {/* 
            The Wrapper:
            - overflows visible so cards don't get clipped
            - has a negative right margin so it bleeds to the edge of the screen (if you want that)
          */}
          <div className="w-full overflow-visible">
            <div
              ref={track}
              className="flex w-max flex-row gap-6 sm:gap-8"
            >
              {FEATURED_SERVICES.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group relative flex h-[50vh] sm:h-[60vh] w-[85vw] sm:w-[80vw] max-w-[900px] shrink-0 overflow-hidden border border-white/10 bg-surface-1 transition-colors duration-300 hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
                >
                  {/* ruler ticks along the top edge */}
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 z-20 h-3 opacity-40"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(to right, rgba(94,168,255,0.6) 0, rgba(94,168,255,0.6) 1px, transparent 1px, transparent 24px)",
                    }}
                    aria-hidden="true"
                  />
                  <Image
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-35 transition-transform duration-700 group-hover:scale-105"
                    fill
                  />
                  <div className="absolute inset-0" style={BLUEPRINT_GRID} aria-hidden="true" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-transparent to-background/40" />

                  <div className="relative z-10 flex w-full flex-col justify-between p-6 sm:p-8 md:p-10">
                    {/* Top row — part number left, nav arrow right */}
                    <div className="flex items-start justify-between font-mono text-xs uppercase tracking-[0.25em]">
                      <span className="text-primary/80">Part // {s.n}</span>
                      <span
                        className="inline-flex h-9 w-9 items-center justify-center border border-white/15 bg-white/[0.03] text-white/60 transition-all duration-300 group-hover:border-primary/60 group-hover:bg-primary/10 group-hover:text-primary"
                        aria-hidden="true"
                      >
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>

                    <div className="max-w-2xl">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                        {s.title}
                      </h3>
                      <p className="mt-4 max-w-lg text-sm sm:text-base text-white/55">{s.desc}</p>
                      <div className="mt-6 flex items-center gap-8">
                        <div className="border-l-2 border-primary/60 pl-3">
                          <div className="font-mono text-2xl sm:text-3xl font-bold text-primary">{s.metric[0]}</div>
                          <div className="mt-1 text-[10px] uppercase tracking-widest text-white/40">{s.metric[1]}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* View All Services CTA */}
        <div className="flex justify-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-3 border border-white/15 bg-white/[0.02] px-8 py-4 font-mono text-sm uppercase tracking-[0.2em] text-white/70 transition-all duration-300 ease-out hover:border-primary/50 hover:bg-primary/5 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
          >
            <span>View all services</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}