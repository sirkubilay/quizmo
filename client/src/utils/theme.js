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
