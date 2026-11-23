export type Locale = "tr" | "en" | "ru" | "de";

export type RolloutStatus = "active" | "staged" | "noindex";

export interface LocalizedText {
  tr: string;
  en: string;
  ru: string;
  de: string;
}

export interface CategoryItem {
  id: string;
  slug: LocalizedText;
  title: LocalizedText;
  shortDescription: LocalizedText;
  rolloutStatus: RolloutStatus;
  featured?: boolean;
  heroImage?: string;
}

export interface ProductItem {
  id: string;
  categoryId: string;
  slug: LocalizedText;
  title: LocalizedText;
  shortDescription: LocalizedText;
  rolloutStatus: RolloutStatus;
  featured?: boolean;
  brandIds?: string[];
}

export interface BrandItem {
  id: string;
  name: string;
  slug: string;
  shortDescription: LocalizedText;
  rolloutStatus: RolloutStatus;
  categoryIds: string[];
}

export interface RegionItem {
  id: string;
  name: string;
  slug: string;
  shortDescription: LocalizedText;
  rolloutStatus: RolloutStatus;
}
