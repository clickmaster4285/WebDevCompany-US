import { getServiceBySlug } from "@/data/services";
import { pages as comboPages } from "@/data/tech-serv-industry";
import { normalizeSlug } from "./slug";

// A5 step 1: paths owned by code always win over an ERP-created page.
// Keep both sets in sync with the folders in app/.

/** Folders with their own dynamic child route: everything below is theirs (their 404). */
const OWNED_SUBTREES = new Set([
  "api",
  "blogs",
  "case-studies",
  "compare",
  "costs",
  "faqs",
  "industries",
  "locations",
  "services",
  "technologies",
]);

/** Static top-level pages: only the exact path is code-owned. */
const OWNED_PAGES = new Set(["about", "contact", "privacy", "testimonials"]);

/** True when a code-owned route renders (or 404s) this path itself. */
export function isCodeOwnedPath(path: string): boolean {
  const slug = normalizeSlug(path);
  if (slug === "/") return true;
  const parts = slug.split("/");
  if (OWNED_SUBTREES.has(parts[0])) return true;
  if (parts.length === 1 && (OWNED_PAGES.has(parts[0]) || getServiceBySlug(parts[0])))
    return true;
  return Object.prototype.hasOwnProperty.call(comboPages, slug);
}
