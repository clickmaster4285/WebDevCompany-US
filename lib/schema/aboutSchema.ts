// lib/schema/aboutSchema.ts
import { siteConfig } from "@/lib/siteConfig";

export function generateAboutSchema() {
  const SITE_URL = siteConfig.url.replace(/\/$/, ""); // Removes trailing slash if present
  const aboutUrl = `${SITE_URL}/about`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "url": aboutUrl,
        "name": "About ClickMasters",
        "description": "Clickmasters Web Development Company builds websites, web apps, and SaaS platforms. Delivered work is published as case studies.",
        "mainEntity": { "@id": `${SITE_URL}/#organization` },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
            { "@type": "ListItem", "position": 2, "name": "About", "item": aboutUrl }
          ]
        }
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        "name": "ClickMasters",
        "legalName": "Clickmasters Web Development Company",
        "url": SITE_URL,
        "logo": `${SITE_URL}/logo.webp`,
        "email": "sales@clickmasterswebdevelopmentcompany.com",
        "telephone": "+1-325-202-4074",
      }
    ]
  };
}