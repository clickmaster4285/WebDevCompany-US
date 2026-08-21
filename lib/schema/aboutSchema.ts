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
        "description": "ClickMasters is a web development company built on real craft, not shortcuts. Founded in 2018, we've grown from a two-person team into a full-service studio of more than 50 people, building websites, web apps, and SaaS platforms for startups and established companies.",
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
        "url": SITE_URL,
        "logo": `${SITE_URL}/logo.webp`,
        "foundingDate": "2018",
        "founder": {
          "@type": "Person",
          "name": "Alex Chen",
          "jobTitle": "CEO & Founder"
        },
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "value": "50+"
        },
        "employee": [
          {
            "@type": "Person",
            "name": "Alex Chen",
            "jobTitle": "CEO & Founder"
          },
          {
            "@type": "Person",
            "name": "Sarah Mitchell",
            "jobTitle": "CTO"
          },
          {
            "@type": "Person",
            "name": "Marcus Rivera",
            "jobTitle": "Head of Design"
          },
          {
            "@type": "Person",
            "name": "Emily Nakamura",
            "jobTitle": "Head of Engineering"
          }
        ]
      }
    ]
  };
}