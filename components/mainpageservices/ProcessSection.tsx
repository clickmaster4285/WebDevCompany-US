import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { processSteps } from "@/data/services-data";
import { PlateHeader, CornerBrackets, staggerContainer, fadeInUp } from "./Primitives";

function ProcessStep({ step }: { step: (typeof processSteps)[0] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div 
      ref={ref} 
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative pl-4"
    >
      {/* Glowing Timeline Node */}
      <div className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-background shadow-[0_0_12px_rgba(139,92,246,0.8)]" />
      <div className="mb-1 font-mono text-xs tracking-widest text-primary/70">PHASE {step.num}</div>
      <h3 className="mb-2 text-xl font-bold text-white md:text-2xl">{step.title}</h3>
      <p className="max-w-xl text-white/60 leading-relaxed">{step.desc}</p>
    </motion.div>
  );
}

export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.4"] });
  const railHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="mb-32">
      <PlateHeader plate="03" label="Execution" title="Our Process" />
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-12 lg:gap-16 items-start">
        
        {/* Left Side: Timeline */}
        <motion.div 
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative pl-8"
        >
          <div className="absolute bottom-1 left-0 top-1 w-px bg-white/10" />
          <motion.div 
            className="absolute left-0 top-1 w-px bg-primary shadow-[0_0_8px_rgba(139,92,246,0.5)]" 
            style={{ height: prefersReducedMotion ? "100%" : railHeight }} 
          />
          <div className="space-y-12">
            {processSteps.map((step) => (
              <ProcessStep key={step.num} step={step} />
            ))}
          </div>
        </motion.div>

        {/* Right Side: Sticky Process Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:sticky lg:top-24"
        >
          <div className="group relative aspect-[4/5] w-full overflow-hidden border border-white/10 bg-surface-1 shadow-2xl shadow-black/50">
            <CornerBrackets active />
            <Image 
              src="/services/process.png" 
              alt="ClickMasters Web Development Process" 
              fill 
              className="object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div 
              className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
              style={{ backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)`, backgroundSize: "32px 32px" }}
            />
            <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest text-white/80 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
              SYS.EXECUTION // PIPELINE
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[11px] tracking-widest text-white/90 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
              5 PHASES // 100% TRANSPARENCY
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}