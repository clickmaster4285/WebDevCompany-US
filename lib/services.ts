export const services = [
  {
    slug: "web-development-services",
    title: "Web Development Services",
    description: "Full-scale web development solutions...",
    isPillar: true,
  },
  {
    slug: "enterprise-web-development",
    title: "Enterprise Web Development",
    description: "Scalable enterprise solutions...",
  },
  {
    slug: "saas-development",
    title: "SaaS Development",
    description: "Build powerful SaaS platforms...",
  },
  {
    slug: "ecommerce-development",
    title: "eCommerce Development",
    description: "High-converting eCommerce stores...",
  },
  {
    slug: "shopify-development",
    title: "Shopify Development",
    description: "Custom Shopify themes & apps...",
  },
  {
    slug: "wordpress-development",
    title: "WordPress Development",
    description: "Custom WordPress solutions...",
  },
  {
    slug: "web-design-services",
    title: "Web Design Services (UI/UX)",
    description: "Beautiful, user-centered designs...",
  },
  {
    slug: "custom-web-development",
    title: "Custom Web Development",
    description: "Tailor-made web solutions...",
  },
  {
    slug: "web-application-development",
    title: "Web Application Development",
    description: "Robust web applications...",
  },
];

export type Service = (typeof services)[0];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}