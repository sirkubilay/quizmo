export const NAME_STYLES = [
  {
    id: "normal",
    name: "Normal",
    emoji: "⬜",
    style: {},
  },
  {
    id: "fire",
    name: "Ateşli",
    emoji: "🔥",
    style: {
      background: "linear-gradient(90deg, #ff4500, #ff8c00, #ffd700)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      filter: "drop-shadow(0 0 6px #ff6b0099)",
    },
  },
  {
    id: "neon",
    name: "Neon",
    emoji: "⚡",
    style: {
      color: "#00ff88",
      textShadow: "0 0 8px #00ff88, 0 0 18px #00ff8855",
    },
  },
  {
    id: "rainbow",
    name: "Gökkuşağı",
    emoji: "🌈",
    style: {
      background: "linear-gradient(90deg, #ff0080, #ff8c00, #ffff00, #00cc44, #00bfff, #9b59b6)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
  },
  {
    id: "gold",
    name: "Altın",
    emoji: "👑",
    style: {
      background: "linear-gradient(90deg, #ffd700, #ffa500, #ffd700)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      filter: "drop-shadow(0 0 6px #ffd70099)",
    },
  },
  {
    id: "ice",
    name: "Buz",
    emoji: "❄️",
    style: {
      background: "linear-gradient(90deg, #a0e6ff, #ffffff, #7dd3fc)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      filter: "drop-shadow(0 0 8px #7dd3fccc)",
    },
  },
  {
    id: "purple",
    name: "Mor",
    emoji: "🔮",
    style: {
      background: "linear-gradient(90deg, #c084fc, #a855f7, #ec4899)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      filter: "drop-shadow(0 0 6px #a855f799)",
    },
  },
  {
    id: "galaxy",
    name: "Galaksi",
    emoji: "🌌",
    style: {
      background: "linear-gradient(90deg, #6366f1, #a855f7, #06b6d4)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      filter: "drop-shadow(0 0 8px #6366f199)",
    },
  },
  {
    id: "lava",
    name: "Lav",
    emoji: "🌋",
    style: {
      background: "linear-gradient(90deg, #ef4444, #f97316, #fbbf24)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      filter: "drop-shadow(0 0 8px #ef444499)",
    },
  },
  {
    id: "matrix",
    name: "Matrix",
    emoji: "💻",
    style: {
      color: "#00ff00",
      textShadow: "0 0 6px #00ff00, 0 0 12px #00ff0055",
    },
  },
];

export function getSavedNameStyleId() {
  return localStorage.getItem("quizmo_name_style") || "normal";
}

export function saveNameStyleId(id) {
  localStorage.setItem("quizmo_name_style", id);
}

export function getNameStyleById(id) {
  return NAME_STYLES.find((s) => s.id === id) || NAME_STYLES[0];
}
