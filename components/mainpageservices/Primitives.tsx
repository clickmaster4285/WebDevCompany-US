import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export function RulerTicks() {
  const ticks = Array.from({ length: 24 });
  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 hidden h-full w-8 flex-col items-start lg:flex">
      {ticks.map((_, i) => {
        const major = i % 4 === 0;
        return (
          <div key={i} className="flex flex-1 items-start gap-1.5">
            <span className="block bg-white/15" style={{ height: 1, width: major ? 14 : 7 }} />
            {major && <span className="font-mono text-[9px] leading-none text-white/20">{String(i).padStart(2, "0")}</span>}
          </div>
        );
      })}
    </div>
  );
}

export function CornerBrackets({ active = false }: { active?: boolean }) {
  const side = "absolute h-3 w-3 border-primary transition-opacity duration-300";
  const dim = active ? "opacity-100" : "opacity-0 group-hover:opacity-100";
  return (
    <>
      <span className={`${side} ${dim} left-0 top-0 border-l border-t`} />
      <span className={`${side} ${dim} right-0 top-0 border-r border-t`} />
      <span className={`${side} ${dim} bottom-0 left-0 border-b border-l`} />
      <span className={`${side} ${dim} bottom-0 right-0 border-b border-r`} />
    </>
  );
}

export function PlateHeader({ plate, label, title, lede }: { plate: string; label: string; title: string; lede?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div ref={ref} variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"} className="mb-12">
      <motion.div variants={fadeInUp} className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-primary/70">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" />
        <span>Plate {plate}</span>
        <span className="h-px w-6 bg-white/20" />
        <span className="text-white/40">{label}</span>
      </motion.div>
      <motion.h2 variants={fadeInUp} className="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </motion.h2>
      {lede && <motion.p variants={fadeInUp} className="mt-5 max-w-2xl text-lg leading-relaxed text-white/60">{lede}</motion.p>}
    </motion.div>
  );
}