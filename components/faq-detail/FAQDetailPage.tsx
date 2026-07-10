"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import type { FAQPage } from "@/data/faq-pages";

type FAQDetailPageProps = {
  faq: FAQPage;
};

export function FAQDetailPage({ faq }: FAQDetailPageProps) {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <section className="relative overflow-hidden px-4 pb-10 pt-28 sm:px-6 sm:pb-14 sm:pt-32 lg:pb-20 lg:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(124,92,255,0.18),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.12),transparent_35%)]" />

        <div className="relative layout-container px-17">
          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="inline-flex rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 backdrop-blur-sm">
              <Breadcrumb
                customLabels={{
                  faqs: "FAQs",
                }}
              />
            </div>
          </div>

          {/* Main Grid: Left Side Text & Right Side Image */}
          <div className="mt-12 grid items-center gap-8 md:gap-12 md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_520px]">
            {/* Left Column: Content */}
            <div className="w-full min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-violet-300 backdrop-blur sm:text-xs">
                <Sparkles className="h-4 w-4" />
                Direct Answer
              </span>

              <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
                {faq.aboveTheFold.headline}
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                {faq.aboveTheFold.directAnswer}
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {faq.aboveTheFold.credibilityBar.items.map((item) => (
                  <div
                    key={item}
                    className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-4 backdrop-blur"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-600/20 text-violet-300">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 text-sm font-black text-white/75 truncate">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={faq.aboveTheFold.primaryCta.url}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-black text-slate-950 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-violet-600 hover:text-white"
                >
                  {faq.aboveTheFold.primaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href={faq.aboveTheFold.secondaryCta.url}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-6 py-4 text-sm font-black text-white/80 transition hover:-translate-y-0.5 hover:border-white/30 hover:text-white"
                >
                  {faq.aboveTheFold.secondaryCta.label}
                </Link>
              </div>
            </div>

            {/* Right Column: Image with Animations */}
            <motion.div
              className="relative flex justify-center items-center w-full h-full min-h-[400px]"
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Glowing Background Blur */}
              <motion.div
                className="absolute inset-0 rounded-[2.5rem] bg-violet-600/20 blur-3xl"
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

              {/* Floating Image Wrapper */}
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
                className="relative z-10 flex justify-center items-center"
              >
                <Image
                  src="/assets/faqside.png"
                  alt="FAQ Hero"
                  width={520}
                  height={520}
                  priority
                  className="h-auto w-full max-w-[520px] rounded-[2rem] object-contain drop-shadow-[0_35px_90px_rgba(0,0,0,0.35)]"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Featured Answer Block */}
          <section className="mt-12 rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl sm:rounded-[2rem] sm:p-7 lg:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-300">
                  Featured Answer
                </p>
                <p className="mt-4 max-w-4xl text-base font-semibold leading-8 text-white/75 sm:text-lg">
                  {faq.featuredAnswerBlock.text}
                </p>
              </div>
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-violet-300 shadow-lg">
                <ShieldCheck className="h-6 w-6" />
              </span>
            </div>
          </section>
        </div>
      </section>

      {/* Main Body Content & Sidebar */}
      <section className="layout-container px-18 py-10 lg:py-12">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_330px]">
          {/* Main Column */}
          <div className="grid min-w-0 gap-7">
            <ContentBlock
              title={faq.explainedSection.title}
              body={faq.explainedSection.body}
            />

            <ContentBlock
              title={faq.howThisAppliesToYou.title}
              body={faq.howThisAppliesToYou.body}
            />

            <DataTable
              title={faq.quickReference.title}
              subtitle={faq.quickReference.subtitle}
              rows={faq.quickReference.rows}
            />

            <DataTable
              title={faq.whyTrustOurAnswer.title}
              subtitle={faq.whyTrustOurAnswer.body}
              rows={faq.whyTrustOurAnswer.rows}
            />

            {/* Next Steps Section */}
            <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.05)] sm:rounded-[2rem] sm:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-600">
                {faq.yourNextStep.title}
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-slate-950 sm:text-3xl">
                {faq.yourNextStep.subtitle}
              </h2>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {faq.yourNextStep.steps.map((step) => (
                  <div
                    key={step.step}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-sm font-black text-white">
                      {step.step}
                    </span>
                    <h3 className="mt-4 text-lg font-black text-slate-950">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Bottom Line Challenge/Solution */}
            <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.05)] sm:rounded-[2rem] sm:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-600">
                {faq.bottomLine.title}
              </p>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <InfoBox
                  title="Challenge"
                  text={faq.bottomLine.challenge}
                  tone="red"
                />
                <InfoBox
                  title="Solution"
                  text={faq.bottomLine.solution}
                  tone="green"
                />
              </div>

              <DataTable title="Key Takeaways" rows={faq.bottomLine.kpis} />
            </section>

            <ContentBlock
              title={faq.whyHonestAnswerMatters.title}
              body={faq.whyHonestAnswerMatters.body}
            />
          </div>

          {/* Sticky Sidebar (Desktop Only) */}
          <aside className="hidden space-y-6 lg:block lg:sticky lg:top-28 lg:self-start">
            <SideCard title="At a Glance">
              <div className="space-y-3">
                {faq.quickReference.rows.slice(0, 5).map((row) => (
                  <div
                    key={row.point}
                    className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-sm font-semibold text-slate-500">
                      {row.point}
                    </span>
                    <span className="text-right text-sm font-black text-slate-950">
                      {row.detail}
                    </span>
                  </div>
                ))}
              </div>
            </SideCard>

            <SideCard title="Related Questions">
              <div className="space-y-2">
                {faq.relatedQuestions.map((item) => (
                  <details
                    key={item.question}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <summary className="cursor-pointer list-none text-sm font-black text-slate-950">
                      {item.question}
                    </summary>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </SideCard>

            <SideCard title="Bottom Line">
              <p className="text-sm leading-7 text-slate-600">
                {faq.riskReversal.text}
              </p>
            </SideCard>
          </aside>
        </div>

        {/* CTA Banner */}
        <section className="mt-10 rounded-[1.5rem] bg-slate-950 p-6 text-white shadow-2xl sm:rounded-[2rem] sm:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-600">
            Specific Question
          </p>
          <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] sm:text-3xl md:text-4xl">
            {faq.specificQuestionCta.title}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-white/70">
            {faq.specificQuestionCta.body}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href={faq.specificQuestionCta.primaryCta.url}
              className="inline-flex items-center justify-center rounded-full bg-violet-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-700"
            >
              {faq.specificQuestionCta.primaryCta.label}
            </Link>

            <Link
              href={faq.specificQuestionCta.secondaryCta.url}
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-black text-white transition hover:bg-white/15"
            >
              {faq.specificQuestionCta.secondaryCta.label}
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}

// Subcomponents remains clean and standard
function ContentBlock({ title, body }: { title: string; body: string }) {
  return (
    <section className="min-w-0 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.05)] sm:rounded-[2rem] sm:p-8">
      <h2 className="text-2xl font-black tracking-[-0.04em] text-slate-950 sm:text-3xl">
        {title}
      </h2>
      <div className="mt-5 space-y-5">
        {body.split("\n\n").map((paragraph) => (
          <p key={paragraph} className="text-[15px] leading-8 text-slate-600">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

function SideCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
      <h3 className="text-xl font-black tracking-[-0.03em] text-slate-950">
        {title}
      </h3>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function InfoBox({ title, text, tone }: { title: string; text: string; tone: "red" | "green" }) {
  const styles =
    tone === "red"
      ? "border-red-100 bg-red-50 text-red-500"
      : "border-emerald-100 bg-emerald-50 text-emerald-600";

  return (
    <div className={`rounded-2xl border p-5 ${styles}`}>
      <p className="text-xs font-black uppercase tracking-[0.2em]">{title}</p>
      <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
        {text}
      </p>
    </div>
  );
}

function DataTable({
  title,
  subtitle,
  rows,
}: {
  title: string;
  subtitle?: string;
  rows: Record<string, string | number>[];
}) {
  if (!rows || rows.length === 0) return null;

  const headers = Object.keys(rows[0]);

  return (
    <section className="min-w-0 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.05)] sm:rounded-[2rem]">
      <div className="border-b border-slate-100 p-5 sm:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-600">
          {title}
        </p>
        {subtitle && (
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">
            {subtitle}
          </p>
        )}
      </div>

      {/* Mobile view cards */}
      <div className="block space-y-4 bg-slate-50/50 p-5 sm:hidden">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="w-fit rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-bold text-violet-600">
              Entry #{rowIndex + 1}
            </div>
            {headers.map((header, valIndex) => (
              <div key={header} className="flex flex-col gap-1 border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  {header.replace(/([A-Z])/g, " $1")}
                </span>
                <span className={`text-sm ${valIndex === 0 ? "font-black text-slate-950" : "font-medium text-slate-600"}`}>
                  {String(row[header])}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Desktop view Table */}
      <div className="hidden w-full overflow-x-auto sm:block">
        <table className="w-full min-w-[620px] border-collapse text-left">
          <thead className="bg-slate-950 text-white">
            <tr>
              {headers.map((header) => (
                <th key={header} className="whitespace-nowrap px-4 py-4 text-[11px] font-black uppercase tracking-[0.16em] sm:px-5 sm:text-xs">
                  {header.replace(/([A-Z])/g, " $1")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-slate-100">
                {headers.map((header, valueIndex) => (
                  <td key={header} className={`px-4 py-4 text-sm leading-6 sm:px-5 ${valueIndex === 0 ? "font-black text-slate-950" : "font-medium text-slate-600"}`}>
                    {String(row[header])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}