import type { Metadata } from "next";

import { HomePage } from "@/app/pages/home-page";
import { getPreferredLocale } from "@/lib/locale-server";
import { getSiteConfig } from "@/lib/site.server";
import { buildAbsoluteUrl, buildDocumentTitle } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getPreferredLocale();
  const siteConfig = getSiteConfig();

  return {
    title: {
      absolute: buildDocumentTitle(
        siteConfig,
        locale === "en" ? "Home" : "首页",
      ),
    },
    alternates: {
      canonical: buildAbsoluteUrl(siteConfig, "/"),
      languages: {
        en: buildAbsoluteUrl(siteConfig, "/en"),
      },
    },
  };
}

export default async function LocalizedHomePage() {
  const locale = await getPreferredLocale();

  return <HomePage locale={locale} pathPrefix="" />;
}
