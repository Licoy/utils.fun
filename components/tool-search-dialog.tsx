"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { ToolIcon } from "@/components/tool-icon";
import { useRouteTransition } from "@/components/providers/route-transition-provider";
import { getDictionary } from "@/lib/i18n";
import { buildToolPath, type PathPrefix } from "@/lib/locale";
import type { Locale, Tool } from "@/lib/tools";
import { cn } from "@/lib/utils";

export function ToolSearchDialog({
  locale,
  pathPrefix,
  triggerClassName,
}: {
  locale: Locale;
  pathPrefix: PathPrefix;
  triggerClassName?: string;
}) {
  const dict = getDictionary(locale);
  const router = useRouter();
  const { start } = useRouteTransition();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setIsMac(/Mac|iPhone|iPad|iPod/.test(window.navigator.platform));
    });

    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const results = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    const base = !keyword
      ? dict.tools
      : dict.tools.filter((tool) => {
          const haystack = [
            tool.title[locale],
            tool.description[locale],
            ...tool.highlights[locale],
            dict.categories.find((category) => category.slug === tool.category)?.title[locale] ?? "",
            tool.slug,
          ]
            .join(" ")
            .toLowerCase();

          return haystack.includes(keyword);
        });

    return base.slice(0, 18);
  }, [dict.categories, dict.tools, locale, query]);

  function openTool(tool: Tool) {
    setOpen(false);
    setQuery("");
    start();
    router.push(buildToolPath(pathPrefix, tool.slug), { scroll: true });
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        aria-label={dict.searchTools}
        title={dict.searchShortcut}
        className={cn(
          "size-8 rounded-full p-0 sm:h-10 sm:w-auto sm:px-3",
          triggerClassName,
        )}
      >
        <Search className="size-3.5 sm:size-4" />
        <span className="hidden sm:inline">{dict.searchTools}</span>
        <span className="hidden md:inline-flex">
          <Kbd>{isMac ? "Cmd" : "Ctrl"} K</Kbd>
        </span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent showCloseButton={false} className="max-h-[85vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>{dict.searchDialogTitle}</DialogTitle>
          </DialogHeader>
          <div>
            <div className="space-y-4">
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={dict.searchPlaceholder}
                  className="pr-24 pl-9"
                  clearButtonClassName="right-11"
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && results[0]) {
                      event.preventDefault();
                      openTool(results[0]);
                    }
                  }}
                />
                <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
                  <Kbd>ESC</Kbd>
                </div>
              </div>
              <div className="space-y-3">
                <p className="px-1 text-sm text-muted-foreground">{dict.searchDialogHint}</p>
                {results.length ? (
                  <div className="max-h-[60vh] overflow-y-auto rounded-xl border overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <div className="grid gap-1 p-2">
                      {results.map((tool) => {
                        const category = dict.categories.find((item) => item.slug === tool.category);

                        return (
                          <button
                            key={tool.slug}
                            type="button"
                            className="flex w-full items-start gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-accent"
                            onClick={() => openTool(tool)}
                          >
                            <ToolIcon slug={tool.slug} className="mt-0.5 size-5 shrink-0" />
                            <div className="min-w-0 space-y-1">
                              <div className="text-sm font-medium">{tool.title[locale]}</div>
                              <div className="line-clamp-2 text-sm text-muted-foreground">
                                {`${category?.title[locale] ?? ""} · ${tool.description[locale]}`}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-4">{dict.searchEmpty}</CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
