"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useGsap } from "@/lib/gsap";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { Sparkles, Code2, Palette, Target, ArrowRight } from "lucide-react";
import storyImg from "@/public/assets/story-workstation.jpg";

/* ─── Animation Variants ─────────────────── */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
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

/* ─── Sub-components ─────────────────────── */

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
      animate={{ x: [0, 25, -15, 0], y: [0, -20, 10, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function StatCounter({ value, suffix = "", decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    let raf: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 2000, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Number((eased * value).toFixed(decimals)));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value, decimals]);

  return <span ref={ref}>{display}{suffix}</span>;
}

const stats = [
  { value: 120, suffix: "+", label: "Projects" },
  { value: 18, suffix: "", label: "Awards" },
  { value: 6, suffix: "yr", label: "Experience" },
];

const principles = [
  { icon: Palette, title: "Philosophy", desc: "Design and engineering as one craft." },
  { icon: Code2, title: "Detail", desc: "Pixel-perfect, motion-aware, accessible." },
  { icon: Target, title: "Outcome", desc: "Products that drive measurable growth." },
  { icon: ArrowRight, title: "Partnership", desc: "Long-term collaboration, not handoffs." },
];

/* ─── Main Component ─────────────────────── */

export function StorySection() {
  const root = useRef<HTMLElement>(null);
  const imgWrap = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // GSAP scroll-triggered image reveal
  useEffect(() => {
    if (shouldReduceMotion) return;

    const { gsap, ScrollTrigger } = useGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgWrap.current,
        { clipPath: "inset(40% 20% 40% 20% round 24px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 24px)",
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            end: "center center",
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        img.current,
        { scale: 1.25 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            end: "bottom top",
            scrub: true,
          },
        }
      );
      gsap.from(".story-line", {
        yPercent: 110,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 60%" },
      });
    }, root);
    return () => ctx.revert();
  }, [shouldReduceMotion]);

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-80px" },
      };

  return (
    <section
      ref={root}
      id="story"
      className="relative overflow-hidden bg-background py-20 md:py-20"
    >
      {/* ── Ambient Background ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-0 h-[500px] w-[500px] rounded-full bg-violet/[0.04] blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-indigo-500/[0.03] blur-[120px]" />
      </div>

      {!shouldReduceMotion && (
        <>
          <FloatingOrb className="-left-20 top-1/4 h-72 w-72 bg-violet/5" duration={22} />
          <FloatingOrb className="-right-20 bottom-1/3 h-60 w-60 bg-indigo-500/5" duration={18} delay={4} />
        </>
      )}

      <div className="relative z-10 layout-container px-4 sm:px-6 lg:px-10">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          {/* ── LEFT COLUMN ── */}
          <motion.div
            variants={containerVariants}
            {...motionProps}
            className="flex flex-col"
          >
            {/* Badge */}
            <motion.div variants={slideUpVariants}>
              <span className="inline-flex items-center gap-2 rounded-full border border-violet/20 bg-violet/10 px-3 sm:px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                The Studio
              </span>
            </motion.div>

            {/* Headline with word reveal */}
            <div className="mt-4 sm:mt-6">
              <h2 className="text-display text-[clamp(1.8rem,5vw,4.4rem)] text-ink leading-[1.08]">
                <span className="overflow-hidden inline-block">
                  <span className="story-line inline-block">Craft as</span>
                </span>{" "}
                <span className="overflow-hidden inline-block">
                  <span className="story-line inline-block">a system.</span>
                </span>
                <br />
                <span className="overflow-hidden inline-block">
                  <span className="story-line inline-block text-ink-mute">Code as</span>
                </span>{" "}
                <span className="overflow-hidden inline-block">
                  <span className="story-line inline-block text-ink-mute">a material.</span>
                </span>
              </h2>
            </div>

            {/* Description */}
            <motion.p
              variants={slideUpVariants}
              className="mt-4 sm:mt-6 max-w-md text-sm sm:text-base leading-relaxed text-ink-soft md:text-lg"
            >
              We&apos;re a senior team of designers and engineers obsessed with
              the details others overlook — the easing curve on a hover, the
              twelve-millisecond paint delay, the kerning of a single headline.
              We build digital products that compound business growth.
            </motion.p>

            {/* Principles grid */}
            <motion.div
              variants={containerVariants}
              className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-4"
            >
              {principles.map((p) => (
                <motion.div
                  key={p.title}
                  variants={slideUpVariants}
                  className="group rounded-xl border border-border/50 bg-surface-1/20 p-3 sm:p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-violet/20 hover:bg-violet/[0.03] hover:shadow-sm"
                >
                  <p.icon className="h-4 w-4 text-violet" />
                  <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-violet-soft">
                    {p.title}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-ink-soft">{p.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={slideUpVariants}
              className="mt-6 sm:mt-8 flex items-center gap-6 sm:gap-8 border-t border-border/50 pt-4 sm:pt-6"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <span className="block text-xl sm:text-2xl font-bold tracking-tight text-ink md:text-3xl">
                    {shouldReduceMotion ? (
                      `${stat.value}${stat.suffix}`
                    ) : (
                      <StatCounter value={stat.value} suffix={stat.suffix} />
                    )}
                  </span>
                  <span className="mt-0.5 block text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-ink-mute">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN ── */}
          <motion.div
            variants={scaleInVariants}
            {...motionProps}
            className="relative"
          >
            {/* Glow behind image */}
            <div className="pointer-events-none absolute -inset-10 rounded-full bg-violet/5 blur-[100px]" />

            {/* Image container with GSAP clip-path */}
            <div
              ref={imgWrap}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl"
            >
              <Image
                ref={img}
                src={storyImg}
                alt="A modern developer workstation at night"
                loading="lazy"
                width={1600}
                height={1024}
                className="h-full w-full object-cover"
              />

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-transparent" />

              {/* Bottom info bar */}
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 rounded-xl bg-black/40 px-3 sm:px-4 py-2 sm:py-2.5 backdrop-blur-md">
                  <div className="flex h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-white/70">
                    Studio · Remote
                  </span>
                </div>
                <div className="rounded-xl bg-black/40 px-3 sm:px-4 py-2 sm:py-2.5 backdrop-blur-md">
                  <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-white/70">
                    Since MMXVIII
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
