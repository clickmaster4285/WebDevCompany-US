import type { CmsPost, CmsSection } from "@/lib/cms/types";
import { SECTION_COMPONENTS, SITE_CHROME_TYPES } from "./sections";

/**
 * The content sections of a created page, in render order: sorted by
 * `order` (stable), hidden ones dropped unless `settings.required` is true,
 * unknown types skipped silently, and header/footer left to the site chrome.
 */
export function renderableSections(
  sections: CmsSection[] | undefined,
): CmsSection[] {
  if (!Array.isArray(sections)) return [];
  return sections
    .filter(
      (s): s is CmsSection =>
        !!s && typeof s === "object" && typeof s.type === "string",
    )
    .filter((s) => s.hidden !== true || s.settings?.required === true)
    .filter(
      (s) =>
        Object.prototype.hasOwnProperty.call(SECTION_COMPONENTS, s.type!) &&
        !SITE_CHROME_TYPES.has(s.type!),
    )
    .map((s, index) => ({ s, index }))
    .sort(
      (a, b) =>
        (Number(a.s.order) || 0) - (Number(b.s.order) || 0) ||
        a.index - b.index,
    )
    .map(({ s }) => s);
}

/**
 * Renders created-page content sections (A3/A4). Edit instructions (Part B)
 * never go through here.
 */
export function CmsSectionRenderer({
  sections,
  posts = [],
  embedded = false,
}: {
  sections: CmsSection[] | undefined;
  posts?: CmsPost[];
  /** Below a site hero that owns the <h1>: no section may claim it. */
  embedded?: boolean;
}) {
  const visible = renderableSections(sections);
  return (
    <>
      {visible.map((section, i) => {
        const Section = SECTION_COMPONENTS[section.type!];
        return (
          <Section
            key={section.id ?? `${section.type}-${i}`}
            section={section}
            posts={posts}
            isFirst={!embedded && i === 0}
          />
        );
      })}
    </>
  );
}
