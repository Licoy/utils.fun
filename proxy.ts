import { NextResponse, type NextRequest } from "next/server";

import {
  getLocaleFromPath,
  getRoutableLocales,
  isRoutableLocale,
  LOCALE_COOKIE_NAME,
  matchPreferredLocale,
  REQUEST_LOCALE_HEADER,
} from "@/lib/locale";

const routableLocalePattern = new RegExp(
  `^/(${getRoutableLocales().join("|")})(?=/|$)`,
);
const internalLocalePattern = new RegExp(
  `^/i18n/(${getRoutableLocales().join("|")})(?=/|$)`,
);

function getRequestLocale(request: NextRequest) {
  const pathnameLocale = getLocaleFromPath(request.nextUrl.pathname);

  if (pathnameLocale) {
    return pathnameLocale;
  }

  const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;

  if (cookieLocale) {
    return matchPreferredLocale(cookieLocale);
  }

  return matchPreferredLocale(request.headers.get("accept-language"));
}

function withLocaleHeader(request: NextRequest, locale: string) {
  const headers = new Headers(request.headers);
  headers.set(REQUEST_LOCALE_HEADER, locale);
  return headers;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const internalMatch = pathname.match(internalLocalePattern);

  if (internalMatch) {
    const locale = internalMatch[1];
    const rest = pathname.replace(new RegExp(`^/i18n/${locale}`), "") || "/";
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${rest === "/" ? "" : rest}`;
    return NextResponse.redirect(url, 308);
  }

  const requestLocale = getRequestLocale(request);

  const match = pathname.match(routableLocalePattern);

  if (match) {
    const locale = match[1];

    if (isRoutableLocale(locale)) {
      const rest = pathname.replace(new RegExp(`^/${locale}`), "");
      const url = request.nextUrl.clone();
      url.pathname = `/i18n/${locale}${rest}`;

      const response = NextResponse.rewrite(url, {
        request: {
          headers: withLocaleHeader(request, locale),
        },
      });

      response.cookies.set(LOCALE_COOKIE_NAME, locale, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });

      return response;
    }
  }

  return NextResponse.next({
    request: {
      headers: withLocaleHeader(request, requestLocale),
    },
  });
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)"],
};
