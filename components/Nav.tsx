"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { Dropdown, DropdownSection, DropdownItem } from "@/components/ui/Dropdown";

// ⚡ Lightweight nav data (~14.5KB) instead of importing 7 large data files (~1MB total)
import navData from "@/data/nav-data.json";

const serviceCategories: DropdownSection[] = [
  {
    title: "All Services",
    href: "/services",
    description: "Browse every web development, design, and AI solution we offer.",
    items: [
      // Core Development
      { label: "Web Development Services", href: "/services/web-development-services", icon: "🌐" },
      { label: "Enterprise Web Development", href: "/services/enterprise-web-development", icon: "🏢" },
      { label: "Custom Web Development", href: "/services/custom-web-development", icon: "⚙️" },
      { label: "Web Application Development", href: "/services/web-application-development", icon: "📱" },
      { label: "Full Stack Development", href: "/services/full-stack-development", icon: "🖥️" },
      
      // Platforms & eCommerce
      { label: "WordPress Development", href: "/services/wordpress-development", icon: "📝" },
      { label: "Shopify Development", href: "/services/shopify-development", icon: "🛍️" },
      { label: "Shopify Plus Development", href: "/services/shopify-plus-development", icon: "💎" },
      { label: "WooCommerce Development", href: "/services/woocommerce-development", icon: "🛒" },
      { label: "Magento Development", href: "/services/magento-development", icon: "🏪" },
      { label: "eCommerce Development", href: "/services/ecommerce-development", icon: "🛒" },
      { label: "Headless Commerce Development", href: "/services/headless-commerce-development", icon: "🧩" },
      { label: "CMS Development", href: "/services/cms-development", icon: "📰" },
      
      // Design, AI & Support
      { label: "Web Design Services (UI/UX)", href: "/services/web-design-services", icon: "🎨" },
      { label: "Website Redesign Services", href: "/services/website-redesign-services", icon: "🔄" },
      { label: "AI Web Development", href: "/services/ai-web-development", icon: "🤖" },
      { label: "AI Chatbot Development", href: "/services/ai-chatbot-development", icon: "💬" },
      { label: "API Development", href: "/services/api-development", icon: "🔌" },
      { label: "Website Speed Optimization", href: "/services/website-speed-optimization", icon: "⚡" },
      { label: "Website Maintenance & Support", href: "/services/website-maintenance-services", icon: "🔧" },
    ],
  },
];

const resourceCategories: DropdownSection[] = [
  {
    title: "Case Studies",
    href: "/case-studies",
    description: "Real client projects, outcomes and success stories.",
    items: navData.caseStudies.slice(0, 2).map((study) => ({
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
    items: navData.blogs.slice(0, 2).map((blog) => ({
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
    items: navData.faqs.slice(0, 2).map((faq) => ({
      label:
        faq.title.length > 60
          ? `${faq.title.slice(0, 60)}...`
          : faq.title,
      href: `/faqs/${faq.slug}`,
      tag: "FAQ",
      icon: "❓",
      description: `${faq.directAnswer.slice(0, 80)}...`,
    })),
  },
  {
    title: "Testimonials",
    href: "/testimonials",
    description: "Client feedback and stories from successful projects.",
    items: navData.testimonials.slice(0, 2).map((testimonial) => ({
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
const parentTechnologies = navData.technologies.filter((t) => !t.parentId);

// Collect children per parent technology
const childrenByParentId = new Map<number, typeof navData.technologies>();
for (const tech of navData.technologies) {
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
      description: (parent.excerpt || "").slice(0, 80) + ((parent.excerpt || "").length > 80 ? "…" : ""),
      items: children.map((child) => ({
        label: child.title,
        href: `/technologies/${child.slug}`,
        tag: child.category,
        icon: child.icon || parent.icon || "⚙️",
        description: child.excerpt,
      })),
    });
  }
}

// Add "All Technologies" section for standalone technologies
const standaloneTechs = parentTechnologies.filter(
  (p) => (childrenByParentId.get(p.id) || []).length === 0
);

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

// Build a lookup map for industries (slug -> title)
const industriesDataMap = Object.fromEntries(
  navData.industries.map((i) => [i.slug, { title: i.title }])
);

const industriesSlugs = navData.industries.map((i) => i.slug);

const industriesCategories: DropdownSection[] = [
  {
    title: "Industries",
    href: "/industries",
    description: "Industry-specific web development solutions",
    items: industriesSlugs.map((slug) => ({
      label: industriesDataMap[slug]?.title || slug,
      href: `/industries/${slug}`,
      icon: industriesIcons[slug],
    })),
  },
];

function DropdownTrigger({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-300 ease-out hover:bg-slate-100 hover:text-blue-600 hover:-translate-y-0.5 min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background">
      {label}
      <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 hover:rotate-180 hover:text-blue-600" />
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
      <div className="layout-container px-4 sm:px-6 md:px-10">
        <div className="flex items-center justify-between rounded-full border border-slate-200 bg-white/95 px-4 py-3 shadow-[0_14px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-950"
            onClick={() => setMobileOpen(false)}
          >
            <Image
              src="/logo.webp"
              alt="ClickMasters Logo"
              width={256}
              height={51}
              priority
              className="h-8 w-auto object-contain"
            />
          </Link>

          {/* Changed md:flex to lg:flex */}
          <nav className="hidden items-center gap-1 text-sm lg:flex">
            <Link
              href="/"
              className="rounded-full px-4 py-2 font-semibold text-slate-700 transition-all duration-300 ease-out hover:bg-slate-100 hover:text-blue-600 hover:-translate-y-0.5 min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
            >
              Solutions
            </Link>

            <Dropdown
              trigger={<DropdownTrigger label="Services" />}
              sections={serviceCategories}
              variant="links"
              layout="simple-grid"
              width="w-[760px] lg:w-[850px]"
              showViewAll={true} 
              showSidebar={false}
            />

            <Dropdown
              trigger={<DropdownTrigger label="Resources" />}
              sections={resourceCategories}
              variant="cards"
              width="w-[980px] lg:w-[1100px]"
              showViewAll={true}
              showSidebar={true}
            />

            <Dropdown
              trigger={<DropdownTrigger label="Technologies" />}
              sections={technologiesCategories}
              variant="links"
              layout="simple-grid"
              width="w-[760px] lg:w-[850px]"
              showViewAll={true}
              showSidebar={true}
            />

            <Dropdown
              trigger={<DropdownTrigger label="Industries" />}
              sections={industriesCategories}
              variant="links"
              layout="simple-grid"
              width="w-[580px] lg:w-[650px]"
              showViewAll={true}
              showSidebar={false}
            />

            <Link
              href="/about"
              className="rounded-full px-4 py-2 font-semibold text-slate-700 transition-all duration-300 ease-out hover:bg-slate-100 hover:text-blue-600 hover:-translate-y-0.5 min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="rounded-full px-4 py-2 font-semibold text-slate-700 transition-all duration-300 ease-out hover:bg-slate-100 hover:text-blue-600 hover:-translate-y-0.5 min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
            >
              Contact
            </Link>
          </nav>

          {/* Changed md:block to lg:block */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/25 min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
            >
              <span>Start a project</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-200" />
            </Link>
          </div>

          {/* Changed md:hidden to lg:hidden */}
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-950 transition-all duration-300 ease-out hover:bg-slate-100 hover:scale-110 lg:hidden focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Changed md:hidden to lg:hidden */}
        {mobileOpen && (
          <div className="mt-3 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-[0_20px_70px_rgba(15,23,42,0.14)] lg:hidden">
            <div className="grid gap-2">
              {mobileLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-4 text-sm font-bold text-slate-700 transition-all duration-300 ease-out hover:bg-slate-50 hover:text-blue-600 hover:-translate-y-0.5 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
                >
                  {link.label}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 hover:translate-x-1 hover:text-blue-600" />
                </Link>
              ))}
            </div>

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-4 text-sm font-black text-white transition-all duration-300 ease-out hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/25 hover:-translate-y-0.5 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
            >
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform duration-300 hover:translate-x-1 hover:text-blue-200" />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}