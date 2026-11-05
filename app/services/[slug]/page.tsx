import { notFound, permanentRedirect } from "next/navigation";
import { getAllServiceSlugs, getServiceBySlug } from "@/data/services";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export default async function LegacyServiceRedirect({ params }: PageProps) {
  const { slug } = await params;
  if (!getServiceBySlug(slug)) {
    notFound();
  }
  permanentRedirect(`/${slug}`);
}
