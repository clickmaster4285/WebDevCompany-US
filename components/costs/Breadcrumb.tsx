// components/Breadcrumb.tsx
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ChevronRight, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

function generateBreadcrumbs(pathname: string) {
  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs = [];
  
  breadcrumbs.push({
    label: 'Home',
    href: '/',
    icon: Home,
  });
  
  let currentPath = '';
  for (const segment of paths) {
    currentPath += `/${segment}`;
    const label = segment
      .replace(/-/g, ' ')
      .replace(/(^\w|\s\w)/g, (char) => char.toUpperCase());
    const isLast = currentPath === pathname;
    
    breadcrumbs.push({
      label,
      href: currentPath,
      icon: isLast ? FileText : undefined,
      isLast,
    });
  }
  
  return breadcrumbs;
}

export function Breadcrumb() {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <nav className="flex items-center gap-2 overflow-x-auto scrollbar-hide" aria-label="Breadcrumb">
      {breadcrumbs.map((item, index) => (
        <div key={item.href} className="flex items-center gap-2 whitespace-nowrap">
          {index > 0 && (
            <ChevronRight className="h-4 w-4 text-ink-mute flex-shrink-0" />
          )}
          
          {item.isLast ? (
            <span className="flex items-center gap-1.5 text-ink font-medium">
              {item.icon && <item.icon className="h-4 w-4" />}
              <span>{item.label}</span>
            </span>
          ) : (
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-1.5 text-ink-mute hover:text-violet transition-colors duration-200",
                index === 0 && "hover:text-violet"
              )}
            >
              {item.icon && <item.icon className="h-4 w-4" />}
              <span>{item.label}</span>
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}