"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import blogHeroImg from "@/public/assets/blog-hero.png";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";

export function BlogsHero() {
  return (
    <section className="relative overflow-hidden bg-background px-6 pb-20 pt-32 text-white md:px-10 md:pb-24 md:pt-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,92,255,0.35),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]" />
      <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-violet/25 blur-3xl" />
      <div className="absolute -left-32 bottom-10 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

      <div className="relative layout-container px-85 grid items-center gap-12 lg:grid-cols-[1fr_480px]">
        <div>
          <div className="mb-10 rounded-xl px-4 py-2 backdrop-blur-sm">
            <Breadcrumb
              customLabels={{
                blogs: "Blogs",
              }}
            />
          </div>

          <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-violet-soft backdrop-blur">
            Resources
          </span>

          <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.06em] text-white md:text-7xl">
            Blogs, Guides & Digital Growth Insights
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68 md:text-xl md:leading-9">
            Expert insights, practical guides, industry trends, and proven
            strategies to help you build, scale, and grow better digital
            products.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="#blogs"
              className="rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-violet hover:text-white"
            >
              Explore Articles →
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-bold text-white/80 transition hover:border-white/30 hover:text-white"
            >
              Talk to an Expert
            </Link>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 px-15 gap-3">
            {[
              ["20+", "Guides"],
              ["5+", "Topics"],
              ["Weekly", "Insights"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 backdrop-blur"
              >
                <p className="text-xl font-black text-white">{value}</p>
                <p className="mt-1 text-xs font-semibold text-white/45">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className="relative flex justify-center"
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
        >
          <motion.div
            className="absolute -inset-6 rounded-[2.5rem] bg-violet/20 blur-3xl"
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.55, 0.85, 0.55],
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
            className="relative z-10"
          >
            <Image
              src={blogHeroImg}
              alt="Blog Hero"
              width={520}
              height={520}
              priority
              className="h-auto w-full max-w-[520px] rounded-[2rem] object-contain drop-shadow-[0_35px_90px_rgba(0,0,0,0.35)]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}