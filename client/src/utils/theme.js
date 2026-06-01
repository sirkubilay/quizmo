export const THEMES = [
  {
    id: "purple",
    name: "Mor",
    emoji: "🔮",
    gradient: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    accent: "#7c3aed",
    accent2: "#ec4899",
  },
  {
    id: "ocean",
    name: "Okyanus",
    emoji: "🌊",
    gradient: "linear-gradient(135deg, #0c1a2e 0%, #0a3d62 50%, #1a2a4a 100%)",
    accent: "#0ea5e9",
    accent2: "#06b6d4",
  },
  {
    id: "forest",
    name: "Orman",
    emoji: "🌲",
    gradient: "linear-gradient(135deg, #0a1f0a 0%, #1a3a1a 50%, #0f2a0f 100%)",
    accent: "#10b981",
    accent2: "#34d399",
  },
  {
    id: "midnight",
    name: "Gece",
    emoji: "🌙",
    gradient: "linear-gradient(135deg, #050505 0%, #0f0f0f 50%, #1a1a2e 100%)",
    accent: "#ec4899",
    accent2: "#f472b6",
  },
  {
    id: "sunset",
    name: "Gün Batımı",
    emoji: "🌅",
    gradient: "linear-gradient(135deg, #1a0a00 0%, #3d1a00 50%, #2a1020 100%)",
    accent: "#f97316",
    accent2: "#ef4444",
  },
  {
    id: "ice",
    name: "Buz",
    emoji: "❄️",
    gradient: "linear-gradient(135deg, #050d1a 0%, #0a1a2e 50%, #0d2040 100%)",
    accent: "#bae6fd",
    accent2: "#e0f2fe",
  },
  {
    id: "gold",
    name: "Altın",
    emoji: "✨",
    gradient: "linear-gradient(135deg, #1a1200 0%, #2d2000 50%, #1a1500 100%)",
    accent: "#fbbf24",
    accent2: "#fcd34d",
  },
  {
    id: "sakura",
    name: "Sakura",
    emoji: "🌸",
    gradient: "linear-gradient(135deg, #1a0a14 0%, #2d1428 50%, #1a0a1a 100%)",
    accent: "#f472b6",
    accent2: "#e879f9",
  },
];

export function applyTheme(themeId) {
  const theme = THEMES.find((t) => t.id === themeId) || THEMES[0];
  document.documentElement.style.setProperty("--accent", theme.accent);
  document.documentElement.style.setProperty("--accent2", theme.accent2);
  document.documentElement.style.setProperty("--body-bg", theme.gradient);
  document.body.style.background = theme.gradient;
  localStorage.setItem("quizmo_theme", theme.id);
}

export function getSavedThemeId() {
  return localStorage.getItem("quizmo_theme") || "purple";
}

/* ── Renk körlüğü ── */
export const COLORBLIND_MODES = [
  { id: "none",         name: "Normal",              emoji: "👁️", filter: "none" },
  { id: "protanopia",   name: "Protanopi",            emoji: "🔴", filter: "url(#cb-protanopia)"   },
  { id: "deuteranopia", name: "Deuteranopi",          emoji: "🟢", filter: "url(#cb-deuteranopia)" },
  { id: "tritanopia",   name: "Tritanopi",            emoji: "🔵", filter: "url(#cb-tritanopia)"   },
  { id: "grayscale",    name: "Tam Renk Körlüğü",     emoji: "⬜", filter: "grayscale(100%)"        },
];

export function applyColorblindMode(modeId) {
  const mode = COLORBLIND_MODES.find((m) => m.id === modeId) || COLORBLIND_MODES[0];
  document.body.style.filter = mode.id === "none" ? "" : mode.filter;
  localStorage.setItem("quizmo_colorblind", mode.id);
}

export function getSavedColorblindMode() {
  return localStorage.getItem("quizmo_colorblind") || "none";
}
