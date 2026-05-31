import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Particles from "../components/Particles";

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

/* ── Stabil client ID (localStorage) ── */
function getClientId() {
  let id = localStorage.getItem("quizmo_client_id");
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("quizmo_client_id", id);
  }
  return id;
}

const SERVER = "http://localhost:3001";

/* ── Bileşen ── */
export default function ProfilePage() {
  const navigate = useNavigate();

  const [name,   setName  ] = useState(() => localStorage.getItem("quizmo_profile_name")   || "");
  const [avatar, setAvatar] = useState(() => localStorage.getItem("quizmo_profile_avatar") || "😊");

  // "available" | "taken" | "checking" | "short" | "idle"
  const [nameStatus, setNameStatus] = useState("idle");
  const [saveState,  setSaveState ] = useState("idle"); // "idle" | "saving" | "done" | "error"

  const debounceRef = useRef(null);

  /* Kullanıcı adı kontrol (debounce 600ms) */
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
        // Sunucu kapalıysa geçerli say
        setNameStatus("available");
      }
    }, 600);
  }, []);

  useEffect(() => {
    checkName(name);
    return () => clearTimeout(debounceRef.current);
  }, [name, checkName]);

  /* Kaydet */
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
    } catch { /* sunucu kapalıysa sessizce geçe */ }

    localStorage.setItem("quizmo_profile_name",   trimmed);
    localStorage.setItem("quizmo_profile_avatar", avatar);
    setSaveState("done");
    setTimeout(() => setSaveState("idle"), 2200);
  }

  /* Yardımcı */
  const allAvatars = [...FREE_AVATARS, ...PREMIUM_AVATARS];
  const currentMeta = allAvatars.find((a) => a.emoji === avatar);
  const isPremium   = PREMIUM_AVATARS.some((a) => a.emoji === avatar);

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

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <style>{KEYFRAMES}</style>
      <Particles />

      <div style={{ position: "fixed", top: "-20%", right: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-20%", left: "-10%",  width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "600px", margin: "0 auto", padding: "36px 20px 60px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
          <button onClick={() => navigate(-1)} className="btn-secondary" style={{ padding: "10px 16px" }}>
            ← Geri
          </button>
          <div>
            <h2 style={{ fontWeight: 800, fontSize: "1.6rem", margin: 0 }}>👤 Profilim</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginTop: "4px" }}>
              Avatarını ve kullanıcı adını belirle
            </p>
          </div>
        </div>

        {/* ── Seçili Avatar Önizleme ── */}
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

        {/* ── Kullanıcı Adı ── */}
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
          {/* Status + char count */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "7px", alignItems: "center" }}>
            <span style={{ fontSize: "0.72rem", color: nameStatusColor, fontWeight: 600, transition: "color 0.2s" }}>
              {nameStatusText}
            </span>
            <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.25)" }}>
              {name.length}/20
            </span>
          </div>
        </div>

        {/* ── Ücretsiz Avatarlar ── */}
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
                    width: "68px",
                    height: "68px",
                    borderRadius: "16px",
                    background: selected
                      ? "linear-gradient(135deg, rgba(124,58,237,0.4), rgba(6,182,212,0.3))"
                      : "rgba(255,255,255,0.06)",
                    border: selected
                      ? "2px solid rgba(124,58,237,0.8)"
                      : "1.5px solid rgba(255,255,255,0.1)",
                    cursor: "pointer",
                    fontSize: "1.9rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                    transform: selected ? "translateY(-3px)" : "translateY(0)",
                    boxShadow: selected ? "0 8px 24px rgba(124,58,237,0.4)" : "none",
                    position: "relative",
                  }}
                >
                  {av.emoji}
                  {selected && (
                    <div style={{
                      position: "absolute", bottom: "4px", right: "4px",
                      width: "14px", height: "14px", borderRadius: "50%",
                      background: "#7c3aed",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.5rem", color: "white", fontWeight: 900,
                    }}>✓</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Premium Avatarlar ── */}
        <div className="glass-card" style={{ padding: "22px", marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              👑 Premium Karakterler
            </span>
            <span style={{
              fontSize: "0.65rem", fontWeight: 800, color: "#fbbf24",
              background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.3)",
              borderRadius: "20px", padding: "2px 9px", letterSpacing: "0.4px",
            }}>
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
                    width: "68px",
                    height: "68px",
                    borderRadius: "16px",
                    background: selected
                      ? `linear-gradient(135deg, ${av.glow}33, ${av.glow}18)`
                      : `linear-gradient(135deg, ${av.glow}18, ${av.glow}08)`,
                    border: selected
                      ? `2px solid ${av.glow}cc`
                      : `1.5px solid ${av.glow}44`,
                    cursor: "pointer",
                    fontSize: "1.9rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    animation: `${av.anim} 2.5s ease-in-out infinite`,
                    transform: selected ? "translateY(-3px)" : "translateY(0)",
                    transition: "transform 0.2s ease, border-color 0.2s ease, background 0.2s ease",
                  }}
                >
                  {av.emoji}

                  {/* Check mark */}
                  {selected && (
                    <div style={{
                      position: "absolute", bottom: "4px", right: "4px",
                      width: "14px", height: "14px", borderRadius: "50%",
                      background: av.glow,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.5rem", color: "white", fontWeight: 900,
                    }}>✓</div>
                  )}

                  {/* Shimmer effect */}
                  <div style={{
                    position: "absolute", top: 0, left: "-100%", width: "60%", height: "100%",
                    background: `linear-gradient(90deg, transparent, ${av.glow}33, transparent)`,
                    animation: "shimmer-slide 3s ease-in-out infinite",
                  }} />
                </button>
              );
            })}
          </div>

          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", margin: "14px 0 0", textAlign: "center" }}>
            Premium karakterler yakında satın alınabilecek ✨
          </p>
        </div>

        {/* ── Kaydet ── */}
        <button
          onClick={handleSave}
          disabled={!canSave}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "16px",
            border: "none",
            background:
              saveState === "done"  ? "linear-gradient(135deg, #10b981, #059669)"
              : saveState === "error" ? "linear-gradient(135deg, #ef4444, #dc2626)"
              : !canSave             ? "rgba(255,255,255,0.08)"
              :                        "linear-gradient(135deg, #7c3aed, #6366f1)",
            color: !canSave ? "rgba(255,255,255,0.3)" : "white",
            fontSize: "1.05rem",
            fontWeight: 800,
            cursor: canSave ? "pointer" : "not-allowed",
            transition: "all 0.3s ease",
            boxShadow:
              saveState === "done"  ? "0 8px 30px rgba(16,185,129,0.4)"
              : saveState === "error" ? "0 8px 30px rgba(239,68,68,0.3)"
              : canSave              ? "0 8px 30px rgba(124,58,237,0.4)"
              :                        "none",
            letterSpacing: "0.3px",
            fontFamily: "Nunito, sans-serif",
          }}
        >
          {saveState === "saving" ? "⏳ Kaydediliyor..."
           : saveState === "done"  ? "✅ Kaydedildi!"
           : saveState === "error" ? "❌ Kullanıcı adı alınmış"
           : "💾 Profili Kaydet"}
        </button>
      </div>
    </div>
  );
}
