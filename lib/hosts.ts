export const hosts = {
  canonical: "www.banyanhomeco.com",
  apex: "banyanhomeco.com",
  vercelProduction: "banyan-home-co.vercel.app",
} as const;

export const siteOrigin = `https://${hosts.canonical}` as const;

export function absoluteUrl(path = "/") {
  if (!path || path === "/") {
    return siteOrigin;
  }

  return `${siteOrigin}${path.startsWith("/") ? path : `/${path}`}`;
}

export function isVercelAppHost(host: string | null | undefined) {
  const hostname = (host ?? "").split(":")[0].toLowerCase();
  return hostname.endsWith(".vercel.app");
}
