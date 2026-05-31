import diziFiimler from "./dizi-filmler.js";
import genelKultur from "./genel-kultur.js";
import cografya from "./cografya.js";
import spor from "./spor.js";
import bilim from "./bilim.js";
import psikoloji1 from "./psikoloji-1.js";
import hukukSiyaset1 from "./hukuk-siyaset-1.js";
import mimariYapilar1 from "./mimari-yapilar-1.js";
import ekonomiFinans1 from "./ekonomi-finans-1.js";
import modaVeTasarim1 from "./moda-tasarim-1.js";
import oyunlarVeHobi1 from "./oyunlar-hobi-1.js";
import osmanliTarihi1 from "./osmanli-tarihi-1.js";
import cumhuriyetTarihi1 from "./cumhuriyet-tarihi-1.js";
import dunyaTarihi1 from "./dunya-tarihi-1.js";
import turkMutfagi1 from "./turk-mutfagi-1.js";
import dunyaMutfagi1 from "./dunya-mutfagi-1.js";
import turkEdebiyati1 from "./turk-edebiyati-1.js";
import hayvanlarAlemi1 from "./hayvanlar-alemi-1.js";
import okyanuslarVeDenizler1 from "./okyanuslar-denizler-1.js";
import bitkilerVeBotanik1 from "./bitkiler-botanik-1.js";
import dunyaEdebiyati1 from "./dunya-edebiyati-1.js";
import ingilizce1 from "./ingilizce-1.js";
import muzikDunyasi1 from "./muzik-dunyasi-1.js";
import tipVeSaglik1 from "./tip-saglik-1.js";
import mitoloji1 from "./mitoloji-1.js";
import kimya1 from "./kimya-1.js";
import dinVeInanc1 from "./din-inanc-1.js";
import uzayVeAstronomi1 from "./uzay-astronomi-1.js";
import matematik1 from "./matematik-1.js";
import felsefe1 from "./felsefe-1.js";
import cizgiFilmler1 from "./cizgi-filmler-1.js";
import fizik1 from "./fizik-1.js";
import teknolojiBilgisayar1 from "./teknoloji-bilgisayar-1.js";
import futbol1 from "./futbol-1.js";
import biyoloji1 from "./biyoloji-1.js";

const questionBank = {
  "dizi-filmler": diziFiimler,
  "genel-kultur": genelKultur,
  "cografya": cografya,
  "spor": spor,
  "bilim": bilim,
  "psikoloji": [
    ...psikoloji1,
  ],
  "hukuk-siyaset": [
    ...hukukSiyaset1,
  ],
  "mimari-yapilar": [
    ...mimariYapilar1,
  ],
  "ekonomi-finans": [
    ...ekonomiFinans1,
  ],
  "moda-tasarim": [
    ...modaVeTasarim1,
  ],
  "oyunlar-hobi": [
    ...oyunlarVeHobi1,
  ],
  "osmanli-tarihi": [
    ...osmanliTarihi1,
  ],
  "cumhuriyet-tarihi": [
    ...cumhuriyetTarihi1,
  ],
  "dunya-tarihi": [
    ...dunyaTarihi1,
  ],
  "turk-mutfagi": [
    ...turkMutfagi1,
  ],
  "dunya-mutfagi": [
    ...dunyaMutfagi1,
  ],
  "turk-edebiyati": [
    ...turkEdebiyati1,
  ],
  "hayvanlar-alemi": [
    ...hayvanlarAlemi1,
  ],
  "okyanuslar-denizler": [
    ...okyanuslarVeDenizler1,
  ],
  "bitkiler-botanik": [
    ...bitkilerVeBotanik1,
  ],
  "dunya-edebiyati": [
    ...dunyaEdebiyati1,
  ],
  "ingilizce": [
    ...ingilizce1,
  ],
  "muzik-dunyasi": [
    ...muzikDunyasi1,
  ],
  "tip-saglik": [
    ...tipVeSaglik1,
  ],
  "mitoloji": [
    ...mitoloji1,
  ],
  "kimya": [
    ...kimya1,
  ],
  "din-inanc": [
    ...dinVeInanc1,
  ],
  "uzay-astronomi": [
    ...uzayVeAstronomi1,
  ],
  "matematik": [
    ...matematik1,
  ],
  "felsefe": [
    ...felsefe1,
  ],
  "cizgi-filmler": [
    ...cizgiFilmler1,
  ],
  "fizik": [
    ...fizik1,
  ],
  "teknoloji-bilgisayar": [
    ...teknolojiBilgisayar1,
  ],
  "futbol": [
    ...futbol1,
  ],
  "biyoloji": [
    ...biyoloji1,
  ],
};

/* ── Tarih: 3 alt kategoriden eşit dağılım ── */
function getHistoryQuestions(difficulty = null, count = 10) {
  const HISTORY_KEYS = ["osmanli-tarihi", "cumhuriyet-tarihi", "dunya-tarihi"];
  const base      = Math.floor(count / 3);
  const remainder = count % 3;

  const result = [];
  HISTORY_KEYS.forEach((key, i) => {
    const need   = base + (i < remainder ? 1 : 0);
    const pool   = difficulty
      ? (questionBank[key] || []).filter(q => q.difficulty === difficulty)
      : (questionBank[key] || []);
    const picked = [...pool].sort(() => Math.random() - 0.5).slice(0, need);
    result.push(...picked);
  });

  return result.sort(() => Math.random() - 0.5);
}

/* ── Düzgün karıştırma (Fisher-Yates) ── */
function fisherYates(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/*
  Zorluk belirtilmediğinde katmanlı örnekleme:
  kolay / orta / zor'dan eşit pay alınır, sonra karıştırılır.
  Böylece ilk sorular hep aynı zorlukta gelmiyor.
*/
function stratifiedSample(pool, count) {
  const buckets = {
    easy:   fisherYates(pool.filter(q => q.difficulty === "easy")),
    medium: fisherYates(pool.filter(q => q.difficulty === "medium")),
    hard:   fisherYates(pool.filter(q => q.difficulty === "hard")),
  };
  const base = Math.floor(count / 3);
  const rem  = count % 3; // 0, 1 ya da 2

  const picked = [
    ...buckets.easy  .slice(0, base + (rem > 0 ? 1 : 0)),
    ...buckets.medium.slice(0, base + (rem > 1 ? 1 : 0)),
    ...buckets.hard  .slice(0, base),
  ];

  // Herhangi bir zorluk seviyesi yetersizse diğerlerinden tamamla
  if (picked.length < count) {
    const used = new Set(picked.map(q => q.id ?? q.question));
    const rest = fisherYates(pool.filter(q => !used.has(q.id ?? q.question)));
    picked.push(...rest.slice(0, count - picked.length));
  }

  return fisherYates(picked).slice(0, count);
}

export function getQuestions(categoryId, difficulty = null, count = 10) {
  if (categoryId === "tarih") return getHistoryQuestions(difficulty, count);
  const all = questionBank[categoryId] || [];
  if (difficulty) {
    return fisherYates(all.filter(q => q.difficulty === difficulty)).slice(0, count);
  }
  return stratifiedSample(all, count);
}

export function hasQuestions(categoryId) {
  if (categoryId === "tarih") return true;
  return !!questionBank[categoryId]?.length;
}

export function getQuestionCount(categoryId) {
  if (categoryId === "tarih") {
    return (questionBank["osmanli-tarihi"]?.length || 0)
         + (questionBank["cumhuriyet-tarihi"]?.length || 0)
         + (questionBank["dunya-tarihi"]?.length || 0);
  }
  return questionBank[categoryId]?.length || 0;
}

export default questionBank;
