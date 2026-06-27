// components/services/ProblemSection.tsx

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { ProblemStat } from "@/lib/data/services";
import { Section } from "@/components/ui/Section";

interface ProblemSectionProps {
  heading: string;
  content: string[];
  stats?: ProblemStat[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

export function ProblemSection({ heading, content, stats }: ProblemSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section background="transparent" padding="lg">
      <div className="mx-auto max-w-4xl">
        <motion.div
          className="mb-4 flex justify-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-500">
            <AlertTriangle className="h-4 w-4" />
            The Hidden Cost
          </span>
        </motion.div>

        <motion.h2
          className="text-display text-center text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {heading}
        </motion.h2>

        <motion.div
          className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft sm:text-lg"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {content.map((paragraph, index) => (
            <motion.p key={index} variants={itemVariants} className="leading-relaxed">
              {paragraph}
            </motion.p>
          ))}
        </motion.div>

        {stats && stats.length > 0 && (
          <motion.div
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="group relative rounded-xl border border-border/60 bg-surface-1/50 p-6 text-center shadow-soft backdrop-blur-sm transition-all duration-300 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/5"
                variants={itemVariants}
                whileHover={shouldReduceMotion ? {} : { y: -4 }}
              >
                <motion.div
                  className="text-display text-3xl font-semibold text-red-500 sm:text-4xl"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring" as const,
                    stiffness: 400,
                    damping: 20,
                    delay: 0.2,
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="mt-1.5 font-medium text-ink">
                  {stat.label}
                </div>
                <div className="mt-1 text-sm text-ink-mute">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </Section>
  );
}