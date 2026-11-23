import type { Locale } from "./catalog";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface AlternateLink {
  locale: Locale;
  href: string;
}

export interface SeoMeta {
  title: string;
  description: string;
  canonicalPath: string;
  robots: string;
  alternates: AlternateLink[];
  breadcrumbs: BreadcrumbItem[];
}

export interface SchemaNode {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
}
