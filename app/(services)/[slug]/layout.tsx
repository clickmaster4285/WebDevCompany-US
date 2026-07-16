// app/services/[slug]/layout.tsx
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/data/services";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
// import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export default async function ServiceLayout({ children, params }: LayoutProps) {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);

  // If the slug isn't a known service, let the page component handle it
  // (it might be 'technologies' or another route handled downstream)

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <div className="">
        {/* Breadcrumb - Below Nav */}
        {/* <div className="border-y border-white/[0.06] bg-surface-1/40 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <Breadcrumb
              customLabels={{
                'services': 'Services',
                [resolvedParams.slug]: service?.title ?? resolvedParams.slug
              }}
            />
          </div>
        </div> */}

        {/* Main Content */}
        <main>
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}