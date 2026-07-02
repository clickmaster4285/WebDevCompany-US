"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function AnimatedCTA({ cta }: { cta: any }) {
  const fitCards = [
    ["Scope", "Website / SaaS / Commerce"],
    ["Budget", "Clear range discussion"],
    ["Timeline", "Launch-ready planning"],
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 80, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="my-16 overflow-hidden rounded-[2.25rem] border border-violet/20 bg-white shadow-[0_35px_120px_rgba(15,23,42,0.12)]"
    >
      <div className="grid lg:grid-cols-[1fr_320px]">
        <motion.div
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.45 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative p-7 md:p-10"
        >
          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-violet/15 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-white shadow-lg shadow-violet/25">
              <span className="h-2 w-2 rounded-full bg-white" />
              Recommended Next Step
            </div>

            <p className="mt-5 text-[11px] font-black uppercase tracking-[0.32em] text-violet">
              {cta.label}
            </p>

            <h3 className="mt-4 max-w-2xl text-3xl font-black leading-tight tracking-[-0.04em] text-slate-950 md:text-4xl">
              {cta.title}
            </h3>

            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-600">
              {cta.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {["Honest fit check", "No obligation", "Senior-led advice"].map(
                (item, index) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: index * 0.08, duration: 0.45 }}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600"
                  >
                    ✓ {item}
                  </motion.span>
                )
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={cta.primaryHref}
                className="rounded-full bg-violet px-6 py-3 text-sm font-black text-white shadow-lg shadow-violet/20 transition hover:-translate-y-0.5 hover:bg-slate-950"
              >
                {cta.primaryText} →
              </Link>

              <Link
                href={cta.secondaryHref}
                className="rounded-full border border-slate-200 px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-violet hover:text-violet"
              >
                {cta.secondaryText}
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="relative border-t border-slate-100 bg-slate-50 p-7 lg:border-l lg:border-t-0">
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">
            Fit Check
          </p>

          <div className="mt-5 space-y-4">
            {fitCards.map(([label, value], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: 70, rotate: 3 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                className="rounded-2xl bg-white p-4 shadow-[0_18px_55px_rgba(15,23,42,0.08)]"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  {label}
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {value}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ delay: 0.42, duration: 0.6, ease: "easeOut" }}
            className="mt-5 rounded-2xl bg-slate-950 p-4 text-white shadow-[0_22px_60px_rgba(15,23,42,0.25)]"
          >
            <p className="text-sm font-black">Quick recommendation</p>
            <p className="mt-2 text-xs leading-5 text-white/60">
              We’ll tell you if ClickMasters fits — and if not, what type of
              partner does.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}