// lib/schema/serviceSchema.ts
import { siteConfig } from "@/lib/siteConfig";
import { ServicePageData } from "@/data/services";

export function generateServiceSchema(service: ServicePageData) {
  const SITE_URL = siteConfig.url.replace(/\/$/, ""); // Removes trailing slash
  const canonicalUrl = `${SITE_URL}/${service.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.schema.serviceType,
    "name": service.title,
    "description": service.metaDescription,
    "provider": {
      "@id": `${SITE_URL}/#organization`
    },
    "areaServed": ["United States", "United Kingdom", "Pakistan"],
    "url": canonicalUrl,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `${SITE_URL}/`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": `${SITE_URL}/services`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": service.title,
          "item": canonicalUrl
        }
      ]
    }
  };
}