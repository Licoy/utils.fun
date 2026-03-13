"use client";

import { Icon } from "@iconify/react";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  getLocaleFromPath,
  getLocaleFlagIcon,
  getLocaleLabel,
  persistLocaleCookie,
  stripLocalePrefix,
} from "@/lib/locale";
import { locales } from "@/lib/i18n";
import type { Locale } from "@/lib/tools";
import { cn } from "@/lib/utils";

export function LocaleToggle({
  locale,
  pathname,
  label,
  triggerClassName,
}: {
  locale: Locale;
  pathname: string;
  label: string;
  triggerClassName?: string;
}) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const items = locales.map((item) => ({
    key: item,
    label: getLocaleLabel(item),
    icon: getLocaleFlagIcon(item),
  }));
  const current = items.find((item) => item.key === locale) ?? items[0];
  const trigger = (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={label}
      className={cn("size-8 sm:size-10", triggerClassName)}
    >
      <Icon icon={current.icon} className="size-4 sm:size-5" />
    </Button>
  );

  if (!mounted) {
    return trigger;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {items.map((item) => (
          <DropdownMenuItem
            key={item.key}
            className="flex items-center justify-between gap-3"
            onClick={() => {
              const nextLocale = item.key;
              const normalizedPathname = stripLocalePrefix(pathname);
              const isSeoPath = Boolean(getLocaleFromPath(pathname));

              persistLocaleCookie(nextLocale);

              if (isSeoPath) {
                router.replace(normalizedPathname);
                return;
              }

              router.refresh();
            }}
          >
            <span className="flex items-center gap-2">
              <Icon icon={item.icon} className="size-5" />
              <span>{item.label}</span>
            </span>
            {locale === item.key ? <Check className="size-4" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
