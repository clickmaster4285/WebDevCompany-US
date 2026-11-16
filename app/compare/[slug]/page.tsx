import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { comparisons } from "@/data/comparisons";
import { getMetadata } from "@/lib/metadata";
import { CompareDetailPage } from "@/components/compare/detail/CompareDetailPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { withEditedSeo } from "@/lib/cms/metadata";

type ComparePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return comparisons
    .filter((comparison) => typeof comparison.slug === "string")
    .map((comparison) => ({
      slug: comparison.slug,
    }));
}

async function baseGenerateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const { slug } = await params;

  const comparison = comparisons.find((item) => item.slug === slug);

  if (!comparison) {
    return {
      title: "Comparison Not Found",
    };
  }

  return getMetadata({
    title: comparison.title,
    description: comparison.excerpt,
    slug: `compare/${slug}`,
  });
}

export default async function Page({ params }: ComparePageProps) {
  const { slug } = await params;

  const comparison = comparisons.find((item) => item.slug === slug);

  if (!comparison) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Comparisons", path: "/compare" },
          { name: comparison.title, path: `/compare/${comparison.slug}` },
        ])}
      />
      <CompareDetailPage comparison={comparison} />
    </>
  );
}

// Edited-page SEO from the ERP (Part B), applied on the server.
export async function generateMetadata(
  props: Parameters<typeof baseGenerateMetadata>[0],
) {
  const { slug } = await props.params;
  return withEditedSeo(
    `/compare/${[slug].flat().join("/")}`,
    await baseGenerateMetadata(props),
  );
}
