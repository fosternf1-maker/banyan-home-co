import type { MetadataRoute } from "next";
import { HURRICANE_UPDATED, hurricaneRoutes } from "@/lib/hurricane";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-07");
  const hurricaneModified = new Date(HURRICANE_UPDATED);

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...hurricaneRoutes().map((path) => ({
      url: `${site.url}${path}`,
      lastModified: hurricaneModified,
      changeFrequency: "monthly" as const,
      priority: path === "/hurricane" ? 0.8 : 0.6,
    })),
    {
      url: `${site.url}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${site.url}/trades`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${site.url}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
