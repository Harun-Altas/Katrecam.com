import type { Locale } from "../types/catalog";
import type { RouteRecord } from "../types/routing";
import { SLUG_LOOKUP_DATA } from "./slugLookup";

export function normalizeSlug(rawSlug: string | string[]): string {
  const raw = Array.isArray(rawSlug) ? rawSlug.join("/") : rawSlug;
  return raw
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "")
    .replace(/\/+/g, "/");
}

export function getRouteByLocaleAndSlug(
  locale: Locale,
  slugInput: string | string[]
): RouteRecord | null {
  const normalized = normalizeSlug(slugInput);
  if (!normalized || normalized.includes("/")) {
    return null;
  }

  const record = SLUG_LOOKUP_DATA.lookup.get(`${locale}:${normalized}`);
  if (!record) {
    return null;
  }

  return record;
}

export function getAllIndexableRoutes(): RouteRecord[] {
  return SLUG_LOOKUP_DATA.allRecords.filter(
    (item) => item.rolloutStatus === "active"
  );
}
