"use client";

import { motion } from "framer-motion";

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

export function IndustryCapabilities({ data }: IndustryCapabilitiesProps) {
  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Capabilities
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-ink mb-6">
          {data.heading}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-ink-mute">Service / Deliverable</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-ink-mute">What It Is</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-ink-mute">Business Impact</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={index} className="border-b border-border/50 hover:bg-surface-1/30 transition-colors">
                  <td className="py-3 px-4 text-sm font-medium text-ink">{item.service}</td>
                  <td className="py-3 px-4 text-sm text-ink-soft">{item.whatItIs}</td>
                  <td className="py-3 px-4 text-sm text-emerald-400">{item.businessImpact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
