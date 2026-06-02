import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Particles from "../components/Particles";
import { getLocalStats } from "../utils/stats";
import { CATEGORIES } from "../data/categories";
import { ACHIEVEMENTS, getUnlockedAchievements, getGameHistory } from "../utils/achievements";
import { THEMES, applyTheme, getSavedThemeId } from "../utils/theme";
import { FONTS, applyFont, getSavedFontId } from "../utils/font";
import PlayerAvatar from "../components/PlayerAvatar";
import { FREE_AVATARS, PREMIUM_AVATARS, getAvatarMeta, isPremium as checkPremium } from "../data/avatars";


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
const PERIODS = [
  { id: "daily",   label: "Günlük",    ms: 86400000 },
  { id: "weekly",  label: "Haftalık",  ms: 7 * 86400000 },
  { id: "monthly", label: "Aylık",     ms: 30 * 86400000 },
  { id: "all",     label: "Tümü",      ms: Infinity },
];

const MODES = [
  { id: "all",    label: "Tümü",        icon: "🎮" },
  { id: "solo",   label: "Tek Oyuncu",  icon: "👤" },
  { id: "online", label: "Online",      icon: "🌐" },
];

function StatsTab() {
  const [period, setPeriod] = useState("all");
  const [mode,   setMode]   = useState("all");
  const allHistory = getGameHistory();

  const now     = Date.now();
  const periodMs = PERIODS.find((p) => p.id === period)?.ms ?? Infinity;
  const byPeriod = periodMs === Infinity
    ? allHistory
    : allHistory.filter((g) => now - g.date <= periodMs);

  const history = mode === "all"    ? byPeriod
    : mode === "solo"               ? byPeriod.filter((g) => !g.isMultiplayer)
    :                                 byPeriod.filter((g) =>  g.isMultiplayer);

  // Kategori istatistiklerini history'den türet (periyoda göre doğru)
  const catMap = {};
  history.forEach((g) => {
    if (!g.categoryId) return;
    if (!catMap[g.categoryId]) catMap[g.categoryId] = { correct: 0, wrong: 0 };
    catMap[g.categoryId].correct += g.correct || 0;
    catMap[g.categoryId].wrong   += g.wrong   || 0;
  });

  const totalCorrect = Object.values(catMap).reduce((s, c) => s + c.correct, 0);
  const totalWrong   = Object.values(catMap).reduce((s, c) => s + c.wrong,   0);
  const totalGames   = history.length;
  const accuracy     = totalCorrect + totalWrong > 0
    ? Math.round((totalCorrect / (totalCorrect + totalWrong)) * 100)
    : 0;

  const catData = CATEGORIES
    .map((cat) => ({
      ...cat,
      correct: catMap[cat.id]?.correct || 0,
      wrong:   catMap[cat.id]?.wrong   || 0,
    }))
    .filter((c) => c.correct + c.wrong > 0)
    .sort((a, b) => b.correct - a.correct)
    .slice(0, 8);

  const maxVal = catData.reduce((m, c) => Math.max(m, c.correct + c.wrong), 1);
  const recent = [...history].reverse().slice(0, 10);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

      {/* Periyot seçici */}
      <div style={{ display: "flex", gap: "8px" }}>
        {PERIODS.map((p) => (
          <button
            key={p.id}
            onClick={() => setPeriod(p.id)}
            style={{
              flex: 1,
              padding: "9px 4px",
              borderRadius: "12px",
              border: period === p.id ? "none" : "1px solid rgba(255,255,255,0.1)",
              background: period === p.id
                ? "linear-gradient(135deg, #7c3aed, #6366f1)"
                : "rgba(255,255,255,0.05)",
              color: period === p.id ? "white" : "rgba(255,255,255,0.45)",
              fontFamily: "Nunito, sans-serif",
              fontWeight: 700,
              fontSize: "0.78rem",
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: period === p.id ? "0 4px 14px rgba(124,58,237,0.4)" : "none",
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Mod seçici */}
      <div style={{ display: "flex", gap: "8px" }}>
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            style={{
              flex: 1,
              padding: "9px 4px",
              borderRadius: "12px",
              border: mode === m.id ? "none" : "1px solid rgba(255,255,255,0.1)",
              background: mode === m.id
                ? "linear-gradient(135deg, #0ea5e9, #6366f1)"
                : "rgba(255,255,255,0.05)",
              color: mode === m.id ? "white" : "rgba(255,255,255,0.45)",
              fontFamily: "Nunito, sans-serif",
              fontWeight: 700,
              fontSize: "0.75rem",
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: mode === m.id ? "0 4px 14px rgba(14,165,233,0.35)" : "none",
            }}
          >
            {m.icon} {m.label}
          </button>
        ))}
      </div>

      {/* Özet kartlar */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {[
          { label: "Oyun",    value: totalGames,     color: "#6366f1", icon: "🎮" },
          { label: "Doğru",   value: totalCorrect,   color: "#10b981", icon: "✅" },
          { label: "Yanlış",  value: totalWrong,     color: "#ef4444", icon: "❌" },
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
              const total    = cat.correct + cat.wrong;
              const accPct   = Math.round((cat.correct / total) * 100);
              const barW     = Math.round((total / maxVal) * 100);
              const correctW = total > 0 ? Math.round((cat.correct / total) * barW) : 0;
              return (
                <div key={cat.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>{cat.icon} {cat.name}</span>
                    <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)" }}>
                      {cat.correct}/{total} · %{accPct}
                    </span>
                  </div>
                  <div style={{ height: "10px", background: "rgba(255,255,255,0.07)", borderRadius: "6px", overflow: "hidden", position: "relative" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${barW}%`, background: "rgba(239,68,68,0.35)", borderRadius: "6px" }} />
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
            {period === "all" && mode === "all" ? "Henüz oyun oynamadın." : "Bu filtrelerle oyun bulunamadı."}<br />
            İstatistikler burada görünecek!
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
              const cat   = CATEGORIES.find((c) => c.id === g.categoryId);
              const total = g.correct + g.wrong;
              const pct   = total > 0 ? Math.round((g.correct / total) * 100) : 0;
              const color = pct >= 80 ? "#10b981" : pct >= 50 ? "#f59e0b" : "#ef4444";
              const date  = new Date(g.date).toLocaleDateString("tr-TR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <span style={{ fontSize: "1.3rem" }}>{cat?.icon || "🎮"}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: "0.88rem" }}>{cat?.name || g.categoryId}</div>
                    <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)" }}>{date} · {g.isMultiplayer ? "🌐 Online" : "👤 Tek oyunculu"}</div>
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
   ARKADAŞLAR SEKMESİ
══════════════════════════════ */
function FriendsTab() {
  const [friends, setFriends] = useState(() => {
    try { return JSON.parse(localStorage.getItem("quizmo_friends") || "[]"); } catch { return []; }
  });
  const [input, setInput] = useState("");
  const [error, setError]   = useState("");

  const saveFriends = (list) => {
    setFriends(list);
    localStorage.setItem("quizmo_friends", JSON.stringify(list));
  };

  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed || trimmed.length < 2) { setError("En az 2 karakter gir."); return; }
    if (friends.some(f => f.name.toLowerCase() === trimmed.toLowerCase())) { setError("Bu arkadaş zaten listende."); return; }
    if (friends.length >= 50) { setError("En fazla 50 arkadaş ekleyebilirsin."); return; }
    saveFriends([...friends, { name: trimmed, addedAt: Date.now() }]);
    setInput("");
    setError("");
  };

  const handleRemove = (name) => saveFriends(friends.filter(f => f.name !== name));

  const AVATARS = ["😊","🎮","🧠","🌟","🔥","👑","🐉","💎","🦁","🔮","⚡","🌙","🎭","🏆","🦊","🐺","🦋","🌊","🎯","🚀"];
  const getAvatar = (name) => AVATARS[name.charCodeAt(0) % AVATARS.length];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Ekle */}
      <div className="glass-card" style={{ padding: "20px" }}>
        <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px" }}>
          Arkadaş Ekle
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            value={input}
            onChange={e => { setInput(e.target.value); setError(""); }}
            onKeyDown={e => e.key === "Enter" && handleAdd()}
            placeholder="Kullanıcı adı gir..."
            maxLength={20}
            style={{ flex: 1, background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.15)", borderRadius: "12px", padding: "11px 14px", color: "white", fontFamily: "Nunito, sans-serif", fontSize: "0.92rem", outline: "none", boxSizing: "border-box" }}
          />
          <button
            onClick={handleAdd}
            style={{ padding: "11px 18px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg,#7c3aed,#6366f1)", color: "white", fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer" }}
          >
            Ekle
          </button>
        </div>
        {error && <div style={{ fontSize: "0.75rem", color: "#fca5a5", marginTop: "8px" }}>{error}</div>}
      </div>

      {/* Liste */}
      {friends.length === 0 ? (
        <div className="glass-card" style={{ padding: "36px", textAlign: "center" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}>👥</div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>Henüz arkadaş eklemedin.</div>
        </div>
      ) : (
        <div className="glass-card" style={{ padding: "20px" }}>
          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "14px" }}>
            {friends.length} Arkadaş
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {friends.map((f) => (
              <div key={f.name} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontSize: "1.6rem" }}>{getAvatar(f.name)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{f.name}</div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)" }}>
                    {new Date(f.addedAt).toLocaleDateString("tr-TR", { day: "numeric", month: "short" })} tarihinde eklendi
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(f.name)}
                  style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "8px", color: "#fca5a5", padding: "5px 10px", cursor: "pointer", fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "0.75rem" }}
                >
                  Çıkar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════
   YAZI TİPİ MODAL
══════════════════════════════ */
function FontModal({ onClose }) {
  const [activeFont, setActiveFont] = useState(getSavedFontId());

  const handleSelect = (fontId) => {
    setActiveFont(fontId);
    applyFont(fontId);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: "rgba(0,0,0,0.6)",
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: "600px",
          background: "rgba(15,12,41,0.98)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderTopLeftRadius: "28px", borderTopRightRadius: "28px",
          padding: "24px 20px 36px",
          boxShadow: "0 -24px 60px rgba(0,0,0,0.7)",
          animation: "sheet-up 0.32s cubic-bezier(0.34,1.3,0.64,1)",
          maxHeight: "80vh", overflowY: "auto",
        }}
      >
        <style>{`@keyframes sheet-up { from{transform:translateY(100%);opacity:0} to{transform:translateY(0);opacity:1} }`}</style>

        {/* Handle + başlık */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "22px" }}>
          <div style={{ width: "40px", height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.2)", marginBottom: "18px" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: "1.1rem" }}>✍️ Yazı Tipi</div>
              <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>Tüm oyun yazılarına yansır</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "0.65rem", fontWeight: 800, color: "#fbbf24", background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.3)", borderRadius: "20px", padding: "3px 10px" }}>
                DEMO
              </span>
              <button
                onClick={onClose}
                style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: "8px", color: "white", width: "30px", height: "30px", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* Font listesi */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {FONTS.map((font) => {
            const selected = activeFont === font.id;
            return (
              <button
                key={font.id}
                onClick={() => handleSelect(font.id)}
                style={{
                  display: "flex", alignItems: "center", gap: "14px",
                  padding: "14px 16px", borderRadius: "16px", cursor: "pointer",
                  border: `1.5px solid ${selected ? "#7c3aed" : "rgba(255,255,255,0.09)"}`,
                  background: selected
                    ? "linear-gradient(135deg, rgba(124,58,237,0.22), rgba(99,102,241,0.1))"
                    : "rgba(255,255,255,0.04)",
                  transition: "all 0.18s",
                  width: "100%",
                  boxShadow: selected ? "0 4px 16px rgba(124,58,237,0.25)" : "none",
                  transform: selected ? "scale(1.01)" : "scale(1)",
                }}
              >
                <div style={{ flex: 1, textAlign: "left" }}>
                  <div style={{ fontFamily: font.family, fontWeight: 700, fontSize: "1.05rem", color: "white", lineHeight: 1.3 }}>
                    {font.preview}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                    <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", fontFamily: "Nunito, sans-serif" }}>{font.name}</span>
                    {font.premium && (
                      <span style={{ fontSize: "0.6rem", fontWeight: 800, color: "#fbbf24" }}>✦ Premium</span>
                    )}
                    {!font.premium && (
                      <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "#10b981" }}>✓ Ücretsiz</span>
                    )}
                  </div>
                </div>
                {selected && (
                  <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", color: "white", fontWeight: 900, flexShrink: 0 }}>✓</div>
                )}
              </button>
            );
          })}
        </div>
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
  const [activeTab,      setActiveTab]      = useState("profil");
  const [showFontModal,  setShowFontModal]  = useState(false);

  const [name,   setName  ] = useState(() => localStorage.getItem("quizmo_profile_name")   || "");
  const [avatar, setAvatar] = useState(() => localStorage.getItem("quizmo_profile_avatar") || "😊");

  const [nameStatus, setNameStatus] = useState("idle");

  const debounceRef = useRef(null);

  const checkName = useCallback((val) => {
    const trimmed = val.trim();
    if (!trimmed) { setNameStatus("idle"); return; }
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
        if (data.available) {
          // Otomatik kaydet
          await fetch(`${SERVER}/register-username`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: trimmed, clientId }),
            signal: AbortSignal.timeout(4000),
          }).catch(() => {});
          localStorage.setItem("quizmo_profile_name", trimmed);
          window.dispatchEvent(new Event("quizmo-profile-updated"));
          setNameStatus("saved");
          setTimeout(() => setNameStatus("idle"), 2000);
        } else {
          setNameStatus("taken");
        }
      } catch {
        // Sunucu yoksa yine de yerel kaydet
        localStorage.setItem("quizmo_profile_name", val.trim());
        setNameStatus("saved");
        setTimeout(() => setNameStatus("idle"), 2000);
      }
    }, 800);
  }, []);

  useEffect(() => {
    checkName(name);
    return () => clearTimeout(debounceRef.current);
  }, [name, checkName]);

  const currentMeta = getAvatarMeta(avatar);
  const isPremium   = checkPremium(avatar);

  const nameStatusColor = {
    saved:    "#10b981", taken: "#ef4444", checking: "#f59e0b",
    short:    "#f59e0b", idle:  "transparent",
  }[nameStatus];

  const nameStatusText = {
    saved:    "✅ Kaydedildi",
    taken:    "❌ Bu kullanıcı adı alınmış",
    checking: "⏳ Kontrol ediliyor...",
    short:    "⚠️ En az 2 karakter gir",
    idle:     "",
  }[nameStatus];

  const TABS = [
    { id: "profil",       label: "👤 Profil"     },
    { id: "stats",        label: "📊 İstatistik" },
    { id: "achievements", label: "🏅 Başarım"    },
    { id: "friends",      label: "👥 Arkadaşlar" },
    { id: "themes",       label: "🎨 Tema"       },
  ];

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {showFontModal && <FontModal onClose={() => setShowFontModal(false)} />}
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
              <PlayerAvatar emoji={avatar} size={90} float={isPremium} style={{ borderRadius: "50%" }} />
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
              {/* Yazı tipi butonu */}
              <button
                onClick={() => setShowFontModal(true)}
                style={{
                  marginTop: "4px",
                  padding: "8px 18px",
                  borderRadius: "20px",
                  border: "1.5px solid rgba(251,191,36,0.35)",
                  background: "rgba(251,191,36,0.1)",
                  color: "#fcd34d",
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.2s",
                }}
              >
                ✍️ Yazı Tipi
              </button>
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
                      onClick={() => { setAvatar(av.emoji); localStorage.setItem("quizmo_profile_avatar", av.emoji); window.dispatchEvent(new Event("quizmo-profile-updated")); }}
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
                      onClick={() => { setAvatar(av.emoji); localStorage.setItem("quizmo_profile_avatar", av.emoji); window.dispatchEvent(new Event("quizmo-profile-updated")); }}
                      title={av.name}
                      style={{
                        padding: 0, background: "none", border: "none", cursor: "pointer",
                        transform: selected ? "translateY(-3px)" : "translateY(0)",
                        transition: "transform 0.2s ease",
                        position: "relative",
                      }}
                    >
                      <PlayerAvatar emoji={av.emoji} size={68} style={{ borderRadius: "16px", border: selected ? `2px solid ${av.glow}cc` : undefined }} />
                      {selected && (
                        <div style={{ position: "absolute", bottom: "4px", right: "4px", width: "14px", height: "14px", borderRadius: "50%", background: av.glow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.5rem", color: "white", fontWeight: 900, zIndex: 2 }}>✓</div>
                      )}
                    </button>
                  );
                })}
              </div>
              <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", margin: "14px 0 0", textAlign: "center" }}>
                Premium karakterler yakında satın alınabilecek ✨
              </p>
            </div>

          </>
        )}

        {activeTab === "stats" && <StatsTab />}
        {activeTab === "achievements" && <AchievementsTab />}
        {activeTab === "friends" && <FriendsTab />}
        {activeTab === "themes" && <ThemesTab />}
      </div>
    </div>
  );
}
