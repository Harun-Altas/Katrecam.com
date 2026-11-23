import { BUSINESS_INFO } from "../data/business";
import type { RouteRecord } from "../types/routing";
import { ALL_LOCALES, buildLocalePath } from "./slugLookup";
import { getAllIndexableRoutes } from "./routing";

export interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: "weekly" | "monthly";
  priority: string;
  alternates: { hreflang: string; href: string }[];
}

export function generateSitemapEntries(
  lastmodDate = new Date().toISOString().split("T")[0]
): SitemapEntry[] {
  const indexableRoutes: RouteRecord[] = getAllIndexableRoutes();

  const groupedByKey = new Map<string, RouteRecord[]>();
  for (const route of indexableRoutes) {
    const baseKey = `${route.kind}:${route.entityId}:${route.secondaryId ?? ""}`;
    const list = groupedByKey.get(baseKey) ?? [];
    list.push(route);
    groupedByKey.set(baseKey, list);
  }

  const entries: SitemapEntry[] = [];

  for (const locale of ALL_LOCALES) {
    const homePath = locale === "tr" ? "/" : buildLocalePath(locale, "");
    entries.push({
      loc: `${BUSINESS_INFO.baseUrl}${homePath}`,
      lastmod: lastmodDate,
      changefreq: "weekly",
      priority: locale === "tr" ? "1.0" : "0.8",
      alternates: ALL_LOCALES.map((altLocale) => ({
        hreflang: altLocale,
        href: `${BUSINESS_INFO.baseUrl}${
          altLocale === "tr" ? "/" : buildLocalePath(altLocale, "")
        }`,
      })),
    });
  }

  for (const route of indexableRoutes) {
    const baseKey = `${route.kind}:${route.entityId}:${route.secondaryId ?? ""}`;
    const siblings = groupedByKey.get(baseKey) ?? [route];

    const alternates = siblings
      .filter((s) => s.rolloutStatus === "active")
      .map((s) => ({
        hreflang: s.locale,
        href: `${BUSINESS_INFO.baseUrl}${s.path}`,
      }));

    entries.push({
      loc: `${BUSINESS_INFO.baseUrl}${route.path}`,
      lastmod: lastmodDate,
      changefreq: "weekly",
      priority: route.kind === "category" ? "0.9" : "0.7",
      alternates,
    });
  }

  return entries;
}

export function renderSitemapXml(
  lastmodDate = new Date().toISOString().split("T")[0]
): string {
  const entries = generateSitemapEntries(lastmodDate);

  const urlBlocks = entries
    .map((entry) => {
      const altTags = entry.alternates
        .map(
          (alt) =>
            `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`
        )
        .join("\n");

      return [
        "  <url>",
        `    <loc>${entry.loc}</loc>`,
        altTags,
        `    <lastmod>${entry.lastmod}</lastmod>`,
        `    <changefreq>${entry.changefreq}</changefreq>`,
        `    <priority>${entry.priority}</priority>`,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    urlBlocks,
    "</urlset>",
  ].join("\n");
}
