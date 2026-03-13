"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Star } from "lucide-react";

import { useFavorites } from "@/components/providers/favorites-provider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CategoryIcon, ToolIcon } from "@/components/tool-icon";
import { getDictionary } from "@/lib/i18n";
import { buildToolPath, stripLocalePrefix, type PathPrefix } from "@/lib/locale";
import { type Locale, type ToolSlug } from "@/lib/tools";
import { cn } from "@/lib/utils";

export function ToolSidebar({
  locale,
  pathPrefix,
  currentSlug,
  variant = "docs",
  className,
}: {
  locale: Locale;
  pathPrefix: PathPrefix;
  currentSlug?: ToolSlug;
  variant?: "docs" | "plain";
  className?: string;
}) {
  const dict = getDictionary(locale);
  const { favorites, hydrated } = useFavorites();
  const pathname = usePathname() ?? "";
  const derivedSlug = stripLocalePrefix(pathname).split("/").filter(Boolean)[0];
  const activeSlug = (currentSlug ?? derivedSlug) as ToolSlug | undefined;
  const favoriteItems = favorites
    .map((slug) => dict.tools.find((tool) => tool.slug === slug))
    .filter((tool): tool is (typeof dict.tools)[number] => Boolean(tool));

  const content = (
    <div className="grid gap-6 pr-3">
      {hydrated ? (
        <section className="grid gap-2.5">
          <div className="flex items-center gap-2 px-2 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground/90 uppercase">
            <Star className="size-4 shrink-0" />
            <span>{dict.myFavorites}</span>
          </div>
          {favoriteItems.length ? (
            <div className="ml-4 grid gap-1 border-l border-border/60 pl-3">
              {favoriteItems.map((tool) => (
                <Link
                  key={tool.slug}
                  href={buildToolPath(pathPrefix, tool.slug)}
                  scroll
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground",
                    tool.slug === activeSlug && "bg-muted/80 font-medium text-foreground",
                  )}
                >
                  <ToolIcon slug={tool.slug} className="shrink-0" />
                  <span className="leading-5">{tool.title[locale]}</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border/60 px-3 py-3 text-sm text-muted-foreground">
              {dict.favoriteEmpty}
            </div>
          )}
        </section>
      ) : null}
      <div className="px-2 text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
        {dict.categoryNavTitle}
      </div>
      {dict.categories.map((category) => {
        const items = dict.tools.filter((tool) => tool.category === category.slug);

        return (
          <section key={category.slug} className="grid gap-2.5">
            <div className="flex items-center gap-2 px-2 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground/90 uppercase">
              <CategoryIcon slug={category.slug} className="size-4 shrink-0" />
              <span>{category.title[locale]}</span>
            </div>
            <div className="ml-4 grid gap-1 border-l border-border/60 pl-3">
              {items.map((tool) => (
                <Link
                  key={tool.slug}
                  href={buildToolPath(pathPrefix, tool.slug)}
                  scroll
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground",
                    tool.slug === activeSlug && "bg-muted/80 font-medium text-foreground",
                  )}
                >
                  <ToolIcon slug={tool.slug} className="shrink-0" />
                  <span className="leading-5">{tool.title[locale]}</span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );

  if (variant === "docs") {
    return (
      <div className={cn("h-full", className)}>
        <div className="h-full overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("h-full", className)}>
      <ScrollArea className="h-full">
        {content}
      </ScrollArea>
    </div>
  );
}
