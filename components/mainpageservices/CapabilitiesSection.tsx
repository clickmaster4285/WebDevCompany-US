import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { serviceCategories } from "@/data/services-data";
import { PlateHeader, CornerBrackets } from "./Primitives";

export function CapabilitiesSection() {
  const [activeTab, setActiveTab] = useState(serviceCategories[0].id);
  const currentCategory = serviceCategories.find((c) => c.id === activeTab)!;

  return (
    <section className="mb-32">
      <PlateHeader plate="01" label="Capabilities" title="Our Complete Range of Web Development and Digital Services" lede="From core web development to advanced AI features, our services are grouped around how businesses in the US actually grow online: build a strong website first, sell more effectively, then keep improving." />

      <div className="mb-3 flex flex-wrap gap-1 overflow-x-auto rounded-lg border border-white/10 bg-white/[0.02] p-1">
        {serviceCategories.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="relative flex items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70">
              {isActive && <motion.span layoutId="tab-indicator" className="absolute inset-0 rounded-md bg-primary" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <tab.icon className={`relative z-10 h-4 w-4 transition-colors ${isActive ? "text-black" : "text-white/50"}`} />
              <span className={`relative z-10 transition-colors ${isActive ? "text-black" : "text-white/60"}`}>{tab.title}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="mb-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-white/35">
          <span className="text-primary/70">Viewing layer</span><span>·</span><span>{currentCategory.code}</span><span>—</span><span>{currentCategory.services.length} services</span>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {currentCategory.services.map((service, index) => (
            <motion.div key={service.slug} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05 }} className="group relative border border-white/10 bg-white/[0.02] p-5 transition-colors duration-300 hover:border-primary/30">
              <CornerBrackets />
              <Link href={`/services/${service.slug}`} className="relative z-10 block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/70">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/60">{currentCategory.code}—{String(index + 1).padStart(3, "0")}</span>
                  <span className="h-1 w-1 rounded-full bg-white/20 transition-colors duration-300 group-hover:bg-primary" />
                </div>
                <h3 className="text-base font-semibold text-white transition-colors group-hover:text-primary">{service.name}</h3>
                <div className="mt-4 flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-white/40 group-hover:text-primary">
                  <span className="h-px w-3 bg-white/30 transition-all duration-300 group-hover:w-6 group-hover:bg-primary" />
                  <span>View service</span>
                  <ChevronRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}