export const FREE_AVATARS = [
  { emoji: "😊", name: "Mutlu"   },
  { emoji: "🎮", name: "Oyuncu" },
  { emoji: "🧠", name: "Deha"   },
  { emoji: "🌟", name: "Yıldız" },
  { emoji: "🔥", name: "Ateş"   },
];

export const PREMIUM_AVATARS = [
  { emoji: "👑", name: "Kral",      glow: "#ffd700", anim: "glow-gold"    },
  { emoji: "🐉", name: "Ejderha",   glow: "#8b5cf6", anim: "glow-purple"  },
  { emoji: "💎", name: "Elmas",     glow: "#06b6d4", anim: "glow-cyan"    },
  { emoji: "🦁", name: "Aslan",     glow: "#f59e0b", anim: "glow-amber"   },
  { emoji: "🔮", name: "Büyücü",    glow: "#a855f7", anim: "glow-purple"  },
  { emoji: "⚡", name: "Şimşek",    glow: "#eab308", anim: "glow-yellow"  },
  { emoji: "🌙", name: "Gece",      glow: "#3b82f6", anim: "glow-blue"    },
  { emoji: "🎭", name: "Tiyatrocu", glow: "#ec4899", anim: "glow-rainbow" },
  { emoji: "🏆", name: "Şampiyon",  glow: "#fbbf24", anim: "glow-gold"    },
  { emoji: "🦊", name: "Tilki",     glow: "#f97316", anim: "glow-orange"  },
  { emoji: "🐺", name: "Kurt",      glow: "#94a3b8", anim: "glow-grey"    },
  { emoji: "🦋", name: "Kelebek",   glow: "#f472b6", anim: "glow-pink"    },
  { emoji: "🌊", name: "Deniz",     glow: "#0ea5e9", anim: "glow-blue"    },
  { emoji: "🎯", name: "Nişancı",   glow: "#ef4444", anim: "glow-red"     },
  { emoji: "🚀", name: "Astronot",  glow: "#6366f1", anim: "glow-indigo"  },
  { emoji: "🐲", name: "Mitoloji",  glow: "#10b981", anim: "glow-green"   },
  { emoji: "🧿", name: "Nazar",     glow: "#0284c7", anim: "glow-blue"    },
  { emoji: "🦅", name: "Kartal",    glow: "#d97706", anim: "glow-amber"   },
  { emoji: "💀", name: "Hayalet",   glow: "#e2e8f0", anim: "glow-grey"    },
  { emoji: "🌈", name: "Gökkuşağı", glow: "#ec4899", anim: "glow-rainbow" },
];

export const ALL_AVATARS = [...FREE_AVATARS, ...PREMIUM_AVATARS];

export function getAvatarMeta(emoji) {
  return ALL_AVATARS.find((a) => a.emoji === emoji) || null;
}

export function isPremium(emoji) {
  return PREMIUM_AVATARS.some((a) => a.emoji === emoji);
}
