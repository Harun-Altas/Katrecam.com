import { BUSINESS_INFO } from "../data/business";
import type { RouteRecord } from "../types/routing";
import type { BreadcrumbItem, SchemaNode } from "../types/seo";

export function buildLocalBusinessSchema(): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BUSINESS_INFO.baseUrl}/#localbusiness`,
    name: BUSINESS_INFO.brandName,
    url: BUSINESS_INFO.baseUrl,
    telephone: BUSINESS_INFO.phoneDisplay,
    email: BUSINESS_INFO.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_INFO.address,
      addressLocality: BUSINESS_INFO.district,
      addressRegion: BUSINESS_INFO.city,
      addressCountry: "TR",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${BUSINESS_INFO.district}, ${BUSINESS_INFO.city}`,
    },
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${BUSINESS_INFO.baseUrl}${item.path}`,
    })),
  };
}

export function buildPageSchemaGraph(
  record: RouteRecord,
  breadcrumbs: BreadcrumbItem[]
): SchemaNode[] {
  const graph: SchemaNode[] = [
    buildLocalBusinessSchema(),
    buildBreadcrumbSchema(breadcrumbs),
  ];

  if (record.kind === "product") {
    graph.push({
      "@context": "https://schema.org",
      "@type": "Product",
      name: record.h1,
      description: record.description,
      url: `${BUSINESS_INFO.baseUrl}${record.path}`,
      brand: {
        "@type": "Brand",
        name: BUSINESS_INFO.brandName,
      },
    });
  } else if (record.kind === "category") {
    graph.push({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: record.h1,
      description: record.description,
      url: `${BUSINESS_INFO.baseUrl}${record.path}`,
    });
  } else {
    graph.push({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: record.h1,
      description: record.description,
      url: `${BUSINESS_INFO.baseUrl}${record.path}`,
    });
  }

  return graph;
}
