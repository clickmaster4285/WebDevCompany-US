// app/case-studies/layout.tsx
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      {/* Main Content */}
      <main className="grow">
        {children}
      </main>

      <Footer />
    </div>
  );
}