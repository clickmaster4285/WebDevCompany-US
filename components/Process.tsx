"use client";

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
    const totalScroll = window.innerHeight * phases.length;

    const trigger = ScrollTrigger.create({
      trigger: pinRef.current,
      start: "top top",
      end: `+=${totalScroll}`,
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = Math.max(0, Math.min(1, self.progress));
        const newPhase = Math.floor(progress * phases.length);
        if (newPhase < phases.length) setPhase(newPhase);
      },
    });

    return () => { trigger.kill(); };
  }, []);

  return (
    <section id="process" className="relative min-h-screen">
      <div className="layout-container sm:px-6 px-9 md:px-12 py-5 md:py-15 max-w-7xl mx-auto">
        <h2 className="text-display max-w-3xl text-[clamp(2rem,5vw,4rem)] text-ink">
          A measured journey from <span className="text-violet-soft">idea to impact.</span>
        </h2>
      </div>

      <div ref={pinRef} className="relative h-screen overflow-hidden bg-black/5">
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto w-full">

          {/* LEFT SIDE: Process image */}
          <div className="relative w-full h-full min-h-[320px] overflow-hidden rounded-[2rem] bg-[#111111]">
            <img
              key={phase}
              src={phases[phase].image}
              alt={phases[phase].label}
              className="h-full w-full object-cover transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/35" />
          </div>

          {/* RIGHT SIDE: Text content — unchanged */}
          <div className="relative flex items-center px-6 md:px-12 z-10 w-full h-full bg-gradient-to-br from-black/70 via-black/60 to-black/40">
            <div className="relative w-full h-[400px]">
              {phases.map((p, i) => (
                <div
                  key={p.num}
                  className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out ${
                    i === phase
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12 pointer-events-none"
                  }`}
                >
                  <div className="text-mono text-violet-500 mb-4 font-bold tracking-widest">
                    PHASE {p.num}
                  </div>
                  <h3 className="text-display text-white text-5xl md:text-7xl font-bold leading-none mb-6">
                    {p.label}
                  </h3>
                  <p className="text-white/70 text-lg max-w-md leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {phases.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === phase ? "w-12 bg-[#7C3AED]" : "w-6 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}