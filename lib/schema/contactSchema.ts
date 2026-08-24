// lib/schema/contactSchema.ts
import { siteConfig } from "@/lib/siteConfig";

export function generateContactSchema() {
  const SITE_URL = siteConfig.url.replace(/\/$/, ""); // Removes trailing slash if present
  const contactUrl = `${SITE_URL}/contact`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "url": contactUrl,
        "name": "Contact ClickMasters",
        "description": "Get in touch with ClickMasters — request a free consultation, ask about pricing, or start your next web development project.",
        "mainEntity": { "@id": `${SITE_URL}/#organization` },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
            { "@type": "ListItem", "position": 2, "name": "Contact", "item": contactUrl }
          ]
        }
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        "name": "ClickMasters",
        "url": SITE_URL,
        "logo": `${SITE_URL}/logo.webp`,
        "email": "sales@clickmasterswebdevelopmentcompany.com",
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+1-325-202-4074",
            "contactType": "sales",
            "areaServed": "US",
            "availableLanguage": ["English"]
          },
          {
            "@type": "ContactPoint",
            "telephone": "+44-7988-576086",
            "contactType": "sales",
            "areaServed": "GB",
            "availableLanguage": ["English"]
          },
          {
            "@type": "ContactPoint",
            "telephone": "+92-332-5394285",
            "contactType": "sales",
            "areaServed": "PK",
            "availableLanguage": ["English"]
          }
        ]
      }
    ]
  };
}