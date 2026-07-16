import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import type { TechnologySummary } from "@/data/technologies";
import { TechnologyHero } from "./TechnologyHero";
import { TechnologyFeaturedAnswer } from "./TechnologyFeaturedAnswer";
import { TechnologySectionRenderer } from "./TechnologySectionRenderer";
import { TechnologyRiskReversal } from "./TechnologyRiskReversal";
import { TechnologyTableOfContents } from "./TechnologyTableOfContents";
import { TechnologySubPagesSidebar } from "./TechnologySubPagesSidebar";
import { TechnologySubPagesMobile } from "./TechnologySubPagesMobile";

type TechnologyDetailPageProps = {
  technology: TechnologySummary;
  /** When `true`, renders without Nav/Footer — for use inside layouts that already provide them */
  embedded?: boolean;
  /** Sub-pages (industry-specific applications) of this parent technology */
  subPages?: TechnologySummary[];
  /** Parent technology — required for sub-pages to show breadcrumb path and back link */
  parentTechnology?: TechnologySummary;
};

export function TechnologyDetailPage({
  technology,
  embedded = false,
  subPages,
  parentTechnology,
}: TechnologyDetailPageProps) {
  const copy = technology.page.completePageCopy;
  const hasSubPages = subPages && subPages.length > 0;

  const content = (
    <>
      <TechnologyHero technology={technology} parentTechnology={parentTechnology} />

      <TechnologyFeaturedAnswer content={copy.featuredAnswerBlock?.content} />

      {/* Mobile sub-pages (only on parent pages with sub-pages) */}
      {hasSubPages && (
        <div className="mt-6">
          <TechnologySubPagesMobile parent={technology} subPages={subPages} />
        </div>
      )}

      {hasSubPages ? (
        /* Split layout: main content left, sub-pages sidebar right */
        <section className="layout-container grid gap-8 px-6 py-10 lg:grid-cols-[1fr_340px]">
          <div className="min-w-0">
            {/* Embedded TOC — visible on all screens, sticky at top of content */}
            <div className="sticky top-24 z-10 mb-8">
              <TechnologyTableOfContents
                sections={copy.sections}
                variant="compact"
              />
            </div>

            <div className="grid gap-6">
              {copy.sections.map((section: any, index: number) => (
                <TechnologySectionRenderer
                  key={`${section.heading}-${index}`}
                  section={section}
                  index={index}
                />
              ))}
            </div>
          </div>

          <TechnologySubPagesSidebar
            parent={technology}
            subPages={subPages}
          />
        </section>
      ) : (
        /* Default layout: TOC left, content right */
        <section className="layout-container grid gap-8 px-6 py-10 lg:grid-cols-[280px_1fr]">
          <TechnologyTableOfContents sections={copy.sections} />

          <div className="grid gap-6">
            {copy.sections.map((section: any, index: number) => (
              <TechnologySectionRenderer
                key={`${section.heading}-${index}`}
                section={section}
                index={index}
              />
            ))}
          </div>
        </section>
      )}

      <TechnologyRiskReversal content={copy.riskReversal} />
    </>
  );

  // Embedded mode: just the content, no Nav/Footer wrapper
  // (for use inside layouts that already provide Nav/Footer)
  if (embedded) {
    return content;
  }

  // Standalone mode: full page with Nav and Footer
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Nav />
      <main className="grow">{content}</main>
      <Footer />
    </div>
  );
}
