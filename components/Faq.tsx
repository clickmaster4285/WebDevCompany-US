"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

const faqs = [
  {
    question: "What does a web development company actually do?",
    answer:
      "A web development company designs, builds, and maintains websites and web apps for businesses. That usually includes UI/UX design, front end and back end coding, online store setup, and ongoing site maintenance.",
  },
  {
    question: "How much do web development services cost in the USA?",
    answer:
      "It depends on the project. A custom website usually starts in the low five figures. Web apps, SaaS platforms, and larger online stores cost more, depending on how complex the project is and how long it takes.",
  },
  {
    question:
      "What is the difference between custom website development and using a website builder?",
    answer:
      "Custom web development means your site is built specifically for your business, with full control over how it looks and performs. Website builders like Wix or Squarespace use templates, which are easier to start with but more limited as your business grows.",
  },
  {
    question: "Do you build online stores on platforms other than Shopify?",
    answer:
      "Yes. We build stores on Shopify, Shopify Plus, WooCommerce, Magento, and fully custom setups, depending on what fits your products and how big you plan to grow.",
  },
  {
    question: "How long does a web development project take?",
    answer:
      "Most websites take about 6 to 10 weeks. Web apps and SaaS platforms usually take longer, depending on how many features are involved.",
  },
];

const BLUEPRINT_GRID: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px),
    linear-gradient(to right, rgba(94,168,255,0.10) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(94,168,255,0.10) 1px, transparent 1px)
  `,
  backgroundSize: "16px 16px, 16px 16px, 96px 96px, 96px 96px",
  maskImage: "radial-gradient(ellipse 90% 70% at 50% 20%, black 30%, transparent 100%)",
  WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 20%, black 30%, transparent 100%)",
};

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function CornerMarks() {
  return (
    <>
      <span className="pointer-events-none absolute left-0 top-0 h-2.5 w-2.5 border-l border-t border-primary/30" />
      <span className="pointer-events-none absolute right-0 top-0 h-2.5 w-2.5 border-r border-t border-primary/30" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l border-primary/30" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r border-primary/30" />
    </>
  );
}

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
  onHoverStart,
  onHoverEnd,
}: {
  faq: (typeof faqs)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const faqSchema = {
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className="group relative border-b border-white/10 last:border-none"
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

      {/* active accent bar */}
      <span
        className={`absolute -left-4 top-0 h-full w-[2px] bg-primary transition-opacity duration-300 sm:-left-6 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <button
        onClick={onToggle}
        className="relative flex w-full items-center justify-between gap-4 py-5 text-left transition-all duration-300 hover:pl-2 sm:py-6"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-4">
          <span
            className={`mt-0.5 font-mono text-xs transition-colors duration-300 ${
              isOpen ? "text-primary" : "text-white/40 group-hover:text-primary/60"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="text-sm font-medium text-white/90 transition-colors duration-300 group-hover:text-white sm:text-base"
            itemProp="name"
          >
            {faq.question}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`shrink-0 border p-1.5 transition-colors duration-300 ${
            isOpen
              ? "border-primary/40 bg-primary/10"
              : "border-white/10 bg-white/5 group-hover:border-primary/30 group-hover:bg-primary/10"
          }`}
        >
          <ChevronDown
            className={`h-4 w-4 transition-colors duration-300 ${
              isOpen ? "text-primary" : "text-white/40 group-hover:text-primary"
            }`}
          />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
            itemScope
            itemProp="acceptedAnswer"
            itemType="https://schema.org/Answer"
          >
            <div className="pb-5 pl-10 pr-4 sm:pb-6 sm:pl-12">
              <motion.p
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm leading-relaxed text-white/60 sm:text-base"
                itemProp="text"
              >
                {faq.answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Right-side graphic — a signal-monitor readout: rotating gauge needle + live waveform,
// both react to whichever FAQ is active (hovered or open).
function SignalMonitor({ activeIndex }: { activeIndex: number | null }) {
  const cx = 50;
  const cy = 50;
  const r = 40;
  const angleFor = (i: number) => -90 + i * (360 / faqs.length);
  const needleAngle = activeIndex !== null ? angleFor(activeIndex) : -90;
  const isActive = activeIndex !== null;

  return (
    <div className="relative hidden lg:block" aria-hidden="true">
      <style>{`
        @keyframes cm-wave-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cm-wave-track { animation: none !important; }
        }
      `}</style>

      <div className="relative border border-white/10 bg-white/[0.02] p-6">
        <CornerMarks />

        <div className="mb-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
          <span>Signal Monitor</span>
          <span className={isActive ? "text-primary" : "text-white/30"}>
            {isActive ? "Decoding" : "Idle"}
          </span>
        </div>

        {/* ambient glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

        {/* gauge */}
        <div className="relative mx-auto mb-6 aspect-square w-full max-w-[240px]">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <circle cx={cx} cy={cy} r={r} stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" fill="none" />
            <circle cx={cx} cy={cy} r={r - 12} stroke="rgba(255,255,255,0.05)" strokeWidth="0.6" fill="none" />

            {faqs.map((_, i) => {
              const outer = polar(cx, cy, r, angleFor(i));
              const inner = polar(cx, cy, r - 6, angleFor(i));
              const lit = activeIndex === i;
              return (
                <line
                  key={i}
                  x1={inner.x}
                  y1={inner.y}
                  x2={outer.x}
                  y2={outer.y}
                  stroke={lit ? "rgba(94,168,255,0.95)" : "rgba(255,255,255,0.2)"}
                  strokeWidth={lit ? 2 : 1}
                  strokeLinecap="round"
                />
              );
            })}

            {/* needle */}
            <motion.g
              style={{ transformOrigin: "50px 50px" }}
              animate={{ rotate: needleAngle }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
            >
              <line x1={cx} y1={cy} x2={cx} y2={cy - (r - 10)} stroke="#5EA8FF" strokeWidth="1.4" strokeLinecap="round" />
            </motion.g>
            <circle cx={cx} cy={cy} r="2.4" fill="#5EA8FF" />

            {faqs.map((_, i) => {
              const p = polar(cx, cy, r + 5, angleFor(i));
              return (
                <text
                  key={i}
                  x={p.x}
                  y={p.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-mono"
                  fontSize="3.4"
                  fill={activeIndex === i ? "#5EA8FF" : "rgba(255,255,255,0.25)"}
                >
                  {String(i + 1).padStart(2, "0")}
                </text>
              );
            })}
          </svg>
        </div>

        {/* waveform */}
        <motion.div
          className="relative h-14 overflow-hidden border-y border-white/10"
          animate={{ scaleY: isActive ? 1.3 : 0.7 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ transformOrigin: "center" }}
        >
          <div
            className="cm-wave-track flex h-full w-max items-center"
            style={{ animation: "cm-wave-scroll 2.6s linear infinite" }}
          >
            {[0, 1].map((copy) => (
              <svg key={copy} width="300" height="56" viewBox="0 0 300 56" className="shrink-0">
                <path
                  d="M0,28 Q18.75,8 37.5,28 T75,28 T112.5,28 T150,28 T187.5,28 T225,28 T262.5,28 T300,28"
                  fill="none"
                  stroke={isActive ? "rgba(94,168,255,0.9)" : "rgba(94,168,255,0.35)"}
                  strokeWidth="1.6"
                />
              </svg>
            ))}
          </div>
        </motion.div>

        {/* status line */}
        <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
          <span>Channel {activeIndex !== null ? String(activeIndex + 1).padStart(2, "0") : "—"}</span>
          <span>{faqs.length} total</span>
        </div>
      </div>
    </div>
  );
}

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const activeIndex = hoverIndex ?? openIndex;

  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section ref={sectionRef} id="faq" className="relative overflow-hidden py-16 md:py-24 bg-black">
      <script type="application/ld+json">{JSON.stringify(faqPageSchema)}</script>

      <div className="pointer-events-none absolute inset-0" style={BLUEPRINT_GRID} aria-hidden="true" />

      <div className="layout-container relative px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          {/* Left — content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5 }}
              className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-primary/70"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" />
              <span>FAQ</span>
              <span className="text-white/30">/ {faqs.length} queries</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
            >
              Common <span className="text-primary">Questions</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="mb-10 max-w-lg text-sm text-white/50 sm:text-base"
            >
              Everything you need to know about working with Clickmasters.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative border border-white/10 bg-white/[0.02] pl-4 pr-4 sm:pl-6 sm:pr-6"
            >
              <CornerMarks />
              <div>
                {faqs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    faq={faq}
                    index={index}
                    isOpen={openIndex === index}
                    onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                    onHoverStart={() => setHoverIndex(index)}
                    onHoverEnd={() => setHoverIndex(null)}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8"
            >
              <p className="text-sm text-white/40">
                Still have questions?{" "}
                <a
                  href="/contact"
                  className="inline-flex items-center gap-1 text-primary transition-colors hover:text-primary/80"
                >
                  Get in touch
                  <Sparkles className="h-3.5 w-3.5" />
                </a>
              </p>
            </motion.div>
          </div>

          {/* Right — animated graphic, offset from center by design */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SignalMonitor activeIndex={activeIndex} />
          </div>
        </div>
      </div>
    </section>
  );
}