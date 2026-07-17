"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

type Props = { text: string };

export function FeaturedAnswer({ text }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="relative bg-gradient-to-br from-blue-50 to-white border-l-4 border-blue-600 rounded-r-xl shadow-sm overflow-hidden border-y-0 border-r-0">
        <CardContent className="p-8 md:p-10">
          {/* Animated Watermark Quote Icon */}
          <motion.svg
            className="absolute top-4 right-4 w-24 h-24 text-blue-100 opacity-50"
            fill="currentColor"
            viewBox="0 0 24 24"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            whileInView={{ opacity: 0.5, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </motion.svg>

          <motion.p
            className="relative z-10 text-lg md:text-xl text-slate-800 leading-relaxed font-medium italic"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            &ldquo;{text}&rdquo;
          </motion.p>
        </CardContent>
      </Card>
    </motion.section>
  );
}