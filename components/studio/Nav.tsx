"use client";  // ← Add this at very top

import { useEffect, useState } from "react";
import ServicesDropdown from "@/components/services/ServicesDropdown";

// Placeholder for your resource categories (ensure this is defined)
const resourceCategories = [{ id: 1, name: "Example" }]; 

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeResource, setActiveResource] = useState(resourceCategories[0]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10">
        
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2 text-ink">
          <span className="text-sm font-semibold tracking-wide">
            ClickMasters<span className="text-violet">.</span>
          </span>
        </a>

        <nav
          className={`hidden items-center gap-1 rounded-full px-2 py-2 text-sm text-ink-soft md:flex transition-all duration-500 ${
            scrolled ? "glass" : "bg-transparent"
          }`}
        >
          {/* Studio */}
          <a
            href="#story"
            className="rounded-full px-4 py-2 transition-colors hover:bg-white/5 hover:text-ink"
          >
            Studio
          </a>

          {/* ✅ Services Dropdown — standalone, NOT inside <a> tag */}
          <ServicesDropdown />

          {/* Work */}
          <a
            href="#work"
            className="rounded-full px-4 py-2 transition-colors hover:bg-white/5 hover:text-ink"
          >
            Work
          </a>

          {/* Resources dropdown stays same */}
          <div className="group relative">
            {/* ... your existing resources dropdown code ... */}
          </div>

          {/* Process */}
          <a
            href="#process"
            className="rounded-full px-4 py-2 transition-colors hover:bg-white/5 hover:text-ink"
          >
            Process
          </a>

          {/* Stack */}
          <a
            href="#stack"
            className="rounded-full px-4 py-2 transition-colors hover:bg-white/5 hover:text-ink"
          >
            Stack
          </a>
        </nav>

        {/* CTA Button */}
        <a
          href="#contact"
          className="group relative inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
        >
          Start a project
          <span className="inline-block transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </a>
      </div>
    </header>
  );
}