"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { FavoritesProvider } from "@/components/providers/favorites-provider";
import { BrowserChromeSync } from "@/components/providers/browser-chrome-sync";
import { RouteTransitionProvider } from "@/components/providers/route-transition-provider";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <FavoritesProvider>
        <RouteTransitionProvider>
          {children}
          <BrowserChromeSync />
        </RouteTransitionProvider>
      </FavoritesProvider>
    </NextThemesProvider>
  );
}
