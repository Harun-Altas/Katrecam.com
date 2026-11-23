import React, { useState } from "react";
import { BRANDS } from "../data/brands";
import { buildWhatsAppUrl, BUSINESS_INFO } from "../data/business";
import { CATEGORIES, PRODUCTS } from "../data/catalog";
import { CONTENT_GROUPS } from "../data/contentGroups";
import { REGIONS } from "../data/regions";
import { getActiveCategories } from "../lib/internalLinks";
import { ALL_LOCALES, buildLocalePath } from "../lib/slugLookup";
import type { Locale } from "../types/catalog";

interface HomePageProps {
  locale: Locale;
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ locale, onNavigate }) => {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const activeCategories = getActiveCategories();
  const featuredCategories = activeCategories.filter((c) => c.featured);
  const displayCategories =
    featuredCategories.length > 0 ? featuredCategories : activeCategories;

  const featuredProducts = PRODUCTS.filter(
    (p) => p.featured && p.rolloutStatus === "active"
  ).slice(0, 8);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parts = [
      customerName ? `Ad Soyad: ${customerName}` : "",
      customerPhone ? `Telefon: ${customerPhone}` : "",
      selectedService ? `Sistem: ${selectedService}` : "",
      selectedRegion ? `Bölge: ${selectedRegion}` : "",
    ].filter(Boolean);

    const summary =
      parts.length > 0 ? parts.join(" | ") : "Keşif ve fiyat talebi";
    setSubmittedNotice(true);
    window.open(buildWhatsAppUrl(summary), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20 md:pb-0">
      {/* Üst Bilgi Çubuğu */}
      <div className="border-b border-slate-200 bg-slate-50 text-xs text-slate-700">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2">
          <div className="flex flex-wrap items-center gap-4">
            <span>
              <strong>{BUSINESS_INFO.brandName}</strong> · {BUSINESS_INFO.district},{" "}
              {BUSINESS_INFO.city}
            </span>
            <a
              href={BUSINESS_INFO.phoneHref}
              className="font-semibold text-blue-950 hover:underline"
            >
              {BUSINESS_INFO.phoneDisplay}
            </a>
            <span className="hidden sm:inline text-slate-500">
              {BUSINESS_INFO.workingHours}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {ALL_LOCALES.map((loc) => {
              const target = loc === "tr" ? "/" : `/${loc}`;
              const active = loc === locale;
              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => onNavigate(target)}
                  className={`rounded px-2 py-0.5 uppercase font-semibold transition ${
                    active
                      ? "bg-blue-950 text-white"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {loc}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Ana Navigasyon */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5">
          <button
            type="button"
            onClick={() => onNavigate(locale === "tr" ? "/" : `/${locale}`)}
            className="text-left"
          >
            <span className="block text-xl font-black tracking-tight text-blue-950">
              KATRE CAM
            </span>
            <span className="block text-[11px] font-medium text-amber-700">
              Bodrum Cam &amp; Mimari Doğrama
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-700">
            {activeCategories.slice(0, 6).map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => onNavigate(buildLocalePath(locale, cat.slug[locale]))}
                className="hover:text-blue-950 transition"
              >
                {cat.title[locale]}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={BUSINESS_INFO.phoneHref}
              className="hidden sm:inline-flex items-center rounded-lg border border-blue-950 px-3.5 py-2 text-xs font-bold text-blue-950 hover:bg-blue-50"
            >
              Hemen Ara
            </a>
            <a
              href={buildWhatsAppUrl("Ana sayfa üzerinden keşif talebi")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-700"
            >
              WhatsApp Keşif
            </a>
          </div>
        </div>
      </header>

      {/* Hero Alanı */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-14 lg:grid-cols-12 lg:items-center lg:py-20">
          <div className="lg:col-span-7">
            <span className="inline-block rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
              Bodrum Yarımadası · Keşif, Ölçü ve Uygulama
            </span>
            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl leading-tight">
              Bodrum&apos;da Cam Balkon, Pergole ve Doğrama Sistemleri
            </h1>
            <p className="mt-4 max-w-2xl text-base text-slate-200 sm:text-lg leading-relaxed">
              Villa, teras, balkon ve ticari yaşam alanlarınız için cam balkon,
              sürme cam, giyotin cam, bioklimatik pergole, alüminyum ve PVC
              doğrama çözümleri.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#kesif-formu"
                className="rounded-xl bg-amber-500 px-5 py-3 text-sm font-extrabold text-slate-950 hover:bg-amber-400 transition"
              >
                Ücretsiz Keşif Talebi
              </a>
              <a
                href={buildWhatsAppUrl("Bodrum keşif ve fiyat bilgisi")}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-500 transition"
              >
                WhatsApp&apos;tan Yazın
              </a>
              <a
                href={BUSINESS_INFO.phoneHref}
                className="rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/15 transition"
              >
                {BUSINESS_INFO.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur">
              <h2 className="text-base font-bold text-amber-300">
                4 Ana Sistem Grubu
              </h2>
              <div className="mt-4 space-y-3">
                {CONTENT_GROUPS.map((group) => (
                  <div
                    key={group.id}
                    className="rounded-xl border border-white/10 bg-slate-950/40 p-3.5"
                  >
                    <p className="text-sm font-bold text-white">{group.labelTr}</p>
                    <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                      {group.descriptionTr}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Öne Çıkan Kategoriler */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Hizmet Kategorileri
            </p>
            <h2 className="mt-1 text-2xl font-extrabold text-blue-950 sm:text-3xl">
              Öne Çıkan Sistemler
            </h2>
          </div>
          <span className="text-xs font-medium text-slate-500">
            {activeCategories.length} aktif kategori
          </span>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() =>
                onNavigate(buildLocalePath(locale, category.slug[locale]))
              }
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-xs transition hover:border-blue-900 hover:shadow-md"
            >
              <div>
                <h3 className="text-lg font-bold text-blue-950 group-hover:text-blue-800">
                  {category.title[locale]}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {category.shortDescription[locale]}
                </p>
              </div>
              <span className="mt-4 inline-flex items-center text-xs font-bold text-amber-700">
                Sayfayı İncele →
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Öne Çıkan Alt Ürünler */}
      <section className="border-y border-slate-200 bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
            Uygulama Seçenekleri
          </p>
          <h2 className="mt-1 text-2xl font-extrabold text-blue-950 sm:text-3xl">
            Öne Çıkan Ürün Modelleri
          </h2>

          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() =>
                  onNavigate(buildLocalePath(locale, product.slug[locale]))
                }
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-blue-900"
              >
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {product.title[locale]}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                    {product.shortDescription[locale]}
                  </p>
                </div>
                <span className="mt-3 text-xs font-semibold text-blue-900">
                  Detay →
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Markalar & Bölgeler */}
      <section className="mx-auto max-w-7xl px-4 py-14 space-y-12">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
            Sistem Altyapısı
          </p>
          <h2 className="mt-1 text-2xl font-extrabold text-blue-950">
            Çalıştığımız Markalar
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BRANDS.map((brand) => (
              <div
                key={brand.id}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-4"
              >
                <h3 className="text-base font-extrabold text-blue-950">
                  {brand.name}
                </h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  {brand.shortDescription[locale]}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
            Hizmet Ağı
          </p>
          <h2 className="mt-1 text-2xl font-extrabold text-blue-950">
            Bodrum Hizmet Bölgeleri
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {REGIONS.map((region) => (
              <span
                key={region.id}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
              >
                {region.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Keşif Talep Formu */}
      <section
        id="kesif-formu"
        className="border-t border-slate-200 bg-blue-950 py-14 text-white"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Yerinde Ölçü ve Keşif
            </p>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
              Bodrum&apos;daki Projeniz İçin Hızlı İletişime Geçin
            </h2>
            <p className="mt-3 text-sm text-slate-200 leading-relaxed">
              İhtiyacınız olan sistemi ve bölgenizi seçerek doğrudan WhatsApp
              üzerinden mesaj başlatabilir veya telefon hattımızı arayabilirsiniz.
            </p>
            <div className="mt-5 space-y-1.5 text-sm text-slate-200">
              <p>
                <strong>Telefon:</strong> {BUSINESS_INFO.phoneDisplay}
              </p>
              <p>
                <strong>Adres:</strong> {BUSINESS_INFO.address}
              </p>
            </div>
          </div>

          <form
            onSubmit={handleLeadSubmit}
            className="lg:col-span-6 rounded-2xl bg-white p-6 text-slate-900 shadow-lg space-y-4"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Adınız Soyadınız"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Telefon
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="05XX XXX XX XX"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-900 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Sistem Seçimi
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-900 focus:outline-none"
                >
                  <option value="">Sistem seçiniz</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.title.tr}>
                      {cat.title.tr}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Bodrum Bölgesi
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-900 focus:outline-none"
                >
                  <option value="">Bölge seçiniz</option>
                  {REGIONS.map((reg) => (
                    <option key={reg.id} value={reg.name}>
                      {reg.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-950 py-3 text-sm font-bold text-white hover:bg-blue-900 transition"
            >
              WhatsApp Üzerinden Talep Gönder
            </button>

            {submittedNotice && (
              <p className="text-xs font-medium text-emerald-700">
                WhatsApp mesaj ekranı hazırlandı. Görüşmeyi doğrudan oradan
                sürdürebilirsiniz.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-950 py-8 text-xs text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4">
          <p>
            © {new Date().getFullYear()} {BUSINESS_INFO.brandName} (
            {BUSINESS_INFO.domain}). Tüm hakları saklıdır.
          </p>
          <p>{BUSINESS_INFO.address}</p>
        </div>
      </footer>

      {/* Mobil Sabit Alt Aksiyon Barı */}
      <div className="fixed bottom-0 inset-x-0 z-40 grid grid-cols-2 gap-2 border-t border-slate-200 bg-white p-2.5 md:hidden">
        <a
          href={BUSINESS_INFO.phoneHref}
          className="flex items-center justify-center rounded-lg bg-blue-950
