import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { siteConfig } from "@/lib/siteConfig";
import "./globals.css";

// ── Font optimization ──────────────────────────────────────────────────────
// Geist is the ONLY font loaded. We import only the weights actually used
// in visible text (400 body, 700 headings). This saves ~30KB vs loading all.
// display: "swap" prevents FOIT — text appears immediately in fallback font,
// then swaps to Geist once loaded. No invisible text period.
// preload: true — Geist IS the LCP font (hero heading, body text).
// Preloading it ensures the browser discovers the font early, reducing
// the time text is invisible (FOIT) or shown in fallback (FOUT).
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

// ── Viewport config (separate from metadata per Next.js 15+) ───────────────
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - Web Development Company`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} - Web Development Company`,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.logo,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - Web Development Company`,
    description: siteConfig.description,
    images: [siteConfig.logo],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "Wj_h0JbVwyvoLp7jT7VzLlMN05Z8Ws7NDAkACJ10W-E",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full w-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
