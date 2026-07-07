// app/about/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  useInView,
} from "framer-motion";
import {
  Code2,
  Palette,
  Lightbulb,
  Users,
  Target,
  Shield,
  ArrowRight,
  Sparkles,
  Circle,
  Quote,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ─── Elegant Background Shapes ──────────────────────────────────────────────
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-violet/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={`absolute inset-0 rounded-full bg-linear-to-r to-transparent ${gradient} backdrop-blur-[2px] border-2 border-white/[0.08] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]`}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Animated counter for stats ─────────────────────────────────────────────
function StatCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.25, 0.4, 0.25, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

// ─── Cursor spotlight helper (imperative, no re-render on mousemove) ───────
function handleSpotlight(e: React.MouseEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  e.currentTarget.style.setProperty("--x", `${x}%`);
  e.currentTarget.style.setProperty("--y", `${y}%`);
}

// ─── Animation Variants ─────────────────────────────────────────────────────
const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.3 + i * 0.12,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  }),
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  },
};

// ─── Data ────────────────────────────────────────────────────────────────────
const stats = [
  { value: 8, suffix: "+", label: "Years Experience" },
  { value: 200, suffix: "+", label: "Projects Delivered" },
  { value: 50, suffix: "+", label: "Team Members" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

const values = [
  {
    icon: Code2,
    title: "Technical Excellence",
    description:
      "We push the boundaries of what's possible on the web, leveraging cutting-edge technologies to deliver performant, scalable solutions.",
  },
  {
    icon: Palette,
    title: "Craft & Design",
    description:
      "Every pixel matters. We obsess over detail, creating interfaces that are as beautiful as they are intuitive.",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description:
      "We don't follow trends — we set them. Our team constantly explores new ways to solve complex problems.",
  },
  {
    icon: Users,
    title: "Client Partnership",
    description:
      "Your success is our success. We collaborate transparently, treating every project as a true partnership.",
  },
  {
    icon: Target,
    title: "Results Driven",
    description:
      "We measure success by real outcomes — faster load times, higher conversions, and measurable business growth.",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description:
      "Rigorous testing, performance audits, and accessibility checks ensure every launch is rock-solid.",
  },
];

const teamMembers = [
  {
    name: "Alex Chen",
    role: "CEO & Founder",
    initials: "AC",
    color: "from-violet to-purple-600",
    image: "/assets/testimonial-2.jpg",
  },
  {
    name: "Sarah Mitchell",
    role: "CTO",
    initials: "SM",
    color: "from-cyan-500 to-blue-600",
    image: "/assets/testimonial-1.jpg",
  },
  {
    name: "Marcus Rivera",
    role: "Head of Design",
    initials: "MR",
    color: "from-rose-500 to-pink-600",
    image: "/assets/Marcus Rivera.jpeg",
  },
  {
    name: "Emily Nakamura",
    role: "Head of Engineering",
    initials: "EN",
    color: "from-amber-500 to-orange-600",
    image: "/assets/Emily Nakamura.jpeg",
  },
];

// ─── Team avatar: real photo in a gradient ring, initials as fallback ──────
function TeamAvatar({ member }: { member: (typeof teamMembers)[number] }) {
  const [errored, setErrored] = useState(false);

  return (
    <div
      className={`relative w-20 h-20 mx-auto mb-4 rounded-full p-[3px] bg-linear-to-br ${member.color} shadow-lg transition-transform duration-300 group-hover:scale-105`}
    >
      <div className="relative w-full h-full rounded-full overflow-hidden bg-surface-2 ring-2 ring-background flex items-center justify-center">
        {!errored ? (
          // Real photo, served from public/assets/ — paths are set
          // in the teamMembers array above.
          <Image
            src={member.image}
            alt={member.name}
            fill
            unoptimized
            sizes="80px"
            className="object-cover"
            onError={() => setErrored(true)}
          />
        ) : (
          // Falls back to initials automatically if a photo is missing/404s.
          <span className="text-xl font-bold text-white/90">{member.initials}</span>
        )}
      </div>
    </div>
  );
}

// ─── Mini avatar: compact photo circle for overlapping stacks ─────────────
function MiniAvatar({ member }: { member: (typeof teamMembers)[number] }) {
  const [errored, setErrored] = useState(false);

  return (
    <div
      className={`relative w-10 h-10 rounded-full overflow-hidden border-2 border-background bg-linear-to-br ${member.color} flex items-center justify-center`}
    >
      {!errored ? (
        <Image
          src={member.image}
          alt={member.name}
          fill
          unoptimized
          sizes="40px"
          className="object-cover"
          onError={() => setErrored(true)}
        />
      ) : (
        <span className="text-xs font-bold text-white">{member.initials}</span>
      )}
    </div>
  );
}

// ─── Our Story visual: real image + premium tilt/glow treatment ────────────
function StoryVisual() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgErrored, setImgErrored] = useState(false);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), {
    stiffness: 150,
    damping: 20,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <div className="relative [perspective:1200px]">
      {/* rotating gradient halo — signature accent for this section */}
      <div className="absolute -inset-4 rounded-[2rem] opacity-60 blur-2xl motion-safe:animate-[spin_14s_linear_infinite] bg-[conic-gradient(from_0deg,rgba(139,92,246,0.35),transparent_30%,rgba(139,92,246,0.25)_60%,transparent_85%)]" />

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface-1 border border-white/10 shadow-2xl shadow-black/40"
      >
        {/*
          Real photo goes here — drop an image at /public/images/about-studio.jpg
          (or swap the src below to any image path / remote URL you've configured
          in next.config.js under images.remotePatterns).
        */}
        {!imgErrored ? (
          <Image
            src="/images/about-studio.jpg"
            alt="ClickMasters team collaborating in the studio"
            fill
            unoptimized
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
            onError={() => setImgErrored(true)}
          />
        ) : (
          // Graceful placeholder if the photo is missing/404s, instead of a
          // blank broken-image box.
          <div className="absolute inset-0 bg-linear-to-br from-violet/20 via-surface-2 to-surface-1 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-violet/40" />
          </div>
        )}

        {/* Decorative grid, kept subtle under the photo */}
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Scrim for legible overlay content */}
        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-black/20" />

        {/* Floating craft chips */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: "translateZ(50px)" }}
          className="absolute top-6 left-6 bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/10 shadow-lg"
        >
          <Code2 className="w-5 h-5 text-violet" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          style={{ transform: "translateZ(50px)" }}
          className="absolute top-6 right-6 bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/10 shadow-lg"
        >
          <Palette className="w-5 h-5 text-cyan-400" />
        </motion.div>

        {/* Quote caption sitting on the image */}
        <div
          style={{ transform: "translateZ(35px)" }}
          className="absolute bottom-0 left-0 right-0 p-6"
        >
          <Quote className="w-6 h-6 text-violet/80 mb-2" />
          <p className="text-white/90 text-sm italic max-w-[240px] leading-relaxed">
            &ldquo;Craft is not a luxury — it&apos;s a necessity.&rdquo;
          </p>
        </div>
      </motion.div>

      {/* Floating team badge, anchored to the corner of the frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 bg-surface-2/90 backdrop-blur-md border border-border rounded-2xl px-5 py-4 shadow-xl"
      >
        <div className="flex -space-x-2">
          {teamMembers.slice(0, 3).map((member) => (
            <div
              key={member.name}
              className={`w-8 h-8 rounded-full bg-linear-to-br ${member.color} flex items-center justify-center text-[10px] font-bold text-white border-2 border-surface-2`}
            >
              {member.initials}
            </div>
          ))}
        </div>
        <div>
          <div className="text-sm font-semibold text-ink">50+ experts</div>
          <div className="text-xs text-ink-mute">building daily</div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── About Page Component ───────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-20">
        {/* Background glow */}
        <div className="absolute inset-0 bg-linear-to-br from-violet/5 via-transparent to-violet/5" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-linear-to-tl from-violet/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-linear-to-br from-violet/10 to-transparent rounded-full blur-3xl" />

        {/* Decorative shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <ElegantShape
            delay={0.3}
            width={600}
            height={140}
            rotate={12}
            gradient="from-violet/10"
            className="left-[-10%] top-[15%] md:left-[-5%] md:top-[20%]"
          />
          <ElegantShape
            delay={0.5}
            width={500}
            height={120}
            rotate={-15}
            gradient="from-violet/10"
            className="right-[-5%] top-[70%] md:right-[0%] md:top-[75%]"
          />
          <ElegantShape
            delay={0.4}
            width={300}
            height={80}
            rotate={-8}
            gradient="from-violet/10"
            className="left-[5%] bottom-[5%] md:left-[10%] md:bottom-[10%]"
          />
        </div>

        <div className="relative layout-container px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6 text-left">
              <Breadcrumb customLabels={{ about: "About Us" }} />
            </div>
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Circle className="h-2 w-2 fill-violet" />
              <span className="text-ink-mute tracking-wide">About Us</span>
            </motion.div>

            <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <span className="bg-clip-text text-transparent bg-linear-to-b from-ink to-ink/80">
                  We Build Digital Products That Matter
                </span>
              </h1>
            </motion.div>

            <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
              <p className="text-lg md:text-xl text-ink-soft leading-relaxed max-w-3xl mx-auto font-light">
                ClickMasters is a premium web development studio founded on the
                belief that great software is born from the intersection of
                technical mastery, design excellence, and genuine human
                collaboration.
              </p>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-4xl mx-auto"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={cardVariants as any}
                className="bg-surface-1/60 backdrop-blur-sm border border-border rounded-2xl p-5 text-center hover:bg-surface-1 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold text-violet mb-1">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-ink-mute">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          OUR STORY SECTION
      ════════════════════════════════════════════════════════════════════ */}
      {/* // Replace the Our Story section with this: */}
<section className="relative py-16 md:py-20 lg:py-24 border-t border-border">
  <div className="layout-container px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      {/* Left Side - Content */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <div className="inline-flex items-center gap-2 bg-violet/10 text-violet px-3 py-1 rounded-full text-xs font-medium mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Story</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight mb-6">
          From a Vision to a
          <span className="text-violet"> Digital Powerhouse</span>
        </h2>

        <div className="space-y-4 text-ink-soft leading-relaxed">
          <p>
            ClickMasters began in 2018 with a simple idea: that web
            development should be treated as a craft — not a commodity. Our
            founder, Alex Chen, saw too many businesses settling for
            mediocre websites that failed to capture their true potential.
          </p>
          <p>
            What started as a two-person consultancy has grown into a
            full-service digital studio with over 50 talented
            professionals. We&apos;ve partnered with startups, Fortune 500
            companies, and everything in between — delivering projects
            that range from complex SaaS platforms to cinematic brand
            experiences.
          </p>
          <p>
            Today, we&apos;re known for our relentless pursuit of quality,
            our collaborative approach, and our ability to turn ambitious
            ideas into reality. Every project we take on is an opportunity
            to push the boundaries of what the web can do.
          </p>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex -space-x-2">
            {teamMembers.slice(0, 4).map((member) => (
              <MiniAvatar key={member.name} member={member} />
            ))}
          </div>
          <div className="text-sm text-ink-mute">
            <span className="font-semibold text-ink">50+</span> team
            members worldwide
          </div>
        </div>
      </motion.div>

      {/* Right Side - Image */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        className="relative"
      >
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface-1 border border-white/10 shadow-2xl shadow-black/40">
          <Image
            src="/ourimage.png"
            alt="ClickMasters team and office"
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
            priority
          />
          
          {/* Optional: Overlay gradient for better aesthetics */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
        </div>

        {/* Optional: Floating badge */}
        
      </motion.div>
    </div>
  </div>
</section>

      {/* ═══════════════════════════════════════════════════════════════════
          VALUES SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-20 lg:py-24 bg-surface-1/50 border-t border-border">
        <div className="layout-container px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <div className="inline-flex items-center gap-2 bg-violet/10 text-violet px-3 py-1 rounded-full text-xs font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Values</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight mb-4">
              What Drives Us Every Day
            </h2>
            <p className="text-ink-soft text-lg">
              These core principles guide every decision we make and every
              project we deliver.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={cardVariants as any}
                onMouseMove={handleSpotlight}
                className="group relative p-6 rounded-2xl bg-surface-1 border border-border hover:border-violet/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet/5 overflow-hidden"
              >
                {/* cursor-tracking spotlight */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(360px circle at var(--x, 50%) var(--y, 50%), rgba(139,92,246,0.10), transparent 70%)",
                  }}
                />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-violet/10 flex items-center justify-center mb-4 group-hover:bg-violet/20 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                    <value.icon className="w-6 h-6 text-violet" />
                  </div>
                  <h3 className="text-lg font-semibold text-ink mb-2">{value.title}</h3>
                  <p className="text-sm text-ink-soft leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TEAM SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-20 lg:py-24 border-t border-border">
        <div className="layout-container px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <div className="inline-flex items-center gap-2 bg-violet/10 text-violet px-3 py-1 rounded-full text-xs font-medium mb-4">
              <Users className="w-3.5 h-3.5" />
              <span>Leadership</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight mb-4">
              Meet the People Behind the Code
            </h2>
            <p className="text-ink-soft text-lg">
              A diverse team of builders, designers, and strategists united by a
              shared passion for great digital experiences.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                variants={cardVariants as any}
                onMouseMove={handleSpotlight}
                className="group relative text-center p-6 rounded-2xl bg-surface-1 border border-border hover:border-violet/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(139,92,246,0.10), transparent 70%)",
                  }}
                />
                <div className="relative">
                  <TeamAvatar member={member} />
                  <h3 className="text-lg font-semibold text-ink">{member.name}</h3>
                  <p className="text-sm text-ink-mute">{member.role}</p>
                  <div className="mt-4 pt-4 border-t border-border">
                    <span className="text-xs text-ink-mute/50">
                      {member.role === "CEO & Founder" && "Vision & Strategy"}
                      {member.role === "CTO" && "Technology & Innovation"}
                      {member.role === "Head of Design" && "Design & Experience"}
                      {member.role === "Head of Engineering" && "Engineering & Delivery"}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CTA SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-20 lg:py-24 border-t border-border">
        <div className="layout-container px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-violet/10 text-violet px-3 py-1 rounded-full text-xs font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Let&apos;s Work Together</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight mb-4">
              Ready to Build Something Great?
            </h2>

            <p className="text-lg text-ink-soft max-w-2xl mx-auto mb-8">
              Whether you have a fully defined project or just a spark of an
              idea, we&apos;d love to hear from you. Let&apos;s explore what we
              can create together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-violet hover:bg-violet/90 text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-violet/25 hover:shadow-violet/40 hover:-translate-y-0.5 overflow-hidden"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/25 to-transparent" />
                <span className="relative">Start a Project</span>
                <ArrowRight className="relative w-5 h-5" />
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-border text-ink-soft hover:text-ink font-semibold rounded-full transition-all duration-300 hover:bg-surface-1 hover:-translate-y-0.5"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}