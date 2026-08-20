import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { serviceCategories, totalServices } from "@/data/services-data";
import { CornerBrackets } from "./Primitives";

function HeroPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ px: number; py: number; x: number; y: number } | null>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setCoords({ px, py, x: Math.round(px * 960), y: Math.round(py * 720) });
  }

  return (
    <div 
      ref={ref} 
      onMouseMove={handleMove} 
      onMouseLeave={() => setCoords(null)} 
      className="group relative hidden aspect-[4/3] w-full overflow-hidden border border-white/10 bg-surface-1 lg:block shadow-2xl shadow-black/50"
    >
      {/* 1. The Actual Image with Hover Zoom */}
      <Image 
        src="/services/serviceshero.png" 
        alt="ClickMasters Web Development Services" 
        fill 
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        priority
      />

      {/* 2. Overlays for depth, contrast, and theme integration */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      
      {/* Subtle Blueprint Grid Overlay (Blends with the image) */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* 3. Corner Brackets */}
      <CornerBrackets active />

      {/* 4. Interactive Full-Screen Crosshair */}
      {coords && (
        <>
          <div className="pointer-events-none absolute top-0 bottom-0 w-px bg-primary/50" style={{ left: `${coords.px * 100}%` }} />
          <div className="pointer-events-none absolute left-0 right-0 h-px bg-primary/50" style={{ top: `${coords.py * 100}%` }} />
          <div
            className="pointer-events-none absolute z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary bg-primary/20 backdrop-blur-sm shadow-[0_0_10px_rgba(139,92,246,0.5)]"
            style={{ left: `${coords.px * 100}%`, top: `${coords.py * 100}%` }}
          />
        </>
      )}

      {/* 5. Tech Readouts (Glassmorphic Badges for readability over images) */}
      <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest text-white/80 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
        SYS.RENDER // US_REGION
      </div>

      <div className="absolute bottom-4 right-4 font-mono text-[11px] tracking-widest text-white/90 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
        {coords ? `X ${String(coords.x).padStart(3, "0")} · Y ${String(coords.y).padStart(3, "0")}` : "HOVER TO INSPECT"}
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="mb-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }} 
        className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-primary"
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
        <span>Service Index</span>
        <span className="text-white/30">/ USA</span>
      </motion.div>

      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, delay: 0.1 }} 
            className="mb-8 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl text-balance"
          >
            All Web Development Services <span className="text-primary">in the USA</span>
          </motion.h1>
          
          <div className="space-y-5 text-lg leading-relaxed text-white/70">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              Clickmasters is a full-service web development company working with businesses all across the United States. We build everything from simple business websites to enterprise software, online stores, and AI-powered tools — all under one roof. Instead of hiring separate companies for design, development, hosting, and support, you get one team that understands your entire project, from the first idea to launch and everything after.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-white/50">
              Every service we offer follows one rule: your site should help your business, not just sit online looking pretty. Below is everything we build, from web design to eCommerce to AI — each handled by a team that specializes in that area, not a generalist trying to cover it all.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.5 }} 
            className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-6 font-mono text-xs uppercase tracking-widest text-white/40"
          >
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-primary/50" />
              {totalServices} Services
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-primary/50" />
              {serviceCategories.length} Categories
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-primary/50" />
              US Business Hours
            </span>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <HeroPanel />
        </motion.div>
      </div>
    </section>
  );
}