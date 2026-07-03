"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Search, Sparkles, ArrowRight, Circle, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { industriesData } from "@/data/industries";

// Elegant Shape Component
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-linear-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/15",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

// Define variants for animations
const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.3 + i * 0.1,
      ease: "easeOut" as const,
    },
  }),
};

export default function IndustriesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIndustries = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return Object.values(industriesData);
    return Object.values(industriesData).filter((industry) =>
      industry.title.toLowerCase().includes(query) ||
      industry.hero.heading.toLowerCase().includes(query) ||
      industry.buyerPersona.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-violet/5 via-transparent to-violet/5 blur-3xl" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <ElegantShape
            delay={0.3}
            width={600}
            height={140}
            rotate={12}
            gradient="from-violet/15"
            className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
          />
          <ElegantShape
            delay={0.5}
            width={500}
            height={120}
            rotate={-15}
            gradient="from-violet/15"
            className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
          />
          <ElegantShape
            delay={0.4}
            width={300}
            height={80}
            rotate={-8}
            gradient="from-violet/15"
            className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 py-20 md:py-28 lg:py-32">
          <div className="grid items-center gap-8 md:gap-12 md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_520px]">
            {/* Left Column: Content */}
            <div className="max-w-2xl">
              <motion.div
                custom={0}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 md:mb-8"
              >
                <Circle className="h-2 w-2 fill-violet" />
                <span className="text-sm text-ink-mute tracking-wide">
                  Industries We Serve
                </span>
              </motion.div>

              <motion.div
                custom={1}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 tracking-tight">
                  <span className="bg-clip-text text-transparent bg-linear-to-b from-ink to-ink/80">
                    Industry-Specific Web Solutions
                  </span>
                </h1>
              </motion.div>

              <motion.div
                custom={2}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
              >
                <p className="text-base sm:text-lg md:text-xl text-ink-mute mb-8 leading-relaxed font-light tracking-wide max-w-2xl">
                  Expert web development tailored to your industry&apos;s unique challenges, compliance requirements, and customer expectations.
                </p>
              </motion.div>

              <motion.div
                custom={2.5}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="flex gap-4 max-w-2xl"
              >
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-3.5 h-5 w-5 text-ink-mute" />
                  <input
                    type="text"
                    placeholder="Search by industry name..."
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet focus:border-violet transition-all text-ink placeholder:text-ink-mute backdrop-blur-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </motion.div>
            </div>

            {/* Right Column: Icon/Image */}
            <motion.div
              custom={3}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="relative flex justify-center items-center h-full min-h-[400px]"
            >
              <motion.div
                className="absolute inset-0 rounded-[2.5rem] bg-violet/10 blur-3xl"
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                animate={{
                  y: [0, -14, 0],
                  rotate: [0, 1.2, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.03,
                  rotate: 0,
                }}
                className="relative z-10 flex justify-center items-center w-full"
              >
                <div className="flex justify-center items-center">
                  <div className="h-auto w-full max-w-[480px] flex justify-center items-center">
                    <div className="relative w-full h-full flex justify-center items-center">
                      {/* Professional gradient icon for industries */}
                      <div className="relative w-80 h-80 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-violet/20 to-violet/5 rounded-full blur-2xl" />
                        <div className="relative z-10">
                          <svg className="w-64 h-64 text-violet drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <defs>
                              <linearGradient id="industryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#7c5cff" />
                                <stop offset="100%" stopColor="#4c1d95" />
                              </linearGradient>
                            </defs>
                            <g strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
                              {/* Building complex icon */}
                              <rect x="3" y="2" width="18" height="20" rx="2" fill="url(#industryGradient)" opacity="0.1" stroke="url(#industryGradient)" strokeWidth="1.5"/>
                              <line x1="9" y1="2" x2="9" y2="22" stroke="url(#industryGradient)" strokeWidth="1.5" opacity="0.5"/>
                              <line x1="15" y1="2" x2="15" y2="22" stroke="url(#industryGradient)" strokeWidth="1.5" opacity="0.5"/>
                              {/* Windows */}
                              <rect x="5" y="5" width="2" height="2" rx="0.5" fill="url(#industryGradient)" />
                              <rect x="5" y="9" width="2" height="2" rx="0.5" fill="url(#industryGradient)" />
                              <rect x="5" y="13" width="2" height="2" rx="0.5" fill="url(#industryGradient)" />
                              <rect x="5" y="17" width="2" height="2" rx="0.5" fill="url(#industryGradient)" />
                              <rect x="11" y="5" width="2" height="2" rx="0.5" fill="url(#industryGradient)" />
                              <rect x="11" y="9" width="2" height="2" rx="0.5" fill="url(#industryGradient)" />
                              <rect x="11" y="13" width="2" height="2" rx="0.5" fill="url(#industryGradient)" />
                              <rect x="11" y="17" width="2" height="2" rx="0.5" fill="url(#industryGradient)" />
                              <rect x="17" y="5" width="2" height="2" rx="0.5" fill="url(#industryGradient)" />
                              <rect x="17" y="9" width="2" height="2" rx="0.5" fill="url(#industryGradient)" />
                              <rect x="17" y="13" width="2" height="2" rx="0.5" fill="url(#industryGradient)" />
                              <rect x="17" y="17" width="2" height="2" rx="0.5" fill="url(#industryGradient)" />
                            </g>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background/80 pointer-events-none" />
      </section>

      {/* Industries Grid */}
      <section className="relative bg-background py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <p className="text-ink-mute text-sm">
              Showing {filteredIndustries.length} industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIndustries.map((industry, index) => (
              <motion.div
                key={industry.slug}
                custom={index}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
              >
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group block p-6 rounded-2xl border border-border bg-surface-1/50 hover:bg-surface-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet/10"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-ink group-hover:text-violet transition-colors">
                      {industry.title}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-ink-mute group-hover:text-violet group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-ink-mute text-sm line-clamp-2 mb-3">
                    {industry.hero.heading}
                  </p>
                  <p className="text-ink-mute/50 text-xs">
                    {industry.buyerPersona}
                  </p>
                  <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
                    <span className="text-xs text-ink-mute">
                      {industry.pricing.range}
                    </span>
                    <span className="text-ink-mute/20">&bull;</span>
                    <span className="text-xs text-ink-mute">
                      {industry.schema.audience}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredIndustries.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
                <Sparkles className="h-4 w-4 text-ink-mute" />
                <span className="text-sm text-ink-mute">No results found</span>
              </div>
              <h3 className="text-xl font-semibold text-ink/80">No industries found</h3>
              <p className="text-ink-mute mt-2">Try adjusting your search terms.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-background">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24 border-t border-border">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
              Need Industry-Specific Web Development?
            </h2>
            <p className="text-ink-mute text-lg mb-8">
              Get a free consultation tailored to your industry&apos;s unique needs and challenges.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-violet hover:bg-violet/90 text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-violet/25 hover:shadow-violet/40"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
