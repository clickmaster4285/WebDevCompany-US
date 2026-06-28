import Link from "next/link";

type BlogCardProps = {
  blog: {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    image?: string;
    hero?: {
      badge?: string;
      title?: string;
      description?: string;
    };
    credibility?: string[];
  };
};

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={`/blogs/${blog.slug}`} className="group block h-full">
      <article className="relative flex h-full min-h-[315px] flex-col overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.045)] transition-all duration-300 hover:-translate-y-1.5 hover:border-violet/25 hover:shadow-[0_24px_70px_rgba(124,92,255,0.11)]">
        <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-violet/10 blur-3xl transition group-hover:bg-violet/20" />

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-violet">
              {blog.category}
            </p>
            <p className="mt-2 font-mono text-[11px] font-bold text-slate-300">
              / {String(blog.id).padStart(2, "0")}
            </p>
          </div>

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-sm font-black text-slate-500 transition group-hover:border-violet group-hover:bg-violet group-hover:text-white">
            ↗
          </span>
        </div>

        <div className="relative mt-7">
          <h3 className="text-[22px] font-black leading-[1.08] tracking-[-0.045em] text-slate-950 transition-colors group-hover:text-violet">
            {blog.title}
          </h3>

          <svg
            className="mt-4 h-3 w-28 text-slate-950/80 transition group-hover:text-violet"
            viewBox="0 0 160 18"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 11C31 4 68 5 94 8C119 11 137 12 157 5"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>

          <p className="mt-4 line-clamp-3 text-[14px] leading-6 text-slate-600">
            {blog.hero?.description || blog.excerpt}
          </p>
        </div>

        <div className="relative mt-auto pt-7">
          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <div>
              <p className="text-sm font-bold text-slate-950">
                {blog.author}
              </p>
              <p className="mt-1 text-xs text-slate-400">{blog.date}</p>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500">
              {blog.readTime}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}