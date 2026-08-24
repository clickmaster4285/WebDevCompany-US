"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import Image from "next/image";

// ❌ Removed: import footerImg from "@/public/assets/footer.png";

export function Footer() {
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/8 bg-surface-1 py-16">
      {/* 👇 Updated width to match navbar (97vw on mobile, 90vw on md+) */}
      <div className="layout-container px-6 md:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
        <Link href="/" className="flex items-center gap-3 text-ink">
  <div className="shrink-0">
    {/* 👇 Logo image from /public folder */}
    <Image
      src="/logo.webp" // ⚠️ Use a light/white version: /logo-light.webp or /logo-white.webp
      alt="ClickMasters Logo"
      width={256}
      height={51}
      className="h-12 w-auto object-contain brightness-0 invert"
      priority
    />
  </div>
</Link>

            <p className="mt-6 max-w-xs text-sm text-ink-mute">
              A premium web development studio crafting cinematic digital
              products.
            </p>

            {/* Social/Trust Badge */}
            <div className="mt-6 flex items-center gap-2 text-xs text-ink-mute">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-violet" />
              Currently accepting two new projects
            </div>
          </div>

          {/* Company Column */}
          <div>
            <div className="text-xs uppercase tracking-widest text-ink-mute">
              Company
            </div>
            <ul className="mt-5 space-y-3 text-sm text-ink-soft">
              <li>
                <Link href="/" className="transition-all duration-300 ease-out hover:text-blue-400 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-all duration-300 ease-out hover:text-blue-400 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-all duration-300 ease-out hover:text-blue-400 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="transition-all duration-300 ease-out hover:text-blue-400 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background">
                  Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <div className="text-xs uppercase tracking-widest text-ink-mute">
              Services
            </div>
            <ul className="mt-5 space-y-3 text-sm text-ink-soft">
              <li>
                <Link href="/web-development-services" className="transition-all duration-300 ease-out hover:text-blue-400 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/web-design-services" className="transition-all duration-300 ease-out hover:text-blue-400 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background">
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link href="/web-application-development" className="transition-all duration-300 ease-out hover:text-blue-400 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background">
                  Web Applications
                </Link>
              </li>
              <li>
                <Link href="/ecommerce-development" className="transition-all duration-300 ease-out hover:text-blue-400 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background">
                  eCommerce Development
                </Link>
              </li>
              <li>
                <Link href="/saas-development" className="transition-all duration-300 ease-out hover:text-blue-400 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background">
                  SaaS Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries Column */}
          <div>
            <div className="text-xs uppercase tracking-widest text-ink-mute">
              Industries
            </div>
            <ul className="mt-5 space-y-3 text-sm text-ink-soft">
              <li>
                <Link href="/industries/healthcare-web-development" className="transition-all duration-300 ease-out hover:text-blue-400 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background">
                  Healthcare
                </Link>
              </li>
              <li>
                <Link href="/industries/fintech-web-development" className="transition-all duration-300 ease-out hover:text-blue-400 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background">
                  Fintech
                </Link>
              </li>
              <li>
                <Link href="/industries/ecommerce-web-development" className="transition-all duration-300 ease-out hover:text-blue-400 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background">
                  eCommerce & Retail
                </Link>
              </li>
              <li>
                <Link href="/industries/saas-web-development" className="transition-all duration-300 ease-out hover:text-blue-400 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background">
                  SaaS & Tech
                </Link>
              </li>
              <li>
                <Link href="/industries/real-estate-web-development" className="transition-all duration-300 ease-out hover:text-blue-400 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background">
                  Real Estate
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Technologies Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-xs uppercase tracking-widest text-ink-mute">
              Resources
            </div>

            <ul className="mt-5 space-y-3 text-sm text-ink-soft">
              <li>
                <Link
                  href="/case-studies"
                  className="transition-all duration-300 ease-out hover:text-blue-400 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
                >
                  Case Studies
                </Link>
              </li>

              <li>
                <Link
                  href="/blogs"
                  className="transition-all duration-300 ease-out hover:text-blue-400 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
                >
                  Blog
                </Link>
              </li>

              <li>
                <Link
                  href="/compare"
                  className="transition-all duration-300 ease-out hover:text-blue-400 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
                >
                  Comparisons
                </Link>
              </li>

              <li>
                <Link
                  href="/faqs"
                  className="transition-all duration-300 ease-out hover:text-blue-400 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
                >
                  FAQs
                </Link>
              </li>

              <li>
                <Link
                  href="/testimonials"
                  className="transition-all duration-300 ease-out hover:text-blue-400 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
                >
                  Testimonials
                </Link>
              </li>
            </ul>

            {/* Technologies Sub-section */}
            <div className="mt-6 text-xs uppercase tracking-widest text-ink-mute">
              Technologies
            </div>

            <ul className="mt-3 space-y-3 text-sm text-ink-soft">
              <li>
                <Link
                  href="/technologies"
                  className="transition-all duration-300 ease-out hover:text-blue-400 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
                >
                  Our Tech Stack
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Scroll to Top Button */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-8 text-xs text-ink-mute">
          <div>
            © {new Date().getFullYear()} ClickMasters Digital Marketing Agency
          </div>

          <div className="flex items-center gap-4">
            {/* Social/Trust Badge */}
            <span className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-violet" />
              Available for projects
            </span>

            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-ink-soft transition-all duration-300 ease-out hover:bg-blue-600 hover:text-white hover:scale-105 hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-blue-200" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}