// components/ui/Section.tsx

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  background?: "default" | "--violet" | "violet" | "transparent";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  className?: string;
  id?: string;
}

export function Section({
  children,
  background = "default",
  padding = "md",
  className,
  id,
}: SectionProps) {
  const bgClasses = {
    default: "bg-surface-0",
    surface: "bg-surface-1/50 backdrop-blur-sm",
    violet: "bg-violet/10",
    transparent: "bg-transparent",
  };

  const paddingClasses = {
    none: "py-0",
    sm: "py-8 md:py-12",
    md: "py-12 md:py-16",
    lg: "py-16 md:py-24",
    xl: "py-20 md:py-32",
  };

  return (
    <section
      id={id}
      className={cn(
        "relative w-full",
        bgClasses[background],
        paddingClasses[padding],
        className
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}