"use client";

import { motion, useReducedMotion, useInView, type Variants } from "framer-motion";
import {
  Activity,
  Clock,
  TrendingDown,
  ServerCrash,
  ShieldAlert,
  FileWarning,
  Send,
  CheckCircle2,
  Loader2,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ProblemStat } from "@/data/services";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 20 } },
};

const statCardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const visualVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, x: 30 },
  visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] as const } },
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

function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  value: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const numericMatch = value.match(/[\d.]+/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }

    const target = parseFloat(numericMatch[0]);
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      let formatted: string;
      if (suffix === "%") {
        formatted = current.toFixed(1);
      } else if (target >= 1000) {
        formatted = Math.floor(current).toLocaleString();
      } else if (Number.isInteger(target)) {
        formatted = Math.floor(current).toString();
      } else {
        formatted = current.toFixed(1);
      }

      setDisplayValue(`${prefix}${formatted}${suffix}`);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, value, suffix, prefix, duration]);

  return <span ref={ref} className="tabular-nums tracking-tight">{displayValue}</span>;
}

function StatCard({
  stat,
  index,
  shouldReduceMotion,
}: {
  stat: ProblemStat;
  index: number;
  shouldReduceMotion: boolean;
}) {
  const suffix = stat.value.includes("%") ? "%" : "";
  const prefix = stat.value.includes("$") ? "$" : "";
  const cleanValue = stat.value.replace(/[$,%]/g, "");

  return (
    <motion.div
      variants={statCardVariants}
      whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 17 } }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-surface-1/30 p-6 text-left shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-destructive/30 hover:bg-surface-1/60 hover:shadow-lg hover:shadow-destructive/5 sm:p-8"
    >
      {/* Hover gradient glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-destructive/10 blur-3xl" />
      </div>

      {/* Top accent line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-destructive/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex-1">
        <div className="text-display text-3xl font-bold text-destructive sm:text-4xl md:text-5xl">
          <AnimatedCounter value={cleanValue} prefix={prefix} suffix={suffix} duration={1.8 + index * 0.2} />
        </div>
        <div className="mt-2 text-sm font-semibold tracking-wide text-ink sm:text-base">{stat.label}</div>
        <div className="mt-1.5 text-sm leading-relaxed text-ink-mute">{stat.description}</div>
      </div>

      {/* Hover bottom bar */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-destructive/60 to-transparent transition-all duration-700 group-hover:w-full" />
    </motion.div>
  );
}

/* ─── Types ──────────────────────────────── */

interface AuditFormData {
  name: string;
  email: string;
  website: string;
  message: string;
}

interface ProblemSectionProps {
  heading: string;
  content: string[];
  stats?: ProblemStat[];
  image?: string;
  imageAlt?: string;
  rightVisual?: "painpoints" | "metrics" | "bottleneck" | "image" | "form";
  onFormSubmit?: (data: AuditFormData) => void | Promise<void>;
  formTitle?: string;
  formSubtitle?: string;
}

/* ─── Main Component ─────────────────────── */

export function ProblemSection({
  heading,
  content,
  stats,
  image,
  imageAlt = "Problem illustration",
  rightVisual = "form",
  onFormSubmit,
  formTitle = "Get a Free Audit",
  formSubtitle = "Tell us what is broken. We'll reply within one business day.",
}: ProblemSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const isReduced = Boolean(shouldReduceMotion);

  const motionPref = {
    initial: isReduced ? "visible" : "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-80px" },
  };

  const visualType = image ? "image" : rightVisual;

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-20">
      {/* ── Ambient Background ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-destructive/[0.03] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-violet/[0.02] blur-[100px]" />
      </div>

      {!shouldReduceMotion && (
        <>
          <FloatingOrb className="-left-20 top-1/4 h-64 w-64 bg-destructive/5" duration={20} />
          <FloatingOrb className="-right-20 bottom-1/3 h-56 w-56 bg-violet/5" duration={18} delay={5} />
        </>
      )}

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 layout-container px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ── LEFT COLUMN ── */}
          <div className="text-left">
            {/* Badge */}
            <motion.span
              variants={fadeUpVariants}
              {...motionPref}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-destructive/20 bg-destructive/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-destructive backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5" />
              The Hidden Cost
            </motion.span>

            {/* Heading */}
            <motion.h2
              variants={fadeUpVariants}
              {...motionPref}
              className="text-display text-balance text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl lg:text-6xl"
            >
              {heading}
            </motion.h2>

            {/* Content paragraphs */}
            <motion.div
              className="mt-8 max-w-2xl space-y-5"
              variants={containerVariants}
              {...motionPref}
            >
              {content.map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-3 leading-relaxed text-ink-soft sm:text-lg"
                >
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive/40" />
                  <span>{paragraph}</span>
                </motion.p>
              ))}
            </motion.div>

            {/* Stats */}
            {stats && stats.length > 0 && (
              <motion.div
                className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2"
                variants={containerVariants}
                {...motionPref}
              >
                {stats.map((stat, index) => (
                  <StatCard key={index} stat={stat} index={index} shouldReduceMotion={isReduced} />
                ))}
              </motion.div>
            )}
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="relative flex items-start justify-center pt-10 lg:justify-end lg:pt-20">
            {visualType === "image" ? (
              <motion.div
                variants={visualVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-surface-1 p-2 shadow-2xl lg:max-w-xl"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-destructive/10 via-transparent to-violet/10" />
                <img
                  src={image}
                  alt={imageAlt}
                  className="relative h-auto w-full rounded-2xl object-cover"
                />
              </motion.div>
            ) : visualType === "form" ? (
              <AuditForm
                isReduced={isReduced}
                onSubmit={onFormSubmit}
                title={formTitle}
                subtitle={formSubtitle}
              />
            ) : (
              <ProblemVisual type={visualType} isReduced={isReduced} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Visual Variants ──────────────────────── */

function ProblemVisual({ type, isReduced }: { type: "painpoints" | "metrics" | "bottleneck"; isReduced: boolean }) {
  if (type === "metrics") return <MetricsVisual isReduced={isReduced} />;
  if (type === "bottleneck") return <BottleneckVisual isReduced={isReduced} />;
  return <PainPointsVisual isReduced={isReduced} />;
}

/* ─── Audit Form ──────────────────────────── */

function AuditForm({ isReduced, title, subtitle, onSubmit }: { isReduced: boolean; title: string; subtitle: string; onSubmit?: (data: AuditFormData) => void | Promise<void> }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [formData, setFormData] = useState<AuditFormData>({ name: "", email: "", website: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof AuditFormData, string>>>({});

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof AuditFormData, string>> = {};
    if (!formData.name.trim()) nextErrors.name = "Name is required";
    if (!formData.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) nextErrors.message = "Please describe your problem";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      await onSubmit?.(formData);
      setStatus("success");
      setFormData({ name: "", email: "", website: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof AuditFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={visualVariants}
      initial={isReduced ? "visible" : "hidden"}
      animate={isInView || isReduced ? "visible" : "hidden"}
      className="relative w-full max-w-lg lg:max-w-xl"
    >
      {/* Glow */}
      <div className="pointer-events-none absolute -inset-8 rounded-full bg-violet/10 blur-[80px]" />

      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-surface-1/40 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        {/* Top accent */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-violet/40 to-transparent" />

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet to-violet-soft text-white shadow-md shadow-violet/20">
              <Send className="h-4 w-4" />
            </div>
            <h3 className="text-lg font-semibold text-ink">{title}</h3>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink-mute">{subtitle}</p>
        </div>

        {status === "success" ? (
          <motion.div
            initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 py-12 text-center"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15">
              <CheckCircle2 className="h-7 w-7 text-emerald-500" />
            </div>
            <h4 className="mt-4 text-base font-semibold text-ink">Audit request received</h4>
            <p className="mt-1 max-w-[240px] text-sm text-ink-mute">
              We'll review your site and get back to you within one business day.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-5 text-sm font-medium text-violet transition-colors hover:text-violet/80"
            >
              Send another request →
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="audit-name" className="mb-1.5 block text-xs font-medium text-ink-soft">Full Name</label>
              <input id="audit-name" name="name" type="text" value={formData.name} onChange={handleChange}
                placeholder="John Smith"
                className="w-full rounded-xl border border-border/60 bg-surface-0/40 px-4 py-3 text-sm text-ink placeholder:text-ink-mute/50 outline-none transition-all focus:border-violet/50 focus:bg-surface-0/60 focus:ring-2 focus:ring-violet/10" />
              {errors.name && <span className="mt-1 block text-xs text-destructive">{errors.name}</span>}
            </div>
            <div>
              <label htmlFor="audit-email" className="mb-1.5 block text-xs font-medium text-ink-soft">Work Email</label>
              <input id="audit-email" name="email" type="email" value={formData.email} onChange={handleChange}
                placeholder="john@company.com"
                className="w-full rounded-xl border border-border/60 bg-surface-0/40 px-4 py-3 text-sm text-ink placeholder:text-ink-mute/50 outline-none transition-all focus:border-violet/50 focus:bg-surface-0/60 focus:ring-2 focus:ring-violet/10" />
              {errors.email && <span className="mt-1 block text-xs text-destructive">{errors.email}</span>}
            </div>
            <div>
              <label htmlFor="audit-website" className="mb-1.5 block text-xs font-medium text-ink-soft">Website URL <span className="text-ink-mute">(optional)</span></label>
              <input id="audit-website" name="website" type="url" value={formData.website} onChange={handleChange}
                placeholder="https://yourcompany.com"
                className="w-full rounded-xl border border-border/60 bg-surface-0/40 px-4 py-3 text-sm text-ink placeholder:text-ink-mute/50 outline-none transition-all focus:border-violet/50 focus:bg-surface-0/60 focus:ring-2 focus:ring-violet/10" />
            </div>
            <div>
              <label htmlFor="audit-message" className="mb-1.5 block text-xs font-medium text-ink-soft">What is the biggest problem?</label>
              <textarea id="audit-message" name="message" rows={4} value={formData.message} onChange={handleChange}
                placeholder="Slow checkout, broken forms, low conversion, outdated tech..."
                className="w-full resize-none rounded-xl border border-border/60 bg-surface-0/40 px-4 py-3 text-sm text-ink placeholder:text-ink-mute/50 outline-none transition-all focus:border-violet/50 focus:bg-surface-0/60 focus:ring-2 focus:ring-violet/10" />
              {errors.message && <span className="mt-1 block text-xs text-destructive">{errors.message}</span>}
            </div>
            {status === "error" && (
              <div className="rounded-lg bg-destructive/10 px-4 py-2.5 text-xs text-destructive">Something went wrong. Please try again.</div>
            )}
            <button type="submit" disabled={status === "submitting"}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-br from-violet to-violet-soft px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet/30 disabled:cursor-not-allowed disabled:opacity-70">
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              {status === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              <span>{status === "submitting" ? "Sending..." : "Request Free Audit"}</span>
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Pain Points Visual ──────────────────── */

function PainPointsVisual({ isReduced }: { isReduced: boolean }) {
  const problems = [
    { icon: ServerCrash, label: "Downtime", desc: "Revenue lost to instability" },
    { icon: ShieldAlert, label: "Security", desc: "Unpatched vulnerabilities" },
    { icon: Clock, label: "Slow Release", desc: "Months to ship a feature" },
    { icon: TrendingDown, label: "Lost Leads", desc: "Poor UX drops conversion" },
  ];

  return (
    <motion.div variants={visualVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
      className="relative w-full max-w-lg lg:max-w-xl">
      <div className="pointer-events-none absolute -inset-8 rounded-full bg-destructive/8 blur-[80px]" />
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-surface-1/30 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-destructive/30 to-transparent" />
        <div className="mb-6 flex items-center justify-between">
          <div className="text-sm font-semibold text-ink">System Health Check</div>
          <span className="flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-destructive" />
            Critical
          </span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {problems.map((p, i) => (
            <motion.div key={p.label}
              initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={isReduced ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.1 }}
              className="flex items-start gap-3 rounded-xl border border-border/60 bg-surface-0/30 p-4 transition-all hover:-translate-y-0.5 hover:border-destructive/30 hover:bg-destructive/5 hover:shadow-sm">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                <p.icon className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-ink">{p.label}</div>
                <div className="text-xs text-ink-mute">{p.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 rounded-xl border border-border/60 bg-surface-0/30 p-4">
          <div className="mb-2 flex items-center justify-between text-xs text-ink-mute">
            <span>Platform Risk</span>
            <span>High</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-border/50">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-destructive to-orange-500"
              initial={isReduced ? { width: "0%" } : { width: "0%" }}
              whileInView={isReduced ? { width: "86%" } : { width: "86%" }}
              viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Metrics Visual ──────────────────────── */

function MetricsVisual({ isReduced }: { isReduced: boolean }) {
  return (
    <motion.div variants={visualVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
      className="relative w-full max-w-lg lg:max-w-xl">
      <div className="pointer-events-none absolute -inset-8 rounded-full bg-destructive/8 blur-[80px]" />
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-surface-1/30 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-destructive/30 to-transparent" />
        <div className="mb-6 flex items-center justify-between">
          <div className="text-sm font-semibold text-ink">Performance Report</div>
          <Activity className="h-4 w-4 text-destructive" />
        </div>
        <div className="space-y-3">
          {[
            { label: "Conversion Rate", value: "1.2%", trend: "-34%" },
            { label: "Bounce Rate", value: "78%", trend: "+22%" },
            { label: "Load Time", value: "6.4s", trend: "+180%" },
            { label: "Monthly Churn", value: "12%", trend: "+5%" },
          ].map((m, i) => (
            <motion.div key={m.label}
              initial={isReduced ? { opacity: 1 } : { opacity: 0, x: 20 }}
              whileInView={isReduced ? {} : { opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.1 }}
              className="flex items-center justify-between rounded-xl border border-border/60 bg-surface-0/30 p-4 transition-all hover:-translate-y-0.5 hover:border-destructive/20 hover:shadow-sm">
              <div>
                <div className="text-xs text-ink-mute">{m.label}</div>
                <div className="text-lg font-semibold text-ink">{m.value}</div>
              </div>
              <span className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">{m.trend}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Bottleneck Visual ───────────────────── */

function BottleneckVisual({ isReduced }: { isReduced: boolean }) {
  const steps = [
    { label: "Design", status: "done" },
    { label: "Dev Handoff", status: "blocked" },
    { label: "QA", status: "pending" },
    { label: "Deploy", status: "pending" },
  ];

  return (
    <motion.div variants={visualVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
      className="relative w-full max-w-lg lg:max-w-xl">
      <div className="pointer-events-none absolute -inset-8 rounded-full bg-destructive/8 blur-[80px]" />
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-surface-1/30 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-destructive/30 to-transparent" />
        <div className="mb-6 flex items-center gap-2 text-sm font-semibold text-ink">
          <FileWarning className="h-4 w-4 text-destructive" />
          Delivery Pipeline
        </div>
        <div className="relative space-y-4">
          {steps.map((step, i) => {
            const isBlocked = step.status === "blocked";
            const isDone = step.status === "done";
            return (
              <motion.div key={step.label}
                initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
                whileInView={isReduced ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.12 }}
                className={`relative z-10 flex items-center gap-4 rounded-xl border p-4 transition-all hover:-translate-y-0.5 ${
                  isBlocked ? "border-destructive/40 bg-destructive/10" : "border-border/60 bg-surface-0/30"
                }`}>
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  isDone ? "bg-emerald-500/15 text-emerald-500" : isBlocked ? "bg-destructive/15 text-destructive" : "bg-border/50 text-ink-mute"
                }`}>{isDone ? "✓" : isBlocked ? "!" : i + 1}</div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-ink">{step.label}</div>
                  <div className="text-xs capitalize text-ink-mute">{step.status}</div>
                </div>
              </motion.div>
            );
          })}
          <div className="pointer-events-none absolute left-8 top-8 bottom-8 w-0.5 bg-border/50">
            <motion.div
              className="w-full bg-gradient-to-b from-emerald-500/50 via-destructive to-transparent"
              initial={isReduced ? { height: "0%" } : { height: "0%" }}
              whileInView={isReduced ? { height: "40%" } : { height: "40%" }}
              viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
