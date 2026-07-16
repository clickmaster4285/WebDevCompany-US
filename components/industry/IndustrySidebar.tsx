"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  DollarSign,
  Clock,
  Shield,
  CheckCircle,
  ArrowRight,
  Menu,
} from "lucide-react";

interface IndustrySidebarProps {
  sections: Array<{
    id: string;
    label: string;
  }>;
  pricing: {
    range: string;
    note: string;
  };
}

export function IndustrySidebar({ sections, pricing }: IndustrySidebarProps) {
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= scrollPos && el.offsetTop + el.offsetHeight > scrollPos) {
          setActiveSection(section.id);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileOpen(false);
    }
  };

  return (
    <div className="space-y-5 md:space-y-6">
      {/* Pricing Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-surface-1/50 rounded-2xl p-5 md:p-6 border border-border hover:border-violet/20 transition-colors duration-300"
      >
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-9 h-9 rounded-lg bg-violet/10 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-violet" />
          </div>
          <h3 className="text-sm font-semibold text-ink">Investment Range</h3>
        </div>
        <div className="text-2xl md:text-3xl font-bold text-ink mb-1.5">{pricing.range}</div>
        <p className="text-sm text-ink-mute mb-5">{pricing.note}</p>
        <Link
          href="/contact"
          className="group w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-violet hover:bg-violet/90 text-white text-sm font-medium rounded-xl transition-all duration-300 active:scale-[0.98]"
        >
          Get a Custom Quote
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </motion.div>

      {/* Quick Links - Desktop */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="hidden md:block bg-surface-1/50 rounded-2xl p-5 md:p-6 border border-border"
      >
        <h3 className="text-sm font-semibold text-ink mb-4">On This Page</h3>
        <nav className="space-y-1">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full flex items-center gap-2 text-left text-sm px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "text-violet bg-violet/10 font-medium"
                    : "text-ink-mute hover:text-violet hover:bg-surface-1/70"
                }`}
              >
                <ChevronRight
                  className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${
                    isActive ? "text-violet translate-x-0.5" : "text-ink-mute/50"
                  }`}
                />
                {section.label}
              </button>
            );
          })}
        </nav>
      </motion.div>

      {/* Mobile Quick Links Toggle */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex items-center justify-between bg-surface-1/50 rounded-xl p-4 border border-border text-sm font-medium text-ink"
        >
          <span className="flex items-center gap-2">
            <Menu className="w-4 h-4 text-ink-mute" />
            On This Page
          </span>
          <ChevronRight
            className={`w-4 h-4 text-ink-mute transition-transform duration-200 ${
              mobileOpen ? "rotate-90" : ""
            }`}
          />
        </button>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-2 bg-surface-1/50 rounded-xl p-3 border border-border space-y-1"
          >
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="w-full text-left text-sm px-3 py-2 rounded-lg text-ink-mute hover:text-violet hover:bg-surface-1/70 transition-all"
              >
                {section.label}
              </button>
            ))}
          </motion.nav>
        )}
      </div>

      {/* Trust Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="bg-surface-1/50 rounded-2xl p-5 md:p-6 border border-border"
      >
        <h3 className="text-sm font-semibold text-ink mb-4">Why Choose Us</h3>
        <div className="space-y-3">
          {[
            { icon: CheckCircle, text: "Industry-specific expertise", color: "text-emerald-400" },
            { icon: Shield, text: "Compliance & security aware", color: "text-violet" },
            { icon: Clock, text: "On-time delivery", color: "text-blue-400" },
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-3 group">
              <div
                className={`w-8 h-8 rounded-lg bg-surface-1 flex items-center justify-center ${badge.color} group-hover:scale-110 transition-transform`}
              >
                <badge.icon className="w-4 h-4" />
              </div>
              <span className="text-sm text-ink-soft group-hover:text-ink transition-colors">
                {badge.text}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}