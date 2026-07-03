import { Nav } from "@/components/studio/Nav";
import { Footer } from "@/components/studio/Footer";
import { CompareHero } from "./CompareHero";
import { CompareGrid } from "./CompareGrid";

export function ComparePage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <CompareHero />
      <CompareGrid />
      <Footer />
    </main>
  );
}
