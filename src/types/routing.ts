import type { Locale, RolloutStatus } from "./catalog";

export type PageKind =
  | "category"
  | "product"
  | "brand"
  | "region"
  | "brand-region";

export interface RouteRecord {
  key: string;
  locale: Locale;
  slug: string;
  path: string;
  kind: PageKind;
  rolloutStatus: RolloutStatus;
  title: string;
  description: string;
  h1: string;
  entityId: string;
  secondaryId?: string;
}

export interface SlugCollision {
  locale: Locale;
  slug: string;
  existingKey: string;
  conflictingKey: string;
}
