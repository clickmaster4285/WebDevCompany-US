import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { faqPages } from "@/data/faq-pages";
import { getMetadata } from "@/lib/metadata";
import { FAQDetailPage } from "@/components/faq-detail/FAQDetailPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedPages } from "@/components/seo/RelatedPages";
import { breadcrumbJsonLd } from "@/lib/seo";

type FAQDetailRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return faqPages.map((faq) => ({
    slug: faq.slug,
  }));
}

export async function generateMetadata({ params }: FAQDetailRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const faq = faqPages.find((item) => item.slug === slug);

  if (!faq) {
    return {
      title: "FAQ Not Found",
    };
  }

  return getMetadata({
    title: faq.page.title,
    description: faq.aboveTheFold.directAnswer,
    slug: `faqs/${slug}`,
  });
}

export default async function Page({ params }: FAQDetailRouteProps) {
  const { slug } = await params;
  const faq = faqPages.find((item) => item.slug === slug);

  if (!faq) {
    notFound();
  }

  const index = faqPages.findIndex((item) => item.slug === slug);
  const neighbors = faqPages
    .filter((_, itemIndex) => itemIndex !== index)
    .slice(0, 4)
    .map((item) => ({
      href: `/faqs/${item.slug}`,
      label: item.page.title,
    }));

  const serviceHref = faq.aboveTheFold?.secondaryCta?.url?.replace(/\/$/, "") || "";
  const related = [
    ...(serviceHref.startsWith("/") && !serviceHref.startsWith("/faqs")
      ? [{ href: serviceHref, label: faq.aboveTheFold.secondaryCta.label }]
      : []),
    { href: "/faqs", label: "All FAQs" },
    { href: "/industries", label: "Industries we serve" },
    { href: "/locations", label: "Cities we serve" },
    ...neighbors,
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "FAQs", path: "/faqs" },
          { name: faq.page.title, path: `/faqs/${faq.slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: faq.page.title,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.aboveTheFold.directAnswer,
              },
            },
            ...(faq.relatedQuestions ?? []).map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          ],
        }}
      />
      <FAQDetailPage faq={faq} />
      <RelatedPages heading="Related pages" links={related} />
    </>
  );
}