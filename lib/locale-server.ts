import { cookies, headers } from "next/headers";

import {
  LOCALE_COOKIE_NAME,
  matchPreferredLocale,
  normalizeLocale,
  REQUEST_LOCALE_HEADER,
} from "@/lib/locale";

export async function getPreferredLocale() {
  const headerStore = await headers();
  const cookieStore = await cookies();

  const requestLocale = headerStore.get(REQUEST_LOCALE_HEADER);

  if (requestLocale) {
    return normalizeLocale(requestLocale);
  }

  const cookieLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value;

  if (cookieLocale) {
    return normalizeLocale(cookieLocale);
  }

  return matchPreferredLocale(headerStore.get("accept-language"));
}
