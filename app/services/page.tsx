// app/(services)/page.tsx
import { Metadata } from "next";
import { ServicesMainPageClient } from "./ServicesMainPageClient";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Web Development Services USA | Clickmasters All Services",
  description:
    "Explore Clickmasters' full range of web development services in the USA. Custom websites, eCommerce, SaaS, and AI solutions. Get a free quote today.",
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: "Web Development Services USA | Clickmasters All Services",
    description:
      "Explore Clickmasters' full range of web development services in the USA. Custom websites, eCommerce, SaaS, and AI solutions. Get a free quote today.",
    url: `${siteConfig.url}/services`,
    siteName: siteConfig.legalName,
    type: "website",
    locale: "en_US",
  },
};

export default function ServicesMainPage() {
  return <ServicesMainPageClient />;
}