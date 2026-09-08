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
 * `Access-Control-Allow-Origin: *` on the HTML documents cannot be changed from
 * here. Two approaches were tried against production and both failed:
 *
 *   1. proxy.ts calling headers.delete() — the header is added downstream of
 *      the app, so there is nothing present to delete.
 *   2. Setting it explicitly in this headers() block — the other headers in
 *      `securityHeaders` do reach the response from here, so headers() runs;
 *      Vercel's CDN simply wins for this particular header on prerendered
 *      responses.
 *
 * The remaining lever is making the routes dynamic, which trades away static
 * prerendering for every visitor to tidy one header on a public brochure whose
 * content is already public. Not worth it. Left as-is deliberately; if it ever
 * needs to change it is a Vercel support question, not an app change.
 */

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/",
        headers: securityHeaders,
      },
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
