"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useMotionTemplate,
  useMotionValue,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  Code2,
  Zap,
  Shield,
  Globe,
  Layers,
  Rocket,
  TrendingUp,
} from "lucide-react";

export interface HeroData {
  heading: string;
  subheading: string;
  primaryCTA: string;
  secondaryCTA: string;
  primaryCTALink?: string;
  secondaryCTALink?: string;
  socialProof?: string;
}

interface HeroSectionProps {
  data: HeroData;
  slug?: string;
  showSocial?: boolean;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
  avatarImage?: string;
  /** Optional: show a real image on the right instead of the code mockup */
  rightImage?: string;
  /** "tech" (default) shows code mockup. "image" shows rightImage. */
  rightVisual?: "tech" | "image";
}

const getBadgeText = (slug: string | undefined): string => {
  if (!slug) return "Trusted Partner";

  const badges: Record<string, string> = {
    "web-development-services": "Web Experts",
    "enterprise-web-development": "Enterprise Grade",
    "saas-development": "SaaS Ready",
    "ecommerce-development": "Revenue Engine",
    "shopify-development": "Shopify Expert",
    "wordpress-development": "WordPress Pro",
    "web-design-services": "Design Excellence",
    "custom-web-development": "Bespoke Solutions",
    "web-application-development": "Built to Scale",
    "shopify-plus-development": "Shopify Plus Expert",
    "woocommerce-development": "WooCommerce Pro",
    "magento-development": "Magento Enterprise",
    "headless-commerce-development": "Headless Commerce",
    "cms-development": "CMS Specialist",
    "ai-web-development": "AI Innovation",
    "ai-chatbot-development": "AI Chatbot Expert",
    "api-development": "API Architecture",
    "website-redesign-services": "Redesign Pro",
    "website-speed-optimization": "Speed Optimizer",
    "website-maintenance-services": "Maintenance Pro",
    "full-stack-development": "Full-Stack Experts",
  };

  return badges[slug] ?? "Trusted Partner";
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

const floatVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const stats = [
  { label: "Projects Delivered", value: "120+" },
  { label: "Client Retention", value: "95%" },
  { label: "Uptime Guaranteed", value: "99.9%" },
];

const features = [
  { icon: Code2, label: "Clean Code" },
  { icon: Zap, label: "Performance" },
  { icon: Shield, label: "Secure" },
  { icon: Globe, label: "SEO Ready" },
];

export function HeroSection({
  data,
  slug,
  showSocial = false,
  socialLinks = {},
  rightImage,
  rightVisual = "tech",
}: HeroSectionProps) {
  const badgeText = getBadgeText(slug);
  const shouldReduceMotion = useReducedMotion();

  const containerRef = useRef<HTMLElement | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;

      const { left, top } = containerRef.current.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      600px circle at ${mouseX}px ${mouseY}px,
      rgb(124 92 255 / 0.12),
      transparent 80%
    )
  `;

  const words = data.heading.trim().split(/\s+/).filter(Boolean);
  const hasMultipleWords = words.length > 1;
  const leadWords = hasMultipleWords ? words.slice(0, -1).join(" ") : "";
  const lastWord = hasMultipleWords ? words[words.length - 1] : data.heading;

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-surface-0 px-4 py-20 md:px-6 lg:min-h-[90vh] lg:py-0"
    >
      {/* Background grid */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* Noise texture */}
      <div
        aria-hidden
        className="grain-after absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Glow orbs */}
      <motion.div
        aria-hidden
        className="absolute -right-40 -top-40 h-[31.25rem] w-[31.25rem] rounded-full bg-violet/20 blur-[120px]"
        animate={
          shouldReduceMotion
            ? {}
            : { scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-40 -left-40 h-[37.5rem] w-[37.5rem] rounded-full bg-violet/10 blur-[140px]"
        animate={
          shouldReduceMotion
            ? {}
            : { scale: [1, 1.18, 1], opacity: [0.3, 0.6, 0.3] }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Mouse spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlightBackground }}
      />

      {/* Main content grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16"
      >
        {/* LEFT COLUMN: Text content */}
        <div className="flex flex-col items-start text-left">
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface-1/50 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-ink-soft backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet" />
            </span>
            {badgeText}
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-display text-4xl leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {hasMultipleWords ? (
              <>
                {leadWords}{" "}
                <span className="bg-linear-to-r from-violet to-violet-soft bg-clip-text text-transparent">
                  {lastWord}
                </span>
              </>
            ) : (
              <span className="bg-linear-to-r from-violet to-violet-soft bg-clip-text text-transparent">
                {lastWord}
              </span>
            )}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-base text-ink-soft sm:text-lg md:text-xl"
          >
            {data.subheading}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center gap-2"
          >
            {features.map((feature) => (
              <span
                key={feature.label}
                className="flex items-center gap-1.5 rounded-full border border-border bg-surface-1/50 px-3 py-1 text-xs text-ink-soft backdrop-blur-sm transition-colors hover:border-violet/30 hover:bg-violet/5 sm:text-sm"
              >
                <feature.icon className="h-3.5 w-3.5 text-violet" />
                {feature.label}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row"
          >
            <motion.a
              href={data.primaryCTALink ?? "#contact"}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-violet px-6 py-3 text-sm font-medium text-white shadow-violet-glow transition-all hover:bg-violet/90 hover:shadow-lg sm:px-8 sm:py-3.5 sm:text-base"
              whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -2 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            >
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              {data.primaryCTA}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </motion.a>

            <motion.a
              href={data.secondaryCTALink ?? "#projects"}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-1/50 px-6 py-3 text-sm font-medium text-ink-soft backdrop-blur-sm transition-all hover:border-violet/30 hover:bg-violet/5 hover:text-ink sm:px-8 sm:py-3.5 sm:text-base"
              whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -2 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            >
              {data.secondaryCTA}
              <ChevronDown className="h-4 w-4" />
            </motion.a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-wrap items-center gap-8 border-t border-border pt-8 sm:gap-12"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <span className="block text-2xl font-semibold text-ink sm:text-3xl">
                  {stat.value}
                </span>
                <span className="mt-0.5 block text-xs text-ink-mute sm:text-sm">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {showSocial && (
            <motion.div
              variants={itemVariants}
              className="mt-10 flex items-center gap-3"
            >
              {[
                { key: "github", icon: Github, href: socialLinks.github },
                { key: "linkedin", icon: Linkedin, href: socialLinks.linkedin },
                { key: "email", icon: Mail, href: socialLinks.email },
              ]
                .filter((s) => s.href)
                .map((s) => (
                  <motion.a
                    key={s.key}
                    href={s.key === "email" ? `mailto:${s.href}` : s.href}
                    target={s.key === "email" ? undefined : "_blank"}
                    rel={s.key === "email" ? undefined : "noreferrer"}
                    aria-label={s.key}
                    className="rounded-full border border-border bg-surface-1/50 p-2.5 text-ink-mute backdrop-blur-sm transition-colors hover:border-violet/30 hover:bg-violet/5 hover:text-ink"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.1, y: -2 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                  >
                    <s.icon className="h-4 w-4" />
                  </motion.a>
                ))}
            </motion.div>
          )}
        </div>

        {/* RIGHT COLUMN: Visual */}
        <div className="relative flex items-center justify-center lg:justify-end">
          {rightVisual === "image" && rightImage ? (
            <motion.div
              variants={floatVariants}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface-1 shadow-2xl"
            >
              <div className="absolute inset-0 bg-linear-to-tr from-violet/10 to-transparent" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={rightImage}
                alt="Hero visual"
                className="h-auto w-full object-cover"
              />
            </motion.div>
          ) : (
            <TechVisual shouldReduceMotion={shouldReduceMotion} />
          )}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-mute lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-xs uppercase tracking-widest">
          Scroll to explore
        </span>
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Right-side visual: code mockup + floating cards                    */
/* ------------------------------------------------------------------ */

function TechVisual({
  shouldReduceMotion,
}: {
  shouldReduceMotion: boolean | null;
}) {
  return (
    <motion.div
      variants={floatVariants}
      initial="hidden"
      animate="visible"
      className="relative w-full max-w-xl"
    >
      {/* Big soft glow behind the mockup */}
      <div className="absolute -inset-8 rounded-full bg-violet/15 blur-[90px]" />

      {/* Main code editor card */}
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-border bg-surface-1/90 shadow-2xl backdrop-blur-xl"
        animate={
          shouldReduceMotion
            ? {}
            : { y: [0, -8, 0], rotate: [0, 0.5, 0] }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Window header */}
        <div className="flex items-center gap-1.5 border-b border-border bg-surface-2/50 px-4 py-3">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-amber-500/80" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
          <div className="ml-4 h-2 w-24 rounded-full bg-border" />
        </div>

        {/* Code body */}
        <div className="space-y-1 p-5 font-mono text-xs leading-6 text-ink-soft/80 sm:text-sm sm:leading-7">
          <div>
            <span className="text-violet">import</span>{" "}
            <span className="text-ink">{"{ launchProject }"}</span>{" "}
            <span className="text-violet">from</span>{" "}
            <span className="text-emerald-400">&quot;@agency/core&quot;</span>;
          </div>
          <div className="h-2" />
          <div>
            <span className="text-violet">const</span>{" "}
            <span className="text-ink">solution</span>{" "}
            <span className="text-ink-soft/50">=</span>{" "}
            <span className="text-violet">await</span>{" "}
            <span className="text-ink">build</span>
            <span className="text-ink-soft/50">({"{"}</span>
          </div>
          <div className="pl-4">
            <span className="text-ink">scalable:</span>{" "}
            <span className="text-violet">true</span>,
          </div>
          <div className="pl-4">
            <span className="text-ink">secure:</span>{" "}
            <span className="text-violet">true</span>,
          </div>
          <div className="pl-4">
            <span className="text-ink">performance:</span>{" "}
            <span className="text-emerald-400">&quot;99+ Lighthouse&quot;</span>,
          </div>
          <div className="text-ink-soft/50">{"}"});</div>
          <div className="h-2" />
          <div>
            <span className="text-violet">return</span>{" "}
            <span className="text-ink">solution</span>
            <span className="text-ink-soft/50">.</span>
            <span className="text-ink">deploy</span>
            <span className="text-ink-soft/50">();</span>
          </div>
        </div>
      </motion.div>

      {/* Floating card 1: Performance */}
      <motion.div
        className="absolute -right-4 top-8 hidden rounded-xl border border-border bg-surface-1/90 p-3 shadow-lg backdrop-blur-md sm:block"
        animate={shouldReduceMotion ? {} : { y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet/10 text-violet">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-medium text-ink-mute">Performance</div>
            <div className="text-sm font-semibold text-ink">99+ Score</div>
          </div>
        </div>
      </motion.div>

      {/* Floating card 2: Projects */}
      <motion.div
        className="absolute -left-4 bottom-12 hidden rounded-xl border border-border bg-surface-1/90 p-3 shadow-lg backdrop-blur-md sm:block"
        animate={shouldReduceMotion ? {} : { y: [0, 10, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
            <TrendingUp className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-medium text-ink-mute">Delivered</div>
            <div className="text-sm font-semibold text-ink">120+ Projects</div>
          </div>
        </div>
      </motion.div>

      {/* Floating card 3: Tech stack */}
      <motion.div
        className="absolute -bottom-6 right-8 hidden rounded-xl border border-border bg-surface-1/90 p-3 shadow-lg backdrop-blur-md sm:block"
        animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet/10 text-violet">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-medium text-ink-mute">Stack</div>
            <div className="text-sm font-semibold text-ink">Modern & Fast</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}