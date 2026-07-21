// lib/metadata.ts
import { Metadata } from "next/";
import { siteConfig } from "./siteConfig";

interface MetadataProps {
  title: string;
  description: string;
  slug?: string; // e.g., "about" or "blogs/my-post"
  imagePath?: string; // Optional: custom Open Graph image path
  noIndex?: boolean; // Optional: set to true for pages that should not be indexed
}

/**
 * Generates a complete Metadata object with canonical URL, Open Graph, and Twitter cards.
 *
 * Usage:
 *   export const metadata = getMetadata({ title: "About Us", description: "...", slug: "about" });
 *
 * For dynamic routes:
 *   export async function generateMetadata(...) {
 *     return getMetadata({ title: "...", description: "...", slug: `costs/${slug}` });
 *   }
 */
export function getMetadata({
  title,
  description,
  slug = "",
  imagePath,
  noIndex = false,
}: MetadataProps): Metadata {
  // The canonical path. Leading slash is added automatically.
  const canonicalPath = slug ? `/${slug}` : "/";
  const imageUrl = imagePath || siteConfig.logo;
  const fullTitle = `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

/**
 * A minimal metadata helper for simple pages that just need a title + description
 * without the full OG/Twitter treatment.
 */
export function getSimpleMetadata(title: string, description: string): Metadata {
  return {
    title: `${title} | ${siteConfig.name}`,
    description,
  };
}
