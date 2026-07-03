// app/about/page.tsx
"use client";

import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { motion } from "framer-motion";
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
  { value: "8+", label: "Years Experience" },
  { value: "200+", label: "Projects Delivered" },
  { value: "50+", label: "Team Members" },
  { value: "98%", label: "Client Satisfaction" },
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
  },
  {
    name: "Sarah Mitchell",
    role: "CTO",
    initials: "SM",
    color: "from-cyan-500 to-blue-600",
  },
  {
    name: "Marcus Rivera",
    role: "Head of Design",
    initials: "MR",
    color: "from-rose-500 to-pink-600",
  },
  {
    name: "Emily Nakamura",
    role: "Head of Engineering",
    initials: "EN",
    color: "from-amber-500 to-orange-600",
  },
];

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

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6 text-left">
              <Breadcrumb customLabels={{ about: 'About Us' }} />
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

            <motion.div
              custom={1}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <span className="bg-clip-text text-transparent bg-linear-to-b from-ink to-ink/80">
                  We Build Digital Products That Matter
                </span>
              </h1>
            </motion.div>

            <motion.div
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
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
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                variants={cardVariants}
                className="bg-surface-1/60 backdrop-blur-sm border border-border rounded-2xl p-5 text-center hover:bg-surface-1 transition-colors duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold text-violet mb-1">
                  {stat.value}
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
      <section className="relative py-16 md:py-20 lg:py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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
                    <div
                      key={member.name}
                      className={`w-10 h-10 rounded-full bg-linear-to-br ${member.color} flex items-center justify-center text-xs font-bold text-white border-2 border-background`}
                    >
                      {member.initials}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-ink-mute">
                  <span className="font-semibold text-ink">50+</span> team
                  members worldwide
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface-1 border border-border">
                {/* Decorative grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />
                </div>

                {/* Floating code elements */}
                <div className="absolute top-8 left-8">
                  <div className="bg-surface-2 rounded-lg p-3 border border-border shadow-lg">
                    <Code2 className="w-6 h-6 text-violet" />
                  </div>
                </div>
                <div className="absolute bottom-8 right-8">
                  <div className="bg-surface-2 rounded-lg p-3 border border-border shadow-lg">
                    <Palette className="w-6 h-6 text-cyan-400" />
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <Quote className="w-12 h-12 text-violet/20 mx-auto mb-3" />
                  <p className="text-ink-mute text-sm max-w-[200px] italic">
                    &ldquo;Craft is not a luxury — it&apos;s a necessity.&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          VALUES SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-20 lg:py-24 bg-surface-1/50 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {values.map((value, idx) => (
              <motion.div
                key={value.title}
                variants={cardVariants}
                className="group relative p-6 rounded-2xl bg-surface-1 border border-border hover:bg-surface-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet/5"
              >
                <div className="w-12 h-12 rounded-xl bg-violet/10 flex items-center justify-center mb-4 group-hover:bg-violet/20 transition-colors duration-300">
                  <value.icon className="w-6 h-6 text-violet" />
                </div>
                <h3 className="text-lg font-semibold text-ink mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-ink-soft leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TEAM SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-20 lg:py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {teamMembers.map((member, idx) => (
              <motion.div
                key={member.name}
                variants={cardVariants}
                className="group text-center p-6 rounded-2xl bg-surface-1 border border-border hover:bg-surface-2 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-20 h-20 mx-auto rounded-full bg-linear-to-br ${member.color} flex items-center justify-center text-2xl font-bold text-white mb-4 shadow-lg`}
                >
                  {member.initials}
                </div>
                <h3 className="text-lg font-semibold text-ink">
                  {member.name}
                </h3>
                <p className="text-sm text-ink-mute">{member.role}</p>
                <div className="mt-4 pt-4 border-t border-border">
                  <span className="text-xs text-ink-mute/50">
                    {member.role === "CEO & Founder" && "Vision & Strategy"}
                    {member.role === "CTO" && "Technology & Innovation"}
                    {member.role === "Head of Design" && "Design & Experience"}
                    {member.role === "Head of Engineering" &&
                      "Engineering & Delivery"}
                  </span>
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-violet hover:bg-violet/90 text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-violet/25 hover:shadow-violet/40 hover:-translate-y-0.5"
              >
                Start a Project
                <ArrowRight className="w-5 h-5" />
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
