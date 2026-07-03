import type { ReactNode } from "react";
import { Nav } from "@/components/studio/Nav";
import { Footer } from "@/components/studio/Footer";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";

export default function FAQsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Nav />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}