"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useGsap } from "@/lib/gsap";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronRight, Code2, ShoppingBag, Palette, Zap, Layers } from "lucide-react";
import type { Variants } from "framer-motion";

// Import images (keep your existing imports)
import devImg from "@/public/assets/service-dev.jpg";
import designImg from "@/public/assets/service-design.jpg";
import motionImg from "@/public/assets/service-motion.jpg";
import saasImg from "@/public/assets/work-saas.jpg";
import ecomImg from "@/public/assets/work-ecom.jpg";
import corpImg from "@/public/assets/work-corp.jpg";

// Service categories with full descriptions
const serviceCategories = [
  {
    id: "core",
    icon: Code2,
    title: "Core Development",
    code: "DEV",
    services: [
      {
        name: "Web Development Services",
        slug: "web-development-services",
        desc: "Full stack engineering using React, TypeScript, and modern hosting, built to handle real traffic and grow with you.",
      },
      {
        name: "Custom Website Development",
        slug: "custom-web-development",
        desc: "A website built around your business, not a template. Good for companies that have outgrown off the shelf tools.",
      },
      {
        name: "Enterprise Web Development",
        slug: "enterprise-web-development",
        desc: "Secure, reliable builds for larger organizations with complex needs and higher traffic.",
      },
      {
        name: "Full Stack Development",
        slug: "full-stack-development",
        desc: "We handle the whole picture, from the database to the live site, with ongoing monitoring and support.",
      },
      {
        name: "Web Application Development",
        slug: "web-application-development",
        desc: "Custom dashboards, internal tools, and AI powered features built as web apps.",
      },
      {
        name: "API Development",
        slug: "api-development",
        desc: "We connect your website to the other tools your business already uses, in a way that is easy to maintain.",
      },
    ],
  },
  {
    id: "ecommerce",
    icon: ShoppingBag,
    title: "eCommerce and CMS",
    code: "COM",
    services: [
      {
        name: "eCommerce Development",
        slug: "ecommerce-development",
        desc: "Online stores designed to convert visitors into customers, built on fast, flexible commerce platforms.",
      },
      {
        name: "Shopify Development",
        slug: "shopify-development",
        desc: "Custom Shopify stores designed for speed and a smooth checkout experience.",
      },
      {
        name: "Shopify Plus Development",
        slug: "shopify-plus-development",
        desc: "Larger, enterprise level Shopify builds for high volume stores.",
      },
      {
        name: "WooCommerce Development",
        slug: "woocommerce-development",
        desc: "Flexible online stores built on WordPress, great for growing businesses.",
      },
      {
        name: "Magento Development",
        slug: "magento-development",
        desc: "Solid builds for stores with large or complex product catalogs.",
      },
      {
        name: "WordPress Development",
        slug: "wordpress-development",
        desc: "Custom WordPress sites for businesses that want an easy to manage, content focused website.",
      },
      {
        name: "CMS Development",
        slug: "cms-development",
        desc: "We set up content systems like Sanity, Contentful, or Strapi so your team can update the site without needing a developer.",
      },
      {
        name: "Headless Commerce Development",
        slug: "headless-commerce-development",
        desc: "A setup that separates your store's design from its backend, giving you more speed and more flexibility.",
      },
    ],
  },
  {
    id: "design",
    icon: Palette,
    title: "Design and AI",
    code: "AI",
    services: [
      {
        name: "Web Design Services (UI/UX)",
        slug: "web-design-services",
        desc: "Clean, easy to use interfaces that look great and make sense to your visitors.",
      },
      {
        name: "SaaS Development",
        slug: "saas-development",
        desc: "Design and development for software products, from the first version to a fully scaled platform.",
      },
      {
        name: "AI Web Development",
        slug: "ai-web-development",
        desc: "AI features built right into your website or web app, where they actually help your users.",
      },
      {
        name: "AI Chatbot Development",
        slug: "ai-chatbot-development",
        desc: "A chatbot built for your site that can support customers and help with sales.",
      },
    ],
  },
  {
    id: "optimization",
    icon: Zap,
    title: "Optimization and Support",
    code: "OPS",
    services: [
      {
        name: "Website Redesign Services",
        slug: "website-redesign-services",
        desc: "A fresh, modern site that keeps the search rankings and traffic your old one already earned.",
      },
      {
        name: "Website Speed Optimization",
        slug: "website-speed-optimization",
        desc: "We make your site load faster, which helps both your visitors and your search rankings.",
      },
      {
        name: "Website Maintenance and Support",
        slug: "website-maintenance-services",
        desc: "Ongoing updates, monitoring, and support so your site keeps running smoothly after launch.",
      },
    ],
  },
];

// Featured services for the horizontal scroll (keep original 6)
const FEATURED_SERVICES = [
  { n: "01", title: "Web Development", img: devImg, desc: "Full-stack engineering with React, TypeScript and edge runtimes — built for scale.", metric: ["99", "Lighthouse"] },
  { n: "02", title: "UI / UX Design", img: designImg, desc: "Interface systems that balance editorial beauty with frictionless usability.", metric: ["+38%", "Conversion"] },
  { n: "03", title: "Web Applications", img: saasImg, desc: "Bespoke SaaS dashboards, internal tools and AI-enabled product surfaces.", metric: ["6w", "Avg. MVP"] },
  { n: "04", title: "E-Commerce", img: ecomImg, desc: "High-conversion storefronts with headless commerce architecture.", metric: ["3.2×", "AOV lift"] },
  { n: "05", title: "Performance", img: corpImg, desc: "Core Web Vitals, edge caching and rendering pipelines tuned to perfection.", metric: ["<200ms", "TTFB"] },
  { n: "06", title: "Motion & Interactive", img: motionImg, desc: "WebGL scenes, GSAP timelines and physics-based interactions.", metric: ["60fps", "Always"] },
];

// Blueprint grid backdrop — fine 16px grid + coarse 96px grid, tinted with the theme's primary color
const BLUEPRINT_GRID: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px),
    linear-gradient(to right, rgba(94,168,255,0.10) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(94,168,255,0.10) 1px, transparent 1px)
  `,
  backgroundSize: "16px 16px, 16px 16px, 96px 96px, 96px 96px",
  maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
  WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
};

// Four corner ticks, drafting-annotation style — sits over a `relative group` parent
function CornerMarks() {
  return (
    <>
      <span className="pointer-events-none absolute left-0 top-0 h-2.5 w-2.5 border-l border-t border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
      <span className="pointer-events-none absolute right-0 top-0 h-2.5 w-2.5 border-r border-t border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
    </>
  );
}

function ServiceCard({ service, index, code }: { service: any; index: number; code: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const spec = `${code}—${String(index + 1).padStart(3, "0")}`;

  // Different animation variants for each card - properly typed
  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95,
      rotateX: 10,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: { 
        duration: 0.6, 
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      className="group relative border border-white/10 bg-white/[0.02] p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <CornerMarks />
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      <Link href={`/${service.slug}`} className="block relative z-10">
        <div className="mb-3 flex items-center justify-between">
          <motion.span 
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/60"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ delay: index * 0.05 + 0.1 }}
          >
            {spec}
          </motion.span>
          <motion.span 
            className="h-1 w-1 rounded-full bg-white/20 transition-colors duration-300 group-hover:bg-primary"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: index * 0.05 + 0.15 }}
          />
        </div>
        
        <motion.h4 
          className="text-sm font-semibold leading-snug text-white transition-colors group-hover:text-primary"
          initial={{ opacity: 0, x: -5 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -5 }}
          transition={{ delay: index * 0.05 + 0.15 }}
        >
          {service.name}
        </motion.h4>
        
        <motion.p 
          className="mt-2 text-xs leading-relaxed text-white/45 line-clamp-2"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: index * 0.05 + 0.2 }}
        >
          {service.desc}
        </motion.p>
        
        <motion.div 
          className="mt-4 flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-white/40 transition-colors group-hover:text-primary"
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ delay: index * 0.05 + 0.25 }}
        >
          <span className="h-px w-3 bg-white/30 transition-all duration-300 group-hover:w-6 group-hover:bg-primary" />
          <span>Open spec</span>
          <ChevronRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
        </motion.div>
      </Link>
    </motion.div>
  );
}

export function ServicesSection() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(serviceCategories[0].id);

  // Horizontal scroll for featured services
  useEffect(() => {
    const { gsap, ScrollTrigger } = useGsap();
    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia("(min-width: 900px)").matches;
      if (!isDesktop || !track.current || !root.current) return;
      const t = track.current;
      const distance = () => t.scrollWidth - window.innerWidth;
      gsap.to(t, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const tabs = serviceCategories.map((c) => ({ 
    id: c.id, 
    title: c.title, 
    icon: c.icon, 
    code: c.code 
  }));

  const getFilteredServices = () => {
    const category = serviceCategories.find((cat) => cat.id === activeTab);
    return category ? category.services : [];
  };

  const activeCategory = serviceCategories.find((c) => c.id === activeTab);
  const filteredServices = getFilteredServices();
  const activeCode = activeCategory ? activeCategory.code : "DEV";

  return (
    <section ref={root} id="services" className="relative overflow-hidden py-10 md:py-20">
      {/* Blueprint grid backdrop */}
      <div className="pointer-events-none absolute inset-0" style={BLUEPRINT_GRID} aria-hidden="true" />

      <div className="layout-container relative px-4 sm:px-6 md:px-10">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-primary/70">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" />
            <span>Service Index</span>
            <span className="text-white/30">/ 04 categories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Our Web Development Services
          </h2>
          <p className="text-base md:text-lg text-white/60 max-w-3xl">
            Here is a look at everything we offer, from custom web development to online stores and AI powered tools.
          </p>
        </div>

        {/* Featured Services - Horizontal Scroll */}
        <div className="mb-16">
          <div className="mb-6 flex items-center gap-3">
            <h3 className="text-xl font-semibold text-white/90">Featured Services</h3>
            <span className="h-px flex-1 bg-white/10" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
              Scroll to pan →
            </span>
          </div>
          <div ref={track} className="flex w-max flex-row gap-6 sm:gap-8">
            {FEATURED_SERVICES.map((s) => (
              <article
                key={s.title}
                className="group relative flex h-[50vh] sm:h-[60vh] w-[85vw] sm:w-[80vw] max-w-[900px] shrink-0 overflow-hidden border border-white/10 bg-surface-1"
              >
                {/* ruler ticks along the top edge */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 z-20 h-3 opacity-40"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to right, rgba(94,168,255,0.6) 0, rgba(94,168,255,0.6) 1px, transparent 1px, transparent 24px)",
                  }}
                  aria-hidden="true"
                />
                <Image
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-35 transition-transform duration-700 group-hover:scale-105"
                  fill
                />
                <div className="absolute inset-0" style={BLUEPRINT_GRID} aria-hidden="true" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-transparent to-background/40" />

                <div className="relative z-10 flex w-full flex-col justify-between p-6 sm:p-8 md:p-10">
                  <div className="flex items-start justify-between font-mono text-xs uppercase tracking-[0.25em]">
                    <span className="text-primary/80">Part // {s.n}</span>
                    <span className="text-white/30">Service Spec</span>
                  </div>
                  <div className="max-w-2xl">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                      {s.title}
                    </h3>
                    <p className="mt-4 max-w-lg text-sm sm:text-base text-white/55">{s.desc}</p>
                    <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
                      <div className="border-l-2 border-primary/60 pl-3">
                        <div className="font-mono text-2xl sm:text-3xl font-bold text-primary">{s.metric[0]}</div>
                        <div className="mt-1 text-[10px] uppercase tracking-widest text-white/40">{s.metric[1]}</div>
                      </div>
                      <Link
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-white/60 transition-colors hover:text-primary"
                        href="/contact"
                      >
                        [ Discuss this service ]
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
            <div className="w-8 sm:w-12 shrink-0" />
          </div>
        </div>

        {/* All Services - Grid Layout */}
        <div>
          <div className="mb-6 flex items-center gap-3">
            <h3 className="text-xl font-semibold text-white/90">All Services</h3>
            <span className="h-px flex-1 bg-white/10" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
              {filteredServices.length} results
            </span>
          </div>

          {/* Category Tabs — layer-toggle style with a sliding indicator */}
          <div className="relative mb-8 flex flex-wrap gap-1 border border-white/10 bg-white/[0.02] p-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {isActive && (
                    <motion.span
                      layoutId="tab-indicator"
                      className="absolute inset-0 bg-primary"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <tab.icon
                    className={`relative z-10 h-4 w-4 transition-colors ${
                      isActive ? "text-white" : "text-white/50"
                    }`}
                  />
                  <span className={`relative z-10 transition-colors ${isActive ? "text-white" : "text-white/60"}`}>
                    {tab.title}
                  </span>
                  <span
                    className={`relative z-10 font-mono text-[10px] tracking-wider transition-colors ${
                      isActive ? "text-white/70" : "text-white/25"
                    }`}
                  >
                    {tab.code}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Services Grid with Enhanced Animations */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {filteredServices.map((service, index) => (
                <ServiceCard key={service.slug} service={service} index={index} code={activeCode} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}