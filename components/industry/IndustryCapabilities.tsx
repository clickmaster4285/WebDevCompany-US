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
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Capabilities
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-ink mb-6 md:mb-8">
          {data.heading}
        </h2>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-hidden rounded-2xl border border-border bg-surface-1/30">
          <motion.table
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full border-collapse"
          >
            <thead>
              <tr className="border-b border-border bg-surface-1/50">
                <th className="text-left py-4 px-5 text-sm font-semibold text-ink-mute w-[30%]">
                  Service / Deliverable
                </th>
                <th className="text-left py-4 px-5 text-sm font-semibold text-ink-mute w-[40%]">
                  What It Is
                </th>
                <th className="text-left py-4 px-5 text-sm font-semibold text-ink-mute w-[30%]">
                  Business Impact
                </th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <motion.tr
                  key={index}
                  variants={rowVariants}
                  className="border-b border-border/40 hover:bg-surface-1/40 transition-colors duration-300 group"
                >
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-violet opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="text-sm font-medium text-ink">{item.service}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-sm text-ink-soft">{item.whatItIs}</td>
                  <td className="py-4 px-5">
                    <span className="inline-flex items-center gap-1 text-sm text-emerald-400 font-medium">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      {item.businessImpact}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {data.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="bg-surface-1/50 rounded-xl p-4 border border-border"
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-violet" />
                <h4 className="text-sm font-semibold text-ink">{item.service}</h4>
              </div>
              <p className="text-sm text-ink-soft mb-2">{item.whatItIs}</p>
              <span className="inline-flex items-center gap-1 text-sm text-emerald-400 font-medium">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {item.businessImpact}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}