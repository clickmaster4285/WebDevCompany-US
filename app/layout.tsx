import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist } from "next/font/google";
import { siteConfig } from "@/lib/siteConfig";
import { GlobalSpotlight } from "@/components/GlobalSpotlight";
import { ErpPageEdits } from "@/components/cms/ErpPageEdits";
import { CmsNavProvider } from "@/components/cms/CmsNavContext";
import { getCmsSiteInfo, getEditedPageSlugs } from "@/lib/cms/client";
import { toFooterColumns, toHeaderNav } from "@/lib/cms/navigation";
import { safeColor } from "@/lib/cms/sanitize";
import {
  erpAntiFlickerCss,
  erpAntiFlickerScript,
} from "@/lib/cms/anti-flicker";
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

/** ERP design colors → CSS tokens. Site tokens change only with CMS_APPLY_THEME_COLORS=true. */
function erpThemeStyle(
  primary: string | undefined,
  secondary: string | undefined,
): React.CSSProperties | undefined {
  const vars: Record<string, string> = {};
  if (primary) vars["--erp-primary"] = primary;
  if (secondary) vars["--erp-secondary"] = secondary;
  if (primary && process.env.CMS_APPLY_THEME_COLORS === "true") {
    vars["--violet"] = primary;
    vars["--primary"] = primary;
    vars["--ring"] = primary;
  }
  return Object.keys(vars).length > 0
    ? (vars as React.CSSProperties)
    : undefined;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ERP CMS (optional): resolves to null / [] when unconfigured or
  // unreachable, in which case everything renders exactly as before.
  const [cmsSite, editedSlugs] = await Promise.all([
    getCmsSiteInfo(),
    getEditedPageSlugs(),
  ]);
  const cmsHeaderNav = toHeaderNav(cmsSite?.navigation?.header);
  const cmsFooterColumns = toFooterColumns(cmsSite?.navigation?.footer);
  const themeStyle = erpThemeStyle(
    safeColor(
      cmsSite?.design?.colors?.primary ?? cmsSite?.website?.primaryColor,
    ),
    safeColor(
      cmsSite?.design?.colors?.secondary ?? cmsSite?.website?.secondaryColor,
    ),
  );
  const antiFlicker =
    editedSlugs.length > 0 && process.env.CMS_ANTI_FLICKER !== "off";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
      style={themeStyle}
      // The anti-flicker <head> script may set data-erp-pending before hydration.
      suppressHydrationWarning
    >
      <head>
        <Script
          src="https://www.googletagmanager.com/gtm.js?id=GTM-5WXTD44P"
          strategy="beforeInteractive"
        />
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `}
        </Script>
        {antiFlicker && (
          <>
            <style dangerouslySetInnerHTML={{ __html: erpAntiFlickerCss }} />
            <script
              dangerouslySetInnerHTML={{
                __html: erpAntiFlickerScript(editedSlugs),
              }}
            />
          </>
        )}
      </head>
      <body
        className="min-h-full w-full flex flex-col"
        suppressHydrationWarning
      >
        {/* Must stay before {children}: see ErpPageEdits for why. Renders no DOM. */}
        <ErpPageEdits
          editedSlugs={editedSlugs}
          antiFlicker={process.env.CMS_ANTI_FLICKER !== "off"}
        />
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "x7vbb2jt0z");
          `}
        </Script>

        <GlobalSpotlight />
        <CmsNavProvider header={cmsHeaderNav} footer={cmsFooterColumns}>
          {children}
        </CmsNavProvider>
      </body>
    </html>
  );
}