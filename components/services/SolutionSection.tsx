// components/services/SolutionSection.tsx

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Zap } from "lucide-react";
import { SolutionPillar } from "@/lib/data/services";
import { Section } from "@/components/ui/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SolutionSectionProps {
  heading: string;
  content: string;
  pillars: SolutionPillar[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

export function SolutionSection({ heading, content, pillars }: SolutionSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section background="transparent" padding="lg">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-4 flex justify-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-violet/20 bg-violet/10 px-4 py-1.5 text-sm font-medium text-violet">
            <Zap className="h-4 w-4" />
            Our Approach
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

        <motion.p
          className="mx-auto mt-4 max-w-3xl text-center text-base text-ink-soft sm:text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {content}
        </motion.p>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {pillars.map((pillar, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="group relative h-full overflow-hidden rounded-xl border border-border/60 bg-surface-1/50 shadow-soft backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-violet/30 hover:shadow-violet-glow">
                {/* Gradient top accent */}
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-violet to-violet-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <CardHeader className="pb-3">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-violet/10 text-violet transition-all duration-300 group-hover:scale-110 group-hover:bg-violet group-hover:text-white">
                    <Zap className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-ink transition-colors group-hover:text-violet">
                    {pillar.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-ink-soft">
                    {pillar.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}