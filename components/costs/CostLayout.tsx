// app/costs/layout.tsx

import { ReactNode } from "react";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import { Nav } from "@/components/studio/Nav";
import { Footer } from "@/components/studio/Footer";

type LayoutProps = {
  children: ReactNode;
};

export default function CostsLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ✅ 1. Nav at the top */}
      <Nav />

      {/* ✅ 2. Breadcrumb below Nav */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 py-4 text-sm overflow-x-auto">
            <Link 
              href="/" 
              className="text-gray-500 hover:text-blue-600 flex items-center gap-1 whitespace-nowrap"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link 
              href="/costs" 
              className="text-gray-500 hover:text-blue-600 whitespace-nowrap"
            >
              Cost Guides
            </Link>
          </nav>
        </div>
      </div>

      {/* ✅ 3. Main Content - grows to fill space */}
      <main className="flex-1">
        {children}
      </main>

      {/* ✅ 4. Footer at the bottom */}
      <Footer />
    </div>
  );
}