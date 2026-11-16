// app/industries/IndustriesIndexClient.tsx
'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Breadcrumb } from '@/components/breadcrumb/Breadcrumb';

interface IndustrySummary {
  slug: string;
  title: string;
  metaDescription: string;
  hero: {
    heading: string;
    subheading: string;
    credibilityBar: string[];
  };
  pricing: {
    range: string;
    note: string;
  };
}

interface Props {
  industries: IndustrySummary[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
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

export default function IndustriesIndexClient({ industries }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const isReduced = Boolean(shouldReduceMotion);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden px-0 py-16 pt-20 sm:py-20 md:py-24 lg:py-28 lg:pt-32">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-violet/[0.05] blur-[120px] md:h-[700px] md:w-[700px] md:blur-[150px]" />
          <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-violet/[0.03] blur-[100px] md:h-[500px] md:w-[500px] md:blur-[120px]" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />

        <motion.div
          variants={containerVariants}
          initial={isReduced ? 'visible' : 'hidden'}
          animate="visible"
          className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8"
        >
          <motion.div variants={itemVariants} className="mb-5">
            <Breadcrumb customLabels={{ industries: 'Industries' }} />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="max-w-3xl text-balance text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Web Development Built for Your Industry
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg md:text-xl"
          >
            We engineer industry-specific platforms around the compliance,
            conversion, and commercial realities that determine success in your
            field. Choose your industry to see how we build for it.
          </motion.p>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="relative mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 sm:pb-24 md:px-8 lg:pb-28">
        <motion.div
          variants={containerVariants}
          initial={isReduced ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          {industries.map((industry) => (
            <motion.div key={industry.slug} variants={itemVariants}>
              <Link
                href={`/industries/${industry.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-surface-1/40 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet/40 hover:bg-violet/[0.03] hover:shadow-xl hover:shadow-violet/5 sm:p-7"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-violet sm:text-xl">
                    {industry.title}
                  </h2>
                  <ArrowRight className="h-4 w-4 shrink-0 text-ink-soft/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-violet" />
                </div>

                <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft">
                  {industry.metaDescription}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {industry.hero.credibilityBar.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 rounded-full border border-border/50 bg-background/40 px-2.5 py-1 text-[11px] font-medium text-ink-soft"
                    >
                      <CheckCircle className="h-3 w-3 text-violet" />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-border/40 pt-4">
                  <span className="text-xs text-ink-soft/70">Typical range</span>
                  <span className="text-sm font-semibold text-ink">
                    {industry.pricing.range}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}