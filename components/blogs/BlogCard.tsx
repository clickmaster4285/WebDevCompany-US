import Image from "next/image";
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
      <article className="overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-violet/30 hover:shadow-[0_28px_80px_rgba(124,92,255,0.12)]">

        {/* IMAGE */}

        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={blog.image || "/assets/blog-placeholder.jpg"}
            alt={blog.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-110"
            sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

          <span className="absolute left-5 top-5 rounded-full bg-violet px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-lg">
            {blog.category}
          </span>
        </div>

        {/* CONTENT */}

        <div className="p-6">

          <div className="flex items-center justify-between px-15">
            <span className="font-mono text-xs font-bold text-slate-300">
              #{String(blog.id).padStart(2, "0")}
            </span>

            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-sm transition group-hover:border-violet group-hover:bg-violet group-hover:text-white">
              ↗
            </span>
          </div>

          <h3 className="mt-5 line-clamp-2 text-[24px] font-black leading-tight tracking-[-0.04em] text-slate-950 transition group-hover:text-violet">
            {blog.title}
          </h3>

          <p className="mt-4 line-clamp-3 text-[15px] leading-7 text-slate-600">
            {blog.hero?.description || blog.excerpt}
          </p>

          <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5">
            <div>
              <p className="text-sm font-bold text-slate-950">
                {blog.author}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {blog.date}
              </p>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-bold text-slate-500">
              {blog.readTime}
            </span>
          </div>

        </div>

      </article>
    </Link>
  );
}