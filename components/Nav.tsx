"use client";

import { technologies } from "@/data/technologies";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image"; // 👈 added
import {
  ChevronDown,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { Dropdown, DropdownSection, DropdownItem } from "@/components/ui/Dropdown";
import { serviceData } from "@/data/services";
import { caseStudies } from "@/data/case-studies";
import { blogs } from "@/data/blogs";
import { faqPages } from "@/data/faq-pages";
import { industriesData } from "@/data/industries";
import { testimonials } from "@/data/testimonials";

const serviceIcons: Record<string, string> = {
  "web-development-services": "🌐",
  "enterprise-web-development": "🏢",
  "saas-development": "☁️",
  "ecommerce-development": "🛒",
  "shopify-development": "🛍️",
  "wordpress-development": "📝",
  "web-design-services": "🎨",
  "custom-web-development": "⚙️",
  "web-application-development": "📱",
  "shopify-plus-development": "💎",
  "woocommerce-development": "🛒",
  "magento-development": "🏪",
  "headless-commerce-development": "🧩",
  "cms-development": "📰",
  "ai-web-development": "🤖",
  "ai-chatbot-development": "💬",
  "api-development": "🔌",
  "website-redesign-services": "🔄",
  "website-speed-optimization": "⚡",
  "website-maintenance-services": "🔧",
  "full-stack-development": "🖥️",
};

const allServices = Object.keys(serviceData).map((slug) => ({
  label: serviceData[slug].title,
  href: `/${slug}`,
  icon: serviceIcons[slug],
}));

const serviceCategories: DropdownSection[] = [
  {
    title: "All Services",
    href: "/services",
    description: "",
    items: allServices,
  },
];

const resourceCategories: DropdownSection[] = [
  {
    title: "Case Studies",
    href: "/case-studies",
    description: "Real client projects, outcomes and success stories.",
    items: caseStudies.slice(0, 2).map((study) => ({
      label: study.title,
      href: `/case-studies/${study.slug}`,
      tag: study.category,
      icon: study.icon,
      description: study.description,
    })),
  },
  {
    title: "Blogs",
    href: "/blogs",
    description: "Latest insights, ideas, updates and industry articles.",
    items: blogs.slice(0, 2).map((blog) => ({
      label: blog.title,
      href: `/blogs/${blog.slug}`,
      tag: blog.category || "Insight",
      icon: "✍️",
      description: blog.excerpt || "",
    })),
  },
  {
    title: "FAQs",
    href: "/faqs",
    description: "Common questions about our process and services.",
    items: faqPages.slice(0, 2).map((faq) => ({
      label:
        faq.page.title.length > 60
          ? `${faq.page.title.slice(0, 60)}...`
          : faq.page.title,
      href: `/faqs/${faq.slug}`,
      tag: "FAQ",
      icon: "❓",
      description: `${faq.aboveTheFold.directAnswer.slice(0, 80)}...`,
    })),
  },
  {
    title: "Testimonials",
    href: "/testimonials",
    description: "Client feedback and stories from successful projects.",
    items: testimonials.slice(0, 2).map((testimonial) => ({
      label: testimonial.name,
      href: `/testimonials#${testimonial.name
        .toLowerCase()
        .replace(/\s+/g, "-")}`,
      tag: testimonial.industry || "Client",
      icon: "⭐",
      description: `${testimonial.description.slice(0, 80)}...`,
    })),
  },
];

// ── Split Dropdown: group technologies by parent-child ──
const parentTechnologies = technologies.filter((t) => !t.parentId);

// Collect children per parent technology
const childrenByParentId = new Map<number, (typeof technologies)[number][]>();
for (const tech of technologies) {
  if (tech.parentId) {
    const existing = childrenByParentId.get(tech.parentId) || [];
    existing.push(tech);
    childrenByParentId.set(tech.parentId, existing);
  }
}

const technologiesCategories: DropdownSection[] = [];

// Create a section per parent that has sub-pages
for (const parent of parentTechnologies) {
  const children = childrenByParentId.get(parent.id) || [];
  if (children.length > 0) {
    technologiesCategories.push({
      title: parent.title,
      href: `/technologies/${parent.slug}`,
      description: parent.excerpt.slice(0, 80) + (parent.excerpt.length > 80 ? "…" : ""),
      items: children.map((child) => ({
        label: child.title,
        href: `/technologies/${child.slug}`,
        tag: child.category,
        icon: parent.icon || "⚙️",
        description: child.excerpt,
      })),
    });
  }
}

// Add "All Technologies" section for standalone technologies and full overview
const standaloneTechs = parentTechnologies.filter(
  (p) => (childrenByParentId.get(p.id) || []).length === 0
);
// Also include standalone + a representative sample of sub-pages for discoverability
const allTechItems: DropdownItem[] = standaloneTechs.map((tech) => ({
  label: tech.title,
  href: `/technologies/${tech.slug}`,
  tag: tech.category,
  icon: tech.icon || "⚙️",
  description: tech.excerpt,
}));

if (allTechItems.length > 0) {
  technologiesCategories.push({
    title: "All Technologies",
    href: "/technologies",
    description: "Browse every technology, framework and platform we use.",
    items: allTechItems,
  });
}

const industriesIcons: Record<string, string> = {
  "healthcare-web-development": "🏥",
  "law-firm-web-development": "⚖️",
  "real-estate-web-development": "🏠",
  "fintech-web-development": "💰",
  "saas-web-development": "💻",
  "manufacturing-web-development": "🏭",
  "ecommerce-web-development": "🛒",
  "hospitality-web-development": "🏨",
  "education-web-development": "📚",
  "dental-web-development": "🦷",
  "construction-web-development": "🔨",
  "nonprofit-web-development": "🤝",
};

const industriesSlugs = [
  "healthcare-web-development",
  "law-firm-web-development",
  "real-estate-web-development",
  "fintech-web-development",
  "saas-web-development",
  "manufacturing-web-development",
  "ecommerce-web-development",
  "hospitality-web-development",
  "education-web-development",
  "dental-web-development",
  "construction-web-development",
  "nonprofit-web-development",
];

const industriesCategories: DropdownSection[] = [
  {
    title: "Industries",
    href: "/industries",
    description: "Industry-specific web development solutions",
    items: industriesSlugs.map((slug) => ({
      label: industriesData[slug].title,
      href: `/industries/${slug}`,
      icon: industriesIcons[slug],
    })),
  },
];

function DropdownTrigger({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-violet">
      {label}
      <ChevronDown className="ml-1 h-4 w-4" />
    </button>
  );
}

const mobileLinks = [
  { label: "Solutions", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Resources", href: "/blogs" },
  { label: "Technologies", href: "/technologies" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "FAQs", href: "/faqs" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-300 ${
        scrolled ? "py-3" : "py-4"
      }`}
    >
      {/* 👇 width changed: 97vw on mobile, 90vw on md+ */}
      <div className="layout-container px-4 sm:px-6 md:px-10">
        <div className="flex items-center justify-between rounded-full border border-slate-200 bg-white/95 px-4 py-3 shadow-[0_14px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-950"
            onClick={() => setMobileOpen(false)}
          >
            {/* 👇 Logo image from /public folder */}
            <Image
              src="/logo.webp" // ⚠️ Replace with your actual file name, e.g. /logo.svg, /logo.webp
              alt="ClickMasters Logo"
              width={256}
              height={51}
              priority
              className="h-8 w-auto object-contain"
            />
          </Link>

          <nav className="hidden items-center gap-1 text-sm md:flex">
            <Link
              href="/"
              className="rounded-full px-4 py-2 font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-violet"
            >
              Solutions
            </Link>

            <Dropdown
              trigger={<DropdownTrigger label="Services" />}
              sections={serviceCategories}
              variant="links"
              layout="simple-grid"
              width="w-[600px]"
              showViewAll={false}
              showSidebar={false}
            />

            <Dropdown
              trigger={<DropdownTrigger label="Resources" />}
              sections={resourceCategories}
              variant="cards"
              width="w-[980px]"
              showViewAll={true}
              showSidebar={true}
            />

            <Dropdown
              trigger={<DropdownTrigger label="Technologies" />}
              sections={technologiesCategories}
              variant="links"
              layout="simple-grid"
              width="w-[760px]"
              showViewAll={true}
              showSidebar={true}
            />

            <Dropdown
              trigger={<DropdownTrigger label="Industries" />}
              sections={industriesCategories}
              variant="links"
              layout="simple-grid"
              width="w-[580px]"
              showViewAll={true}
              showSidebar={false}
            />

            <Link
              href="/about"
              className="rounded-full px-4 py-2 font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-violet"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="rounded-full px-4 py-2 font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-violet"
            >
              Contact
            </Link>
          </nav>

          <div className="hidden md:block">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet"
            >
              <span>Start a project</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-950 transition hover:bg-slate-100 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="mt-3 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-[0_20px_70px_rgba(15,23,42,0.14)] md:hidden">
            <div className="grid gap-2">
              {mobileLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:text-violet"
                >
                  {link.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-violet"
            >
              Start a project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}