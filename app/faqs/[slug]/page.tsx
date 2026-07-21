import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { faqPages } from "@/data/faq-pages";
import { getMetadata } from "@/lib/metadata";
import { FAQDetailPage } from "@/components/faq-detail/FAQDetailPage";

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

  return <FAQDetailPage faq={faq} />;
}