import type { CategorySlug, ToolSlug } from "@/lib/tools/registry";

export type CategoryContent = {
  title: string;
  description: string;
};

export type ToolContent = {
  title: string;
  description: string;
  highlights: string[];
};

export type CategoryContentMap = Record<CategorySlug, CategoryContent>;
export type ToolContentMap = Record<ToolSlug, ToolContent>;
