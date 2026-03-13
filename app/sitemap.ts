import type { MetadataRoute } from "next";

import { tools } from "@/lib/tools";
import { getSiteConfig } from "@/lib/site.server";
import { buildAbsoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteConfig = getSiteConfig();

  return [
    {
      url: buildAbsoluteUrl(siteConfig, "/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: buildAbsoluteUrl(siteConfig, "/en"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...tools.flatMap((tool) => [
      {
        url: buildAbsoluteUrl(siteConfig, `/${tool.slug}`),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
      {
        url: buildAbsoluteUrl(siteConfig, `/en/${tool.slug}`),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
    ]),
  ];
}
