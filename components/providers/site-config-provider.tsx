"use client";

import { createContext, useContext } from "react";

import type { SiteConfig } from "@/lib/site";

const SiteConfigContext = createContext<SiteConfig | null>(null);

export function SiteConfigProvider({
  value,
  children,
}: {
  value: SiteConfig;
  children: React.ReactNode;
}) {
  return (
    <SiteConfigContext.Provider value={value}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const value = useContext(SiteConfigContext);

  if (!value) {
    throw new Error("SiteConfigProvider is missing.");
  }

  return value;
}
