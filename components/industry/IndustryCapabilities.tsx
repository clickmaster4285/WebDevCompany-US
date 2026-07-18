"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Zap } from "lucide-react";

interface IndustryCapabilitiesProps {
  data: {
    heading: string;
    items: Array<{
      service: string;
      whatItIs: string;
      businessImpact: string;
    }>;
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] as const },
  },
};

export function IndustryCapabilities({ data }: IndustryCapabilitiesProps) {
  return (
    <div className="py-10 md:py-14" id="capabilities">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] as const }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Capabilities
        </div>
        <h2 className="mb-6 text-2xl font-bold text-ink md:mb-8 md:text-3xl lg:text-4xl text-balance">
          {data.heading}
        </h2>

        {/* Desktop Table */}
        <div className="hidden overflow-hidden rounded-2xl border border-border bg-surface-1/30 md:block">
          <motion.table
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full border-collapse"
          >
            <thead>
              <tr className="border-b border-border bg-surface-1/50">
                <th className="w-[30%] px-5 py-4 text-left text-sm font-semibold text-ink-mute">
                  Service / Deliverable
                </th>
                <th className="w-[40%] px-5 py-4 text-left text-sm font-semibold text-ink-mute">
                  What It Is
                </th>
                <th className="w-[30%] px-5 py-4 text-left text-sm font-semibold text-ink-mute">
                  Business Impact
                </th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <motion.tr
                  key={index}
                  variants={rowVariants}
                  className="border-b border-border/40 transition-colors duration-300 last:border-b-0 hover:bg-surface-1/40 group"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-violet opacity-0 transition-opacity group-hover:opacity-100" />
                      <span className="text-sm font-medium text-ink">{item.service}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-ink-soft">{item.whatItIs}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-400">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      {item.businessImpact}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-3 md:hidden">
          {data.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="rounded-xl border border-border bg-surface-1/50 p-4"
            >
              <div className="mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4 text-violet" />
                <h4 className="text-sm font-semibold text-ink">{item.service}</h4>
              </div>
              <p className="mb-2 text-sm text-ink-soft">{item.whatItIs}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-400">
                <ArrowUpRight className="h-3.5 w-3.5" />
                {item.businessImpact}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}