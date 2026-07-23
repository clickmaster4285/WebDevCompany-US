import type { NextConfig } from "next";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net https://cdn.simpleicons.org https://upload.wikimedia.org;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https://cdn.jsdelivr.net https://cdn.simpleicons.org https://upload.wikimedia.org;
  font-src 'self' data:;
  media-src 'self' blob: data:;
  connect-src 'self' ws:;
  frame-ancestors 'none';
  form-action 'self';
  base-uri 'self';
`;

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.88.65'],
  experimental: {
    inlineCss: true,
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
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
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

export default nextConfig;
