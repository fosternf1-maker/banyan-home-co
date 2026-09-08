import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

/**
 * Vercel's CDN puts `Access-Control-Allow-Origin: *` on prerendered responses.
 * proxy.ts tried to delete it and could not — the header is added downstream of
 * the app, so there is nothing there to delete. Setting it explicitly here does
 * work, because Next's own headers() reaches the response.
 *
 * Scoped to the four HTML documents rather than `/:path*`. A blanket rule would
 * also cover /_next/static, where the permissive value is deliberate and is
 * what lets fonts and chunks load from a preview or CDN origin.
 */
const documentRoutes = ["/", "/trades", "/privacy", "/terms"];

const documentCors = {
  key: "Access-Control-Allow-Origin",
  value: "https://www.banyanhomeco.com",
};

const nextConfig: NextConfig = {
  async headers() {
    return [
      ...documentRoutes.map((source) => ({
        source,
        headers: [...securityHeaders, documentCors],
      })),
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/",
        has: [{ type: "host", value: "(?<host>.*)\\.vercel\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?<host>.*)\\.vercel\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
