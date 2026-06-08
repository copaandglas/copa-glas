import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const securityHeaders = [
  // Prevent the site being embedded in iframes (clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // Prevent MIME type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Enforce HTTPS for 2 years, include subdomains
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Limit referrer info sent to third parties
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable unnecessary browser features
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  // Content Security Policy
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js requires unsafe-inline for hydration; unsafe-eval for dev
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
      // Inline styles (Framer Motion, Tailwind) + Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Google Fonts files
      "font-src 'self' https://fonts.gstatic.com",
      // Images: self, data URIs (SVG inline), and https for external OG/social
      "img-src 'self' data: blob: https:",
      // Video/audio: self-hosted only
      "media-src 'self'",
      // API calls: self only (Resend is server-side, never from browser)
      "connect-src 'self'",
      // No plugins
      "object-src 'none'",
      // No base tag overrides
      "base-uri 'self'",
      // Forms post to self only
      "form-action 'self'",
      // No embedding in other sites
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: isDev ? 0 : 31536000,
  },
  compress: true,
  headers: async () => {
    if (isDev) {
      return [
        {
          source: "/:path*",
          headers: [{ key: "Cache-Control", value: "no-store, must-revalidate" }],
        },
      ];
    }
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
