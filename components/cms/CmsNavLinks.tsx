"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { NavLink } from "@/lib/cms/navigation";
import { useCmsNav } from "./CmsNavContext";

// ERP header/footer navigation (A1), rendered with the site's own Nav/Footer
// styles. Each renders nothing when the ERP has no menu (or is down), so the
// Nav and Footer look exactly as before.

function NavAnchor({
  link,
  className,
  onClick,
  children,
}: {
  link: NavLink;
  className: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const external = /^(https?:|mailto:|tel:)/i.test(link.href);
  const extra = link.target
    ? { target: link.target, rel: "noopener noreferrer" }
    : {};
  return external || link.href.startsWith("#") ? (
    <a href={link.href} className={className} onClick={onClick} {...extra}>
      {children}
    </a>
  ) : (
    <Link href={link.href} className={className} onClick={onClick} {...extra}>
      {children}
    </Link>
  );
}

// Same classes as the Nav's own "About" / "Contact" links.
const DESKTOP_LINK =
  "rounded-full px-4 py-2 font-semibold text-slate-700 transition-all duration-300 ease-out hover:bg-slate-100 hover:text-blue-600 hover:-translate-y-0.5 min-h-[44px] min-w-[44px] flex items-center justify-center gap-1 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background";

/** Extra top-level items for the desktop Nav (children open on hover/focus). */
export function CmsHeaderLinks() {
  const groups = useCmsNav().header;
  if (groups.length === 0) return null;

  return (
    <>
      {groups.map((group) =>
        group.items.length === 0 ? (
          <NavAnchor
            key={`${group.href}-${group.label}`}
            link={group}
            className={DESKTOP_LINK}
          >
            {group.label}
          </NavAnchor>
        ) : (
          <div key={`${group.href}-${group.label}`} className="group relative">
            <NavAnchor link={group} className={DESKTOP_LINK}>
              {group.label}
              <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
            </NavAnchor>
            <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <ul className="min-w-[220px] rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_20px_70px_rgba(15,23,42,0.14)]">
                {group.items.map((item) => (
                  <li key={`${item.href}-${item.label}`}>
                    <NavAnchor
                      link={item}
                      className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-blue-600"
                    >
                      {item.label}
                    </NavAnchor>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ),
      )}
    </>
  );
}

/** Extra items for the mobile menu (children flattened under their parent). */
export function CmsMobileLinks({ onNavigate }: { onNavigate: () => void }) {
  const groups = useCmsNav().header;
  if (groups.length === 0) return null;

  const links = groups.flatMap((group) =>
    group.href === "#" ? group.items : [group, ...group.items],
  );
  return (
    <>
      {links.map((link) => (
        <NavAnchor
          key={`${link.href}-${link.label}`}
          link={link}
          onClick={onNavigate}
          className="flex items-center justify-between rounded-2xl px-4 py-4 text-sm font-bold text-slate-700 transition-all duration-300 ease-out hover:bg-slate-50 hover:text-blue-600 hover:-translate-y-0.5 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
        >
          {link.label}
          <ArrowRight className="h-4 w-4" />
        </NavAnchor>
      ))}
    </>
  );
}

/** ERP footer columns, styled like the Footer's own columns. */
export function CmsFooterColumns() {
  const columns = useCmsNav().footer;
  if (columns.length === 0) return null;

  return (
    <div className="mt-12 grid grid-cols-2 gap-10 border-t border-white/8 pt-10 md:grid-cols-4">
      {columns.map((col) => (
        <div key={col.title}>
          <div className="text-xs uppercase tracking-widest text-ink-mute">
            {col.title}
          </div>
          <ul className="mt-5 space-y-3 text-sm text-ink-soft">
            {col.links.map((link) => (
              <li key={`${link.href}-${link.label}`} className="break-words">
                <NavAnchor
                  link={link}
                  className="transition-all duration-300 ease-out hover:text-blue-400"
                >
                  {link.label}
                </NavAnchor>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
