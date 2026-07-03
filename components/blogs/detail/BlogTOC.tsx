"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type BlogTOCProps = {
  headings: string[];
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getShortHeading(text: string) {
  const stopWords = new Set([
    "the",
    "a",
    "an",
    "and",
    "or",
    "to",
    "of",
    "for",
    "in",
    "on",
    "with",
    "by",
    "from",
    "that",
    "this",
    "your",
    "you",
    "how",
    "what",
    "why",
    "when",
    "which",
    "is",
    "are",
    "be",
    "can",
    "should",
  ]);

  const words = text
    .replace(/[^\w\s-]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => !stopWords.has(word.toLowerCase()));

  if (words.length >= 2) {
    return words.slice(0, 2).join(" ");
  }

  if (words.length === 1) {
    return words[0];
  }

  return text.split(/\s+/).slice(0, 2).join(" ");
}

export function BlogTOC({ headings }: BlogTOCProps) {
  const [activeId, setActiveId] = useState("");
  const isManualScrolling = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const headingElements = headings
      .map((heading) => document.getElementById(slugify(heading)))
      .filter(Boolean) as HTMLElement[];

    if (!headingElements.length) return;

    if (!activeId) {
      setActiveId(headingElements[0].id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScrolling.current) return;

        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );

        if (visibleEntries[0]?.target?.id) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: 0.15,
      }
    );

    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [headings, activeId]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    isManualScrolling.current = true;
    setActiveId(id);

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    const yOffset = -120;
    const y =
      element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });

    scrollTimeout.current = setTimeout(() => {
      isManualScrolling.current = false;
    }, 900);
  };

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-20 rounded-[1.35rem] border border-slate-200 bg-white/90 p-3.5 shadow-[0_18px_60px_rgba(15,23,42,0.07)] backdrop-blur-xl">
        <div className="flex items-center justify-between px-2">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
            Contents
          </p>

          <span className="h-1.5 w-1.5 rounded-full bg-violet shadow-[0_0_16px_rgba(124,92,255,0.8)]" />
        </div>

        <nav className="relative mt-4 space-y-1 border-l border-slate-200 pl-3">
          {headings.map((heading, index) => {
            const id = slugify(heading);
            const isActive = activeId === id;
            const shortHeading = getShortHeading(heading);

            return (
              <button
                key={heading}
                type="button"
                title={heading}
                onClick={() => scrollToHeading(id)}
                className={`group relative flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left text-[13px] transition-colors duration-200 ${
                  isActive
                    ? "bg-violet/10 text-violet"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                <span
                  className={`absolute -left-[13px] top-1/2 h-7 w-0.5 -translate-y-1/2 rounded-full bg-violet shadow-[0_0_14px_rgba(124,92,255,0.75)] transition-opacity duration-200 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                <span
                  className={`flex h-4 w-5 shrink-0 items-center justify-center font-mono text-[10px] font-black transition-colors duration-200 ${
                    isActive ? "text-violet" : "text-slate-300"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="line-clamp-1 font-semibold leading-5">
                  {shortHeading}
                </span>
              </button>
            );
          })}
        </nav>

        <Link
          href="/#contact"
          className="mt-4 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-[13px] font-semibold text-slate-600 transition hover:border-violet hover:text-violet"
        >
          <span>Need help?</span>
          <span>→</span>
        </Link>
      </div>
    </aside>
  );
}