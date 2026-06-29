// components/services/ServiceBreadcrumb.tsx

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface ServiceBreadcrumbProps {
  items: BreadcrumbItem[];
}

export function ServiceBreadcrumb({ items }: ServiceBreadcrumbProps) {
  return (
    <nav
      className="border-b border-border/60 bg-muted/30"
      aria-label="Breadcrumb"
    >
      <div className="container mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-1 text-sm">
          <li>
            <Link
              href="/"
              className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
            >
              <Home className="h-3.5 w-3.5" />
              <span className="sr-only">Home</span>
            </Link>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center">
                <ChevronRight className="mx-1 h-3.5 w-3.5 text-muted-foreground/60" aria-hidden="true" />
                {isLast ? (
                  <span className="font-medium text-foreground" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}