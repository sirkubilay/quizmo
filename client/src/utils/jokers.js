/* ══════════════════════════════════════════════════════
   JOKER SİSTEMİ
   - İlk girişte herkese 5'er adet
   - Her gün ücretsiz +1
   - Kullanım localStorage'da kalıcı
══════════════════════════════════════════════════════ */

const KEY = "quizmo_jokers";

const DEFAULTS = { fifty: 5, doubleAnswer: 5, doublePoints: 5, lastDaily: "" };

function today() {
  return new Date().toISOString().slice(0, 10); // "2026-05-31"
}

/* Ham veriyi al (yoksa ilklendir) */
function loadRaw() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(DEFAULTS));
      return { ...DEFAULTS };
    }
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULTS };
  }
}

/* Günlük ücretsiz joker ver */
function applyDaily(data) {
  const t = today();
  if (data.lastDaily !== t) {
    data.fifty        = (data.fifty        || 0) + 1;
    data.doubleAnswer = (data.doubleAnswer || 0) + 1;
    data.doublePoints = (data.doublePoints || 0) + 1;
    data.lastDaily    = t;
    localStorage.setItem(KEY, JSON.stringify(data));
  }
  return data;
}

/* Mevcut sayıları döndür (günlük kontrol dahil) */
export function getJokers() {
  const data = applyDaily(loadRaw());
  return {
    fifty:        data.fifty        || 0,
    doubleAnswer: data.doubleAnswer || 0,
    doublePoints: data.doublePoints || 0,
  };
}

/* Joker kullan — başarılıysa true, yoksa false */
export function useJoker(type) {
  const data = loadRaw(); // daily apply gerekmez, sadece oku/yaz
  if (!data[type] || data[type] <= 0) return false;
  data[type]--;
  localStorage.setItem(KEY, JSON.stringify(data));
  return true;
}

/* Joker ekle (reklam / satın alma için) */
export function addJokers(type, amount = 1) {
  const data = loadRaw();
  data[type] = (data[type] || 0) + amount;
  localStorage.setItem(KEY, JSON.stringify(data));
}
