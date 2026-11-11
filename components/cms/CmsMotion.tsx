"use client";

import { useEffect, useRef, type ReactNode } from "react";

// settings.motion for CMS sections. Server HTML is always fully visible
// (crawlers, no-JS, and the ERP editor, which edits the server HTML with
// scripts stripped). After hydration, only sections still below the fold are
// hidden and then revealed when they scroll into view.

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const FROM: Record<string, string> = {
  "fade-up": "translateY(32px)",
  "fade-down": "translateY(-32px)",
  "fade-left": "translateX(40px)",
  "fade-right": "translateX(-40px)",
  fade: "none",
  zoom: "scale(0.94)",
};

export function CmsMotion({
  motion,
  children,
}: {
  motion: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.style.opacity = "0";
    el.style.transform = FROM[motion] ?? FROM["fade-up"];

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        el.style.transition = `opacity 0.7s ${EASE}, transform 0.7s ${EASE}`;
        el.style.opacity = "";
        el.style.transform = "";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      el.style.opacity = "";
      el.style.transform = "";
      el.style.transition = "";
    };
  }, [motion]);

  return (
    <div ref={ref} data-cms-motion={motion}>
      {children}
    </div>
  );
}
