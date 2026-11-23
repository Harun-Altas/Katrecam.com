import { BRANDS } from "../data/brands";
import { CATEGORIES, PRODUCTS } from "../data/catalog";
import { REGIONS } from "../data/regions";
import type {
  BrandItem,
  CategoryItem,
  Locale,
  ProductItem,
  RegionItem,
} from "../types/catalog";
import { buildLocalePath } from "./slugLookup";

export interface InternalLinkItem {
  label: string;
  path: string;
  kind: "category" | "product" | "brand" | "region";
}

export function getActiveCategories(): CategoryItem[] {
  return CATEGORIES.filter((c) => c.rolloutStatus === "active");
}

export function getActiveProductsByCategory(categoryId: string): ProductItem[] {
  return PRODUCTS.filter(
    (p) => p.categoryId === categoryId && p.rolloutStatus === "active"
  );
}

export function getRelatedProducts(
  product: ProductItem,
  locale: Locale,
  limit = 6
): InternalLinkItem[] {
  const sameCategory = PRODUCTS.filter(
    (p) =>
      p.id !== product.id &&
      p.categoryId === product.categoryId &&
      p.rolloutStatus === "active"
  );

  return sameCategory.slice(0, limit).map((item) => ({
    label: item.title[locale],
    path: buildLocalePath(locale, item.slug[locale]),
    kind: "product",
  }));
}

export function getRelatedBrandsForCategory(
  categoryId: string,
  locale: Locale
): InternalLinkItem[] {
  const matchingBrands: BrandItem[] = BRANDS.filter(
    (b) => b.categoryIds.includes(categoryId) && b.rolloutStatus === "active"
  );

  return matchingBrands.map((brand) => ({
    label: brand.name,
    path: buildLocalePath(locale, brand.slug),
    kind: "brand",
  }));
}

export function getActiveRegionLinks(
  locale: Locale,
  limit = 16
): InternalLinkItem[] {
  const activeRegions: RegionItem[] = REGIONS.filter(
    (r) => r.rolloutStatus === "active"
  );

  return activeRegions.slice(0, limit).map((region) => ({
    label: region.name,
    path: buildLocalePath(locale, region.slug),
    kind: "region",
  }));
}
