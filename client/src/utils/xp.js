/* XP per level — her seviye 500 XP */
const XP_PER_LEVEL = 500;

export const LEVEL_TITLES = [
  "",           // 0 (unused)
  "Acemi",      // 1
  "Meraklı",    // 2
  "Öğrenci",    // 3
  "Bilgili",    // 4
  "Deneyimli",  // 5
  "Uzman",      // 6
  "İleri Uzman",// 7
  "Usta",       // 8
  "Büyük Usta", // 9
  "Efsane",     // 10+
];

export function getLevelTitle(level) {
  return LEVEL_TITLES[Math.min(level, LEVEL_TITLES.length - 1)];
}

export function getTotalXP() {
  return parseInt(localStorage.getItem("quizmo_xp") || "0", 10);
}

export function addXP(amount) {
  const prev  = getTotalXP();
  const next  = prev + amount;
  localStorage.setItem("quizmo_xp", String(next));
  const prevLevel = getLevel(prev);
  const nextLevel = getLevel(next);
  return { totalXP: next, leveledUp: nextLevel > prevLevel, newLevel: nextLevel };
}

export function getLevel(totalXP) {
  return Math.floor((totalXP ?? getTotalXP()) / XP_PER_LEVEL) + 1;
}

export function getLevelProgress(totalXP) {
  const xp = totalXP ?? getTotalXP();
  return { current: xp % XP_PER_LEVEL, max: XP_PER_LEVEL };
}

/* XP kazanma formülü */
export function calcGameXP(correct, wrong, isMultiplayer) {
  const base     = correct * 15;
  const bonus    = correct + wrong >= 10 ? 30 : 10;
  const mpBonus  = isMultiplayer ? 20 : 0;
  return base + bonus + mpBonus;
}
