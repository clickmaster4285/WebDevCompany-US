"use client";

import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useMotionTemplate,
  useMotionValue,
  useInView,
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
  TrendingUp,
  Sparkles,
  Rocket,
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
  breadcrumbLabel?: string;
  showSocial?: boolean;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
  rightImage?: string;
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
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

const visualVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, x: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

const stats = [
  { label: "Projects Delivered", value: 120, suffix: "+" },
  { label: "Client Retention", value: 95, suffix: "%" },
  { label: "Uptime Guaranteed", value: 99.9, suffix: "%", decimals: 1 },
];

const features = [
  { icon: Code2, label: "Clean Code" },
  { icon: Zap, label: "Performance" },
  { icon: Shield, label: "Secure" },
  { icon: Globe, label: "SEO Ready" },
];

const techStack = ["Next.js", "React", "Node.js", "TypeScript", "AWS", "Figma"];

function AnimatedCounter({
  value,
  suffix = "",
  decimals = 0,
  duration = 2,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Number((eased * value).toFixed(decimals)));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration, decimals]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function MagneticButton({
  children,
  href,
  className,
  variant = "primary",
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  variant?: "primary" | "secondary";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles =
    variant === "primary"
      ? "group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-violet px-7 py-3.5 text-sm font-semibold text-white shadow-violet-glow transition-all hover:bg-violet/90 hover:shadow-lg sm:px-8 sm:py-4 sm:text-base"
      : "group inline-flex items-center gap-2 rounded-xl border border-border bg-surface-1/60 px-7 py-3.5 text-sm font-semibold text-ink-soft backdrop-blur-md transition-all hover:border-violet/30 hover:bg-violet/5 hover:text-ink sm:px-8 sm:py-4 sm:text-base";

  return (
    <motion.a
      ref={ref}
      href={href}
      className={`${baseStyles} ${className ?? ""}`}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
    >
      {variant === "primary" && (
        <>
          <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="absolute inset-0 rounded-xl ring-2 ring-white/20 ring-offset-2 ring-offset-transparent transition-all group-hover:ring-white/40" />
        </>
      )}
      {children}
    </motion.a>
  );
}

export function HeroSection({
  data,
  slug,
  breadcrumbLabel,
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
      650px circle at ${mouseX}px ${mouseY}px,
      rgb(124 92 255 / 0.15),
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
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-surface-0 px-4 py-24 sm:px-6 lg:min-h-[95vh] lg:px-8 xl:px-12"
    >
      {/* Background grid */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 30% 50%, black 25%, transparent 75%)",
        }}
      />

      {/* Noise texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Glow orbs */}
      <motion.div
        aria-hidden
        className="absolute -right-20 -top-20 h-[40rem] w-[40rem] rounded-full bg-violet/20 blur-[130px]"
        animate={
          shouldReduceMotion
            ? {}
            : { scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-32 -left-32 h-[35rem] w-[35rem] rounded-full bg-violet/12 blur-[120px]"
        animate={
          shouldReduceMotion
            ? {}
            : { scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <div
        aria-hidden
        className="absolute right-1/4 top-1/3 h-[25rem] w-[25rem] rounded-full bg-indigo-500/10 blur-[100px]"
      />

      {/* Mouse spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlightBackground }}
      />

      <FloatingShapes shouldReduceMotion={shouldReduceMotion} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12"
      >
        {/* LEFT COLUMN */}
        <div className="flex flex-col items-start text-left">
          {/* Breadcrumb */}
          {slug && breadcrumbLabel && (
            <motion.div
              variants={itemVariants}
              className="mb-4 self-start rounded-lg border border-border/60 bg-surface-1/40 px-3 py-1.5 backdrop-blur-sm"
            >
              <Breadcrumb
                customLabels={{
                  services: "Services",
                  [slug]: breadcrumbLabel,
                }}
              />
            </motion.div>
          )}

          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6 self-start">
            <span className="group inline-flex items-center gap-2.5 rounded-full border border-border bg-surface-1/60 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink-soft backdrop-blur-md transition-all hover:border-violet/30 hover:bg-violet/5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-violet" />
              </span>
              {badgeText}
              <Sparkles className="h-3 w-3 text-violet transition-transform group-hover:rotate-12" />
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {hasMultipleWords ? (
              <>
                {leadWords}{" "}
                <span className="bg-linear-to-r from-violet via-violet-soft to-indigo-400 bg-clip-text text-transparent">
                  {lastWord}
                </span>
              </>
            ) : (
              <span className="bg-linear-to-r from-violet via-violet-soft to-indigo-400 bg-clip-text text-transparent">
                {lastWord}
              </span>
            )}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg md:text-xl"
          >
            {data.subheading}
          </motion.p>

          {/* Feature pills */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center gap-2.5"
          >
            {features.map((feature, index) => (
              <motion.span
                key={feature.label}
                initial={false}
                whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.02 }}
                className="flex items-center gap-2 rounded-full border border-border bg-surface-1/60 px-3.5 py-1.5 text-xs font-medium text-ink-soft backdrop-blur-md transition-colors hover:border-violet/30 hover:bg-violet/5 hover:text-ink sm:text-sm"
                transition={{ delay: index * 0.05 }}
              >
                <feature.icon className="h-3.5 w-3.5 text-violet" />
                {feature.label}
              </motion.span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row"
          >
            <MagneticButton
              href={data.primaryCTALink ?? "#contact"}
              variant="primary"
            >
              {data.primaryCTA}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </MagneticButton>

            <MagneticButton
              href={data.secondaryCTALink ?? "#projects"}
              variant="secondary"
            >
              {data.secondaryCTA}
              <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </MagneticButton>
          </motion.div>

          {/* Social proof */}
          {data.socialProof && (
            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-md text-xs italic leading-relaxed text-ink-mute sm:text-sm"
            >
              &ldquo;{data.socialProof}&rdquo;
            </motion.p>
          )}

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-wrap items-start gap-8 border-t border-border pt-8 sm:gap-12"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <span className="block text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </span>
                <span className="mt-1 block text-xs font-medium text-ink-mute sm:text-sm">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Tech stack */}
          <motion.div
            variants={itemVariants}
            className="mt-10 hidden flex-wrap items-center gap-3 sm:flex"
          >
            <span className="text-xs font-medium text-ink-mute">Built with:</span>
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-surface-1/40 px-2 py-1 text-[10px] font-medium text-ink-soft backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Social links */}
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
                    className="group rounded-full border border-border bg-surface-1/60 p-2.5 text-ink-mute backdrop-blur-md transition-all hover:border-violet/30 hover:bg-violet/5 hover:text-ink"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.12, y: -3 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                  >
                    <s.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                  </motion.a>
                ))}
            </motion.div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="relative flex items-center justify-center lg:justify-end">
          {rightVisual === "image" && rightImage ? (
            <motion.div
              variants={visualVariants}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-surface-1 p-2 shadow-2xl"
            >
              <div className="absolute inset-0 rounded-3xl bg-linear-to-tr from-violet/15 via-transparent to-indigo-500/10" />
              <img
                src={rightImage}
                alt="Hero visual"
                className="h-auto w-full rounded-2xl object-cover"
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
        className="absolute bottom-8 left-8 hidden -translate-x-0 flex-col items-start gap-2 text-ink-mute lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">
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

function FloatingShapes({
  shouldReduceMotion,
}: {
  shouldReduceMotion: boolean | null;
}) {
  return (
    <>
      <motion.div
        aria-hidden
        className="absolute left-[10%] top-[20%] h-3 w-3 rounded-full bg-violet/40"
        animate={
          shouldReduceMotion
            ? {}
            : { y: [0, -20, 0], opacity: [0.4, 0.8, 0.4] }
        }
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute right-[15%] top-[25%] h-4 w-4 rotate-45 bg-indigo-500/30"
        animate={
          shouldReduceMotion
            ? {}
            : { y: [0, 18, 0], rotate: [45, 55, 45] }
        }
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-[30%] left-[8%] h-2 w-2 rounded-full bg-emerald-400/40"
        animate={
          shouldReduceMotion
            ? {}
            : { y: [0, 15, 0], opacity: [0.4, 0.9, 0.4] }
        }
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        aria-hidden
        className="absolute right-[25%] bottom-[20%] h-3 w-3 rounded-lg border border-violet/30"
        animate={
          shouldReduceMotion
            ? {}
            : { y: [0, -12, 0], rotate: [0, 90, 0] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
    </>
  );
}

function TechVisual({
  shouldReduceMotion,
}: {
  shouldReduceMotion: boolean | null;
}) {
  return (
    <motion.div
      variants={visualVariants}
      initial="hidden"
      animate="visible"
      className="relative w-full max-w-xl"
    >
      <div className="absolute -inset-10 rounded-full bg-violet/18 blur-[100px]" />

      <motion.div
        className="relative overflow-hidden rounded-3xl border border-border bg-surface-1/95 shadow-2xl backdrop-blur-xl"
        animate={shouldReduceMotion ? {} : { y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-between border-b border-border bg-surface-2/50 px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-amber-500/80" />
            <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-surface-0/60 px-3 py-1 text-[10px] text-ink-mute">
            <Code2 className="h-3 w-3" />
            launch-project.ts
          </div>
        </div>

        <div className="space-y-1 p-6 font-mono text-xs leading-7 text-ink-soft/80 sm:text-sm sm:leading-8">
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
          <div className="pl-5">
            <span className="text-ink">scalable:</span>{" "}
            <span className="text-violet">true</span>,
          </div>
          <div className="pl-5">
            <span className="text-ink">secure:</span>{" "}
            <span className="text-violet">true</span>,
          </div>
          <div className="pl-5">
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
          <div className="h-2" />
          <div className="pl-5 text-ink-mute">// Your product, shipped.</div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-surface-1 to-transparent" />
      </motion.div>

      <motion.div
        className="absolute -right-2 top-6 hidden rounded-2xl border border-border bg-surface-1/95 p-4 shadow-xl backdrop-blur-md sm:block"
        animate={shouldReduceMotion ? {} : { y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet/10 text-violet">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase tracking-wider text-ink-mute">
              Performance
            </div>
            <div className="text-base font-bold text-ink">99+ Score</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute -left-6 bottom-20 hidden rounded-2xl border border-border bg-surface-1/95 p-4 shadow-xl backdrop-blur-md sm:block"
        animate={shouldReduceMotion ? {} : { y: [0, 12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase tracking-wider text-ink-mute">
              Delivered
            </div>
            <div className="text-base font-bold text-ink">120+ Projects</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute -bottom-4 right-10 hidden rounded-2xl border border-border bg-violet p-4 text-white shadow-violet-glow backdrop-blur-md sm:block"
        animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
            <Rocket className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase tracking-wider text-white/70">
              Status
            </div>
            <div className="text-base font-bold">Ready to Ship</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute -right-16 top-1/2 hidden h-40 w-px bg-linear-to-b from-transparent via-violet/30 to-transparent lg:block"
        animate={shouldReduceMotion ? {} : { scaleY: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}