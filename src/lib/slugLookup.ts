import { BRANDS } from "../data/brands";
import { CATEGORIES, PRODUCTS } from "../data/catalog";
import { REGIONS } from "../data/regions";
import type { Locale, RolloutStatus } from "../types/catalog";
import type { RouteRecord, SlugCollision } from "../types/routing";

export const ALL_LOCALES: Locale[] = ["tr", "en", "ru", "de"];
export const DEFAULT_LOCALE: Locale = "tr";

export interface SlugLookupResult {
  lookup: Map<string, RouteRecord>;
  collisions: SlugCollision[];
  allRecords: RouteRecord[];
}

export function buildLocalePath(locale: Locale, slug: string): string {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, "");
  if (locale === "tr") {
    return `/${cleanSlug}`;
  }
  return `/${locale}/${cleanSlug}`;
}

export function buildSlugLookup(): SlugLookupResult {
  const lookup = new Map<string, RouteRecord>();
  const collisions: SlugCollision[] = [];
  const allRecords: RouteRecord[] = [];

  const registerRecord = (record: RouteRecord) => {
    const mapKey = `${record.locale}:${record.slug}`;
    allRecords.push(record);

    const existing = lookup.get(mapKey);
    if (existing) {
      collisions.push({
        locale: record.locale,
        slug: record.slug,
        existingKey: existing.key,
        conflictingKey: record.key,
      });
      return;
    }

    lookup.set(mapKey, record);
  };

  for (const locale of ALL_LOCALES) {
    for (const category of CATEGORIES) {
      const slug = category.slug[locale];
      const titleText = category.title[locale];
      const descText = category.shortDescription[locale];
      const status: RolloutStatus = category.rolloutStatus;

      registerRecord({
        key: `category:${category.id}:${locale}`,
        locale,
        slug,
        path: buildLocalePath(locale, slug),
        kind: "category",
        rolloutStatus: status,
        title: `${titleText} | Katre Cam Bodrum`,
        description: descText,
        h1: titleText,
        entityId: category.id,
      });
    }

    for (const product of PRODUCTS) {
      const slug = product.slug[locale];
      const titleText = product.title[locale];
      const descText = product.shortDescription[locale];
      const status: RolloutStatus = product.rolloutStatus;

      registerRecord({
        key: `product:${product.id}:${locale}`,
        locale,
        slug,
        path: buildLocalePath(locale, slug),
        kind: "product",
        rolloutStatus: status,
        title: `${titleText} | Katre Cam Bodrum`,
        description: descText,
        h1: titleText,
        entityId: product.id,
        secondaryId: product.categoryId,
      });
    }

    for (const brand of BRANDS) {
      const slug = brand.slug;
      const status: RolloutStatus = brand.rolloutStatus;

      registerRecord({
        key: `brand:${brand.id}:${locale}`,
        locale,
        slug,
        path: buildLocalePath(locale, slug),
        kind: "brand",
        rolloutStatus: status,
        title: `${brand.name} Bodrum Sistemleri | Katre Cam`,
        description: brand.shortDescription[locale],
        h1: `${brand.name} — Bodrum Uygulama & Keşif`,
        entityId: brand.id,
      });
    }

    for (const region of REGIONS) {
      const slug = region.slug;
      const status: RolloutStatus = region.rolloutStatus;

      registerRecord({
        key: `region:${region.id}:${locale}`,
        locale,
        slug,
        path: buildLocalePath(locale, slug),
        kind: "region",
        rolloutStatus: status,
        title: `${region.name} Cam Balkon, Pergole & Doğrama | Katre Cam`,
        description: region.shortDescription[locale],
        h1: `${region.name} — Cam & Doğrama Sistemleri`,
        entityId: region.id,
      });
    }

    for (const brand of BRANDS) {
      for (const region of REGIONS) {
        const slug = `${brand.slug}-${region.slug}`;
        const status: RolloutStatus = "staged";

        registerRecord({
          key: `brand-region:${brand.id}:${region.id}:${locale}`,
          locale,
          slug,
          path: buildLocalePath(locale, slug),
          kind: "brand-region",
          rolloutStatus: status,
          title: `${brand.name} ${region.name} | Katre Cam Bodrum`,
          description: `${brand.name} sistemleri için ${region.name} bölgesinde keşif ve uygulama bilgisi.`,
          h1: `${brand.name} — ${region.name}`,
          entityId: brand.id,
          secondaryId: region.id,
        });
      }
    }
  }

  return {
    lookup,
    collisions,
    allRecords,
  };
}

export const SLUG_LOOKUP_DATA = buildSlugLookup();
