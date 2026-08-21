// app/(services)/[slug]/layout.tsx
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/data/services";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export default async function ServiceLayout({ children, params }: LayoutProps) {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    // Let the page component handle the 404
    return <>{children}</>;
  }

  return (
    <>
      {/* Breadcrumbs can go here later */}
      {children}
    </>
  );
}