

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useGsap } from "@/lib/gsap";
import devImg from "@/public/assets/service-dev.jpg";
import designImg from "@/public/assets/service-design.jpg";
import motionImg from "@/public/assets/service-motion.jpg";
import saasImg from "@/public/assets/work-saas.jpg";
import ecomImg from "@/public/assets/work-ecom.jpg";
import corpImg from "@/public/assets/work-corp.jpg";

const SERVICES = [
  { n: "01", title: "Web Development", img: devImg, desc: "Full-stack engineering with React, TypeScript and edge runtimes — built for scale.", metric: ["99", "Lighthouse"] },
  { n: "02", title: "UI / UX Design", img: designImg, desc: "Interface systems that balance editorial beauty with frictionless usability.", metric: ["+38%", "Conversion"] },
  { n: "03", title: "Web Applications", img: saasImg, desc: "Bespoke SaaS dashboards, internal tools and AI-enabled product surfaces.", metric: ["6w", "Avg. MVP"] },
  { n: "04", title: "E-Commerce", img: ecomImg, desc: "High-conversion storefronts with headless commerce architecture.", metric: ["3.2×", "AOV lift"] },
  { n: "05", title: "Performance", img: corpImg, desc: "Core Web Vitals, edge caching and rendering pipelines tuned to perfection.", metric: ["<200ms", "TTFB"] },
  { n: "06", title: "Motion & Interactive", img: motionImg, desc: "WebGL scenes, GSAP timelines and physics-based interactions.", metric: ["60fps", "Always"] },
];

export function ServicesSection() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = useGsap();
    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia("(min-width: 900px)").matches;
      if (!isDesktop || !track.current || !root.current) return;
      const t = track.current;
      const distance = () => t.scrollWidth - window.innerWidth;
      gsap.to(t, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
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
      <div className="layout-container px-4 sm:px-6 md:px-10 md:pt-10">
        <div className="flex items-end justify-between gap-8">
          <div>
            {/* <div className="text-eyebrow mb-4">/ Services</div> */}
            <h2 className="text-display text-[clamp(2rem,5vw,4rem)] text-ink max-w-2xl whitespace-nowrap sm:whitespace-normal">
              Six disciplines, <span className="text-violet-soft">one studio.</span>
            </h2>
          </div>
          {/* <div className="hidden text-sm text-ink-mute md:block">Scroll →</div> */}
        </div>
      </div>

      <div
        ref={track}
        className="mt-16 flex w-max flex-row gap-6 sm:gap-8 px-4 sm:px-6 md:mt-24 md:px-12"
      >
        {SERVICES.map((s) => (
          <article
            key={s.title}
            className="relative flex h-[60vh] sm:h-[70vh] md:h-[78vh] w-[90vw] sm:w-[88vw] max-w-[1100px] shrink-0 overflow-hidden rounded-3xl border border-white/5 bg-surface-1 md:w-[80vw]"
          >
            <Image
              src={s.img}
              alt={s.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-50"
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/30" />
            <div className="relative z-10 flex w-full flex-col justify-between p-6 sm:p-8 md:p-14">
              <div className="flex items-start justify-between">
                <span className="text-xs uppercase tracking-[0.3em] text-violet-soft">{s.n}</span>
                <span className="text-xs uppercase tracking-[0.3em] text-ink-mute">Service</span>
              </div>
              <div className="max-w-2xl">
                <h3 className="text-display text-[clamp(1.8rem,4vw,3rem)] sm:text-[clamp(2.2rem,5vw,4.5rem)] text-ink">
                  {s.title}
                </h3>
                <p className="mt-6 max-w-lg text-sm sm:text-base text-ink-soft md:text-lg">{s.desc}</p>
                <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
                  <div>
                    <div className="text-display text-2xl sm:text-3xl text-violet-soft md:text-4xl">{s.metric[0]}</div>
                    <div className="mt-1 text-xs uppercase tracking-widest text-ink-mute">{s.metric[1]}</div>
                  </div>
                  <Link className="inline-flex items-center gap-2 text-sm text-ink hover:text-violet-soft min-h-[44px] min-w-[44px] py-2" href="/contact">
                    Discuss this service →
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
        <div className="w-8 sm:w-12 shrink-0" />
      </div>
    </section>
  );
}