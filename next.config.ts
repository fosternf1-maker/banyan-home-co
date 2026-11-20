import type { NextConfig } from "next";

/**
 * Static CSP, not a per-request nonce.
 *
 * Next.js only stamps a proxy-generated nonce onto its inline scripts while a
 * page is rendering dynamically. These routes are prerendered. Forcing them
 * dynamic so a nonce can be stamped — the same trade this file already
 * declines for the CORS header below — gives up that cache. 'unsafe-inline'
 * is what lets the Next bootstrap, the JSON-LD block, and the next/font
 * `<style>` tag run. It does not stop an injected inline script. Remote
 * scripts are still limited to this origin and plausible.io.
 *
 * Newsreader and Source Sans 3 come from `next/font/google`, which self-hosts
 * them under `/_next/static`, so `font-src` is `'self'` only.
 * `components/analytics.tsx` loads `https://plausible.io/js/script.outbound-links.js`
 * when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set, and that script posts back to
 * the same host, so both `script-src` and `connect-src` allow it. Nothing in
 * this repo loads Vercel Analytics or Speed Insights, so those hosts are not
 * listed. `connect-src 'self'` is the founding-list and trade server actions.
 * Hero root marks use style attributes, which a nonce cannot cover, so
 * `style-src` keeps `'unsafe-inline'` either way.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://plausible.io",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "connect-src 'self' https://plausible.io",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
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
