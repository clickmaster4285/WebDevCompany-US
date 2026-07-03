import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TechnologiesHero } from "./TechnologiesHero";
import { TechnologiesSearch } from "./TechnologiesSearch";
import { TechnologiesGrid } from "./TechnologiesGrid";

export function TechnologiesPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <TechnologiesHero /> 
      <TechnologiesSearch />
      <TechnologiesGrid />
      <Footer />
    </main>
  );
}
