"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Sparkles, ArrowRight, Circle } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { cn } from "@/lib/utils";
import { industriesData } from "@/data/industries";

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
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full bg-linear-to-r to-transparent",
            gradient,
            "border-2 border-white/15 backdrop-blur-[2px]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

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

    return Object.values(industriesData).filter(
      (industry) =>
        industry.title.toLowerCase().includes(query) ||
        industry.hero.heading.toLowerCase().includes(query) ||
        industry.buyerPersona.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-violet/5 via-transparent to-violet/5 blur-3xl" />

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <ElegantShape
            delay={0.3}
            width={600}
            height={140}
            rotate={12}
            gradient="from-violet/15"
            className="left-[-10%] top-[15%] md:left-[-5%] md:top-[20%]"
          />

          <ElegantShape
            delay={0.5}
            width={500}
            height={120}
            rotate={-15}
            gradient="from-violet/15"
            className="right-[-5%] top-[70%] md:right-0 md:top-[75%]"
          />

          <ElegantShape
            delay={0.4}
            width={300}
            height={80}
            rotate={-8}
            gradient="from-violet/15"
            className="bottom-[5%] left-[5%] md:bottom-[10%] md:left-[10%]"
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20 md:px-6 md:py-28 lg:py-32">
          <div className="mb-8">
            <Breadcrumb customLabels={{ industries: "Industries" }} />
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_420px]">
            <div>
              <motion.div
                custom={0}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 md:mb-8"
              >
                <Circle className="h-2 w-2 fill-violet text-violet" />
                <span className="text-sm tracking-wide text-ink-mute">
                  Industries We Serve
                </span>
              </motion.div>

              <motion.div
                custom={1}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
              >
                <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:mb-6 md:text-6xl lg:text-7xl">
                  <span className="bg-linear-to-b from-ink to-ink/80 bg-clip-text text-transparent">
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
                <p className="mb-8 max-w-2xl text-base font-light leading-relaxed tracking-wide text-ink-mute sm:text-lg md:text-xl">
                  Expert web development tailored to your industry&apos;s unique
                  challenges, compliance requirements, and customer expectations.
                </p>
              </motion.div>

              <motion.div
                custom={2.5}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="flex max-w-2xl gap-4"
              >
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-3.5 h-5 w-5 text-ink-mute" />
                  <input
                    type="text"
                    placeholder="Search by industry name..."
                    className="w-full rounded-xl border border-border bg-white/5 py-3 pl-11 pr-4 text-ink outline-none backdrop-blur-sm transition-all placeholder:text-ink-mute focus:border-violet focus:ring-2 focus:ring-violet"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </motion.div>
            </div>

            <motion.div
              custom={3}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="relative flex min-h-[360px] items-center justify-center"
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
                className="relative z-10 flex h-80 w-80 items-center justify-center"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet/20 to-violet/5 blur-2xl" />

                <svg
                  className="relative z-10 h-64 w-64 text-violet drop-shadow-lg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient
                      id="industryGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#7c5cff" />
                      <stop offset="100%" stopColor="#4c1d95" />
                    </linearGradient>
                  </defs>

                  <g
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="2"
                      width="18"
                      height="20"
                      rx="2"
                      fill="url(#industryGradient)"
                      opacity="0.1"
                      stroke="url(#industryGradient)"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="9"
                      y1="2"
                      x2="9"
                      y2="22"
                      stroke="url(#industryGradient)"
                      strokeWidth="1.5"
                      opacity="0.5"
                    />
                    <line
                      x1="15"
                      y1="2"
                      x2="15"
                      y2="22"
                      stroke="url(#industryGradient)"
                      strokeWidth="1.5"
                      opacity="0.5"
                    />

                    {[5, 9, 13, 17].map((y) =>
                      [5, 11, 17].map((x) => (
                        <rect
                          key={`${x}-${y}`}
                          x={x}
                          y={y}
                          width="2"
                          height="2"
                          rx="0.5"
                          fill="url(#industryGradient)"
                        />
                      ))
                    )}
                  </g>
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background via-transparent to-background/80" />
      </section>

      <section className="relative bg-background py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm text-ink-mute">
              Showing {filteredIndustries.length} industries
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                  className="group block rounded-2xl border border-border bg-surface-1/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-surface-1 hover:shadow-xl hover:shadow-violet/10"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-ink transition-colors group-hover:text-violet">
                      {industry.title}
                    </h3>

                    <ArrowRight className="h-5 w-5 text-ink-mute transition-all group-hover:translate-x-1 group-hover:text-violet" />
                  </div>

                  <p className="mb-3 text-white line-clamp-2 text-sm text-ink-mute">
                    {industry.hero.heading}
                  </p>

                  <p className="text-xs text-white text-ink-mute/50">
                    {industry.buyerPersona}
                  </p>

                  <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
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
              className="py-24 text-center"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                <Sparkles className="h-4 w-4 text-ink-mute" />
                <span className="text-sm text-ink-mute">No results found</span>
              </div>

              <h3 className="text-xl font-semibold text-ink/80">
                No industries found
              </h3>

              <p className="mt-2 text-ink-mute">
                Try adjusting your search terms.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <section className="relative bg-background">
        <div className="container mx-auto border-t border-border px-4 py-16 md:px-6 md:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-ink md:text-4xl">
              Need Industry-Specific Web Development?
            </h2>

            <p className="mb-8 text-lg text-ink-mute">
              Get a free consultation tailored to your industry&apos;s unique
              needs and challenges.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-violet px-8 py-3 font-semibold text-white shadow-lg shadow-violet/25 transition-all duration-300 hover:bg-violet/90 hover:shadow-violet/40"
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}