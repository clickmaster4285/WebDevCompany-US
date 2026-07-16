"use client";

import { motion, useReducedMotion, useInView, type Variants } from "framer-motion";
import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import {
  CheckCircle,
  ArrowRight,
  Send,
  Loader2,
  CheckCircle2,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";

/* ------------------------------------------------------------------ */
// Types
/* ------------------------------------------------------------------ */

interface IndustryHeroProps {
  data: {
    heading: string;
    subheading: string;
    credibilityBar: string[];
    primaryCTA: string;
    secondaryCTA: string;
    socialProof: string;
  };
}

interface FormData {
  name: string;
  email: string;
  website: string;
  message: string;
}

/* ------------------------------------------------------------------ */
// Animation Variants
/* ------------------------------------------------------------------ */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] as const },
  },
};

const formVariants: Variants = {
  hidden: { opacity: 0, x: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.215, 0.61, 0.355, 1] as const, delay: 0.3 },
  },
};

/* ------------------------------------------------------------------ */
// Component
/* ------------------------------------------------------------------ */

export function IndustryHero({ data }: IndustryHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const isReduced = Boolean(shouldReduceMotion);

  const motionPref = {
    initial: isReduced ? "visible" : "hidden",
    animate: "visible",
  };

  return (
    <section className="relative overflow-hidden bg-surface-1/50 pt-20 pb-16 md:pt-28 md:pb-24 lg:pt-32 lg:pb-28">
      {/* Ambient glow effects */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute right-0 top-0 h-[500px] w-[500px] md:h-[700px] md:w-[700px] rounded-full bg-violet/[0.05] blur-[120px] md:blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-violet/[0.03] blur-[100px] md:blur-[120px]" />
      </div>

      <motion.div
        variants={containerVariants}
        {...motionPref}
        className="relative layout-container grid grid-cols-1 items-start gap-10 px-4 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:gap-12 lg:gap-16 md:px-8 lg:px-12"
      >
        {/* ===== LEFT COLUMN — Content ===== */}
        <div className="flex flex-col pt-2 md:pt-6 lg:pt-8">
          <motion.div variants={itemVariants} className="mb-5 self-start">
            <Breadcrumb customLabels={{ industries: "Industries" }} />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {data.heading}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg md:text-xl"
          >
            {data.subheading}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-wrap gap-2.5"
          >
            {data.credibilityBar.map((item, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-sm text-ink-soft backdrop-blur-sm transition-colors hover:bg-white/[0.08]"
              >
                <CheckCircle className="h-3.5 w-3.5 text-violet" />
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap gap-3 md:mt-10"
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-violet px-6 py-3.5 text-sm font-semibold text-white shadow-violet-glow transition-all hover:bg-violet/90 hover:shadow-violet-glow-lg active:scale-[0.98] sm:px-8 sm:py-4 sm:text-base"
            >
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              {data.primaryCTA}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#overview"
              className="group inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-surface-1/60 px-6 py-3.5 text-sm font-semibold text-ink-soft backdrop-blur-md transition-all hover:border-violet/30 hover:bg-violet/5 hover:text-ink active:scale-[0.98] sm:px-8 sm:py-4 sm:text-base"
            >
              {data.secondaryCTA}
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-xs text-ink-mute md:mt-8"
          >
            {data.socialProof}
          </motion.p>
        </div>

        {/* ===== RIGHT COLUMN — Form ===== */}
        <motion.div
          variants={formVariants}
          {...motionPref}
          className="relative flex items-start justify-center md:mt-4 md:justify-start"
        >
          <ConsultForm isReduced={isReduced} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
// Consultation Form
/* ------------------------------------------------------------------ */

function ConsultForm({ isReduced }: { isReduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    website: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validate = useCallback((): boolean => {
    const nextErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name.trim()) nextErrors.name = "Name is required";
    if (!formData.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) nextErrors.message = "Please describe your needs";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;
      setStatus("submitting");
      // Simulate submission — replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus("success");
      setFormData({ name: "", email: "", website: "", message: "" });
    },
    [validate]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name as keyof FormData]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const inputClass =
    "w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-violet/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-violet/10";

  return (
    <motion.div
      ref={ref}
      initial={isReduced ? { opacity: 1 } : { opacity: 0, x: 30 }}
      animate={isInView || isReduced ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] as const }}
      className="relative w-full max-w-lg lg:max-w-xl"
    >
      {/* Glow */}
      <div className="absolute -inset-6 md:-inset-8 rounded-full bg-violet/10 blur-[60px] md:blur-[80px]" />

      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/[0.08] bg-white/[0.04] p-5 sm:p-6 md:p-8 shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="mb-5 md:mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet/15 text-violet">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-semibold text-white">Free Consultation</h3>
              <p className="mt-0.5 text-xs md:text-sm leading-relaxed text-white/60">
                Tell us about your project and we&apos;ll be in touch within one business day.
              </p>
            </div>
          </div>
        </div>

        {status === "success" ? (
          <motion.div
            initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 py-10 md:py-12 text-center"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15">
              <CheckCircle2 className="h-7 w-7 text-emerald-500" />
            </div>
            <h4 className="mt-4 text-base font-semibold text-white">Request received</h4>
            <p className="mt-1 max-w-[240px] text-sm text-white/60">
              We will review your project and get back to you within one business day.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-5 text-sm font-medium text-violet transition-colors hover:text-violet/80"
            >
              Submit another request
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 md:space-y-4" noValidate>
            <div>
              <label htmlFor="hero-name" className="mb-1.5 block text-xs font-medium text-white/70">
                Full Name
              </label>
              <input
                id="hero-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Smith"
                className={inputClass}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "hero-name-error" : undefined}
              />
              {errors.name && (
                <span id="hero-name-error" className="mt-1 block text-xs text-red-400">
                  {errors.name}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="hero-email" className="mb-1.5 block text-xs font-medium text-white/70">
                Work Email
              </label>
              <input
                id="hero-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@company.com"
                className={inputClass}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "hero-email-error" : undefined}
              />
              {errors.email && (
                <span id="hero-email-error" className="mt-1 block text-xs text-red-400">
                  {errors.email}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="hero-website" className="mb-1.5 block text-xs font-medium text-white/70">
                Website URL <span className="text-white/40">(optional)</span>
              </label>
              <input
                id="hero-website"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://yourcompany.com"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="hero-message" className="mb-1.5 block text-xs font-medium text-white/70">
                Tell us about your project
              </label>
              <textarea
                id="hero-message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                placeholder="Share a brief overview of what you're looking to build..."
                className={`${inputClass} resize-none`}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "hero-message-error" : undefined}
              />
              {errors.message && (
                <span id="hero-message-error" className="mt-1 block text-xs text-red-400">
                  {errors.message}
                </span>
              )}
            </div>

            {status === "error" && (
              <div className="rounded-lg bg-red-500/10 px-4 py-2.5 text-xs text-red-400">
                Something went wrong. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-violet px-5 py-3 text-sm font-semibold text-white shadow-violet-glow transition-all hover:bg-violet/90 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.98]"
            >
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              {status === "submitting" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span>{status === "submitting" ? "Sending..." : "Send Consultation Request"}</span>
            </button>

            <p className="text-center text-xs text-white/40">
              <MessageSquare className="mr-1 inline-block h-3 w-3" />
              We typically respond within 24 hours
            </p>
          </form>
        )}
      </div>
    </motion.div>
  );
}