// app/services/[slug]/layout.tsx
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/data/services";
import { Nav } from "@/components/studio/Nav";
import { Footer } from "@/components/studio/Footer";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export default async function ServiceLayout({ children, params }: LayoutProps) {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav is fixed, so it doesn't take space in the flow */}
      <Nav />
      
      {/* This div pushes everything below the fixed nav */}
      <div className="flex-1 pt-[80px] md:pt-[100px]">
        {/* Breadcrumb - Below Nav */}
        <div className="border-b border-border/60 border-gray-100/80 text-white">
          <div className="container mx-auto px-4">
            <Breadcrumb 
              customLabels={{
                'services': 'Services',
                [resolvedParams.slug]: service.title
              }}
            />
          </div>
        </div>

        {/* Main Content - Renders your page.tsx */}
        <main>
          {children}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}