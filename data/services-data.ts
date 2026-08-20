import type { CSSProperties } from "react";
import { Code2, Layers, ShoppingBag, Palette, Cpu, Database, Wrench, Compass, Users, ShieldCheck } from "lucide-react";

export const BLUEPRINT = "#5ea8ff";
export const SIGNAL = "#ffb454";

export const BLUEPRINT_GRID: CSSProperties = {
  backgroundImage: `
    linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(to right, rgba(94,168,255,0.09) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(94,168,255,0.09) 1px, transparent 1px)
  `,
  backgroundSize: "16px 16px, 16px 16px, 96px 96px, 96px 96px",
  maskImage: "radial-gradient(ellipse 90% 55% at 50% 0%, black 35%, transparent 100%)",
  WebkitMaskImage: "radial-gradient(ellipse 90% 55% at 50% 0%, black 35%, transparent 100%)",
};

export const serviceCategories = [
  { id: "core", code: "DEV", icon: Code2, title: "Core Web Development", services: [ { name: "Web Development Services", slug: "web-development-services" }, { name: "Enterprise Web Development", slug: "enterprise-web-development" }, { name: "Custom Web Development", slug: "custom-web-development" }, { name: "Web Application Development", slug: "web-application-development" }, { name: "Full Stack Development", slug: "full-stack-development" } ] },
  { id: "platform", code: "CMS", icon: Layers, title: "Platform Specific", services: [ { name: "WordPress Development", slug: "wordpress-development" }, { name: "Shopify Development", slug: "shopify-development" }, { name: "Shopify Plus Development", slug: "shopify-plus-development" }, { name: "WooCommerce Development", slug: "woocommerce-development" }, { name: "Magento Development", slug: "magento-development" } ] },
  { id: "ecommerce", code: "COM", icon: ShoppingBag, title: "eCommerce & Modern", services: [ { name: "eCommerce Development", slug: "ecommerce-development" }, { name: "Headless Commerce Development", slug: "headless-commerce-development" }, { name: "CMS Development", slug: "cms-development" } ] },
  { id: "design", code: "UIX", icon: Palette, title: "Design & UX", services: [ { name: "Web Design Services (UI/UX)", slug: "web-design-services" }, { name: "Website Redesign Services", slug: "website-redesign-services" } ] },
  { id: "ai", code: "AI", icon: Cpu, title: "AI Powered Solutions", services: [ { name: "AI Web Development", slug: "ai-web-development" }, { name: "AI Chatbot Development", slug: "ai-chatbot-development" } ] },
  { id: "api", code: "API", icon: Database, title: "Integration & API", services: [{ name: "API Development", slug: "api-development" }] },
  { id: "support", code: "OPS", icon: Wrench, title: "Performance & Support", services: [ { name: "Website Speed Optimization", slug: "website-speed-optimization" }, { name: "Website Maintenance & Support", slug: "website-maintenance-services" } ] },
];

export const totalServices = serviceCategories.reduce((sum, c) => sum + c.services.length, 0);

export const processSteps = [
  { num: "01", title: "Discovery and Strategy", desc: "We start by getting to know your business, your goals, your competitors, and what you actually need technically. This way, the plan we recommend is the right one for you, not just the one we're most familiar with." },
  { num: "02", title: "Design and Planning", desc: "Our team sketches out how users will move through your site and plans the technical structure before any real development starts. That way, the final product feels intentional instead of thrown together." },
  { num: "03", title: "Development and Testing", desc: "We build using whatever technology actually fits your project best, then test everything carefully across different devices and browsers before it ever goes live." },
  { num: "04", title: "Launch and Optimization", desc: "Once we launch, we keep a close eye on how everything performs and make quick adjustments in the days right after, so nothing slips through the cracks." },
  { num: "05", title: "Ongoing Support and Growth", desc: "Most of our client relationships don't end at launch. We stick around for maintenance, performance improvements, and new features as your business keeps changing and growing." },
];

export const whyUs = [
  { icon: Compass, label: "How we work", body: "Picking a web development company isn't a small decision — it's something you'll likely stick with for years. Businesses across the USA choose Clickmasters because we communicate clearly, we're available during US business hours, and our team knows the latest tools and frameworks inside and out." },
  { icon: Users, label: "Who we work with", body: "We work with businesses of every size, from small startups that just need their first website to large companies that need complicated systems connected together. We're not tied to one platform or technology — we recommend whatever actually fits your business and your budget." },
  { icon: ShieldCheck, label: "What's non-negotiable", body: "Security, speed, and search visibility aren't extras you pay more for — they're part of every project we build. A slow or poorly built website costs American businesses real customers and real money every day, so we treat these basics as something that simply has to be right, every time." },
];

export const faqs = [
  { q: "What web development services does Clickmasters offer in the USA?", a: "We offer custom web development, enterprise web development, eCommerce development on platforms like Shopify, WooCommerce, and Magento, WordPress development, SaaS development, UI/UX design, AI web and chatbot development, API development, website redesigns, speed optimization, and ongoing maintenance and support for businesses all across the United States." },
  { q: "How do I choose the right web development service for my business?", a: "It really depends on where your business is right now. A new business usually starts with basic web development or a platform like WordPress or Shopify. A more established business often needs enterprise development, a redesign, faster performance, or ongoing maintenance. We offer free consultations to help you figure out what actually makes sense for you." },
  { q: "Does Clickmasters work with small businesses or only large companies?", a: "We work with businesses of every size across the USA, from startups building their very first website to large companies that need complex platforms and system integrations." },
  { q: "How much does a website cost in the USA?", a: "It really depends on how complex your project is, which platform you use, and which features you need. A simple business website costs a lot less than a custom application or a full scale online store. We give out custom quotes once we understand exactly what you're looking for." },
  { q: "Do you provide support after the website is launched?", a: "Yes. We offer maintenance and support plans that cover updates, security checks, backups, and technical help to keep your site running smoothly long after launch." },
  { q: "Can you improve my existing website instead of building a new one?", a: "Yes, that's actually a big part of what we do. A lot of our work involves redesigning, speeding up, or maintaining websites that already exist, rather than starting completely from scratch." },
  { q: "Do you build AI powered features for websites?", a: "Yes. We build AI powered websites and custom chatbots that personalize the user experience, automate customer support, and keep visitors engaged, no matter what industry you're in." },
];