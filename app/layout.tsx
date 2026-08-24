import type { Metadata, Viewport } from "next";
import Script from "next/script"; // <-- Added this import
import { Geist } from "next/font/google";
import { siteConfig } from "@/lib/siteConfig";
import { GlobalSpotlight } from "@/components/GlobalSpotlight";
import "./globals.css";

// ── Font optimization ──────────────────────────────────────────────────────
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
      <body 
        className="min-h-full w-full flex flex-col"
        suppressHydrationWarning
      >
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NGB935HHG7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NGB935HHG7');
          `}
        </Script>

        <GlobalSpotlight />
        {children}
      </body>
    </html>
  );
}