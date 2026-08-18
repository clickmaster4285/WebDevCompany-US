"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import type { StaticImageData } from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence, useInView } from "framer-motion";
import type { Variants } from "framer-motion";

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
  const headingRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const isInView = useInView(headingRef, { once: true, margin: "-100px" });

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

  // Framer Motion variants for staggered text content
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 }
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.04, staggerDirection: -1, when: "afterChildren" }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Variants for the background image crossfade
  const imageVariants: Variants = {
    enter: { opacity: 0, scale: 1.1 },
    center: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="process" className="relative bg-background">
      {/* Top Heading */}
      <motion.div
        ref={headingRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="layout-container px-4 sm:px-6 md:px-12 py-8 md:py-20"
      >
        <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-violet-soft/70">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-500 motion-safe:animate-pulse" />
          <span>Execution Process</span>
          <span className="text-ink/30">/ 05 phases</span>
        </div>
        <h2 className="text-display max-w-3xl text-[clamp(1.8rem,5vw,3.5rem)] text-ink">
          A measured journey from <span className="text-violet-soft">idea to impact.</span>
        </h2>
      </motion.div>

      {/* Pinned Scroll Section */}
      <div ref={pinRef} className="relative h-[60vh] md:h-[80vh] overflow-hidden bg-background">
        
        <div className="layout-container h-full w-full mx-auto flex items-center px-4 sm:px-6 md:px-12 lg:px-16 py-2 md:py-20">
          
          {/* The visual "Card" */}
          <div className="relative w-full h-full overflow-hidden rounded-[1.5rem] md:rounded-[3rem] bg-black shadow-2xl">
            <div className="absolute inset-0 flex flex-col md:grid md:grid-cols-2 w-full h-full p-2 md:p-6 gap-2 md:gap-6">
              
              {/* LEFT SIDE: Process image */}
              <div className="relative w-full h-1/2 md:h-full overflow-hidden rounded-[1rem] md:rounded-[2rem] bg-[#111111] shadow-inner">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.div
                    key={phase}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0"
                  >
                    <Image
                      src={phases[phase].image}
                      alt={phases[phase].label}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Overlay to hide the baked-in text in the top-left corner. */}
                <div className="absolute top-0 left-0 w-[45%] h-[25%] bg-gradient-to-br from-black via-black/80 to-transparent pointer-events-none z-10" />
                
                {/* General bottom shadow for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* RIGHT SIDE: Text content */}
              <div className="relative flex items-center justify-center px-4 md:px-8 lg:px-12 z-10 w-full h-1/2 md:h-full rounded-[1rem] md:rounded-[2rem] bg-gradient-to-br from-black/80 via-black/70 to-black/50 backdrop-blur-sm border border-white/5 overflow-hidden py-4">
                <div className="relative w-full max-w-2xl h-full flex items-center justify-center">
                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.div
                      key={phase}
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="w-full"
                    >
                      <motion.div 
                        variants={itemVariants} 
                        className="text-mono text-violet-400 mb-2 md:mb-4 font-bold tracking-[0.2em] text-xs md:text-base"
                      >
                        PHASE {phases[phase].num}
                      </motion.div>
                      <motion.h3 
                        variants={itemVariants} 
                        className="text-display text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] mb-2 md:mb-4"
                      >
                        {phases[phase].label}
                      </motion.h3>
                      <motion.p 
                        variants={itemVariants} 
                        className="text-white/70 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed font-light"
                      >
                        {phases[phase].desc}
                      </motion.p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

            </div>

            {/* Progress Indicators */}
            <div className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-20 items-center">
              {phases.map((p, i) => (
                <div key={i} className="relative h-1.5 w-6 rounded-full bg-white/20 overflow-hidden">
                  {i === phase && (
                    <motion.div
                      layoutId="phase-indicator"
                      className="absolute inset-0 rounded-full bg-violet-500 shadow-lg shadow-violet-500/50"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}