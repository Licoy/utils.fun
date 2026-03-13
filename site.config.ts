import { siteSettings as defaultSiteSettings } from "./site.config.default";
import type { SiteSettings } from "./site.config.shared";

export type { SiteSettings } from "./site.config.shared";

export const siteSettings: SiteSettings =
  loadOptionalSiteSettings(process.env.NODE_ENV === "production" ? "prod" : "dev") ??
  defaultSiteSettings;

function loadOptionalSiteSettings(mode: "dev" | "prod") {
  try {
    return require(`./site.config.${mode}`).siteSettings as SiteSettings;
  } catch {
    return null;
  }
}
