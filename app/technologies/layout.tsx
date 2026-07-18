import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function TechnologiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}
