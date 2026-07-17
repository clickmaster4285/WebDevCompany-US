"use client";
import { motion } from "framer-motion";

type Props = {
  text: string;
};

export function CredibilityBar({ text }: Props) {
  const items = text.split(" · ");
  const loopItems = [...items, ...items];

  return (
    <motion.section
      className="relative w-full bg-slate-900 border-y border-slate-800 py-5 overflow-hidden"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap will-change-transform"
        style={{ animation: "marquee 25s linear infinite" }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {loopItems.map((item, idx) => (
          <motion.span
            key={idx}
            className="mx-6 text-sm md:text-base font-medium text-slate-300 uppercase tracking-wider flex items-center gap-6 flex-shrink-0"
            whileHover={{ color: "#60a5fa", scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {item}
            <span className="text-blue-500 text-xs">✦</span>
          </motion.span>
        ))}
      </motion.div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </motion.section>
  );
}