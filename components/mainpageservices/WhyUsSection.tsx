import { motion } from "framer-motion";
import { whyUs } from "@/data/services-data";
import { PlateHeader, staggerContainer, fadeInUp } from "./Primitives";

export function WhyUsSection() {
  return (
    <section className="mb-20 md:mb-32">
      <div className="layout-container px-4 sm:px-6 lg:px-8">
        <PlateHeader plate="02" label="Why us" title="Why Businesses Choose Clickmasters for Web Development" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {whyUs.map((item) => (
            <motion.div
              key={item.label}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-none border border-white/10 bg-white/[0.02] p-6 md:p-8 transition-colors duration-300 hover:border-primary/40 hover:bg-white/[0.04]"
            >
              {/* Subtle Hover Glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: 'radial-gradient(400px circle at 50% 0%, rgba(139, 92, 246, 0.06), transparent 40%)' }}
              />

              <div className="mb-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-none border border-white/15 bg-black/40 transition-colors duration-300 group-hover:border-primary/50 group-hover:bg-primary/10">
                <item.icon className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
              </div>

              <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.15em] text-white">
                {item.label}
              </h3>

              <p className="text-sm leading-relaxed text-white/50">
                {item.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
