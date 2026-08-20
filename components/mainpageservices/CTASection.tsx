import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { CornerBrackets } from "./Primitives";

export function CTASection() {
  return (
    <section className="border-t border-white/10 py-20 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative mx-auto max-w-3xl border border-white/10 bg-white/[0.02] px-6 py-14 sm:px-14">
        <CornerBrackets active />
        <h2 className="mx-auto mb-6 max-w-3xl text-3xl font-bold text-white md:text-5xl">
          Ready to Build Something That Actually Works?
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-white/60">
          Whether you need a brand-new website, a large enterprise platform, or help keeping your current site running smoothly, Clickmasters has the development, design, and optimization skills your project needs — all from one team.
        </p>
        <Link href="/contact" className="inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 font-semibold text-black transition-colors duration-300 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          Get a Free Consultation
          <ChevronRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </section>
  );
}