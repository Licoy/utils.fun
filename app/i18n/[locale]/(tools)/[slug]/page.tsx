import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPage } from "@/app/pages/tool-page";
import { buildLocalizedToolPath, getPathPrefix, getRoutableLocales, isRoutableLocale } from "@/lib/locale";
import { buildAbsoluteUrl, buildLanguageAlternateUrls } from "@/lib/site";
import { getSiteConfig } from "@/lib/site.server";
import { getTool, tools } from "@/lib/tools";

export function generateStaticParams() {
  return getRoutableLocales().flatMap((locale) =>
    tools.map((tool) => ({ locale, slug: tool.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isRoutableLocale(locale)) {
    return {};
  }

  const tool = getTool(slug);
  const siteConfig = getSiteConfig();

  if (!tool) {
    return {};
  }

  return {
    title: tool.title[locale],
    description: tool.description[locale],
    alternates: {
      canonical: buildAbsoluteUrl(siteConfig, buildLocalizedToolPath(locale, tool.slug)),
      languages: buildLanguageAlternateUrls(siteConfig, `/${tool.slug}`),
    },
  };
}

export default async function SeoLocaleToolPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isRoutableLocale(locale)) {
    notFound();
  }

  const tool = getTool(slug);

  if (!tool) {
    notFound();
  }

  return <ToolPage locale={locale} pathPrefix={getPathPrefix(locale)} slug={slug} />;
}
