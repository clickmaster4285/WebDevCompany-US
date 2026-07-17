"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = { text: string };

export function BusinessCase({ text }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      <Card className="relative bg-slate-900 text-white rounded-2xl overflow-hidden shadow-2xl border-l-8 border-amber-500 border-y-0 border-r-0">
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Header with proper padding and alignment */}
        <CardHeader className="relative z-10 p-6 sm:p-8 pb-4 sm:pb-6">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-amber-400 flex items-center gap-3">
            <motion.svg
              className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" 
              />
            </motion.svg>
            <span>The Business Case & ROI</span>
          </CardTitle>
        </CardHeader>

        {/* Content with proper padding and text alignment */}
        <CardContent className="relative z-10 px-6 sm:px-8 pt-0 pb-6 sm:pb-8">
          <motion.p
            className="text-base sm:text-lg text-slate-300 leading-relaxed sm:leading-loose max-w-4xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {text}
          </motion.p>
        </CardContent>
      </Card>
    </motion.section>
  );
}