import { getLocalStats } from "./stats";

export const ACHIEVEMENTS = [
  {
    id: "ilk-adim",
    name: "İlk Adım",
    description: "İlk oyununu tamamla",
    emoji: "🎯",
    color: "#10b981",
  },
  {
    id: "bilge",
    name: "Bilge",
    description: "Toplam 50 doğru cevap",
    emoji: "🦉",
    color: "#6366f1",
  },
  {
    id: "uzman",
    name: "Uzman",
    description: "Toplam 200 doğru cevap",
    emoji: "🏅",
    color: "#f59e0b",
  },
  {
    id: "mucize",
    name: "Mucize",
    description: "Toplam 500 doğru cevap",
    emoji: "🌟",
    color: "#fcd34d",
  },
  {
    id: "mukemmel",
    name: "Mükemmeliyetçi",
    description: "Bir oyunda %100 başarı (min. 5 soru)",
    emoji: "💎",
    color: "#06b6d4",
  },
  {
    id: "caliskan",
    name: "Çalışkan",
    description: "10 oyun tamamla",
    emoji: "📚",
    color: "#8b5cf6",
  },
  {
    id: "tutkulu",
    name: "Tutkulu",
    description: "50 oyun tamamla",
    emoji: "🔥",
    color: "#ef4444",
  },
  {
    id: "cok-yonlu",
    name: "Çok Yönlü",
    description: "5 farklı kategoride oyna",
    emoji: "🌈",
    color: "#ec4899",
  },
  {
    id: "sosyal",
    name: "Sosyal",
    description: "Bir multiplayer oyun oyna",
    emoji: "👥",
    color: "#0ea5e9",
  },
  {
    id: "sampiyon",
    name: "Şampiyon",
    description: "Multiplayer oyunda 1. ol",
    emoji: "🏆",
    color: "#fbbf24",
  },
  {
    id: "joker-usta",
    name: "Joker Ustası",
    description: "Bir oyunda 3 joker birden kullan",
    emoji: "🃏",
    color: "#a855f7",
  },
  {
    id: "kategori-uzmani",
    name: "Kategori Uzmanı",
    description: "Aynı kategoride 30 doğru cevap",
    emoji: "⭐",
    color: "#f97316",
  },
  {
    id: "hiz-ustasi",
    name: "Hız Ustası",
    description: "10 saniyeden az sürede 5 doğru cevap",
    emoji: "⚡",
    color: "#eab308",
  },
  {
    id: "hafta-sampiyonu",
    name: "Hafta Şampiyonu",
    description: "Haftalık sıralamada ilk 3'e gir",
    emoji: "👑",
    color: "#ffd700",
  },
  {
    id: "azimli",
    name: "Azimli",
    description: "Kaybettiğin oyundan sonra tekrar oyna",
    emoji: "💪",
    color: "#34d399",
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
  if (history.length > 200) history.splice(0, history.length - 200);
  localStorage.setItem("quizmo_game_history", JSON.stringify(history));
}

/* ── Check after a game, returns newly unlocked achievements ── */
export function checkAchievements(gameResult) {
  // gameResult: { categoryId, correct, wrong, score, isMultiplayer, rank, allJokersUsed, fastAnswers }
  const newlyUnlocked = [];
  const tryUnlock = (id) => {
    const a = unlockOne(id);
    if (a) newlyUnlocked.push(a);
  };

  const stats = getLocalStats();
  const history = getGameHistory();

  // İlk oyun
  if (history.length >= 1) tryUnlock("ilk-adim");

  // Toplam doğru
  const totalCorrect = Object.values(stats).reduce((s, c) => s + (c.correct || 0), 0);
  if (totalCorrect >= 50)  tryUnlock("bilge");
  if (totalCorrect >= 200) tryUnlock("uzman");
  if (totalCorrect >= 500) tryUnlock("mucize");

  // Oyun sayısı
  if (history.length >= 10) tryUnlock("caliskan");
  if (history.length >= 50) tryUnlock("tutkulu");

  // 5 farklı kategori
  const uniqueCats = new Set(history.map((g) => g.categoryId).filter(Boolean));
  if (uniqueCats.size >= 5) tryUnlock("cok-yonlu");

  // %100 başarı (min 5 soru)
  const total = gameResult.correct + gameResult.wrong;
  if (total >= 5 && gameResult.wrong === 0) tryUnlock("mukemmel");

  // Multiplayer
  if (gameResult.isMultiplayer) {
    tryUnlock("sosyal");
    if (gameResult.rank === 1) tryUnlock("sampiyon");
  }

  // Tüm jokerler kullanıldı
  if (gameResult.allJokersUsed) tryUnlock("joker-usta");

  // Kategori uzmanı
  const catStats = stats[gameResult.categoryId];
  if (catStats && catStats.correct >= 30) tryUnlock("kategori-uzmani");

  // Hız ustası
  if ((gameResult.fastAnswers || 0) >= 5) tryUnlock("hiz-ustasi");

  // Azimli: önceki oyun kaybedilmiş
  if (!gameResult.isMultiplayer && history.length >= 2) {
    const prev = history[history.length - 2];
    const prevPct = prev.correct / Math.max(prev.correct + prev.wrong, 1);
    if (prevPct < 0.5) tryUnlock("azimli");
  }

  return newlyUnlocked;
}

/* Dispatch achievement events for the toast component to catch */
export function dispatchAchievements(achievements) {
  if (!achievements.length) return;
  window.dispatchEvent(new CustomEvent("quizmo-achievement", { detail: achievements }));
}
