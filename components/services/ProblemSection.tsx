"use client";

import { motion, useReducedMotion, useInView, Variants } from "framer-motion";
import {
  AlertTriangle,
  Activity,
  Clock,
  TrendingDown,
  ServerCrash,
  ShieldAlert,
  FileWarning,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ProblemStat } from "@/data/services";
import { Section } from "@/components/ui/Section";

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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const visualVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, x: 30 },
  visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] } },
};

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
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-surface-1/60 p-6 text-left backdrop-blur-xl transition-colors duration-500 hover:border-destructive/25 hover:bg-surface-1/80 sm:p-8"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-destructive/10 blur-3xl" />
      </div>

      <div className="relative flex-1">
        <div className="text-display text-3xl font-semibold text-destructive sm:text-4xl md:text-5xl">
          <AnimatedCounter value={cleanValue} prefix={prefix} suffix={suffix} duration={1.8 + index * 0.2} />
        </div>
        <div className="mt-2 text-sm font-semibold tracking-wide text-ink sm:text-base">{stat.label}</div>
        <div className="mt-1.5 text-sm leading-relaxed text-ink-mute">{stat.description}</div>
      </div>

      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-destructive/60 to-transparent transition-all duration-700 group-hover:w-full" />
    </motion.div>
  );
}

interface ProblemSectionProps {
  heading: string;
  content: string[];
  stats?: ProblemStat[];
  /** Image URL to display on the right side */
  image?: string;
  /** Alt text for the image */
  imageAlt?: string;
  /** Choose a contextual visual if no image is provided */
  rightVisual?: "painpoints" | "metrics" | "bottleneck" | "image" | "form";
  /** Optional callback when the form is submitted */
  onFormSubmit?: (data: AuditFormData) => void | Promise<void>;
  /** Heading shown above the form */
  formTitle?: string;
  /** Subtext below the form title */
  formSubtitle?: string;
}

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

  // If an image is provided, force visual type to image
  const visualType = image ? "image" : rightVisual;

  return (
    <Section background="transparent" padding="lg" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-destructive/[0.03] blur-3xl" />
      </div>

      <div className="relative layout-container grid grid-cols-1 items-start gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* LEFT COLUMN — Content */}
        <div className="text-left">
          <motion.span
            variants={fadeUpVariants}
            {...motionPref}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet/20 bg-violet/10 px-4 py-1.5 text-sm font-medium text-violet"
          >
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
            The Hidden Cost
          </motion.span>

          <motion.h2
            variants={fadeUpVariants}
            {...motionPref}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
            className="text-display text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {heading}
          </motion.h2>

          <motion.div
            className="mt-8 max-w-2xl space-y-5 text-left"
            variants={containerVariants}
            {...motionPref}
          >
            {content.map((paragraph, index) => (
              <motion.p
                key={index}
                variants={itemVariants}
                className="flex items-start gap-3 text-base leading-relaxed text-ink-soft sm:text-lg sm:leading-relaxed"
              >
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive/40" />
                <span>{paragraph}</span>
              </motion.p>
            ))}
          </motion.div>

          {stats && stats.length > 0 && (
            <motion.div
              className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2"
              variants={containerVariants}
              {...motionPref}
            >
              {stats.map((stat, index) => (
                <StatCard key={index} stat={stat} index={index} shouldReduceMotion={isReduced} />
              ))}
            </motion.div>
          )}
        </div>

        {/* RIGHT COLUMN — Visual */}
        <div className="relative flex items-start justify-center lg:justify-end">
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
    </Section>
  );
}

/* ------------------------------------------------------------------ */
// Contextual right-side visuals
/* ------------------------------------------------------------------ */

function ProblemVisual({
  type,
  isReduced,
}: {
  type: "painpoints" | "metrics" | "bottleneck";
  isReduced: boolean;
}) {
  if (type === "metrics") return <MetricsVisual isReduced={isReduced} />;
  if (type === "bottleneck") return <BottleneckVisual isReduced={isReduced} />;
  return <PainPointsVisual isReduced={isReduced} />;
}

/* ------------------------------------------------------------------ */
// Form component
/* ------------------------------------------------------------------ */

interface AuditFormData {
  name: string;
  email: string;
  website: string;
  message: string;
}

interface AuditFormProps {
  isReduced: boolean;
  title: string;
  subtitle: string;
  onSubmit?: (data: AuditFormData) => void | Promise<void>;
}

function AuditForm({ isReduced, title, subtitle, onSubmit }: AuditFormProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [formData, setFormData] = useState<AuditFormData>({
    name: "",
    email: "",
    website: "",
    message: "",
  });
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      // Safeguard: prevent the container from collapsing
      className="relative min-h-[420px] w-full max-w-lg lg:max-w-xl"
    >
      {/* Glow */}
      <div className="absolute -inset-8 rounded-full bg-violet/8 blur-[80px]" />

      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-1/95 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet/10 text-violet">
              <Send className="h-4 w-4" />
            </div>
            <h3 className="text-lg font-semibold text-ink">{title}</h3>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-mute">{subtitle}</p>
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
              We will review your site and get back to you within one business day.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-5 text-sm font-medium text-violet transition-colors hover:text-violet/80"
            >
              Send another request
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="audit-name" className="mb-1.5 block text-xs font-medium text-ink-soft">
                Full Name
              </label>
              <input
                id="audit-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Smith"
                className="w-full rounded-xl border border-border bg-surface-0/60 px-4 py-2.5 text-sm text-ink placeholder:text-ink-mute/50 outline-none transition-all focus:border-violet/50 focus:bg-surface-0 focus:ring-2 focus:ring-violet/10"
              />
              {errors.name && (
                <span className="mt-1 block text-xs text-destructive">{errors.name}</span>
              )}
            </div>

            <div>
              <label htmlFor="audit-email" className="mb-1.5 block text-xs font-medium text-ink-soft">
                Work Email
              </label>
              <input
                id="audit-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@company.com"
                className="w-full rounded-xl border border-border bg-surface-0/60 px-4 py-2.5 text-sm text-ink placeholder:text-ink-mute/50 outline-none transition-all focus:border-violet/50 focus:bg-surface-0 focus:ring-2 focus:ring-violet/10"
              />
              {errors.email && (
                <span className="mt-1 block text-xs text-destructive">{errors.email}</span>
              )}
            </div>

            <div>
              <label htmlFor="audit-website" className="mb-1.5 block text-xs font-medium text-ink-soft">
                Website URL <span className="text-ink-mute">(optional)</span>
              </label>
              <input
                id="audit-website"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://yourcompany.com"
                className="w-full rounded-xl border border-border bg-surface-0/60 px-4 py-2.5 text-sm text-ink placeholder:text-ink-mute/50 outline-none transition-all focus:border-violet/50 focus:bg-surface-0 focus:ring-2 focus:ring-violet/10"
              />
            </div>

            <div>
              <label htmlFor="audit-message" className="mb-1.5 block text-xs font-medium text-ink-soft">
                What is the biggest problem?
              </label>
              <textarea
                id="audit-message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Slow checkout, broken forms, low conversion, outdated tech..."
                className="w-full resize-none rounded-xl border border-border bg-surface-0/60 px-4 py-2.5 text-sm text-ink placeholder:text-ink-mute/50 outline-none transition-all focus:border-violet/50 focus:bg-surface-0 focus:ring-2 focus:ring-violet/10"
              />
              {errors.message && (
                <span className="mt-1 block text-xs text-destructive">{errors.message}</span>
              )}
            </div>

            {status === "error" && (
              <div className="rounded-lg bg-destructive/10 px-4 py-2.5 text-xs text-destructive">
                Something went wrong. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-violet px-5 py-3 text-sm font-semibold text-white shadow-violet-glow transition-all hover:bg-violet/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              {status === "submitting" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span>{status === "submitting" ? "Sending..." : "Request Free Audit"}</span>
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
}

function PainPointsVisual({ isReduced }: { isReduced: boolean }) {
  const problems = [
    { icon: ServerCrash, label: "Downtime", desc: "Revenue lost to instability" },
    { icon: ShieldAlert, label: "Security", desc: "Unpatched vulnerabilities" },
    { icon: Clock, label: "Slow Release", desc: "Months to ship a feature" },
    { icon: TrendingDown, label: "Lost Leads", desc: "Poor UX drops conversion" },
  ];

  return (
    <motion.div
      variants={visualVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="relative w-full max-w-lg lg:max-w-xl"
    >
      <div className="absolute -inset-8 rounded-full bg-destructive/8 blur-[80px]" />

      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-1/95 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="text-sm font-semibold text-ink">System Health Check</div>
          <span className="flex items-center gap-1.5 rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-destructive" />
            Critical
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {problems.map((p, i) => (
            <motion.div
              key={p.label}
              initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={isReduced ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="flex items-start gap-3 rounded-xl border border-border/60 bg-surface-0/50 p-4 transition-colors hover:border-destructive/30 hover:bg-destructive/5"
            >
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

        <div className="mt-6 rounded-xl border border-border/60 bg-surface-0/50 p-4">
          <div className="mb-2 flex items-center justify-between text-xs text-ink-mute">
            <span>Platform Risk</span>
            <span>High</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-border">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-destructive to-orange-500"
              initial={isReduced ? { width: "0%" } : { width: "0%" }}
              whileInView={isReduced ? { width: "86%" } : { width: "86%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MetricsVisual({ isReduced }: { isReduced: boolean }) {
  const metrics = [
    { label: "Conversion Rate", value: "1.2%", trend: "-34%", bad: true },
    { label: "Bounce Rate", value: "78%", trend: "+22%", bad: true },
    { label: "Load Time", value: "6.4s", trend: "+180%", bad: true },
    { label: "Monthly Churn", value: "12%", trend: "+5%", bad: true },
  ];

  return (
    <motion.div
      variants={visualVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="relative w-full max-w-lg lg:max-w-xl"
    >
      <div className="absolute -inset-8 rounded-full bg-destructive/8 blur-[80px]" />

      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-1/95 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="text-sm font-semibold text-ink">Performance Report</div>
          <Activity className="h-4 w-4 text-destructive" />
        </div>

        <div className="space-y-3">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={isReduced ? { opacity: 1 } : { opacity: 0, x: 20 }}
              whileInView={isReduced ? {} : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="flex items-center justify-between rounded-xl border border-border/60 bg-surface-0/50 p-4"
            >
              <div>
                <div className="text-xs text-ink-mute">{m.label}</div>
                <div className="text-lg font-semibold text-ink">{m.value}</div>
              </div>
              <span className="rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive">
                {m.trend}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function BottleneckVisual({ isReduced }: { isReduced: boolean }) {
  const steps = [
    { label: "Design", status: "done" },
    { label: "Dev Handoff", status: "blocked" },
    { label: "QA", status: "pending" },
    { label: "Deploy", status: "pending" },
  ];

  return (
    <motion.div
      variants={visualVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="relative w-full max-w-lg lg:max-w-xl"
    >
      <div className="absolute -inset-8 rounded-full bg-destructive/8 blur-[80px]" />

      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-1/95 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        <div className="mb-6 flex items-center gap-2 text-sm font-semibold text-ink">
          <FileWarning className="h-4 w-4 text-destructive" />
          Delivery Pipeline
        </div>

        <div className="relative space-y-4">
          {steps.map((step, i) => {
            const isBlocked = step.status === "blocked";
            const isDone = step.status === "done";

            return (
              <motion.div
                key={step.label}
                initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
                whileInView={isReduced ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.12 }}
                className={`relative z-10 flex items-center gap-4 rounded-xl border p-4 ${
                  isBlocked
                    ? "border-destructive/40 bg-destructive/10"
                    : "border-border/60 bg-surface-0/50"
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    isDone
                      ? "bg-emerald-500/15 text-emerald-500"
                      : isBlocked
                      ? "bg-destructive/15 text-destructive"
                      : "bg-border text-ink-mute"
                  }`}
                >
                  {isDone ? "✓" : isBlocked ? "!" : i + 1}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-ink">{step.label}</div>
                  <div className="text-xs capitalize text-ink-mute">{step.status}</div>
                </div>
              </motion.div>
            );
          })}

          {/* Connecting line */}
          <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-border">
            <motion.div
              className="w-full bg-gradient-to-b from-emerald-500/50 via-destructive to-transparent"
              initial={isReduced ? { height: "0%" } : { height: "0%" }}
              whileInView={isReduced ? { height: "40%" } : { height: "40%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}