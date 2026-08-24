"use client";

import { useEffect } from "react";

export function GlobalSpotlight() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const button =
        target.closest("button, [role='button']") as HTMLElement | null;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      button.style.setProperty("--x", `${x}%`);
      button.style.setProperty("--y", `${y}%`);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const button =
        target.closest("button, [role='button']") as HTMLElement | null;
      if (!button) return;

      button.style.removeProperty("--x");
      button.style.removeProperty("--y");
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return null;
}
