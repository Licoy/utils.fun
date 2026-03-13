import type { MetadataRoute } from "next";

import { getSiteConfig } from "@/lib/site.server";

export default function robots(): MetadataRoute.Robots {
  const siteConfig = getSiteConfig();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
