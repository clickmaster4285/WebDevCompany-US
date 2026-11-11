import Script from "next/script";
import { allowCustomJs } from "@/lib/cms/config";
import { safeColor, sanitizeCss, sanitizeHtml } from "@/lib/cms/sanitize";
import type { CmsPage as CmsPageData } from "@/lib/cms/types";
import { CmsSectionRenderer, renderableSections } from "./CmsSectionRenderer";
import { PAGE_TONE } from "./primitives";

// An ERP-created page, rendered with this website's own look. It sits inside
// the (serv-tech-industry) layout, which already provides the site Nav, the
// <main> element and the Footer, exactly like the code-owned service pages.
//
// The page's own design.colors (if any) only re-tint the accent of this page,
// via --cms-accent; the site's theme stays the source of truth otherwise.

export function CmsPage({ page }: { page: CmsPageData }) {
  const css = sanitizeCss(page.customCode?.css);
  const html = sanitizeHtml(page.customCode?.html);
  const js =
    typeof page.customCode?.js === "string" ? page.customCode.js.trim() : "";
  // A leading hero clears the fixed Nav itself; anything else gets the gap.
  const startsWithHero = renderableSections(page.sections)[0]?.type === "hero";
  const accent =
    process.env.CMS_APPLY_THEME_COLORS === "true"
      ? safeColor(page.design?.colors?.primary)
      : undefined;

  return (
    <div
      data-cms-page={page.pageType ?? "page"}
      className={`relative w-full bg-background text-[var(--cms-fg)] ${startsWithHero ? "" : "pt-28"}`}
      style={{
        ...PAGE_TONE,
        ...(accent
          ? ({
              "--cms-accent": accent,
              "--cms-btn-bg": accent,
            } as React.CSSProperties)
          : {}),
      }}
    >
      {/* sanitizeCss strips "<" so the CSS cannot close the <style> element. */}
      {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
      <CmsSectionRenderer
        sections={page.sections}
        posts={Array.isArray(page.context?.posts) ? page.context.posts : []}
      />
      {html && (
        <div
          data-cms-custom-html
          className="layout-container px-4 py-12 sm:px-6 md:px-10"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
      {/* customCode.js runs only with explicit opt-in (CMS_ALLOW_CUSTOM_JS=true). */}
      {js && allowCustomJs() && (
        <Script
          id={`cms-custom-js-${(page.slug ?? "page").replace(/[^a-z0-9-]/gi, "-")}`}
          strategy="afterInteractive"
        >
          {js}
        </Script>
      )}
    </div>
  );
}
