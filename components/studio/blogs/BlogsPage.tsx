import { Nav } from "@/components/studio/Nav";
import { Footer } from "@/components/studio/Footer";
import { BlogsHero } from "./BlogsHero";
import { BlogsSearch } from "./BlogsSearch";
import { BlogsGrid } from "./BlogsGrid";
import { Breadcrumb } from "@/components/costs/Breadcrumb";


export function BlogsPage() {
  return (
    <main className="relative min-h-screen bg-slate-100 text-slate-900">
      <Nav />
      {/* <Breadcrumb /> */}
      <BlogsHero />
      <BlogsSearch />
      <BlogsGrid />
      <Footer />
    </main>
  );
}