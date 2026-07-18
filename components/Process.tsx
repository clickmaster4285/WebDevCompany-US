"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import type { StaticImageData } from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import process1 from "@/public/solution/process1.png";
import process2 from "@/public/solution/process2.png";
import process3 from "@/public/solution/process3.png";
import process4 from "@/public/solution/process4.png";
import process5 from "@/public/solution/process5.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const resolveImageSrc = (image: string | StaticImageData) =>
  typeof image === "string" ? image : image.src;

const phases = [
  { num: "01", label: "Discovery", desc: "We map the full terrain — users, market, competitors, and constraints. Assumptions get stress-tested, blind spots get surfaced, and clear hypotheses are formed before anything else moves.", image: resolveImageSrc(process1) },
  { num: "02", label: "Strategy", desc: "We sequence the work, lock in the metrics, and align every stakeholder on what success actually looks like. No ambiguity, no drift — just a focused plan the whole team can execute against.", image: resolveImageSrc(process2) },
  { num: "03", label: "Design", desc: "Design systems, motion language, and interface logic come alive. Every decision is grounded in user behavior and brand intent — built for clarity, obsessed with feel.", image: resolveImageSrc(process3) },
  { num: "04", label: "Development", desc: "Performance-obsessed engineering from infrastructure to interface. We write clean, scalable code and sweat every interaction detail — because slow or broken isn't an option.", image: resolveImageSrc(process4) },
  { num: "05", label: "Launch", desc: "We ship with precision, measure what actually matters, and iterate fast on real data. The work doesn't stop at go-live — we compound results until the numbers prove it.", image: resolveImageSrc(process5) },
];

export function Process() {
  const pinRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!pinRef.current) return;
    
    const totalScroll = window.innerHeight * 0.8 * phases.length;

    const trigger = ScrollTrigger.create({
      trigger: pinRef.current,
      start: "top top",
      end: `+=${totalScroll}`,
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = Math.max(0, Math.min(1, self.progress));
        const newPhase = Math.min(Math.floor(progress * phases.length), phases.length - 1);
        setPhase((prev) => (prev !== newPhase ? newPhase : prev));
      },
    });

    return () => { trigger.kill(); };
  }, []);

  return (
    <section id="process" className="relative bg-background">
      {/* Top Heading */}
      <div className="layout-container sm:px-6 px-9 md:px-12 py-8 md:py-20">
        <h2 className="text-display max-w-3xl text-[clamp(2rem,5vw,3.5rem)] text-ink">
          A measured journey from <span className="text-violet-soft">idea to impact.</span>
        </h2>
      </div>

      {/* Pinned Scroll Section */}
      <div ref={pinRef} className="relative h-[80vh] overflow-hidden bg-background">
        
        <div className="layout-container h-full w-full mx-auto flex items-center md:px-35 py-2 md:py-20">
          
          {/* The visual "Card" */}
          <div className="relative w-full h-full overflow-hidden rounded-[1.5rem] md:rounded-[3rem] bg-black shadow-2xl">
            <div className="absolute inset-0 flex flex-col md:grid md:grid-cols-2 w-full h-full p-2 md:p-6 gap-2 md:gap-6">
              
              {/* LEFT SIDE: Process image */}
              <div className="relative w-full h-1/2 md:h-full overflow-hidden rounded-[1rem] md:rounded-[2rem] bg-[#111111] shadow-inner">
                {phases.map((p, i) => (
                  <Image
                    key={p.num}
                    src={p.image}
                    alt={p.label}
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-out ${
                      i === phase ? "opacity-100 scale-100" : "opacity-0 scale-105"
                    }`}
                  />
                ))}
                
                {/* 
                  FIX: Overlay to hide the baked-in text in the top-left corner.
                  Adjust w-[45%] and h-[25%] if the text requires more or less coverage.
                */}
                <div className="absolute top-0 left-0 w-[45%] h-[25%] bg-gradient-to-br from-black via-black/80 to-transparent pointer-events-none z-10" />
                
                {/* General bottom shadow for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* RIGHT SIDE: Text content */}
              <div className="relative flex items-center justify-center px-4 md:px-8 lg:px-12 z-10 w-full h-1/2 md:h-full rounded-[1rem] md:rounded-[2rem] bg-gradient-to-br from-black/80 via-black/70 to-black/50 backdrop-blur-sm border border-white/5 overflow-hidden py-4">
                <div className="relative w-full max-w-2xl">
                  {phases.map((p, i) => (
                    <div
                      key={p.num}
                      className={`transition-all duration-700 ease-out ${
                        i === phase
                          ? "opacity-100 translate-y-0 relative"
                          : "opacity-0 translate-y-12 pointer-events-none absolute inset-0 flex flex-col justify-center"
                      }`}
                    >
                      <div className="text-mono text-violet-400 mb-2 md:mb-4 font-bold tracking-[0.2em] text-xs md:text-base">
                        PHASE {p.num}
                      </div>
                      <h3 className="text-display text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] mb-2 md:mb-4">
                        {p.label}
                      </h3>
                      <p className="text-white/70 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed font-light">
                        {p.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Progress Indicators */}
            <div className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-20">
              {phases.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 md:h-1.5 rounded-full transition-all duration-500 ${
                    i === phase 
                      ? "w-8 md:w-12 bg-violet-500 shadow-lg shadow-violet-500/50" 
                      : "w-4 md:w-6 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}