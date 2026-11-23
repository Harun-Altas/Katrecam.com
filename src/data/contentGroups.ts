export interface ContentGroupDefinition {
  id: string;
  labelTr: string;
  descriptionTr: string;
  categoryIds: string[];
}

export const CONTENT_GROUPS: ContentGroupDefinition[] = [
  {
    id: "cam-balkon-ve-acilir-sistemler",
    labelTr: "Cam Balkon ve Açılır Sistemler",
    descriptionTr:
      "Katlanır, sürgülü, ısıcamlı ve giyotin cam sistemleri ile rüzgar/iklim korumalı yaşam alanları.",
    categoryIds: [
      "cam-balkon-sistemleri",
      "surme-cam-sistemleri",
      "giyotin-cam-sistemleri",
      "kislik-bahce-ve-cam-oda",
    ],
  },
  {
    id: "pergole-ve-golgelendirme",
    labelTr: "Pergole ve Gölgelendirme Sistemleri",
    descriptionTr:
      "Bioklimatik pergole, rolling roof, zip perde ve motorlu tente çözümleri.",
    categoryIds: [
      "bioklimatik-pergole",
      "rolling-roof-sistemleri",
      "zip-perde-sistemleri",
      "tente-ve-golgelendirme",
    ],
  },
  {
    id: "aluminyum-ve-pvc-dograma",
    labelTr: "Alüminyum ve PVC Doğrama",
    descriptionTr:
      "Isı yalıtımlı doğrama, sürme kapı-pencere, cephe ve panjur sistemleri.",
    categoryIds: [
      "aluminyum-dograma",
      "pvc-dograma",
      "aluminyum-surme-sistemleri",
      "pvc-surme-sistemleri",
      "panjur-ve-kepenk-sistemleri",
    ],
  },
  {
    id: "korkuluk-ve-ozel-cam-uygulamalari",
    labelTr: "Korkuluk ve Özel Cam Uygulamaları",
    descriptionTr:
      "Cam korkuluk, alüminyum korkuluk, vitrin, duşakabin ve mimari ayna çözümleri.",
    categoryIds: [
      "cam-korkuluk-sistemleri",
      "aluminyum-korkuluk-sistemleri",
      "vitrin-ve-ofis-bolme",
      "dusakabin-sistemleri",
      "ayna-ve-dekoratif-cam",
      "temperli-ve-lamine-cam",
    ],
  },
];
