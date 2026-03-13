import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPage } from "@/app/pages/tool-page";
import { getPreferredLocale } from "@/lib/locale-server";
import { buildLocalizedToolPath } from "@/lib/locale";
import { buildAbsoluteUrl, buildLanguageAlternateUrls } from "@/lib/site";
import { getSiteConfig } from "@/lib/site.server";
import { getTool, tools } from "@/lib/tools";

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const locale = await getPreferredLocale();
  const { slug } = await params;
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

export default async function ToolRoutePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const locale = await getPreferredLocale();
  const { slug } = await params;
  const tool = getTool(slug);

  if (!tool) {
    notFound();
  }

  return <ToolPage locale={locale} pathPrefix="" slug={slug} />;
}
