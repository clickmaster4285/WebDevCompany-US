import Link from 'next/link';
import type { IndustryPageData } from '@/data/tech-serv-industry';

interface CategoryOverviewProps {
  category: string;
  pages: [string, IndustryPageData][];
}

export function CategoryOverview({ category, pages }: CategoryOverviewProps) {
  const categoryTitle = category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <main className="layout-container px-4 sm:px-6 lg:px-8 py-20">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {categoryTitle} Solutions
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our {categoryTitle.toLowerCase()} expertise across industries.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map(([slugKey, page]) => (
          <Link
            key={slugKey}
            href={`/serv-tech-industry/${slugKey}`}
            className="block p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
          >
            <h3 className="text-xl font-semibold text-blue-600 mb-2">{page.title}</h3>
            <p className="text-gray-600 text-sm line-clamp-3">{page.hero.description}</p>
            <span className="inline-block mt-4 text-sm font-medium text-blue-500">Learn more →</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
