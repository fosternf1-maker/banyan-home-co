import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { isVercelAppHost, siteOrigin } from "@/lib/hosts";

export default async function robots(): Promise<MetadataRoute.Robots> {
  if (isVercelAppHost((await headers()).get("host"))) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteOrigin}/sitemap.xml`,
    host: siteOrigin,
  };
}
