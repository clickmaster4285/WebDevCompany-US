// components/services/ServicesDropdown.tsx

"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Globe } from "lucide-react";

const services = [
  { slug: "web-development-services", title: "Web Development Services", isPillar: true },
  { slug: "enterprise-web-development", title: "Enterprise Web Development" },
  { slug: "saas-development", title: "SaaS Development" },
  { slug: "ecommerce-development", title: "eCommerce Development" },
  { slug: "shopify-development", title: "Shopify Development" },
  { slug: "wordpress-development", title: "WordPress Development" },
  { slug: "web-design-services", title: "Web Design Services (UI/UX)" },
  { slug: "custom-web-development", title: "Custom Web Development" },
  { slug: "web-application-development", title: "Web Application Development" },
];

export default function ServicesDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-white/5 hover:text-ink"
        aria-expanded={open}
        aria-haspopup="true"
      >
        Services
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900 shadow-2xl"
          >
            <div className="border-b border-zinc-800 px-4 py-3">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                <Globe className="h-3.5 w-3.5" />
                Our Services
              </span>
            </div>

            <div className="py-2">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className={`group flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-zinc-800 ${
                    service.isPillar
                      ? "bg-zinc-800/50 font-semibold text-primary"
                      : "pl-8 text-zinc-300 hover:text-white"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${
                      service.isPillar
                        ? "bg-primary"
                        : "bg-zinc-600 group-hover:bg-primary"
                    }`}
                  />
                  {service.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}