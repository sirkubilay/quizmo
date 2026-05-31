import { db } from "../firebase";
import {
  doc, setDoc, collection, where,
  getDocs, query, increment, serverTimestamp,
} from "firebase/firestore";

/* ── ISO hafta numarası: "2026-W22" ── */
function getWeekString() {
  const now = new Date();
  const d = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

/* ─────────────────────────────────────
   LOCAL STATS (localStorage)
   { categoryId: { correct, wrong } }
───────────────────────────────────── */
export function saveLocalStats(categoryId, correct, wrong) {
  if (!categoryId || (correct === 0 && wrong === 0)) return;
  try {
    const stats = JSON.parse(localStorage.getItem("quizmo_stats") || "{}");
    if (!stats[categoryId]) stats[categoryId] = { correct: 0, wrong: 0 };
    stats[categoryId].correct += correct;
    stats[categoryId].wrong  += wrong;
    localStorage.setItem("quizmo_stats", JSON.stringify(stats));
  } catch (e) {
    console.warn("İstatistik kaydedilemedi:", e);
  }
}

export function getLocalStats() {
  try {
    return JSON.parse(localStorage.getItem("quizmo_stats") || "{}");
  } catch {
    return {};
  }
}

/* ─────────────────────────────────────
   WEEKLY SCORE (Firestore)
───────────────────────────────────── */
export async function saveWeeklyScore(playerName, score) {
  if (!playerName || playerName === "Misafir" || score <= 0) return;
  const week  = getWeekString();
  const docId = `${week}_${playerName.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
  try {
    await setDoc(doc(db, "weekly_scores", docId), {
      playerName,
      week,
      totalScore:  increment(score),
      gamesPlayed: increment(1),
      updatedAt:   serverTimestamp(),
    }, { merge: true });
  } catch (err) {
    console.warn("Haftalık skor kaydedilemedi:", err);
  }
}

/* Hafta numarasına göre tekrarlanabilir ama değişken bot skorları */
const LEADERBOARD_BOTS = [
  { playerName: "murat41",     base: 920 },
  { playerName: "busee_99",    base: 840 },
  { playerName: "tolga2001",   base: 780 },
  { playerName: "sinem_kayaa", base: 710 },
  { playerName: "oguz_han26",  base: 660 },
  { playerName: "ceren_ist34", base: 620 },
  { playerName: "yusuf_efe06", base: 580 },
  { playerName: "ayse_nurr",   base: 540 },
  { playerName: "hakan_v",     base: 500 },
  { playerName: "yasemin_7",   base: 460 },
];

function getBotLeaderboard(week) {
  const wn = parseInt(week.split("-W")[1]) || 1;
  return LEADERBOARD_BOTS.map((b, i) => ({
    playerName:  b.playerName,
    totalScore:  b.base + ((wn * (i * 13 + 7)) % 180) - 90,
    gamesPlayed: 4 + ((wn * (i + 3)) % 6),
    week,
    isBot:       true,
  }));
}

export async function getWeeklyTop3() {
  const week = getWeekString();
  try {
    const q    = query(collection(db, "weekly_scores"), where("week", "==", week));
    const snap = await getDocs(q);
    const real = snap.docs.map(d => d.data());

    // Gerçek oyuncular önce gelsin; botlar eksik yerleri doldursun
    const realNames = new Set(real.map(e => e.playerName));
    const bots      = getBotLeaderboard(week).filter(b => !realNames.has(b.playerName));

    return [...real, ...bots]
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 3);
  } catch (err) {
    console.warn("Haftalık sıralama alınamadı:", err);
    return getBotLeaderboard(week).slice(0, 3);
  }
}
