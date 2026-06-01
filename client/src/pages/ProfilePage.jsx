import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Particles from "../components/Particles";
import { getLocalStats } from "../utils/stats";
import { CATEGORIES } from "../data/categories";
import { ACHIEVEMENTS, getUnlockedAchievements, getGameHistory } from "../utils/achievements";
import { THEMES, applyTheme, getSavedThemeId } from "../utils/theme";

/* ── Sabit veriler ── */

const FREE_AVATARS = [
  { emoji: "😊", name: "Mutlu"   },
  { emoji: "🎮", name: "Oyuncu" },
  { emoji: "🧠", name: "Deha"   },
  { emoji: "🌟", name: "Yıldız" },
  { emoji: "🔥", name: "Ateş"   },
];

const PREMIUM_AVATARS = [
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

const KEYFRAMES = `
@keyframes glow-gold    { 0%,100%{box-shadow:0 0 12px 3px #ffd70066,0 0 24px 6px #f59e0b33} 50%{box-shadow:0 0 22px 8px #ffd700aa,0 0 44px 14px #f59e0b55} }
@keyframes glow-purple  { 0%,100%{box-shadow:0 0 12px 3px #8b5cf666} 50%{box-shadow:0 0 22px 8px #a855f7aa} }
@keyframes glow-cyan    { 0%,100%{box-shadow:0 0 12px 3px #06b6d466} 50%{box-shadow:0 0 22px 8px #0ea5e9aa} }
@keyframes glow-amber   { 0%,100%{box-shadow:0 0 12px 3px #f59e0b66} 50%{box-shadow:0 0 22px 8px #fbbf24aa} }
@keyframes glow-yellow  { 0%,100%{box-shadow:0 0 12px 3px #eab30866} 50%{box-shadow:0 0 22px 8px #fde04799} }
@keyframes glow-blue    { 0%,100%{box-shadow:0 0 12px 3px #3b82f666} 50%{box-shadow:0 0 22px 8px #60a5faaa} }
@keyframes glow-orange  { 0%,100%{box-shadow:0 0 12px 3px #f9731666} 50%{box-shadow:0 0 22px 8px #fb923caa} }
@keyframes glow-grey    { 0%,100%{box-shadow:0 0 10px 2px #94a3b844} 50%{box-shadow:0 0 18px 6px #cbd5e177} }
@keyframes glow-pink    { 0%,100%{box-shadow:0 0 12px 3px #f472b666} 50%{box-shadow:0 0 22px 8px #fb7185aa} }
@keyframes glow-red     { 0%,100%{box-shadow:0 0 12px 3px #ef444466} 50%{box-shadow:0 0 22px 8px #f87171aa} }
@keyframes glow-indigo  { 0%,100%{box-shadow:0 0 12px 3px #6366f166} 50%{box-shadow:0 0 22px 8px #818cf8aa} }
@keyframes glow-green   { 0%,100%{box-shadow:0 0 12px 3px #10b98166} 50%{box-shadow:0 0 22px 8px #34d39999} }
@keyframes glow-rainbow {
  0%  {box-shadow:0 0 16px 5px #ec489966}
  25% {box-shadow:0 0 16px 5px #8b5cf666}
  50% {box-shadow:0 0 16px 5px #06b6d466}
  75% {box-shadow:0 0 16px 5px #f59e0b66}
  100%{box-shadow:0 0 16px 5px #ec489966}
}
@keyframes float-avatar { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
@keyframes shimmer-slide { 0%{left:-100%} 50%{left:120%} 100%{left:120%} }
`;

function getClientId() {
  let id = localStorage.getItem("quizmo_client_id");
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("quizmo_client_id", id);
  }
  return id;
}

const SERVER = import.meta.env.VITE_SERVER_URL || "http://localhost:3001";

/* ══════════════════════════════
   İSTATİSTİK GRAFIK SEKMESİ
══════════════════════════════ */
function StatsTab() {
  const stats   = getLocalStats();
  const history = getGameHistory();

  const totalCorrect = Object.values(stats).reduce((s, c) => s + (c.correct || 0), 0);
  const totalWrong   = Object.values(stats).reduce((s, c) => s + (c.wrong   || 0), 0);
  const totalGames   = history.length;
  const accuracy     = totalCorrect + totalWrong > 0
    ? Math.round((totalCorrect / (totalCorrect + totalWrong)) * 100)
    : 0;

  // Kategori bazlı veriler, en çok doğrudan sırala, top 8
  const catData = CATEGORIES
    .map((cat) => ({
      ...cat,
      correct: stats[cat.id]?.correct || 0,
      wrong:   stats[cat.id]?.wrong   || 0,
    }))
    .filter((c) => c.correct + c.wrong > 0)
    .sort((a, b) => b.correct - a.correct)
    .slice(0, 8);

  const maxVal = catData.reduce((m, c) => Math.max(m, c.correct + c.wrong), 1);

  // Son 10 oyun
  const recent = [...history].reverse().slice(0, 10);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

      {/* Özet kartlar */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {[
          { label: "Oyun",    value: totalGames,   color: "#6366f1", icon: "🎮" },
          { label: "Doğru",   value: totalCorrect, color: "#10b981", icon: "✅" },
          { label: "Yanlış",  value: totalWrong,   color: "#ef4444", icon: "❌" },
          { label: "Başarı",  value: `%${accuracy}`, color: "#f59e0b", icon: "🎯" },
        ].map((s) => (
          <div key={s.label} className="glass-card" style={{ padding: "18px 16px", textAlign: "center" }}>
            <div style={{ fontSize: "1.6rem", marginBottom: "4px" }}>{s.icon}</div>
            <div style={{ fontWeight: 900, fontSize: "1.55rem", color: s.color }}>{s.value}</div>
            <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", fontWeight: 600, marginTop: "3px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Kategori bar chart */}
      {catData.length > 0 ? (
        <div className="glass-card" style={{ padding: "22px" }}>
          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "18px" }}>
            📊 Kategori Performansı
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {catData.map((cat) => {
              const total   = cat.correct + cat.wrong;
              const accPct  = Math.round((cat.correct / total) * 100);
              const barW    = Math.round((total / maxVal) * 100);
              const correctW = total > 0 ? Math.round((cat.correct / total) * barW) : 0;
              return (
                <div key={cat.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>
                      {cat.icon} {cat.name}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)" }}>
                      {cat.correct}/{total} · %{accPct}
                    </span>
                  </div>
                  <div style={{ height: "10px", background: "rgba(255,255,255,0.07)", borderRadius: "6px", overflow: "hidden", position: "relative" }}>
                    {/* toplam bar (yanlış kısmı) */}
                    <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${barW}%`, background: "rgba(239,68,68,0.35)", borderRadius: "6px" }} />
                    {/* doğru kısım */}
                    <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${correctW}%`, background: cat.color || "#7c3aed", borderRadius: "6px", boxShadow: `0 0 6px ${cat.color || "#7c3aed"}88`, transition: "width 0.8s ease" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="glass-card" style={{ padding: "40px", textAlign: "center" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>🎮</div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>
            Henüz oyun oynamadın.<br />İstatistikler burada görünecek!
          </div>
        </div>
      )}

      {/* Son oyunlar */}
      {recent.length > 0 && (
        <div className="glass-card" style={{ padding: "22px" }}>
          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "14px" }}>
            🕒 Son Oyunlar
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {recent.map((g, i) => {
              const cat     = CATEGORIES.find((c) => c.id === g.categoryId);
              const total   = g.correct + g.wrong;
              const pct     = total > 0 ? Math.round((g.correct / total) * 100) : 0;
              const color   = pct >= 80 ? "#10b981" : pct >= 50 ? "#f59e0b" : "#ef4444";
              const date    = new Date(g.date).toLocaleDateString("tr-TR", { day: "numeric", month: "short" });
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <span style={{ fontSize: "1.3rem" }}>{cat?.icon || "🎮"}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: "0.88rem" }}>{cat?.name || g.categoryId}</div>
                    <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)" }}>{date} · {g.isMultiplayer ? "Çok oyunculu" : "Tek oyunculu"}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 800, fontSize: "0.92rem", color }}>{g.correct}/{total}</div>
                    <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)" }}>%{pct}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════
   BAŞARIMLAR SEKMESİ
══════════════════════════════ */
function AchievementsTab() {
  const unlocked = getUnlockedAchievements();
  const unlockedCount = Object.keys(unlocked).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* İlerleme */}
      <div className="glass-card" style={{ padding: "20px", display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ fontSize: "2rem" }}>🏅</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: "1rem", marginBottom: "6px" }}>
            {unlockedCount} / {ACHIEVEMENTS.length} Başarım
          </div>
          <div style={{ height: "8px", background: "rgba(255,255,255,0.08)", borderRadius: "4px", overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${Math.round((unlockedCount / ACHIEVEMENTS.length) * 100)}%`,
              background: "linear-gradient(90deg, #7c3aed, #ec4899)",
              borderRadius: "4px",
              transition: "width 0.8s ease",
              boxShadow: "0 0 8px #7c3aed",
            }} />
          </div>
        </div>
        <div style={{ fontWeight: 900, fontSize: "1.1rem", color: "#c084fc" }}>
          %{Math.round((unlockedCount / ACHIEVEMENTS.length) * 100)}
        </div>
      </div>

      {/* Achievement ızgara */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {ACHIEVEMENTS.map((ach) => {
          const isUnlocked = !!unlocked[ach.id];
          const unlockedAt = unlocked[ach.id]
            ? new Date(unlocked[ach.id]).toLocaleDateString("tr-TR", { day: "numeric", month: "short" })
            : null;
          return (
            <div
              key={ach.id}
              className="glass-card"
              style={{
                padding: "16px 14px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                opacity: isUnlocked ? 1 : 0.45,
                border: `1px solid ${isUnlocked ? ach.color + "55" : "rgba(255,255,255,0.08)"}`,
                background: isUnlocked
                  ? `linear-gradient(135deg, ${ach.color}18, ${ach.color}08)`
                  : "rgba(255,255,255,0.04)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ fontSize: "2rem", filter: isUnlocked ? "none" : "grayscale(1)" }}>
                {isUnlocked ? ach.emoji : "🔒"}
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: "0.88rem", color: isUnlocked ? "white" : "rgba(255,255,255,0.5)" }}>
                  {ach.name}
                </div>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginTop: "3px", lineHeight: 1.35 }}>
                  {ach.description}
                </div>
              </div>
              {isUnlocked && (
                <div style={{ fontSize: "0.65rem", color: ach.color, fontWeight: 700 }}>
                  ✓ {unlockedAt}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════
   TEMALAR SEKMESİ
══════════════════════════════ */
function ThemesTab() {
  const [activeTheme, setActiveTheme] = useState(getSavedThemeId());

  const handleSelect = (themeId) => {
    setActiveTheme(themeId);
    applyTheme(themeId);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>
        Renk Teması Seç
      </div>
      {THEMES.map((theme) => {
        const selected = activeTheme === theme.id;
        return (
          <button
            key={theme.id}
            onClick={() => handleSelect(theme.id)}
            style={{
              width: "100%",
              padding: "0",
              borderRadius: "18px",
              border: `2px solid ${selected ? theme.accent : "rgba(255,255,255,0.1)"}`,
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: selected ? `0 0 20px ${theme.accent}55` : "none",
              transform: selected ? "scale(1.02)" : "scale(1)",
            }}
          >
            {/* Önizleme gradient */}
            <div style={{ height: "70px", background: theme.gradient, position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "flex-start", padding: "0 20px", gap: "12px" }}>
                <div style={{ fontSize: "1.8rem" }}>{theme.emoji}</div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontWeight: 800, fontSize: "1rem", color: "white" }}>{theme.name}</div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)" }}>
                    Vurgu: {theme.accent}
                  </div>
                </div>
              </div>
              {/* Accent color circles */}
              <div style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", display: "flex", gap: "6px" }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: theme.accent }} />
                <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: theme.accent2 }} />
              </div>
            </div>
            {selected && (
              <div style={{ background: `${theme.accent}22`, padding: "8px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 800, color: theme.accent }}>✓ Aktif Tema</span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════
   ANA BİLEŞEN
══════════════════════════════ */
export default function ProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profil");

  const [name,   setName  ] = useState(() => localStorage.getItem("quizmo_profile_name")   || "");
  const [avatar, setAvatar] = useState(() => localStorage.getItem("quizmo_profile_avatar") || "😊");

  const [nameStatus, setNameStatus] = useState("idle");
  const [saveState,  setSaveState ] = useState("idle");

  const debounceRef = useRef(null);

  const checkName = useCallback((val) => {
    const trimmed = val.trim();
    if (!trimmed) { setNameStatus("idle");  return; }
    if (trimmed.length < 2) { setNameStatus("short"); return; }

    setNameStatus("checking");
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const clientId = getClientId();
        const res  = await fetch(
          `${SERVER}/check-username?name=${encodeURIComponent(trimmed)}&clientId=${clientId}`,
          { signal: AbortSignal.timeout(4000) }
        );
        const data = await res.json();
        setNameStatus(data.available ? "available" : "taken");
      } catch {
        setNameStatus("available");
      }
    }, 600);
  }, []);

  useEffect(() => {
    checkName(name);
    return () => clearTimeout(debounceRef.current);
  }, [name, checkName]);

  async function handleSave() {
    const trimmed = name.trim();
    if (!trimmed || nameStatus === "taken" || nameStatus === "short") return;

    setSaveState("saving");
    const clientId = getClientId();

    try {
      const res  = await fetch(`${SERVER}/register-username`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed, clientId }),
        signal: AbortSignal.timeout(4000),
      });
      const data = await res.json();
      if (!data.success && data.reason === "taken") {
        setNameStatus("taken");
        setSaveState("error");
        setTimeout(() => setSaveState("idle"), 2500);
        return;
      }
    } catch {}

    localStorage.setItem("quizmo_profile_name",   trimmed);
    localStorage.setItem("quizmo_profile_avatar", avatar);
    setSaveState("done");
    setTimeout(() => setSaveState("idle"), 2200);
  }

  const allAvatars   = [...FREE_AVATARS, ...PREMIUM_AVATARS];
  const currentMeta  = allAvatars.find((a) => a.emoji === avatar);
  const isPremium    = PREMIUM_AVATARS.some((a) => a.emoji === avatar);

  const nameStatusColor = {
    available: "#10b981", taken: "#ef4444", checking: "#f59e0b",
    short: "#f59e0b", idle: "transparent",
  }[nameStatus];

  const nameStatusText = {
    available: "✅ Kullanıcı adı müsait",
    taken:     "❌ Bu kullanıcı adı alınmış",
    checking:  "⏳ Kontrol ediliyor...",
    short:     "⚠️ En az 2 karakter gir",
    idle:      "",
  }[nameStatus];

  const canSave = name.trim().length >= 2
    && nameStatus !== "taken"
    && nameStatus !== "short"
    && saveState !== "saving";

  const TABS = [
    { id: "profil",     label: "👤 Profil"     },
    { id: "stats",      label: "📊 İstatistik" },
    { id: "achievements", label: "🏅 Başarım"  },
    { id: "themes",     label: "🎨 Tema"       },
  ];

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <style>{KEYFRAMES}</style>
      <Particles />

      <div style={{ position: "fixed", top: "-20%", right: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-20%", left: "-10%",  width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "600px", margin: "0 auto", padding: "36px 20px 60px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
          <button onClick={() => navigate(-1)} className="btn-secondary" style={{ padding: "10px 16px" }}>
            ← Geri
          </button>
          <div>
            <h2 style={{ fontWeight: 800, fontSize: "1.6rem", margin: 0 }}>👤 Profilim</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginTop: "4px" }}>
              {name.trim() || "İsimsiz Kahraman"}
            </p>
          </div>
        </div>

        {/* Tab bar */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "22px", overflowX: "auto", scrollbarWidth: "none" }}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flexShrink: 0,
                padding: "9px 16px",
                borderRadius: "12px",
                border: activeTab === tab.id ? "none" : "1px solid rgba(255,255,255,0.12)",
                background: activeTab === tab.id
                  ? "linear-gradient(135deg, #7c3aed, #6366f1)"
                  : "rgba(255,255,255,0.06)",
                color: activeTab === tab.id ? "white" : "rgba(255,255,255,0.55)",
                fontFamily: "Nunito, sans-serif",
                fontWeight: 700,
                fontSize: "0.82rem",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: activeTab === tab.id ? "0 4px 16px rgba(124,58,237,0.4)" : "none",
                whiteSpace: "nowrap",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profil sekmesi */}
        {activeTab === "profil" && (
          <>
            {/* Seçili Avatar Önizleme */}
            <div
              className="glass-card"
              style={{
                padding: "28px",
                marginBottom: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                background: "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(6,182,212,0.08))",
              }}
            >
              <div
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.07)",
                  border: `2px solid ${currentMeta?.glow || "rgba(255,255,255,0.2)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "3rem",
                  animation: "float-avatar 3s ease-in-out infinite",
                  boxShadow: currentMeta?.glow ? `0 0 24px 6px ${currentMeta.glow}55` : "none",
                }}
              >
                {avatar}
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontWeight: 800, fontSize: "1.15rem", color: "white" }}>
                  {name.trim() || "İsimsiz Kahraman"}
                </div>
                <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", marginTop: "3px" }}>
                  {currentMeta?.name || ""}
                  {isPremium && (
                    <span style={{ marginLeft: "6px", color: "#fbbf24", fontWeight: 700 }}>✦ PREMIUM</span>
                  )}
                </div>
              </div>
            </div>

            {/* Kullanıcı Adı */}
            <div className="glass-card" style={{ padding: "22px", marginBottom: "20px" }}>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "rgba(255,255,255,0.45)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Kullanıcı Adı
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Kullanıcı adın..."
                maxLength={20}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.07)",
                  border: `1.5px solid ${
                    nameStatus === "available" ? "rgba(16,185,129,0.6)"
                    : nameStatus === "taken"   ? "rgba(239,68,68,0.6)"
                    : "rgba(255,255,255,0.15)"
                  }`,
                  borderRadius: "12px",
                  padding: "12px 16px",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: 600,
                  outline: "none",
                  fontFamily: "Nunito, sans-serif",
                  boxSizing: "border-box",
                  transition: "border-color 0.25s",
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "7px", alignItems: "center" }}>
                <span style={{ fontSize: "0.72rem", color: nameStatusColor, fontWeight: 600, transition: "color 0.2s" }}>
                  {nameStatusText}
                </span>
                <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.25)" }}>
                  {name.length}/20
                </span>
              </div>
            </div>

            {/* Ücretsiz Avatarlar */}
            <div className="glass-card" style={{ padding: "22px", marginBottom: "16px" }}>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "16px" }}>
                ✅ Ücretsiz Avatarlar
              </div>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {FREE_AVATARS.map((av) => {
                  const selected = avatar === av.emoji;
                  return (
                    <button
                      key={av.emoji}
                      onClick={() => setAvatar(av.emoji)}
                      title={av.name}
                      style={{
                        width: "68px", height: "68px", borderRadius: "16px",
                        background: selected
                          ? "linear-gradient(135deg, rgba(124,58,237,0.4), rgba(6,182,212,0.3))"
                          : "rgba(255,255,255,0.06)",
                        border: selected
                          ? "2px solid rgba(124,58,237,0.8)"
                          : "1.5px solid rgba(255,255,255,0.1)",
                        cursor: "pointer", fontSize: "1.9rem",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.2s ease",
                        transform: selected ? "translateY(-3px)" : "translateY(0)",
                        boxShadow: selected ? "0 8px 24px rgba(124,58,237,0.4)" : "none",
                        position: "relative",
                      }}
                    >
                      {av.emoji}
                      {selected && (
                        <div style={{ position: "absolute", bottom: "4px", right: "4px", width: "14px", height: "14px", borderRadius: "50%", background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.5rem", color: "white", fontWeight: 900 }}>✓</div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Premium Avatarlar */}
            <div className="glass-card" style={{ padding: "22px", marginBottom: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  👑 Premium Karakterler
                </span>
                <span style={{ fontSize: "0.65rem", fontWeight: 800, color: "#fbbf24", background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.3)", borderRadius: "20px", padding: "2px 9px" }}>
                  DEMO
                </span>
              </div>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {PREMIUM_AVATARS.map((av) => {
                  const selected = avatar === av.emoji;
                  return (
                    <button
                      key={av.emoji}
                      onClick={() => setAvatar(av.emoji)}
                      title={av.name}
                      style={{
                        width: "68px", height: "68px", borderRadius: "16px",
                        background: selected
                          ? `linear-gradient(135deg, ${av.glow}33, ${av.glow}18)`
                          : `linear-gradient(135deg, ${av.glow}18, ${av.glow}08)`,
                        border: selected ? `2px solid ${av.glow}cc` : `1.5px solid ${av.glow}44`,
                        cursor: "pointer", fontSize: "1.9rem",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        position: "relative", overflow: "hidden",
                        animation: `${av.anim} 2.5s ease-in-out infinite`,
                        transform: selected ? "translateY(-3px)" : "translateY(0)",
                        transition: "transform 0.2s ease, border-color 0.2s ease, background 0.2s ease",
                      }}
                    >
                      {av.emoji}
                      {selected && (
                        <div style={{ position: "absolute", bottom: "4px", right: "4px", width: "14px", height: "14px", borderRadius: "50%", background: av.glow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.5rem", color: "white", fontWeight: 900 }}>✓</div>
                      )}
                      <div style={{ position: "absolute", top: 0, left: "-100%", width: "60%", height: "100%", background: `linear-gradient(90deg, transparent, ${av.glow}33, transparent)`, animation: "shimmer-slide 3s ease-in-out infinite" }} />
                    </button>
                  );
                })}
              </div>
              <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", margin: "14px 0 0", textAlign: "center" }}>
                Premium karakterler yakında satın alınabilecek ✨
              </p>
            </div>

            {/* Kaydet */}
            <button
              onClick={handleSave}
              disabled={!canSave}
              style={{
                width: "100%", padding: "16px", borderRadius: "16px", border: "none",
                background:
                  saveState === "done"  ? "linear-gradient(135deg, #10b981, #059669)"
                  : saveState === "error" ? "linear-gradient(135deg, #ef4444, #dc2626)"
                  : !canSave             ? "rgba(255,255,255,0.08)"
                  :                        "linear-gradient(135deg, #7c3aed, #6366f1)",
                color: !canSave ? "rgba(255,255,255,0.3)" : "white",
                fontSize: "1.05rem", fontWeight: 800,
                cursor: canSave ? "pointer" : "not-allowed",
                transition: "all 0.3s ease",
                boxShadow:
                  saveState === "done"  ? "0 8px 30px rgba(16,185,129,0.4)"
                  : saveState === "error" ? "0 8px 30px rgba(239,68,68,0.3)"
                  : canSave              ? "0 8px 30px rgba(124,58,237,0.4)"
                  :                        "none",
                fontFamily: "Nunito, sans-serif",
              }}
            >
              {saveState === "saving" ? "⏳ Kaydediliyor..."
               : saveState === "done"  ? "✅ Kaydedildi!"
               : saveState === "error" ? "❌ Kullanıcı adı alınmış"
               : "💾 Profili Kaydet"}
            </button>
          </>
        )}

        {activeTab === "stats" && <StatsTab />}
        {activeTab === "achievements" && <AchievementsTab />}
        {activeTab === "themes" && <ThemesTab />}
      </div>
    </div>
  );
}
