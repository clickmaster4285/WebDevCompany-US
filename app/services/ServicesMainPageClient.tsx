// app/(services)/ServicesMainPageClient.tsx
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronRight, Code2, ShoppingBag, Palette, Zap, Layers, Cpu, Database, Wrench, Plus } from "lucide-react";
import type { Variants } from "framer-motion";

// Blueprint grid backdrop
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

const serviceCategories = [
  {
    id: "core",
    icon: Code2,
    title: "Core Web Development",
    services: [
      { name: "Web Development Services", slug: "web-development-services" },
      { name: "Enterprise Web Development", slug: "enterprise-web-development" },
      { name: "Custom Web Development", slug: "custom-web-development" },
      { name: "Web Application Development", slug: "web-application-development" },
      { name: "Full Stack Development", slug: "full-stack-development" },
    ],
  },
  {
    id: "platform",
    icon: Layers,
    title: "Platform Specific",
    services: [
      { name: "WordPress Development", slug: "wordpress-development" },
      { name: "Shopify Development", slug: "shopify-development" },
      { name: "Shopify Plus Development", slug: "shopify-plus-development" },
      { name: "WooCommerce Development", slug: "woocommerce-development" },
      { name: "Magento Development", slug: "magento-development" },
    ],
  },
  {
    id: "ecommerce",
    icon: ShoppingBag,
    title: "eCommerce & Modern",
    services: [
      { name: "eCommerce Development", slug: "ecommerce-development" },
      { name: "Headless Commerce Development", slug: "headless-commerce-development" },
      { name: "CMS Development", slug: "cms-development" },
    ],
  },
  {
    id: "design",
    icon: Palette,
    title: "Design & UX",
    services: [
      { name: "Web Design Services (UI/UX)", slug: "web-design-services" },
      { name: "Website Redesign Services", slug: "website-redesign-services" },
    ],
  },
  {
    id: "ai",
    icon: Cpu,
    title: "AI Powered Solutions",
    services: [
      { name: "AI Web Development", slug: "ai-web-development" },
      { name: "AI Chatbot Development", slug: "ai-chatbot-development" },
    ],
  },
  {
    id: "api",
    icon: Database,
    title: "Integration & API",
    services: [{ name: "API Development", slug: "api-development" }],
  },
  {
    id: "support",
    icon: Wrench,
    title: "Performance & Support",
    services: [
      { name: "Website Speed Optimization", slug: "website-speed-optimization" },
      { name: "Website Maintenance & Support", slug: "website-maintenance-services" },
    ],
  },
];

const processSteps = [
  { num: "01", title: "Discovery and Strategy", desc: "We start by getting to know your business, your goals, your competitors, and what you actually need technically. This way, the plan we recommend is the right one for you, not just the one we're most familiar with." },
  { num: "02", title: "Design and Planning", desc: "Our team sketches out how users will move through your site and plans the technical structure before any real development starts. That way, the final product feels intentional instead of thrown together." },
  { num: "03", title: "Development and Testing", desc: "We build using whatever technology actually fits your project best, then test everything carefully across different devices and browsers before it ever goes live." },
  { num: "04", title: "Launch and Optimization", desc: "Once we launch, we keep a close eye on how everything performs and make quick adjustments in the days right after, so nothing slips through the cracks." },
  { num: "05", title: "Ongoing Support and Growth", desc: "Most of our client relationships don't end at launch. We stick around for maintenance, performance improvements, and new features as your business keeps changing and growing." },
];

const faqs = [
  { q: "What web development services does Clickmasters offer in the USA?", a: "We offer custom web development, enterprise web development, eCommerce development on platforms like Shopify, WooCommerce, and Magento, WordPress development, SaaS development, UI/UX design, AI web and chatbot development, API development, website redesigns, speed optimization, and ongoing maintenance and support for businesses all across the United States." },
  { q: "How do I choose the right web development service for my business?", a: "It really depends on where your business is right now. A new business usually starts with basic web development or a platform like WordPress or Shopify. A more established business often needs enterprise development, a redesign, faster performance, or ongoing maintenance. We offer free consultations to help you figure out what actually makes sense for you." },
  { q: "Does Clickmasters work with small businesses or only large companies?", a: "We work with businesses of every size across the USA, from startups building their very first website to large companies that need complex platforms and system integrations." },
  { q: "How much does a website cost in the USA?", a: "It really depends on how complex your project is, which platform you use, and which features you need. A simple business website costs a lot less than a custom application or a full scale online store. We give out custom quotes once we understand exactly what you're looking for." },
  { q: "Do you provide support after the website is launched?", a: "Yes. We offer maintenance and support plans that cover updates, security checks, backups, and technical help to keep your site running smoothly long after launch." },
  { q: "Can you improve my existing website instead of building a new one?", a: "Yes, that's actually a big part of what we do. A lot of our work involves redesigning, speeding up, or maintaining websites that already exist, rather than starting completely from scratch." },
  { q: "Do you build AI powered features for websites?", a: "Yes. We build AI powered websites and custom chatbots that personalize the user experience, automate customer support, and keep visitors engaged, no matter what industry you're in." },
];

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

function SectionHeader({ label, title }: { label: string; title: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="mb-12"
    >
      <motion.div variants={fadeInUp} className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-primary/70">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" />
        <span>{label}</span>
      </motion.div>
      <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white max-w-3xl">
        {title}
      </motion.h2>
    </motion.div>
  );
}

function ProcessStep({ step, index }: { step: typeof processSteps[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative"
    >
      <div className="absolute -left-[37px] top-0 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
      <div className="font-mono text-xs text-primary/70 mb-1 tracking-widest">PHASE {step.num}</div>
      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{step.title}</h3>
      <p className="text-white/60 max-w-2xl">{step.desc}</p>
    </motion.div>
  );
}

export function ServicesMainPageClient() {
  const [activeTab, setActiveTab] = useState(serviceCategories[0].id);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  
  const currentCategory = serviceCategories.find((c) => c.id === activeTab)!;

  return (
    <main className="relative bg-background overflow-hidden">
      <div className="pointer-events-none absolute inset-0" style={BLUEPRINT_GRID} aria-hidden="true" />

      <div className="layout-container relative px-4 sm:px-6 md:px-12 py-20 md:py-32">
        
        {/* HERO / INTRO SECTION */}
        <section className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-primary/70"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" />
            <span>Service Index</span>
            <span className="text-white/30">/ USA</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-8 max-w-4xl"
          >
            All Web Development Services in the USA
          </motion.h1>

          <div className="grid md:grid-cols-2 gap-8 text-white/70 text-lg leading-relaxed">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              Clickmasters is a full service web development company that works with businesses all across the United States. We build everything from simple business websites to enterprise software, online stores, and AI powered tools, all under one roof. Instead of hiring different companies for design, development, hosting, and support, you get one team that understands your entire project from the first idea to the final launch, and everything after that too.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-4">
              <p>
                Every service we offer follows one simple rule. Your website or app should actually help your business, not just sit online looking pretty. That means it needs to load fast, be built with clean code, work well on phones, follow good SEO practices, and keep your customers data safe.
              </p>
              <p className="text-white/50">
                Below, youll find every service we offer, from web design to eCommerce to AI tools. Each service is handled by a team that actually specializes in that area, not a jack of all trades trying to cover everything at once.
              </p>
            </motion.div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="mb-32 max-w-5xl">
          <SectionHeader label="Why Us" title="Why Businesses Choose Clickmasters For Web Development" />
          <div className="grid md:grid-cols-3 gap-8 text-white/60">
            <div className="space-y-4">
              <p>Picking a web development company is not a small decision. Its something youll likely stick with for years, so it matters. Businesses across the USA choose Clickmasters because we communicate clearly, were available during US business hours, and our team knows the latest tools and frameworks inside and out.</p>
            </div>
            <div className="space-y-4">
              <p>We work with businesses of every size, from small startups that just need their first website to large companies that need complicated systems connected together. Were not tied to one platform or technology. We recommend whatever actually fits your business and your budget.</p>
            </div>
            <div className="space-y-4">
              <p>Security, speed, and search visibility arent extras you have to pay more for. Theyre part of every single project we build. A slow or poorly built website costs American businesses real customers and real money every single day, so we treat these basics as something that simply has to be right, every time.</p>
            </div>
          </div>
        </section>

        {/* COMPLETE RANGE OF SERVICES (TABS) */}
        <section className="mb-32">
          <SectionHeader label="Capabilities" title="Our Complete Range of Web Development and Digital Services" />
          <p className="text-white/60 max-w-3xl mb-8 -mt-6">
            From basic web development to advanced AI features, our services are grouped around how businesses in the US actually grow online. That usually means building a strong website first, then selling more effectively, and then constantly improving things as time goes on.
          </p>

          {/* Tabs */}
          <div className="relative mb-8 flex flex-wrap gap-1 border border-white/10 bg-white/[0.02] p-1 rounded-lg overflow-x-auto">
            {serviceCategories.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap"
                >
                  {isActive && (
                    <motion.span
                      layoutId="tab-indicator"
                      className="absolute inset-0 bg-primary rounded-md"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <tab.icon className={`relative z-10 h-4 w-4 transition-colors ${isActive ? "text-white" : "text-white/50"}`} />
                  <span className={`relative z-10 transition-colors ${isActive ? "text-white" : "text-white/60"}`}>
                    {tab.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Service Links Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {currentCategory.services.map((service, index) => (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative border border-white/10 bg-white/[0.02] p-5 transition-all duration-300 hover:border-primary/30"
                >
                  <Link href={`/services/${service.slug}`} className="block relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/60">
                        {currentContextCode(currentCategory.id)}—{String(index + 1).padStart(3, "0")}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-white/20 transition-colors duration-300 group-hover:bg-primary" />
                    </div>
                    <h3 className="text-base font-semibold text-white group-hover:text-primary transition-colors">
                      {service.name}
                    </h3>
                    <div className="mt-4 flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-white/40 group-hover:text-primary">
                      <span className="h-px w-3 bg-white/30 transition-all duration-300 group-hover:w-6 group-hover:bg-primary" />
                      <span>View Service</span>
                      <ChevronRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* OUR PROCESS */}
        <section className="mb-32">
          <SectionHeader label="Execution" title="Our Process" />
          <div className="relative border-l border-white/10 pl-8 space-y-12">
            {processSteps.map((step, i) => (
              <ProcessStep key={step.num} step={step} index={i} />
            ))}
          </div>
        </section>

        {/* FAQS */}
        <section className="mb-32 max-w-3xl">
          <SectionHeader label="Questions" title="Frequently Asked Questions" />
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/10 bg-white/[0.02]">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-white pr-4">{faq.q}</span>
                  <Plus className={`h-5 w-5 text-primary flex-shrink-0 transition-transform duration-300 ${activeFaq === i ? "rotate-45" : ""}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="p-5 pt-0 text-white/60">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="text-center py-20 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto">
              Ready to Build Something That Actually Works?
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-8">
              Whether you need a brand new website, a large enterprise platform, or just some help keeping your current site running smoothly, Clickmasters has the development, design, and optimization skills your project needs, all from one team.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-primary text-black font-semibold px-8 py-4 rounded-md hover:bg-white transition-colors duration-300"
            >
              Get a Free Consultation
              <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </section>

      </div>
    </main>
  );
}

function currentContextCode(id: string) {
  const codes: Record<string, string> = {
    core: "DEV",
    platform: "CMS",
    ecommerce: "COM",
    design: "UIX",
    ai: "AI",
    api: "API",
    support: "OPS"
  };
  return codes[id] || "SVC";
}