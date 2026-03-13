import { locales, type Locale } from "@/lib/i18n/config";
import { arCategoryContent, arToolContent } from "@/lib/tools/content/ar";
import { cnCategoryContent, cnToolContent } from "@/lib/tools/content/cn";
import { deCategoryContent, deToolContent } from "@/lib/tools/content/de";
import { enCategoryContent, enToolContent } from "@/lib/tools/content/en";
import { esCategoryContent, esToolContent } from "@/lib/tools/content/es";
import { jaCategoryContent, jaToolContent } from "@/lib/tools/content/ja";
import { koCategoryContent, koToolContent } from "@/lib/tools/content/ko";
import { ruCategoryContent, ruToolContent } from "@/lib/tools/content/ru";
import { twCategoryContent, twToolContent } from "@/lib/tools/content/tw";
import {
  categoryRegistry,
  toolRegistry,
  type CategorySlug,
  type ToolSlug,
} from "@/lib/tools/registry";
import type { CategoryContentMap, ToolContentMap } from "@/lib/tools/content-types";

export type { Locale } from "@/lib/i18n/config";
export type { CategorySlug, ToolSlug } from "@/lib/tools/registry";

export type Category = {
  slug: CategorySlug;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
};

export type Tool = {
  slug: ToolSlug;
  category: CategorySlug;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  highlights: Record<Locale, string[]>;
};

const categoryContentByLocale: Record<Locale, CategoryContentMap> = {
  cn: cnCategoryContent,
  en: enCategoryContent,
  es: esCategoryContent,
  ja: jaCategoryContent,
  ko: koCategoryContent,
  ru: ruCategoryContent,
  de: deCategoryContent,
  tw: twCategoryContent,
  ar: arCategoryContent,
};

const toolContentByLocale: Record<Locale, ToolContentMap> = {
  cn: cnToolContent,
  en: enToolContent,
  es: esToolContent,
  ja: jaToolContent,
  ko: koToolContent,
  ru: ruToolContent,
  de: deToolContent,
  tw: twToolContent,
  ar: arToolContent,
};

function localizedValue<T>(pick: (locale: Locale) => T): Record<Locale, T> {
  return Object.fromEntries(
    locales.map((locale) => [locale, pick(locale)]),
  ) as Record<Locale, T>;
}

export const categories: Category[] = categoryRegistry.map((category) => ({
  slug: category.slug,
  title: localizedValue((locale) => categoryContentByLocale[locale][category.slug].title),
  description: localizedValue((locale) => categoryContentByLocale[locale][category.slug].description),
}));

export const tools: Tool[] = toolRegistry.map((tool) => ({
  slug: tool.slug,
  category: tool.category,
  title: localizedValue((locale) => toolContentByLocale[locale][tool.slug].title),
  description: localizedValue((locale) => toolContentByLocale[locale][tool.slug].description),
  highlights: localizedValue((locale) => toolContentByLocale[locale][tool.slug].highlights),
}));

export const toolMap = new Map<ToolSlug, Tool>(tools.map((tool) => [tool.slug, tool]));

export function getTool(slug: string) {
  return toolMap.get(slug as ToolSlug);
}

export function getToolsByCategory(category: CategorySlug) {
  return tools.filter((tool) => tool.category === category);
}
