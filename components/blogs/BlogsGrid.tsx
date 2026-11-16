"use client";

import { useMemo, useState } from "react";
import { BlogCard } from "./BlogCard";
import { BlogsSearch } from "./BlogsSearch";

const BLOGS_PER_PAGE = 12;

export type BlogListItem = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image?: string;
  hero?: { badge?: string; title?: string; description?: string };
};

export function BlogsGrid({ posts }: { posts: BlogListItem[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((post) =>
      [post.title, post.excerpt, post.category, post.hero?.description]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(q)),
    );
  }, [posts, query]);

  const totalPages = Math.ceil(filtered.length / BLOGS_PER_PAGE);
  const page = Math.min(currentPage, Math.max(totalPages, 1));
  const startIndex = (page - 1) * BLOGS_PER_PAGE;
  const visibleBlogs = filtered.slice(startIndex, startIndex + BLOGS_PER_PAGE);

  return (
    <>
      <BlogsSearch
        value={query}
        onChange={(value) => {
          setQuery(value);
          setCurrentPage(1);
        }}
      />

      <section className="layout-container px-6 md:px-18 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-violet">
              Blog Library
            </p>

            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              Latest resources
            </h2>
          </div>

          <p className="text-sm text-slate-500">
            Showing <b>{visibleBlogs.length}</b> of <b>{filtered.length}</b> blogs
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visibleBlogs.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>

        {visibleBlogs.length === 0 && (
          <p className="mt-10 text-center text-slate-400">
            No articles match &ldquo;{query.trim()}&rdquo;.
          </p>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              const isActive = page === pageNumber;

              return (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`h-10 min-w-10 rounded-full px-4 text-sm font-semibold transition ${
                    isActive
                      ? "bg-violet text-white shadow-lg shadow-violet/20"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-violet hover:text-violet"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
