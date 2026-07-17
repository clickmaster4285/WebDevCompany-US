"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { IndustryPageData } from "@/data/tech-serv-industry";

interface CategoryOverviewProps {
  category: string;
  pages: [string, IndustryPageData][];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function CategoryOverview({ category, pages }: CategoryOverviewProps) {
  const categoryTitle = category
    .replace(/-/g, " ")
    .replace(/\w/g, (c) => c.toUpperCase());

  return (
    <main className="layout-container px-4 sm:px-6 lg:px-8 py-20">
      <motion.header
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {categoryTitle} Solutions
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our {categoryTitle.toLowerCase()} expertise across industries.
        </p>
      </motion.header>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {pages.map(([slugKey, page]) => (
          <motion.div key={slugKey} variants={cardVariants}>
            <Link href={`/serv-tech-industry/${slugKey}`} className="block h-full">
              <Card className="h-full bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all">
                <CardHeader className="pb-2">
                  <h3 className="text-xl font-semibold text-blue-600">{page.title}</h3>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {page.hero.description}
                  </p>
                  <motion.span
                    className="inline-block mt-4 text-sm font-medium text-blue-500"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    Learn more →
                  </motion.span>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}