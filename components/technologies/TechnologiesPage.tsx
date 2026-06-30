import { Nav } from "@/components/studio/Nav";
import { Footer } from "@/components/studio/Footer";
import { TechnologiesHero } from "./TechnologiesHero";
import { TechnologiesSearch } from "./TechnologiesSearch";
import { TechnologiesGrid } from "./TechnologiesGrid";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";

export function TechnologiesPage() {
  return (
    <main className="relative min-h-screen bg-slate-100 text-slate-900">
      <Nav />
      <Breadcrumb />
      <TechnologiesHero /> 
      <TechnologiesSearch />
      <TechnologiesGrid />
      <Footer />
    </main>
  );
}