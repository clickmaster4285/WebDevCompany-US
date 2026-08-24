"use client";

import { type ReactNode, type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SpotlightButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const SpotlightButton = forwardRef<HTMLButtonElement, SpotlightButtonProps>(
  ({ children, className, onMouseMove, onMouseLeave, ...props }, ref) => {
    return (
      <button
        ref={ref}
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
          "relative overflow-hidden",
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
      </button>
    );
  }
);

SpotlightButton.displayName = "SpotlightButton";
