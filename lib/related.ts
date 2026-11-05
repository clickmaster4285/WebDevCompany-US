import { pages } from "@/data/tech-serv-industry";
import { getServiceBySlug, type ServicePageData } from "@/data/services";
import { costData } from "@/data/costdata";

export const INDUSTRY_HUBS: Record<string, { href: string; label: string }> = {
  healthcare: { href: "/industries/healthcare-web-development", label: "Healthcare" },
  "law-firm": { href: "/industries/law-firm-web-development", label: "Law firms" },
  "real-estate": { href: "/industries/real-estate-web-development", label: "Real estate" },
  fintech: { href: "/industries/fintech-web-development", label: "Fintech" },
  startups: { href: "/industries/saas-web-development", label: "SaaS and startups" },
  saas: { href: "/industries/saas-web-development", label: "SaaS" },
  manufacturing: { href: "/industries/manufacturing-web-development", label: "Manufacturing" },
  ecommerce: { href: "/industries/ecommerce-web-development", label: "eCommerce" },
  hospitality: { href: "/industries/hospitality-web-development", label: "Hospitality" },
  education: { href: "/industries/education-web-development", label: "Education" },
  dental: { href: "/industries/dental-web-development", label: "Dental" },
  construction: { href: "/industries/construction-web-development", label: "Construction" },
  nonprofit: { href: "/industries/nonprofit-web-development", label: "Nonprofit" },
};

const SERVICE_COST: Record<string, string> = {
  "web-development-services": "web-development-cost",
  "shopify-development": "shopify-development-cost",
  "ecommerce-development": "ecommerce-website-cost",
  "wordpress-development": "wordpress-development-cost",
  "saas-development": "saas-development-cost",
  "web-design-services": "web-design-cost",
  "website-redesign-services": "website-redesign-cost",
  "web-application-development": "web-application-cost",
  "shopify-plus-development": "shopify-plus-cost",
};

export type RelatedLink = {
  href: string;
  label: string;
  description?: string;
};

export function serviceIndustryPages(serviceSlug: string): RelatedLink[] {
  return Object.entries(pages)
    .filter(([key]) => key.startsWith(`${serviceSlug}/`))
    .map(([key, page]) => ({
      href: `/${key}`,
      label: page.title,
      description: page.hero.description,
    }));
}

export function relatedLinksForService(service: ServicePageData): RelatedLink[] {
  const links: RelatedLink[] = [];
  const costSlug = SERVICE_COST[service.slug];
  const cost = costSlug ? costData[costSlug] : undefined;
  if (cost) {
    links.push({
      href: `/costs/${cost.slug}`,
      label: cost.title,
      description: "Pricing guidance for this service",
    });
  }

  for (const href of service.internalLinks ?? []) {
    const slug = href.replace(/^\/|\/$/g, "");
    if (!slug || slug === service.slug) continue;
    const related = getServiceBySlug(slug);
    links.push({
      href: `/${slug}`,
      label: related?.title ?? slug.replace(/-/g, " "),
    });
  }

  links.push(
    { href: "/case-studies", label: "Case studies", description: "Dated project outcomes" },
    { href: "/industries", label: "All industries" },
    { href: "/locations", label: "All cities" },
  );

  return dedupe(links);
}

export function serviceForCost(costSlug: string): RelatedLink | undefined {
  const entry = Object.entries(SERVICE_COST).find(([, cost]) => cost === costSlug);
  if (!entry) return undefined;
  const service = getServiceBySlug(entry[0]);
  if (!service) return undefined;
  return { href: `/${service.slug}`, label: service.title, description: "Service overview" };
}

export function industryLinksFromSlug(slug: string): RelatedLink[] {
  const links: RelatedLink[] = [];
  for (const [token, hub] of Object.entries(INDUSTRY_HUBS)) {
    if (slug.includes(token)) links.push(hub);
  }
  return dedupe(links);
}

function dedupe(links: RelatedLink[]): RelatedLink[] {
  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}
