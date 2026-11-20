import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

// ERP CMS: created pages may use images/videos from any https host and
// YouTube/Vimeo embeds; their forms may post to the ERP. CMS_EDITOR_ORIGIN
// (e.g. https://erp.clickmasters.pk) lets the ERP's "Live page" preview frame
// the site; without it framing stays blocked exactly as before.
function originOf(value: string | undefined): string {
  try {
    return value ? new URL(value).origin : "";
  } catch {
    return "";
  }
}
const cmsApiOrigin = originOf(process.env.CMS_API_URL);
const cmsEditorOrigin = originOf(process.env.CMS_EDITOR_ORIGIN);

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net https://cdn.simpleicons.org https://upload.wikimedia.org https://www.googletagmanager.com https://*.google-analytics.com https://www.clarity.ms https://*.clarity.ms;
  style-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
  img-src 'self' data: blob: https:;
  font-src 'self' data:;
  media-src 'self' blob: data: https:;
  frame-src 'self' https://www.googletagmanager.com https://www.youtube-nocookie.com https://www.youtube.com https://player.vimeo.com;
  connect-src 'self' ws: https://crm.clickmasters.pk https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.clarity.ms https://c.bing.com;
  frame-ancestors ${cmsEditorOrigin ? `'self' ${cmsEditorOrigin}` : "'none'"};
  form-action 'self'${cmsApiOrigin ? ` ${cmsApiOrigin}` : ""};
  base-uri 'self';
`;

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.88.65'],
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/webp"],
    qualities: [60, 75],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return [
      {
        // Legacy service URLs only. A dot means a file in public/services,
        // which must not be redirected into the page catch-all.
        source: "/services/:slug([^.]*)",
        destination: "/:slug",
        statusCode: 301,
      },
      {
        source: "/serv-tech-industry/:path*",
        destination: "/:path*",
        statusCode: 301,
      },
      {
        source: "/chat",
        destination: "/contact",
        statusCode: 301,
      },
      {
        source: "/book-call",
        destination: "/contact",
        statusCode: 301,
      },
      {
        source: "/blog",
        destination: "/blogs",
        statusCode: 301,
      },
      {
        // Published with a typo ("comapny") under /blog/. The article lives
        // with the rest of the blog, at the corrected slug.
        source: "/blog/web-development-comapny",
        destination: "/blogs/web-development-company",
        statusCode: 301,
      },
      {
        source: "/blogs/web-development-comapny",
        destination: "/blogs/web-development-company",
        statusCode: 301,
      },
      {
        source: "/web-development-comapny",
        destination: "/blogs/web-development-company",
        statusCode: 301,
      },
      {
        // CMS drafts were created under /blog/. Every other article is /blogs/.
        source: "/blog/:path*",
        destination: "/blogs/:path*",
        statusCode: 301,
      },
      {
        source: "/conversion-rate-optimization",
        destination: "/website-speed-optimization",
        statusCode: 301,
      },
      {
        source: "/web-design-ui-ux",
        destination: "/web-design-services",
        statusCode: 301,
      },
      {
        source: "/website-migration-services",
        destination: "/website-redesign-services",
        statusCode: 301,
      },
      {
        source: "/submit-testimonial",
        destination: "/testimonials",
        statusCode: 301,
      },
    ];
  },
  turbopack: {
    rules: {
      '*.mp4': {
        type: 'asset',
      },
      '*.png': {
        type: 'asset',
      },
      '*.jpg': {
        type: 'asset',
      },
      '*.jpeg': {
        type: 'asset',
      },
    },
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ' ').trim(),
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Superseded by CSP frame-ancestors when the ERP editor may frame the site.
          ...(cmsEditorOrigin
            ? []
            : [{ key: 'X-Frame-Options', value: 'DENY' }]),
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      // Cache CSS aggressively
      {
        source: '/_next/static/css/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);