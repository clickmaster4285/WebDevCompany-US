"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { HelpCircle, ChevronDown, Sparkles, Search } from "lucide-react";
import { FAQ } from "@/data/services";

interface FAQSectionProps {
  faqs: FAQ[];
}

/* ─── Animation Variants ─────────────────── */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
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
      animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

/* ─── Main Component ─────────────────────── */

export function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const toggle = (index: number) => setOpenIndex(openIndex === index ? null : index);

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-80px" },
      };

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-20">
      {/* ── Ambient Background ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[450px] w-[450px] rounded-full bg-violet/[0.04] blur-[130px]" />
        <div className="absolute bottom-0 right-1/3 h-[350px] w-[350px] rounded-full bg-indigo-500/[0.03] blur-[100px]" />
      </div>

      {!shouldReduceMotion && (
        <>
          <FloatingOrb className="-left-20 top-1/4 h-60 w-60 bg-violet/5" duration={22} />
          <FloatingOrb className="-right-20 bottom-1/4 h-56 w-56 bg-indigo-500/5" duration={18} delay={4} />
        </>
      )}

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.01]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
        {/* ── Header ── */}
        <motion.div
          className="mb-14 text-center md:mb-20"
          {...motionProps}
          variants={containerVariants}
        >
          <motion.div variants={fadeUpVariants}>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet/20 bg-violet/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet backdrop-blur-sm">
              <HelpCircle className="h-3.5 w-3.5" />
              Common Questions
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="text-display mt-5 text-balance text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl"
          >
            Questions Serious Buyers Ask
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="mx-auto mt-4 max-w-2xl text-base text-ink-mute md:text-lg"
          >
            Straight answers to the things that matter most when evaluating a
            solution.
          </motion.p>
        </motion.div>

        {/* ── FAQ Accordion ── */}
        <motion.div
          className="space-y-3"
          variants={containerVariants}
          {...motionProps}
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <div
                  className={`relative overflow-hidden rounded-2xl border bg-surface-1/20 backdrop-blur-sm transition-all duration-300 ${
                    isOpen
                      ? "border-violet/40 shadow-lg shadow-violet/5"
                      : "border-border/50 hover:border-violet/30 hover:shadow-sm"
                  }`}
                >
                  {/* Left accent bar */}
                  <div
                    className={`absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-violet via-violet/60 to-violet/20 transition-opacity duration-300 ${
                      isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                    }`}
                  />

                  {/* Top accent on hover */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-violet/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <button
                    className={`flex w-full items-center gap-4 px-6 py-5 text-left transition-colors duration-300 md:px-7 md:py-6 ${
                      isOpen ? "bg-violet/[0.02]" : ""
                    }`}
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                  >
                    {/* Number badge */}
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold shadow-sm transition-all duration-300 ${
                        isOpen
                          ? "bg-gradient-to-br from-violet to-violet-soft text-white shadow-violet/20"
                          : "bg-violet/10 text-violet group-hover:bg-violet group-hover:text-white"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Question */}
                    <span className="flex-1 text-base font-semibold text-ink md:text-lg">
                      {faq.question}
                    </span>

                    {/* Chevron */}
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                        isOpen
                          ? "bg-violet text-white"
                          : "bg-violet/10 text-violet group-hover:bg-violet group-hover:text-white"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    </motion.span>
                  </button>

                  {/* Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={
                          shouldReduceMotion
                            ? { height: "auto", opacity: 1 }
                            : { height: 0, opacity: 0 }
                        }
                        animate={{ height: "auto", opacity: 1 }}
                        exit={
                          shouldReduceMotion
                            ? { height: 0, opacity: 0 }
                            : { height: 0, opacity: 0 }
                        }
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }
                        }
                      >
                        <div className="border-t border-border/40 px-6 pb-6 pt-4 md:px-7">
                          <p className="leading-relaxed text-ink-soft">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          className="mt-12 text-center"
          {...motionProps}
          variants={fadeUpVariants}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface-1/30 px-5 py-2.5 text-sm text-ink-mute backdrop-blur-sm">
            <Search className="h-4 w-4 text-violet" />
            <span>
              <strong className="text-ink">{faqs.length} questions</strong>{" "}
              answered — still have one?{" "}
              <a
                href="/contact"
                className="font-medium text-violet transition-colors hover:text-violet/80"
              >
                Ask us directly
              </a>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
