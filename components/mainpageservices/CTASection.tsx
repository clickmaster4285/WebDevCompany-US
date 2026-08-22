import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { CornerBrackets } from "./Primitives";

export function CTASection() {
  return (
    <section className="border-t border-white/10 py-24 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }}
        transition={{ duration: 0.6 }} 
        className="relative mx-auto max-w-3xl overflow-hidden border border-white/10 bg-white/[0.02] px-6 py-16 sm:px-14"
      >
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        
        {/* Subtle Hover Glow */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 hover:opacity-100" style={{ background: 'radial-gradient(600px circle at 50% 50%, rgba(139, 92, 246, 0.08), transparent 40%)' }} />

        <CornerBrackets active />
        
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative mx-auto mb-6 max-w-3xl text-3xl font-bold text-white md:text-5xl text-balance"
        >
          Ready to Build Something That Actually Works?
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative mx-auto mb-10 max-w-xl text-white/60"
        >
          Whether you need a brand-new website, a large enterprise platform, or help keeping your current site running smoothly, Clickmasters has the development, design, and optimization skills your project needs — all from one team.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
          className="relative inline-block"
        >
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 font-semibold text-black transition-all duration-300 hover:bg-white hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Get a Free Consultation
            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}