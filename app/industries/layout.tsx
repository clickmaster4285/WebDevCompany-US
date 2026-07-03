// app/industries/layout.tsx
import { Nav } from "@/components/studio/Nav";
import { Footer } from "@/components/studio/Footer";

export default function IndustriesLayout({
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
