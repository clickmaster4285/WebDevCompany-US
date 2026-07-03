import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BlogsHero } from "./BlogsHero";
import { BlogsSearch } from "./BlogsSearch";
import { BlogsGrid } from "./BlogsGrid";


export function BlogsPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <BlogsHero />
      <BlogsSearch />
      <BlogsGrid />
      <Footer />
    </main>
  );
}