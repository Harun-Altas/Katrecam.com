import type { BrandItem } from "../types/catalog";

export const BRANDS: BrandItem[] = [
  {
    id: "albert-genau",
    name: "Albert Genau",
    slug: "albert-genau",
    rolloutStatus: "staged",
    categoryIds: [
      "cam-balkon-sistemleri",
      "surme-cam-sistemleri",
      "kislik-bahce-ve-cam-oda",
      "cam-korkuluk-sistemleri",
    ],
    shortDescription: {
      tr: "Albert Genau cam balkon ve sürme sistemleri için Bodrum keşif, ölçü ve uygulama desteği.",
      en: "Albert Genau glass balcony and sliding systems survey and installation in Bodrum.",
      ru: "Замер и установка систем остекления Albert Genau в Бодруме.",
      de: "Aufmaß und Montage für Albert Genau Glasbalkon- und Schiebesysteme in Bodrum.",
    },
  },
  {
    id: "winsa",
    name: "Winsa",
    slug: "winsa",
    rolloutStatus: "staged",
    categoryIds: [
      "pvc-dograma",
      "pvc-surme-sistemleri",
      "panjur-ve-kepenk-sistemleri",
    ],
    shortDescription: {
      tr: "Winsa PVC doğrama, sürme ve panjur çözümleri için Bodrum keşif ve montaj hizmeti.",
      en: "Winsa PVC joinery, sliding and shutter solutions with survey and installation in Bodrum.",
      ru: "Решения ПВХ окон, раздвижных систем и рольставен Winsa в Бодруме.",
      de: "Winsa PVC-Fenster, Schiebesysteme und Rollläden mit Aufmaß und Montage in Bodrum.",
    },
  },
  {
    id: "linea-rossa",
    name: "Linea Rossa",
    slug: "linea-rossa",
    rolloutStatus: "staged",
    categoryIds: [
      "aluminyum-dograma",
      "aluminyum-surme-sistemleri",
      "vitrin-ve-ofis-bolme",
    ],
    shortDescription: {
      tr: "Linea Rossa alüminyum doğrama ve sürme sistemleri için proje bazlı Bodrum uygulaması.",
      en: "Linea Rossa aluminum joinery and sliding systems for residential and commercial projects in Bodrum.",
      ru: "Алюминиевые профильные и раздвижные системы Linea Rossa в Бодруме.",
      de: "Linea Rossa Aluminium-Systeme und Schiebelösungen für Projekte in Bodrum.",
    },
  },
  {
    id: "ferrini",
    name: "Ferrini",
    slug: "ferrini",
    rolloutStatus: "staged",
    categoryIds: [
      "bioklimatik-pergole",
      "rolling-roof-sistemleri",
      "zip-perde-sistemleri",
      "tente-ve-golgelendirme",
    ],
    shortDescription: {
      tr: "Ferrini pergola ve gölgelendirme sistemleri için Bodrum keşif ve uygulama desteği.",
      en: "Ferrini pergola and shading systems survey and installation support in Bodrum.",
      ru: "Перголы и солнцезащитные системы Ferrini с замером и монтажом в Бодруме.",
      de: "Ferrini Pergola- und Beschattungssysteme mit Aufmaß und Montage in Bodrum.",
    },
  },
];
