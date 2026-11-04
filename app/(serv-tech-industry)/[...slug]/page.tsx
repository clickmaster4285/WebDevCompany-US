import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IndustryPageTemplate from "@/components/services-tech-industry/Mainslugpag";
import { pages } from "@/data/tech-serv-industry";
import { getMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({
    slug: slug.split("/"),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug.join("/")];

  if (!page) {
    return { title: "Page Not Found" };
  }

  return getMetadata({
    title: page.title,
    description: page.hero.description,
    slug: slug.join("/"),
  });
}

export default async function ServTechIndustryPage({ params }: PageProps) {
  const { slug } = await params;
  const page = pages[slug.join("/")];

  if (!page) {
    notFound();
  }

  return <IndustryPageTemplate data={page} />;
}
