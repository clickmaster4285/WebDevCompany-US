"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ClipboardList, Search, Palette, Code, Rocket, LineChart } from "lucide-react";
import { ProcessStep } from "@/data/services";
import { Section } from "@/components/ui/Section";

interface ProcessSectionProps {
  heading: string;
  steps: ProcessStep[];
}

const defaultIcons = [Search, ClipboardList, Palette, Code, Rocket, LineChart];

const stepVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
      delay: i * 0.1,
    },
  }),
};

export function ProcessSection({ heading, steps }: ProcessSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section background="transparent" padding="lg">
      <div className="layout-container">
        <motion.div
          className="mb-12 text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-violet/20 bg-violet/10 px-4 py-1.5 text-sm font-medium text-violet">
            <ClipboardList className="h-4 w-4" />
            How We Work
          </span>
          <h2 className="text-display mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl">
            {heading}
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border md:left-8" />
          <motion.div
            className="absolute left-6 top-0 w-px bg-gradient-to-b from-violet to-violet/20 md:left-8"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          />

          <div className="space-y-8 md:space-y-10">
            {steps.map((step, index) => {
              const Icon = defaultIcons[index % defaultIcons.length];
              return (
                <motion.div
                  key={step.number}
                  className="relative flex gap-5 md:gap-8"
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={stepVariants}
                >
                  <motion.div
                    className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet to-violet-soft text-sm font-bold text-white shadow-lg shadow-violet/25 md:h-16 md:w-16 md:text-lg"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    {step.number}
                  </motion.div>

                  <motion.div
                    className="flex-1 rounded-2xl border border-border/60 bg-surface-1/60 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet/30 hover:shadow-lg md:p-6"
                    whileHover={shouldReduceMotion ? {} : { y: -3 }}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <Icon className="h-4 w-4 text-violet md:h-5 md:w-5" />
                      <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                    </div>
                    <p className="leading-relaxed text-ink-soft">{step.description}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}