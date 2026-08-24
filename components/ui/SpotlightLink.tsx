"use client";

import { type ReactNode, type AnchorHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SpotlightLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  href: string;
  className?: string;
}

export const SpotlightLink = forwardRef<HTMLAnchorElement, SpotlightLinkProps>(
  ({ children, href, className, onMouseMove, onMouseLeave, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        href={href}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          e.currentTarget.style.setProperty("--x", `${x}%`);
          e.currentTarget.style.setProperty("--y", `${y}%`);
          onMouseMove?.(e);
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.removeProperty("--x");
          e.currentTarget.style.removeProperty("--y");
          onMouseLeave?.(e);
        }}
        className={cn(
          "relative overflow-hidden inline-flex items-center justify-center",
          "[--x:50%] [--y:50%]",
          className
        )}
        {...props}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(139,92,246,0.18), transparent 70%)",
          }}
        />
        <span className="relative z-10">{children}</span>
      </Link>
    );
  }
);

SpotlightLink.displayName = "SpotlightLink";
