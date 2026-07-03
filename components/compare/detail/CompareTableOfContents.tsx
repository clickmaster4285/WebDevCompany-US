"use client";

import { useEffect, useRef, useState } from "react";
import { createCompareSectionId } from "./createCompareSectionId";

type CompareTableOfContentsProps = {
  sections: {
    heading: string;
  }[];
};

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
    "vs",
    "versus",
  ]);

  const words = text
    .replace(/[^\w\s-]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => !stopWords.has(word.toLowerCase()));

  if (words.length >= 2) return words.slice(0, 2).join(" ");
  if (words.length === 1) return words[0];

  return text.split(/\s+/).slice(0, 2).join(" ");
}

export function CompareTableOfContents({
  sections,
}: CompareTableOfContentsProps) {
  const [activeId, setActiveId] = useState("");
  const isManualScrolling = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const ids = sections.map((section) =>
      createCompareSectionId(section.heading)
    );

    const handleScroll = () => {
      if (isManualScrolling.current) return;

      let currentId = ids[0] || "";

      for (const id of ids) {
        const element = document.getElementById(id);
        if (!element) continue;

        const rect = element.getBoundingClientRect();

        if (rect.top <= 130) {
          currentId = id;
        }
      }

      setActiveId(currentId);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const handleClick = (heading: string) => {
    const id = createCompareSectionId(heading);
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
      <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-[1.35rem] border border-slate-200 bg-white/90 p-3.5 shadow-[0_18px_60px_rgba(15,23,42,0.07)] backdrop-blur-xl">
        <div className="flex items-center justify-between px-2">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
            On this page
          </p>

          <span className="h-1.5 w-1.5 rounded-full bg-violet shadow-[0_0_16px_rgba(124,92,255,0.8)]" />
        </div>

        <nav className="relative mt-4 space-y-1 border-l border-slate-200 pl-3">
          {sections.map((section, index) => {
            const id = createCompareSectionId(section.heading);
            const isActive = activeId === id;
            const shortHeading = getShortHeading(section.heading);

            return (
              <button
                key={`${section.heading}-${index}`}
                type="button"
                title={section.heading}
                onClick={() => handleClick(section.heading)}
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
      </div>
    </aside>
  );
}