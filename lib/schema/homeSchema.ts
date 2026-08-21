// lib/schema/homeSchema.ts
import { siteConfig } from "@/lib/siteConfig";

export function generateHomeSchema() {
  const SITE_URL = siteConfig.url.replace(/\/$/, ""); // Removes trailing slash if present

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        "name": "ClickMasters",
        "alternateName": "ClickMasters Web Development Company",
        "url": SITE_URL,
        "logo": `${SITE_URL}/logo.webp`,
        "image": `${SITE_URL}/logo.webp`,
        "description": "ClickMasters is a web development company specializing in custom web development, UI/UX design, eCommerce, SaaS platforms, and AI-powered tools for businesses in the USA, UK, and worldwide.",
        "foundingDate": "2018",
        "email": "sales@clickmasterswebdevelopmentcompany.com",
        "telephone": "+1-325-202-4074",
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
        ],
        "areaServed": [
          { "@type": "Country", "name": "United States" },
          { "@type": "Country", "name": "United Kingdom" },
          { "@type": "Country", "name": "Pakistan" }
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "url": SITE_URL,
        "name": "ClickMasters",
        "publisher": { "@id": `${SITE_URL}/#organization` }
      }
    ]
  };
}