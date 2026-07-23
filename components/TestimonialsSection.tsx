"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useGsap } from "@/lib/gsap";
import p1 from "@/public/assets/testimonial-1.jpg";
import p2 from "@/public/assets/testimonial-2.jpg";

const ITEMS = [
  {
    quote: "ClickMasters didn't just redesign our product — they reshaped how our team thinks about craft. Every detail compounds.",
    name: "Helena Marsh",
    role: "CPO, Helix Analytics",
    portrait: p1,
  },
  {
    quote: "The most senior engineering partner we've ever worked with. Cinematic motion, real engineering, real results.",
    name: "Daniel Vogt",
    role: "Founder, Northwind Pay",
    portrait: p2,
  },
];

export function TestimonialsSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = useGsap();
    
    // Fallback registration to ensure ScrollTrigger is active
    if (gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      // 1. Heading scroll-linked entrance
      gsap.fromTo(
        ".t-heading",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".t-heading",
            start: "top 90%",
            end: "top 60%",
            scrub: 1, // Links animation progress directly to scrollbar
          },
        }
      );

      // 2. Cards and inner elements
      gsap.utils.toArray<HTMLElement>(".t-card").forEach((card) => {
        const lines = card.querySelectorAll(".t-line");
        const img = card.querySelector(".t-img");

        // Set initial states to prevent flashing before ScrollTrigger initializes
        gsap.set(card, { opacity: 0.2, y: 60 });
        gsap.set(lines, { yPercent: 110 });
        if (img) gsap.set(img, { scale: 1.35 });

        // Create a timeline linked to the scroll position
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 15%",
            scrub: 1, // The animation only progresses as the user scrolls
          },
        });

        // Animate card opacity and vertical position
        tl.to(card, {
          opacity: 1,
          y: 0,
          ease: "power2.out",
        });

        // Animate text lines reveal (cascading word-by-word)
        tl.to(
          lines,
          {
            yPercent: 0,
            ease: "none",
            stagger: 0.05, // Creates a smooth cascade effect as you scroll
          },
          0.1 // Slight offset so text starts revealing just after the card fades in
        );

        // Animate image parallax zoom
        if (img) {
          tl.to(
            img,
            {
              scale: 1,
              ease: "none",
            },
            0 // Starts at the exact same time as the timeline
          );
        }
      });
    }, root);

    // Cleanup GSAP context on unmount
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-10 md:py-20 overflow-hidden">
      <div className="layout-container px-4 sm:px-6 md:px-10">
        <h2 className="t-heading text-display text-[clamp(1.8rem,5vw,4rem)] text-ink max-w-3xl">
          Words from the people{" "}
          <span className="text-violet-soft">we build with.</span>
        </h2>
      </div>

      <div className="mt-12 md:mt-20 space-y-16 md:space-y-20">
        {ITEMS.map((t, i) => (
          <article
            key={t.name}
            className="t-card mx-auto grid max-w-[1300px] grid-cols-1 items-center gap-8 md:gap-12 px-4 sm:px-6 md:px-10 lg:grid-cols-[1fr_1.4fr]"
          >
            {/* Image Column */}
            <div
              className={`relative aspect-[4/5] overflow-hidden rounded-3xl ${
                i % 2 === 1 ? "lg:order-2" : ""
              }`}
            >
              <Image
                src={t.portrait}
                alt={t.name}
                loading="lazy"
                className="t-img absolute inset-0 h-full w-full object-cover"
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-ink-soft">
                {t.role}
              </div>
            </div>

            {/* Quote Column */}
            <div>
              <div className="text-display text-[clamp(1.4rem,3.4vw,3rem)] leading-[1.15] text-ink">
                {t.quote.split(" ").map((w, j) => (
                  <span
                    key={j}
                    className="inline-block overflow-hidden align-top mr-[0.25em]"
                  >
                    <span className="t-line inline-block">{w}</span>
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}