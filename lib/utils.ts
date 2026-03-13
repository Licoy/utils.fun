import { getLocaleNumberFormat } from "@/lib/locale";
import type { Locale } from "@/lib/tools";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCount(count: number, locale: string) {
  return new Intl.NumberFormat(getLocaleNumberFormat(locale as Locale)).format(count);
}
