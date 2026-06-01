import { addXP } from "./xp";

const QUEST_POOL = [
  { id: "q-10-correct",  text: "Bugün 10 soru doğru cevapla",       icon: "✅", goal: 10,  type: "correct",     xp: 80  },
  { id: "q-20-correct",  text: "Bugün 20 soru doğru cevapla",       icon: "🎯", goal: 20,  type: "correct",     xp: 120 },
  { id: "q-2-games",     text: "Bugün 2 oyun tamamla",              icon: "🎮", goal: 2,   type: "games",       xp: 60  },
  { id: "q-3-games",     text: "Bugün 3 oyun tamamla",              icon: "🕹️", goal: 3,   type: "games",       xp: 90  },
  { id: "q-1-mp",        text: "Bir multiplayer oyun oyna",         icon: "👥", goal: 1,   type: "multiplayer", xp: 100 },
  { id: "q-80pct",       text: "%80 başarıyla bir oyun bitir",      icon: "🏅", goal: 1,   type: "highscore",   xp: 100 },
  { id: "q-joker",       text: "Bir oyunda joker kullan",           icon: "🃏", goal: 1,   type: "joker",       xp: 50  },
  { id: "q-15-correct",  text: "Bugün 15 soru doğru cevapla",       icon: "🌟", goal: 15,  type: "correct",     xp: 100 },
  { id: "q-5-correct",   text: "Bugün 5 soru doğru cevapla",        icon: "✨", goal: 5,   type: "correct",     xp: 40  },
  { id: "q-100pct",      text: "Bir oyunda tüm soruları doğru bil", icon: "💎", goal: 1,   type: "perfect",     xp: 150 },
];

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function pickQuestForDay() {
  const d    = new Date();
  const idx  = (d.getFullYear() * 366 + d.getMonth() * 31 + d.getDate()) % QUEST_POOL.length;
  return QUEST_POOL[idx];
}

export function getDailyQuest() {
  try {
    const stored = JSON.parse(localStorage.getItem("quizmo_daily_quest") || "null");
    const today  = todayStr();
    if (stored && stored.date === today) return stored;

    const quest = pickQuestForDay();
    const fresh = { date: today, questId: quest.id, progress: 0, completed: false };
    localStorage.setItem("quizmo_daily_quest", JSON.stringify(fresh));
    return fresh;
  } catch {
    return null;
  }
}

export function getQuestDef(questId) {
  return QUEST_POOL.find((q) => q.id === questId) || null;
}

/* Oyun sonrası ilerleme güncelle. Returns true if newly completed. */
export function updateDailyQuestProgress(gameResult) {
  const state = getDailyQuest();
  if (!state || state.completed) return false;

  const def   = getQuestDef(state.questId);
  if (!def) return false;

  let delta = 0;
  const total = gameResult.correct + gameResult.wrong;
  const pct   = total > 0 ? gameResult.correct / total : 0;

  if      (def.type === "correct"     ) delta = gameResult.correct || 0;
  else if (def.type === "games"       ) delta = 1;
  else if (def.type === "multiplayer" ) delta = gameResult.isMultiplayer ? 1 : 0;
  else if (def.type === "highscore"   ) delta = pct >= 0.8 ? 1 : 0;
  else if (def.type === "joker"       ) delta = gameResult.allJokersUsed ? 1 : 0;
  else if (def.type === "perfect"     ) delta = gameResult.wrong === 0 && total >= 5 ? 1 : 0;

  if (delta === 0) return false;

  const newProgress = Math.min(state.progress + delta, def.goal);
  const completed   = newProgress >= def.goal;

  const updated = { ...state, progress: newProgress, completed };
  localStorage.setItem("quizmo_daily_quest", JSON.stringify(updated));

  if (completed && !state.completed) {
    addXP(def.xp);
    return true;
  }
  return false;
}
