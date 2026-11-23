import React, { useEffect, useState } from "react";
import { HomePage } from "./components/HomePage";
import { PageTemplate } from "./components/PageTemplate";
import { buildWhatsAppUrl, BUSINESS_INFO } from "./data/business";
import { getRouteByLocaleAndSlug } from "./lib/routing";
import { ALL_LOCALES, DEFAULT_LOCALE } from "./lib/slugLookup";
import type { Locale } from "./types/catalog";
import type { RouteRecord } from "./types/routing";

function parseLocation(pathname: string): {
  locale: Locale;
  slugSegments: string[];
  isHome: boolean;
} {
  const cleaned = pathname.replace(/^\/+|\/+$/g, "");
  if (!cleaned) {
    return { locale: DEFAULT_LOCALE, slugSegments: [], isHome: true };
  }

  const parts = cleaned.split("/").filter(Boolean);
  const firstPart = parts[0] as Locale;

  if (ALL_LOCALES.includes(firstPart) && firstPart !== "tr") {
    const rest = parts.slice(1);
    return {
      locale: firstPart,
      slugSegments: rest,
      isHome: rest.length === 0,
    };
  }

  return {
    locale: "tr",
    slugSegments: parts,
    isHome: false,
  };
}

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    typeof window !== "undefined" ? window.location.pathname : "/"
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (targetPath: string) => {
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", targetPath);
      setCurrentPath(targetPath);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const { locale, slugSegments, isHome } = parseLocation(currentPath);

  if (isHome) {
    return <HomePage locale={locale} onNavigate={navigateTo} />;
  }

  const matchedRecord: RouteRecord | null = getRouteByLocaleAndSlug(
    locale,
    slugSegments
  );

  if (matchedRecord) {
    return <PageTemplate record={matchedRecord} onNavigate={navigateTo} />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center text-slate-900">
      <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-900">
          404 · SAYFA BULUNAMADI
        </p>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-950">
          Aradığınız Sayfa Yayında Değil veya Taşınmış
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          Ana sayfaya dönebilir veya doğrudan WhatsApp / telefon hattımızdan
          destek alabilirsiniz.
        </p>

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => navigateTo("/")}
            className="rounded-lg bg-blue-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-900"
          >
            Ana Sayfaya Dön
          </button>
          <a
            href={buildWhatsAppUrl("Sayfa yönlendirme ve bilgi talebi")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            WhatsApp&apos;tan Yaz
          </a>
        </div>

        <div className="mt-5 border-t border-slate-100 pt-4 text-xs text-slate-500">
          Telefon:{" "}
          <a href={BUSINESS_INFO.phoneHref} className="font-semibold text-slate-800">
            {BUSINESS_INFO.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
