import type { Metadata } from "next";
import IndustryPageTemplate from "@/components/services-tech-industry/Mainslugpag";
import { ServicePageView } from "@/components/services/ServicePageView";
import { JsonLd } from "@/components/seo/JsonLd";
import { pages } from "@/data/tech-serv-industry";
import { getAllServiceSlugs, getServiceBySlug } from "@/data/services";
import { getMetadata } from "@/lib/metadata";
import { RelatedPages } from "@/components/seo/RelatedPages";
import { relatedLinksForCombo } from "@/lib/related";
import { breadcrumbJsonLd, clampDescription, SITE_URL } from "@/lib/seo";
import { cmsMetadataOr, renderCmsPageOrNotFound } from "@/components/cms/CmsRoute";
import { withEditedSeo } from "@/lib/cms/metadata";
import { contextualBlogLinks } from "@/lib/cms/blog-posts";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
  const serviceParams = getAllServiceSlugs().map((slug) => ({ slug: [slug] }));
  const comboParams = Object.keys(pages).map((slug) => ({
    slug: slug.split("/"),
  }));
  return [...serviceParams, ...comboParams];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const key = slug.join("/");

  if (slug.length === 1) {
    const service = getServiceBySlug(slug[0]);
    if (service) {
      return withEditedSeo(
        `/${service.slug}`,
        getMetadata({
          title: service.metaTitle || service.title,
          description: service.metaDescription,
          slug: service.slug,
        }),
      );
    }
  }

  const page = pages[key];
  if (!page) {
    // Not code-owned: an ERP-created page at this path, or the normal 404.
    return cmsMetadataOr(`/${key}`, { title: "Page Not Found" });
  }

  return withEditedSeo(
    `/${key}`,
    getMetadata({
      title: page.title,
      description: page.hero.description,
      slug: key,
    }),
  );
}

export default async function ServTechIndustryPage({ params }: PageProps) {
  const { slug } = await params;
  const key = slug.join("/");

  if (slug.length === 1) {
    const service = getServiceBySlug(slug[0]);
    if (service) {
      return (
        <ServicePageView
          service={service}
          relatedArticles={await contextualBlogLinks(`/${service.slug}`)}
        />
      );
    }
  }

  const page = pages[key];
  if (!page) {
    // A5: code-owned routes win; otherwise an ERP-created page, else 404.
    return renderCmsPageOrNotFound(`/${key}`);
  }

  const [serviceSlug, industrySlug] = key.split("/");
  const service = serviceSlug ? getServiceBySlug(serviceSlug) : undefined;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    serviceType: service?.schema.serviceType ?? page.title,
    description: clampDescription(page.hero.description),
    url: `${SITE_URL}/${key}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: industrySlug
      ? industrySlug.replace(/-/g, " ")
      : ["United States", "United Kingdom", "Pakistan"],
  };

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          ...(service
            ? [{ name: service.title, path: `/${service.slug}` }]
            : []),
          { name: page.title, path: `/${key}` },
        ])}
      />
      <JsonLd data={serviceSchema} />
      {page.faqs.length > 0 ? <JsonLd data={faqSchema} /> : null}
      <IndustryPageTemplate data={page} />
      <RelatedPages heading="Related pages" links={relatedLinksForCombo(key)} />
    </>
  );
}
