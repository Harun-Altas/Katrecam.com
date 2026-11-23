import React from "react";
import { buildWhatsAppUrl, BUSINESS_INFO } from "../data/business";
import { CATEGORIES, PRODUCTS } from "../data/catalog";
import {
  getActiveProductsByCategory,
  getRelatedBrandsForCategory,
  getRelatedProducts,
} from "../lib/internalLinks";
import { buildPageSchemaGraph } from "../lib/schema";
import { buildLocalePath } from "../lib/slugLookup";
import type { RouteRecord } from "../types/routing";
import type { BreadcrumbItem } from "../types/seo";

interface PageTemplateProps {
  record: RouteRecord;
  onNavigate: (path: string) => void;
}

export const PageTemplate: React.FC<PageTemplateProps> = ({
  record,
  onNavigate,
}) => {
  const homePath = record.locale === "tr" ? "/" : `/${record.locale}`;

  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Ana Sayfa", path: homePath },
    { name: record.h1, path: record.path },
  ];

  const schemaGraph = buildPageSchemaGraph(record, breadcrumbs);
  const isNoindex = record.rolloutStatus !== "active";

  const currentProduct =
    record.kind === "product"
      ? PRODUCTS.find((p) => p.id === record.entityId) ?? null
      : null;

  const currentCategory =
    record.kind === "category"
      ? CATEGORIES.find((c) => c.id === record.entityId) ?? null
      : currentProduct
      ? CATEGORIES.find((c) => c.id === currentProduct.categoryId) ?? null
      : null;

  const categoryProducts = currentCategory
    ? getActiveProductsByCategory(currentCategory.id)
    : [];

  const relatedProducts = currentProduct
    ? getRelatedProducts(currentProduct, record.locale, 6)
    : [];

  const relatedBrands = currentCategory
    ? getRelatedBrandsForCategory(currentCategory.id, record.locale)
    : [];

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20 md:pb-0">
      {isNoindex && <meta name="robots" content="noindex,follow" />}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      {/* Üst Bar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <button
            type="button"
            onClick={() => onNavigate(homePath)}
            className="text-left"
          >
            <span className="block text-lg font-black text-blue-950">
              KATRE CAM
            </span>
            <span className="block text-[11px] text-amber-700 font-medium">
              {BUSINESS_INFO.district}, {BUSINESS_INFO.city}
            </span>
          </button>

          <div className="flex items-center gap-2">
            <a
              href={BUSINESS_INFO.phoneHref}
              className="rounded-lg border border-blue-950 px-3.5 py-2 text-xs font-bold text-blue-950 hover:bg-blue-50"
            >
              {BUSINESS_INFO.phoneDisplay}
            </a>
            <a
              href={buildWhatsAppUrl(record.h1)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-700"
            >
              WhatsApp Keşif
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.path}>
              {idx > 0 && <span>/</span>}
              {idx === breadcrumbs.length - 1 ? (
                <span className="font-semibold text-slate-800">{crumb.name}</span>
              ) : (
                <button
                  type="button"
                  onClick={() => onNavigate(crumb.path)}
                  className="hover:text-blue-900"
                >
                  {crumb.name}
                </button>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Ana Başlık Alanı */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <span className="inline-block rounded-full bg-blue-950 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
            {record.kind} · {record.locale.toUpperCase()}
          </span>
          <h1 className="mt-3 text-2xl font-black text-blue-950 sm:text-4xl">
            {record.h1}
          </h1>
          <p className="mt-3 max-w-3xl text-base text-slate-700 leading-relaxed">
            {record.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={buildWhatsAppUrl(`${record.h1} için keşif talebi`)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700"
            >
              WhatsApp&apos;tan Keşif İste
            </a>
            <a
              href={BUSINESS_INFO.phoneHref}
              className="rounded-xl bg-blue-950 px-5 py-3 text-sm font-bold text-white hover:bg-blue-900"
            >
              Hemen Ara ({BUSINESS_INFO.phoneDisplay})
            </a>
          </div>
        </div>

        {/* Kategori Alt Ürünleri */}
        {record.kind === "category" && categoryProducts.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-extrabold text-blue-950">
              Bu Kategorideki Sistemler
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categoryProducts.map((prod) => (
                <button
                  key={prod.id}
                  type="button"
                  onClick={() =>
                    onNavigate(buildLocalePath(record.locale, prod.slug[record.locale]))
                  }
                  className="rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-blue-900"
                >
                  <h3 className="text-base font-bold text-slate-900">
                    {prod.title[record.locale]}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                    {prod.shortDescription[record.locale]}
                  </p>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* İlgili Ürünler */}
        {relatedProducts.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-extrabold text-blue-950">
              İlgili Sistemler
            </h2>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {relatedProducts.map((item) => (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => onNavigate(item.path)}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-blue-950 hover:bg-slate-50"
                >
                  {item.label} →
                </button>
              ))}
            </div>
          </section>
        )}

        {/* İlgili Markalar */}
        {relatedBrands.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-extrabold text-blue-950">
              İlgili Markalar
            </h2>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {relatedBrands.map((brandLink) => (
                <button
                  key={brandLink.path}
                  type="button"
                  onClick={() => onNavigate(brandLink.path)}
                  className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-xs font-bold text-amber-900 hover:bg-amber-100"
                >
                  {brandLink.label}
                </button>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Mobil Sabit Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 grid grid-cols-2 gap-2 border-t border-slate-200 bg-white p-2.5 md:hidden">
        <a
          href={BUSINESS_INFO.phoneHref}
          className="flex items-center justify-center rounded-lg bg-blue-950 py-2.5 text-xs font-bold text-white"
        >
          Hemen Ara
        </a>
        <a
          href={buildWhatsAppUrl(`${record.h1} için hızlı talep`)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-lg bg-emerald-600 py-2.5 text-xs font-bold text-white"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
};
