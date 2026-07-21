"use client";

import { useEffect, useRef, useState } from "react";
import { useGsap } from "@/lib/gsap";

const CAPABILITIES = [
  { 
    n: "01", 
    t: "Frontend Excellence", 
    d: "Modern React, Next.js, and TypeScript — building interfaces that are fast, accessible, and a joy to use." 
  },
  { 
    n: "02", 
    t: "Backend & APIs", 
    d: "Robust Node.js services, RESTful APIs, and database architecture that scales with your business." 
  },
  { 
    n: "03", 
    t: "Motion & Interaction", 
    d: "Cinematic animations and micro-interactions using GSAP and Framer Motion that elevate user experiences." 
  },
  { 
    n: "04", 
    t: "Performance First", 
    d: "Sub-second load times, Core Web Vitals optimization, and lighthouse scores that dominate." 
  },
  { 
    n: "05", 
    t: "Headless CMS", 
    d: "Sanity, Contentful, or Strapi — content management that empowers your team without limitations." 
  },
  { 
    n: "06", 
    t: "Full‑Stack Delivery", 
    d: "From database to deployment — end-to-end solutions that are secure, monitored, and maintainable." 
  },
];

export function ProcessSection() {
  const root = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { gsap, ScrollTrigger } = useGsap();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".process-step");
      
      // For each step on the right, create ScrollTriggers that smoothly
      // update the activeIndex as the user scrolls through them
      items.forEach((item, i) => {
        // Scrolling down: when this item enters from below, activate it
        ScrollTrigger.create({
          trigger: item,
          start: "top 60%",
          onEnter: () => setActiveIndex(i),
        });

        // Scrolling up: when this item exits upward, activate the previous one
        ScrollTrigger.create({
          trigger: item,
          start: "top 60%",
          onLeaveBack: () => {
            if (i > 0) setActiveIndex(i - 1);
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [gsap, ScrollTrigger]);

  // Animate left content when activeIndex changes
  useEffect(() => {
    const bigs = gsap.utils.toArray<HTMLElement>(".process-big");
    
    bigs.forEach((b, i) => {
      gsap.to(b, {
        opacity: i === activeIndex ? 1 : 0,
        y: i === activeIndex ? 0 : 12,
        duration: 0.6,
        ease: "expo.out",
        overwrite: "auto",
      });
    });

    gsap.to(".process-progress", {
      scaleY: (activeIndex + 1) / CAPABILITIES.length,
      duration: 0.6,
      ease: "expo.out",
      overwrite: "auto",
    });
  }, [activeIndex, gsap]);

  return (
    <section ref={root} id="process" className="relative py-16 md:py-20">
      <div className="layout-container px-4 sm:px-6 md:px-10">
        <h2 className="text-display max-w-3xl text-[clamp(2rem,5vw,4rem)] text-ink">
          Web development <span className="text-violet-soft">expertise</span> that delivers.
        </h2>

        <div className="mt-12 md:mt-20 grid grid-cols-1 gap-12 md:gap-16 lg:grid-cols-[1fr_1fr]">
          {/* Left side — sticky with dynamic content */}
          <div className="relative order-2 lg:order-1">
            <div className="sticky top-24 md:top-32 h-[50vh] md:h-[70vh]">
              {/* Vertical progress bar */}
              <div className="absolute left-0 top-0 h-full w-px bg-white/10">
                <div
                  className="process-progress absolute inset-x-0 top-0 origin-top h-full bg-violet"
                  style={{ transform: "scaleY(0.0001)" }}
                />
              </div>

              {/* Content that swaps one-by-one */}
              <div className="relative pl-6 md:pl-10 h-full flex items-center">
                <div className="relative w-full min-h-[16rem] md:min-h-[20rem]">
                  {CAPABILITIES.map((s, i) => (
                    <div
                      key={s.n}
                      className="process-big absolute inset-0 flex flex-col justify-center"
                      style={{ opacity: i === activeIndex ? 1 : 0 }}
                    >
                      <div className="text-eyebrow mb-2 md:mb-3 text-violet-soft text-xs">
                        Capability {s.n}
                      </div>
                      <div className="text-display text-[clamp(3rem,12vw,8rem)] md:text-[clamp(5rem,14vw,12rem)] leading-none text-ink">
                        {s.n}
                      </div>
                      <div className="mt-2 md:mt-4 text-display text-2xl md:text-3xl lg:text-5xl text-ink">
                        {s.t}
                      </div>
                      <p className="mt-4 md:mt-6 max-w-md text-sm md:text-base text-ink-soft">{s.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right side — scrollable list of steps */}
          <div className="space-y-16 md:space-y-24 lg:space-y-40 order-1 lg:order-2">
            {CAPABILITIES.map((s) => (
              <div key={s.n} className="process-step border-t border-white/10 pt-6 md:pt-8">
                <div className="flex items-baseline justify-between">
                  <div className="text-display text-3xl md:text-4xl text-ink-soft">{s.n}</div>
                  <div className="text-xs uppercase tracking-widest text-ink-mute">
                    Expertise
                  </div>
                </div>
                <h3 className="text-display mt-4 md:mt-6 text-2xl md:text-3xl lg:text-4xl text-ink">
                  {s.t}
                </h3>
                <p className="mt-3 md:mt-4 max-w-md text-sm md:text-base text-ink-soft">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}