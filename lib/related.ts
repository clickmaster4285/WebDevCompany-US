import { pages } from "@/data/tech-serv-industry";
import { getServiceBySlug, type ServicePageData } from "@/data/services";
import { costData } from "@/data/costdata";
import { comparisons } from "@/data/comparisons";
import { getAllLocationPages } from "@/data/locationdata";

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

const COMPARISONS_FOR_SERVICE: Record<string, string[]> = {
  "web-development-services": ["custom-vs-template-website", "nextjs-vs-react"],
  "custom-web-development": ["custom-vs-template-website", "mern-vs-laravel", "nextjs-vs-react"],
  "web-application-development": ["mern-vs-laravel", "nextjs-vs-react"],
  "full-stack-development": ["mern-vs-laravel", "nextjs-vs-react"],
  "wordpress-development": ["wordpress-vs-shopify", "webflow-vs-wordpress", "wordpress-vs-webflow-vs-shopify"],
  "shopify-development": ["wordpress-vs-shopify", "shopify-vs-woocommerce", "shopify-vs-magento", "wordpress-vs-webflow-vs-shopify"],
  "woocommerce-development": ["shopify-vs-woocommerce", "wordpress-vs-shopify"],
  "magento-development": ["shopify-vs-magento"],
  "ecommerce-development": ["shopify-vs-woocommerce", "shopify-vs-magento", "headless-vs-traditional-commerce", "wordpress-vs-shopify"],
  "headless-commerce-development": ["headless-vs-traditional-commerce"],
  "shopify-plus-development": ["shopify-vs-magento", "headless-vs-traditional-commerce"],
  "web-design-services": ["webflow-vs-wordpress", "custom-vs-template-website", "wordpress-vs-webflow-vs-shopify"],
  "saas-development": ["custom-vs-template-website", "nextjs-vs-react"],
};

function comparisonLink(slug: string): RelatedLink | undefined {
  const comparison = comparisons.find((item) => item.slug === slug);
  if (!comparison?.slug) return undefined;
  return {
    href: `/compare/${comparison.slug}`,
    label: comparison.title,
    description: comparison.excerpt,
  };
}

export function comparisonLinksForService(serviceSlug: string): RelatedLink[] {
  const slugs = COMPARISONS_FOR_SERVICE[serviceSlug] ?? [];
  return dedupe(
    slugs.flatMap((slug) => {
      const link = comparisonLink(slug);
      return link ? [link] : [];
    }),
  );
}

export function allComparisonLinks(): RelatedLink[] {
  return dedupe(
    comparisons.flatMap((comparison) => {
      if (typeof comparison.slug !== "string") return [];
      return [{
        href: `/compare/${comparison.slug}`,
        label: comparison.title,
        description: comparison.excerpt,
      }];
    }),
  );
}

export function serviceLinksForComparison(comparisonSlug: string): RelatedLink[] {
  const links: RelatedLink[] = [{ href: "/compare", label: "All comparisons", description: "Every platform and approach comparison" }];
  for (const [serviceSlug, comparisonSlugs] of Object.entries(COMPARISONS_FOR_SERVICE)) {
    if (!comparisonSlugs.includes(comparisonSlug)) continue;
    const service = getServiceBySlug(serviceSlug);
    if (!service) continue;
    links.push({
      href: `/${service.slug}`,
      label: service.title,
      description: "Service this comparison informs",
    });
  }
  return dedupe(links);
}

export function locationLinks(): RelatedLink[] {
  return getAllLocationPages().map((location) => ({
    href: `/locations/${location.slug}`,
    label: `${location.city} web development`,
    description: `${location.city}, ${location.state}`,
  }));
}

export function relatedLinksForCombo(key: string): RelatedLink[] {
  const [serviceSlug, industryToken] = key.split("/");
  const links: RelatedLink[] = [];
  const service = serviceSlug ? getServiceBySlug(serviceSlug) : undefined;
  if (service) {
    links.push({
      href: `/${service.slug}`,
      label: service.title,
      description: "Service overview",
    });
  }
  const hub = industryToken ? INDUSTRY_HUBS[industryToken] : undefined;
  if (hub) {
    links.push({
      href: hub.href,
      label: `${hub.label} industry`,
      description: "Industry overview",
    });
  }
  for (const [otherKey, page] of Object.entries(pages)) {
    if (otherKey === key) continue;
    const [otherService, otherIndustry] = otherKey.split("/");
    if (otherService !== serviceSlug && otherIndustry !== industryToken) continue;
    links.push({
      href: `/${otherKey}`,
      label: page.title,
      description: otherService === serviceSlug ? "Same service, another industry" : "Related industry page",
    });
  }
  return dedupe(links);
}

export function comboLinksForIndustrySlug(industrySlug: string): RelatedLink[] {
  const tokens = Object.entries(INDUSTRY_HUBS)
    .filter(([, hub]) => hub.href === `/industries/${industrySlug}`)
    .map(([token]) => token);
  if (!tokens.length) return [];
  return dedupe(
    Object.entries(pages)
      .filter(([key]) => tokens.some((token) => key.endsWith(`/${token}`)))
      .map(([key, page]) => ({
        href: `/${key}`,
        label: page.title,
        description: page.hero.description,
      })),
  );
}
