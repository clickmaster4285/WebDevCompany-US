// components/services/CTASection.tsx

"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Code2,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */

const trustSignals = [
  { icon: CheckCircle2, text: "No-obligation consultation" },
  { icon: TrendingUp, text: "Fixed-scope pricing" },
  { icon: Zap, text: "48-hour response" },
];

const statsPreview = [
  { value: "120+", label: "Projects" },
  { value: "95%", label: "Retention" },
  { value: "6yr", label: "Proven" },
];

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
   ───────────────────────────────────────────── */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: "0.5em" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 22, stiffness: 120 },
  },
};

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
   ───────────────────────────────────────────── */

function FloatingOrb({
  className,
  duration = 20,
  delay = 0,
}: {
  className: string;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      animate={{ x: [0, 30, -20, 0], y: [0, -25, 15, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function StatBadge({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 backdrop-blur-sm">
      <span className="text-lg font-bold tracking-tight text-white">{value}</span>
      <span className="text-[10px] font-medium uppercase tracking-wider text-white/50">
        {label}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────── */

interface CTASectionProps {
  heading: string;
  primary: string;
  secondary: string;
}

export function CTASection({ heading, primary, secondary }: CTASectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || shouldReduceMotion) return;
    requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    });
  };

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-80px" },
      };

  const words = heading.split(" ");

  return (
    <section
      id="consultation"
      className="relative overflow-hidden"
    >
      {/* ── Rich Gradient Background ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet via-violet/90 to-indigo-950" />

      {/* Animated Ambient Orbs */}
      {!shouldReduceMotion && (
        <>
          <FloatingOrb
            className="-left-20 -top-20 h-80 w-80 bg-violet-300/20"
            duration={18}
          />
          <FloatingOrb
            className="-bottom-32 -right-20 h-96 w-96 bg-indigo-300/15"
            duration={22}
            delay={3}
          />
          <FloatingOrb
            className="left-1/3 top-1/3 h-64 w-64 bg-fuchsia-300/10"
            duration={25}
            delay={6}
          />
        </>
      )}

      {/* Grid Pattern Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Grain Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
        }}
      />

      {/* Bottom Fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />

      {/* ── Content ── */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="relative z-10"
      >
        {/* Dynamic mouse-follow radial gradient */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            background: shouldReduceMotion
              ? "none"
              : `radial-gradient(800px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,255,255,0.08), transparent 50%)`,
          }}
        />

        <div className="layout-container px-4 py-20 sm:px-6 sm:py-28 md:px-10 md:py-20 lg:py-44">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
              {/* ── LEFT COLUMN ── */}
              <motion.div
                variants={containerVariants}
                {...motionProps}
                className="flex flex-col"
              >
                {/* Badge */}
                <motion.div variants={slideUpVariants} className="mb-6">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm">
                    <Sparkles className="h-3.5 w-3.5 text-white/70" />
                    Limited Availability
                  </span>
                </motion.div>

                {/* Heading with word-by-word reveal */}
                <motion.h2
                  variants={containerVariants}
                  className="text-display text-balance max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
                >
                  {words.map((word, i) => (
                    <motion.span
                      key={i}
                      className="inline-block mr-[0.25em]"
                      variants={wordVariants}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.h2>

                {/* Description */}
                <motion.p
                  variants={slideUpVariants}
                  className="mt-5 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg"
                >
                  Tell us about your project and goals. We&apos;ll map out the
                  approach, timeline, and a transparent estimate — no pressure,
                  no guesswork.
                </motion.p>

                {/* Buttons */}
                <motion.div
                  variants={containerVariants}
                  className="mt-8 flex flex-col gap-3 sm:flex-row"
                >
                  <motion.a
                    href="/contact"
                    variants={slideUpVariants}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -2 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                    className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-violet shadow-xl shadow-black/20 transition-all hover:shadow-2xl hover:shadow-black/30 sm:px-8 sm:py-4 sm:text-base"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-violet-200/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <span className="relative">{primary}</span>
                    <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.a>

                  <motion.a
                    href="/contact"
                    variants={slideUpVariants}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -2 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.06] px-7 py-3.5 text-sm font-semibold text-white/90 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/[0.1] hover:text-white sm:px-8 sm:py-4 sm:text-base"
                  >
                    {secondary}
                    <ChevronRight className="h-4 w-4" />
                  </motion.a>
                </motion.div>

                {/* Trust Signals */}
                <motion.div
                  variants={containerVariants}
                  className="mt-10 flex flex-wrap items-center gap-5 sm:gap-7"
                >
                  {trustSignals.map((signal) => (
                    <motion.div
                      key={signal.text}
                      variants={slideUpVariants}
                      className="flex items-center gap-2 text-sm text-white/60"
                    >
                      <signal.icon className="h-4 w-4 text-white/40" />
                      <span>{signal.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* ── RIGHT COLUMN ── */}
              <motion.div
                variants={scaleInVariants}
                {...motionProps}
                className="relative flex justify-center lg:justify-end"
              >
                {/* Floating visual card */}
                <div className="relative w-full max-w-sm">
                  {/* Glow behind card */}
                  <div className="pointer-events-none absolute -inset-10 rounded-full bg-white/5 blur-[80px]" />

                  {/* Main Stats Card */}
                  <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                    {/* Card top bar */}
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-2 w-2 rounded-full bg-emerald-400" />
                        <span className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                          Available now
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MessageCircle className="h-3.5 w-3.5 text-white/30" />
                        <span className="text-[11px] text-white/40">
                          Reply within 2hr
                        </span>
                      </div>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-3 gap-3">
                      {statsPreview.map((stat) => (
                        <StatBadge
                          key={stat.label}
                          value={stat.value}
                          label={stat.label}
                        />
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="my-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    {/* Testimonial mini */}
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
                        JM
                      </div>
                      <div>
                        <p className="text-xs leading-relaxed text-white/60">
                          &ldquo;They delivered a complex SaaS platform ahead of
                          schedule. The transparency throughout was
                          refreshing.&rdquo;
                        </p>
                        <p className="mt-2 text-[11px] font-medium text-white/40">
                          — James M., Founder
                        </p>
                      </div>
                    </div>

                    {/* Tech icons row */}
                    <div className="mt-5 flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3">
                      <Code2 className="h-4 w-4 text-white/30" />
                      <span className="text-[11px] text-white/40">
                        React · Node.js · AWS
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
