import { siteConfig } from "./siteConfig";

export const SITE_URL = siteConfig.url.replace(/\/$/, "");

/** US market line claimed across the site. */
export const US_PHONE_DISPLAY = "+1 325 202 4074";
export const US_PHONE_TEL = "+13252024074";

export const LEGAL_ENTITY = siteConfig.legalName;

export function absoluteUrl(path: string): string {
  if (!path) return `${SITE_URL}/`;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${normalized.replace(/\/$/, "")}`;
}

export function clampTitle(title: string, max = 60): string {
  const cleaned = title.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  const cut = cleaned.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  const stem = (lastSpace > 24 ? cut.slice(0, lastSpace) : cut).trimEnd();
  return `${stem}…`;
}

export function clampDescription(description: string, max = 155): string {
  const cleaned = description.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  const cut = cleaned.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  const stem = (lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trimEnd();
  return `${stem}…`;
}

/** Title that already includes the brand, capped at 60 characters. */
export function brandedTitle(title: string): string {
  const suffix = ` | ${siteConfig.name}`;
  const stripped = title
    .replace(new RegExp(`\\s*\\|\\s*${siteConfig.name}\\s*$`, "i"), "")
    .replace(/\s+/g, " ")
    .trim();
  const maxStem = 60 - suffix.length;
  const primary = stripped.split(/\s+\|\s+/)[0];
  let stem = stripped.length <= maxStem ? stripped : primary;
  stem = stem.replace(/[\s|&–—-]+$/g, "").trim();
  if (stem.length > maxStem) {
    const cut = stem.slice(0, maxStem);
    const lastSpace = cut.lastIndexOf(" ");
    stem = (lastSpace > 12 ? cut.slice(0, lastSpace) : cut).replace(/[\s|&–—-]+$/g, "").trim();
  }
  const full = `${stem}${suffix}`;
  return full.length <= 60 ? full : `${full.slice(0, 59)}…`;
}

export function breadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
