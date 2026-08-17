"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import {
  Trophy,
  Users,
  Eye,
  Radio,
  Clock,
  Cpu,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle,
} from "lucide-react";

// Reasons — content sourced directly from the brief, mapped to icons + spec codes
const REASONS = [
  {
    code: "CHK—01",
    icon: Trophy,
    title: "Proven results",
    desc: "500+ successful projects for software development company USA clients.",
  },
  {
    code: "CHK—02",
    icon: Users,
    title: "Experienced team",
    desc: "Every project is led by developers with 5+ years of real-world experience.",
  },
  {
    code: "CHK—03",
    icon: Eye,
    title: "Full transparency",
    desc: "Clear milestones, clear timelines, and no hidden costs.",
  },
  {
    code: "CHK—04",
    icon: Radio,
    title: "One point of contact",
    desc: "A single point of contact from start to finish, even after launch.",
  },
  {
    code: "CHK—05",
    icon: Clock,
    title: "Your time zone",
    desc: "Teams that work in your time zone and understand US business needs.",
  },
  {
    code: "CHK—06",
    icon: Cpu,
    title: "Modern stack",
    desc: "We always use modern, reliable technology — never outdated tools.",
  },
];

function CornerMarks() {
  return (
    <>
      <span className="pointer-events-none absolute left-0 top-0 h-2.5 w-2.5 border-l border-t border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
      <span className="pointer-events-none absolute right-0 top-0 h-2.5 w-2.5 border-r border-t border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
    </>
  );
}

// A single checklist row — icon flips to a drawn checkmark once it scrolls into view
function ReasonRow({ reason, index }: { reason: (typeof REASONS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = reason.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -12 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
      transition={{ duration: 0.5, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex gap-4 border border-white/10 bg-black/40 backdrop-blur-sm p-5 pl-6 transition-all duration-300 hover:border-primary/30 hover:bg-black/60 hover:shadow-lg hover:shadow-primary/5 sm:gap-5 sm:p-6 sm:pl-7"
    >
      <CornerMarks />

      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* icon housing with hover effects */}
      <motion.div 
        className="relative flex h-11 w-11 shrink-0 items-center justify-center border border-white/10 bg-black/60 transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:shadow-lg group-hover:shadow-primary/10"
        whileHover={{ scale: 1.05, rotate: -5 }}
        transition={{ duration: 0.2 }}
      >
        <Icon className="h-5 w-5 text-primary/80 transition-all duration-300 group-hover:text-primary group-hover:scale-110" />
      </motion.div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-white transition-colors duration-300 group-hover:text-primary/90 sm:text-base">
            {reason.title}
          </h3>
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-primary/50 transition-colors duration-300 group-hover:text-primary/70">
            {reason.code}
          </span>
        </div>
        <p className="text-xs leading-relaxed text-white/50 transition-colors duration-300 group-hover:text-white/60 sm:text-sm">
          {reason.desc}
        </p>
      </div>

      {/* Checkmark indicator - moved to bottom right to avoid overlap */}
      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, delay: index * 0.09 + 0.3, ease: [0.175, 0.885, 0.32, 1.275] }}
          className="flex items-center gap-1.5"
        >
          <span className="text-[8px] font-mono uppercase tracking-wider text-primary/30 group-hover:text-primary/50 transition-colors">
            ✓ Verified
          </span>
          <CheckCircle className="h-3.5 w-3.5 text-primary/40 transition-all duration-300 group-hover:text-primary group-hover:scale-110" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function WhyChooseSection() {
  const listRef = useRef<HTMLDivElement>(null);
  const listInView = useInView(listRef, { once: true, margin: "-100px" });

  return (
    <section id="why-us" className="relative overflow-hidden py-16 md:py-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/why.jpg"
          alt="Why choose ClickMasters"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/30" />
      </div>

      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-violet/10 blur-3xl"
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 20, -10, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      <div className="relative z-10 layout-container px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          {/* Left — console panel */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-primary/70">
              <motion.span 
                className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span>Verification Log</span>
            </div>

            <h2 className="mb-5 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Why Choose Clickmasters Web Development Company

            </h2>

            <p className="mb-8 max-w-md text-base leading-relaxed text-white/60 md:text-lg">
             As a web development services company, we bring together design and engineering to build things that actually work well for your users.

            </p>

            {/* stat readout */}
            <div className="relative mb-8 inline-flex items-end gap-4 border-l-2 border-primary/60 pl-4">
              <div>
                <motion.div 
                  className="font-mono text-4xl font-bold text-primary sm:text-5xl"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={listInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.68, -0.55, 0.265, 1.55] }}
                >
                  500+
                </motion.div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-white/40">
                  Projects shipped
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25"
              >
                Start a project
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* domain / verified credential stamp */}
            <div className="mt-8 inline-flex items-center gap-2 border border-white/10 bg-black/30 backdrop-blur-sm px-3 py-2 font-mono text-[11px] text-white/40 transition-all duration-300 hover:border-primary/20 hover:bg-black/50">
              <BadgeCheck className="h-3.5 w-3.5 text-primary/70" />
              <span>clickmasterswebdevelopmentcompany.com</span>
            </div>
          </div>

          {/* Right — checklist with a running trace line down the left edge */}
          <div ref={listRef} className="relative">
            <motion.div
              className="absolute left-[-1px] top-0 hidden w-px origin-top bg-gradient-to-b from-primary/60 via-primary/30 to-transparent sm:block"
              style={{ height: "100%" }}
              initial={{ scaleY: 0 }}
              animate={listInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="flex flex-col gap-3 sm:pl-6">
              {REASONS.map((reason, index) => (
                <ReasonRow key={reason.code} reason={reason} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}