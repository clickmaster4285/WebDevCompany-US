import Link from "next/link";
import type { RelatedLink } from "@/lib/related";

export function RelatedPages({
  heading,
  links,
}: {
  heading: string;
  links: RelatedLink[];
}) {
  if (!links.length) return null;

  return (
    <section className="layout-container px-4 py-14 sm:px-6 md:px-10">
      <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{heading}</h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block h-full rounded-2xl border border-white/10 bg-surface-1/40 p-5 transition hover:border-violet/40"
            >
              <span className="font-medium text-ink">{link.label}</span>
              {link.description ? (
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">
                  {link.description}
                </p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
