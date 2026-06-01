import { getLocalStats } from "./stats";

export const ACHIEVEMENTS = [
  /* ── Başlangıç ── */
  {
    id: "ilk-adim",
    name: "İlk Adım",
    description: "İlk oyununu tamamla",
    emoji: "🎯",
    color: "#10b981",
    category: "baslangic",
  },
  {
    id: "yeni-baslayanlar",
    name: "Yeni Başlayan",
    description: "İlk cevabını doğru ver",
    emoji: "🌱",
    color: "#34d399",
    category: "baslangic",
  },
  {
    id: "azimli",
    name: "Azimli",
    description: "Kaybettiğin oyundan sonra tekrar oyna",
    emoji: "💪",
    color: "#34d399",
    category: "baslangic",
  },

  /* ── Doğru cevap kilometre taşları ── */
  {
    id: "bilge",
    name: "Bilge",
    description: "Toplam 50 doğru cevap",
    emoji: "🦉",
    color: "#6366f1",
    category: "milestones",
  },
  {
    id: "yuz-dogru",
    name: "Yüzüncü",
    description: "Toplam 100 doğru cevap",
    emoji: "💯",
    color: "#818cf8",
    category: "milestones",
  },
  {
    id: "uzman",
    name: "Uzman",
    description: "Toplam 200 doğru cevap",
    emoji: "🏅",
    color: "#f59e0b",
    category: "milestones",
  },
  {
    id: "mucize",
    name: "Mucize",
    description: "Toplam 500 doğru cevap",
    emoji: "🌟",
    color: "#fcd34d",
    category: "milestones",
  },
  {
    id: "bin-usta",
    name: "Bin Usta",
    description: "Toplam 1000 doğru cevap",
    emoji: "🧿",
    color: "#ffd700",
    category: "milestones",
  },

  /* ── Oyun sayısı ── */
  {
    id: "caliskan",
    name: "Çalışkan",
    description: "10 oyun tamamla",
    emoji: "📚",
    color: "#8b5cf6",
    category: "oyun-sayisi",
  },
  {
    id: "duzineci",
    name: "Düzineci",
    description: "12 oyun tamamla",
    emoji: "🎲",
    color: "#a78bfa",
    category: "oyun-sayisi",
  },
  {
    id: "tutkulu",
    name: "Tutkulu",
    description: "50 oyun tamamla",
    emoji: "🔥",
    color: "#ef4444",
    category: "oyun-sayisi",
  },
  {
    id: "yuz-oyun",
    name: "Yüz Oyun",
    description: "100 oyun tamamla",
    emoji: "🎖️",
    color: "#f87171",
    category: "oyun-sayisi",
  },

  /* ── Mükemmellik ── */
  {
    id: "mukemmel",
    name: "Mükemmeliyetçi",
    description: "Bir oyunda %100 başarı (min. 5 soru)",
    emoji: "💎",
    color: "#06b6d4",
    category: "mukemmellik",
  },
  {
    id: "mukemmel-seri",
    name: "Mükemmel Seri",
    description: "3 farklı oyunda %100 başarı",
    emoji: "👑",
    color: "#22d3ee",
    category: "mukemmellik",
  },

  /* ── Çeşitlilik ── */
  {
    id: "cok-yonlu",
    name: "Çok Yönlü",
    description: "5 farklı kategoride oyna",
    emoji: "🌈",
    color: "#ec4899",
    category: "cesitlilik",
  },
  {
    id: "koleksiyoner",
    name: "Koleksiyoner",
    description: "10 farklı kategoride oyna",
    emoji: "🗺️",
    color: "#f43f5e",
    category: "cesitlilik",
  },
  {
    id: "kategori-uzmani",
    name: "Kategori Uzmanı",
    description: "Aynı kategoride 30 doğru cevap",
    emoji: "⭐",
    color: "#f97316",
    category: "cesitlilik",
  },

  /* ── Multiplayer ── */
  {
    id: "sosyal",
    name: "Sosyal",
    description: "Bir multiplayer oyun oyna",
    emoji: "👥",
    color: "#0ea5e9",
    category: "multiplayer",
  },
  {
    id: "multi-usta",
    name: "Multi Usta",
    description: "5 multiplayer oyun oyna",
    emoji: "🕹️",
    color: "#38bdf8",
    category: "multiplayer",
  },
  {
    id: "sampiyon",
    name: "Şampiyon",
    description: "Multiplayer oyunda 1. ol",
    emoji: "🏆",
    color: "#fbbf24",
    category: "multiplayer",
  },
  {
    id: "hafta-sampiyonu",
    name: "Hafta Şampiyonu",
    description: "Haftalık sıralamada ilk 3'e gir",
    emoji: "🥇",
    color: "#ffd700",
    category: "multiplayer",
  },

  /* ── Özel ── */
  {
    id: "joker-usta",
    name: "Joker Ustası",
    description: "Bir oyunda 3 joker birden kullan",
    emoji: "🃏",
    color: "#a855f7",
    category: "ozel",
  },
  {
    id: "hiz-ustasi",
    name: "Hız Ustası",
    description: "10 saniyeden az sürede 5 doğru cevap",
    emoji: "⚡",
    color: "#eab308",
    category: "ozel",
  },
  {
    id: "gece-oyuncusu",
    name: "Gece Oyuncusu",
    description: "Gece 22:00–04:00 arası oyun oyna",
    emoji: "🦉",
    color: "#312e81",
    category: "ozel",
  },
  {
    id: "sabah-kosusu",
    name: "Sabah Kuşu",
    description: "Sabah 06:00–09:00 arası oyun oyna",
    emoji: "🌅",
    color: "#f97316",
    category: "ozel",
  },
];

/* ── localStorage helpers ── */

export function getUnlockedAchievements() {
  try {
    return JSON.parse(localStorage.getItem("quizmo_achievements") || "{}");
  } catch {
    return {};
  }
}

function unlockOne(id) {
  const unlocked = getUnlockedAchievements();
  if (unlocked[id]) return null;
  unlocked[id] = Date.now();
  localStorage.setItem("quizmo_achievements", JSON.stringify(unlocked));
  return ACHIEVEMENTS.find((a) => a.id === id) || null;
}

export function getGameHistory() {
  try {
    return JSON.parse(localStorage.getItem("quizmo_game_history") || "[]");
  } catch {
    return [];
  }
}

export function saveGameResult(result) {
  const history = getGameHistory();
  history.push({ ...result, date: Date.now() });
  if (history.length > 500) history.splice(0, history.length - 500);
  localStorage.setItem("quizmo_game_history", JSON.stringify(history));
}

/* ── Check after a game, returns newly unlocked achievements ── */
export function checkAchievements(gameResult) {
  const newlyUnlocked = [];
  const tryUnlock = (id) => {
    const a = unlockOne(id);
    if (a) newlyUnlocked.push(a);
  };

  const stats   = getLocalStats();
  const history = getGameHistory();

  // İlk oyun + yeni başlayan
  if (history.length >= 1) tryUnlock("ilk-adim");
  if (gameResult.correct >= 1) tryUnlock("yeni-baslayanlar");

  // Toplam doğru
  const totalCorrect = Object.values(stats).reduce((s, c) => s + (c.correct || 0), 0);
  if (totalCorrect >= 50)   tryUnlock("bilge");
  if (totalCorrect >= 100)  tryUnlock("yuz-dogru");
  if (totalCorrect >= 200)  tryUnlock("uzman");
  if (totalCorrect >= 500)  tryUnlock("mucize");
  if (totalCorrect >= 1000) tryUnlock("bin-usta");

  // Oyun sayısı
  if (history.length >= 10)  tryUnlock("caliskan");
  if (history.length >= 12)  tryUnlock("duzineci");
  if (history.length >= 50)  tryUnlock("tutkulu");
  if (history.length >= 100) tryUnlock("yuz-oyun");

  // Farklı kategoriler
  const uniqueCats = new Set(history.map((g) => g.categoryId).filter(Boolean));
  if (uniqueCats.size >= 5)  tryUnlock("cok-yonlu");
  if (uniqueCats.size >= 10) tryUnlock("koleksiyoner");

  // %100 başarı
  const total = gameResult.correct + gameResult.wrong;
  if (total >= 5 && gameResult.wrong === 0) {
    tryUnlock("mukemmel");
    const perfectGames = history.filter((g) => g.wrong === 0 && g.correct + g.wrong >= 5).length;
    if (perfectGames >= 3) tryUnlock("mukemmel-seri");
  }

  // Multiplayer
  if (gameResult.isMultiplayer) {
    tryUnlock("sosyal");
    const mpGames = history.filter((g) => g.isMultiplayer).length;
    if (mpGames >= 5) tryUnlock("multi-usta");
    if (gameResult.rank === 1) tryUnlock("sampiyon");
  }

  // Tüm jokerler
  if (gameResult.allJokersUsed) tryUnlock("joker-usta");

  // Kategori uzmanı
  const catStats = stats[gameResult.categoryId];
  if (catStats && catStats.correct >= 30) tryUnlock("kategori-uzmani");

  // Hız ustası
  if ((gameResult.fastAnswers || 0) >= 5) tryUnlock("hiz-ustasi");

  // Azimli
  if (!gameResult.isMultiplayer && history.length >= 2) {
    const prev = history[history.length - 2];
    const prevPct = prev.correct / Math.max(prev.correct + prev.wrong, 1);
    if (prevPct < 0.5) tryUnlock("azimli");
  }

  // Gece / Sabah
  const hour = new Date().getHours();
  if (hour >= 22 || hour < 4)  tryUnlock("gece-oyuncusu");
  if (hour >= 6  && hour < 9)  tryUnlock("sabah-kosusu");

  return newlyUnlocked;
}

export function dispatchAchievements(achievements) {
  if (!achievements.length) return;
  window.dispatchEvent(new CustomEvent("quizmo-achievement", { detail: achievements }));
}
