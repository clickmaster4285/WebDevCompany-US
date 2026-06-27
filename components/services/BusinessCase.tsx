// components/services/BusinessCase.tsx

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/card";

interface BusinessCaseProps {
  heading: string;
  content: string;
  valueStreams: string[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

// Reduced-motion fallback: fade only, no movement/scale
const reducedItemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

export function BusinessCase({ heading, content, valueStreams }: BusinessCaseProps) {
  const shouldReduceMotion = useReducedMotion();
  const activeItemVariants = shouldReduceMotion ? reducedItemVariants : itemVariants;

  return (
    <Section background="transparent" padding="lg">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300 backdrop-blur-sm">
            <TrendingUp className="h-4 w-4" aria-hidden="true" />
            Business Impact
          </span>
          <h2 className="heading-2 mt-4 text-foreground">{heading}</h2>
        </motion.div>

        <motion.p
          className="text-body-lg mx-auto mb-10 max-w-3xl text-center text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {content}
        </motion.p>

        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          role="list"
        >
          {valueStreams.map((stream, index) => (
            <motion.div
              key={index}
              variants={activeItemVariants}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { y: -6, transition: { duration: 0.25, ease: "easeOut" } }
              }
              role="listitem"
            >
              <Card
                tabIndex={0}
                className="group relative h-full overflow-hidden border-border/60 bg-surface-1/50 backdrop-blur-sm shadow-soft transition-all duration-300 hover:border-violet-500/30 hover:shadow-violet-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {/* Subtle glow wash on hover */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/0 via-violet-500/0 to-violet-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:from-violet-500/[0.06] group-hover:to-violet-400/[0.03]" />

                <CardContent className="relative flex items-start gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-300 transition-all duration-300 group-hover:scale-110 group-hover:border-violet-400/40 group-hover:bg-violet-500 group-hover:text-white">
                    <TrendingUp className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="pt-1.5 leading-relaxed text-foreground">
                    {stream}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}