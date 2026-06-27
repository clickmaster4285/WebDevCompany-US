// components/services/OutcomeSection.tsx

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TrendingUp, AlertTriangle, Lightbulb, Target } from "lucide-react";
import { OutcomeMetric } from "@/lib/data/services";
import { Section } from "@/components/ui/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OutcomeSectionProps {
  challenge: string;
  solution: string;
  metrics: OutcomeMetric[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

const metricVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
      delay: i * 0.05 + 0.3,
    },
  }),
};

export function OutcomeSection({ challenge, solution, metrics }: OutcomeSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section background="--violet" padding="lg">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-1.5 text-sm font-medium text-green-600">
            <TrendingUp className="h-4 w-4" />
            Proven Results
          </span>
          <h2 className="heading-2 mt-4">Representative Outcome</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-5 lg:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Challenge */}
          <motion.div variants={itemVariants}>
            <Card className="group h-full border-border/60 transition-all duration-300 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/10">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl">Challenge</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">
                  {challenge}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Solution */}
          <motion.div variants={itemVariants}>
            <Card className="group h-full border-border/60 transition-all duration-300 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-600 transition-colors group-hover:bg-green-600 group-hover:text-white">
                    <Lightbulb className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl">Solution</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">
                  {solution}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Metrics */}
        <motion.div
          className="mt-8 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                  <th className="px-4 py-4 text-left text-sm font-semibold md:px-6 md:text-base">
                    KPI
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold md:px-6 md:text-base">
                    Result
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold md:px-6 md:text-base">
                    Why It Matters
                  </th>
                </tr>
              </thead>
              <tbody>
                {metrics.map((metric, index) => (
                  <motion.tr
                    key={index}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={metricVariants}
                    className={`transition-colors hover:bg-primary/5 ${
                      index % 2 === 0 ? "bg-card" : "bg-muted/20"
                    }`}
                  >
                    <td className="border-b border-border/50 px-4 py-4 text-sm font-medium text-foreground md:px-6 md:text-base">
                      <span className="inline-flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        {metric.kpi}
                      </span>
                    </td>
                    <td className="border-b border-border/50 px-4 py-4 text-sm font-bold text-primary md:px-6 md:text-base">
                      {metric.result}
                    </td>
                    <td className="border-b border-border/50 px-4 py-4 text-sm text-muted-foreground md:px-6 md:text-base">
                      {metric.whyItMatters}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}