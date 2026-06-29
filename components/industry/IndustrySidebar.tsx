"use client";

import Link from "next/link";
import { ChevronRight, DollarSign, Clock, Shield, CheckCircle } from "lucide-react";

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
  return (
    <div className="space-y-6">
      {/* Pricing Card */}
      <div className="bg-surface-1/50 rounded-xl p-6 border border-border">
        <div className="flex items-center gap-2 mb-3">
          <DollarSign className="w-5 h-5 text-violet" />
          <h3 className="text-sm font-semibold text-ink">Investment Range</h3>
        </div>
        <div className="text-2xl font-bold text-ink mb-1">{pricing.range}</div>
        <p className="text-sm text-ink-mute">{pricing.note}</p>
        <Link
          href="/contact"
          className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-violet hover:bg-violet/90 text-white text-sm font-medium rounded-lg transition-all duration-300"
        >
          Get a Custom Quote
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Quick Links */}
      <div className="bg-surface-1/50 rounded-xl p-6 border border-border">
        <h3 className="text-sm font-semibold text-ink mb-4">On This Page</h3>
        <nav className="space-y-2">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="block text-sm text-ink-mute hover:text-violet transition-colors duration-200 hover:pl-2"
            >
              {section.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Trust Badges */}
      <div className="bg-surface-1/50 rounded-xl p-6 border border-border">
        <h3 className="text-sm font-semibold text-ink mb-4">Why Choose Us</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="text-sm text-ink-soft">Industry-specific expertise</span>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-4 h-4 text-violet flex-shrink-0" />
            <span className="text-sm text-ink-soft">Compliance & security aware</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span className="text-sm text-ink-soft">On-time delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
}
