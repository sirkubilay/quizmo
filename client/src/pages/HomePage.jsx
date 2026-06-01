import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Particles from "../components/Particles";
import { getLocalStats, getWeeklyTop3 } from "../utils/stats";
import { CATEGORIES } from "../data/categories";
import { THEMES, applyTheme, getSavedThemeId, COLORBLIND_MODES, applyColorblindMode, getSavedColorblindMode } from "../utils/theme";
import * as xpModule from "../utils/xp";
import * as dailyQuestModule from "../utils/dailyQuest";

const MENU_ITEMS = [
  {
    id: "solo",
    icon: "🎯",
    title: "Tek Oyuncu",
    desc: "Kendi başına oyna, kendinle yarış",
    color: "#6366f1",
    gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    path: "/solo",
  },
  {
    id: "online",
    icon: "🌐",
    title: "Online Oyna",
    desc: "Arkadaşlarınla gerçek zamanlı oyna",
    color: "#ec4899",
    gradient: "linear-gradient(135deg, #ec4899, #f43f5e)",
    path: "/online",
  },
  {
    id: "create",
    icon: "🏠",
    title: "Oda Oluştur",
    desc: "Kendi odanı kur ve arkadaşlarını davet et",
    color: "#8b5cf6",
    gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
    path: "/create-room",
  },
  {
    id: "join",
    icon: "🚪",
    title: "Odaya Katıl",
    desc: "Oda koduyla arkadaşlarına katıl",
    color: "#10b981",
    gradient: "linear-gradient(135deg, #10b981, #059669)",
    path: "/join-room",
  },
  {
    id: "profile",
    icon: "👤",
    title: "Profil",
    desc: "İstatistiklerini ve başarımlarını gör",
    color: "#06b6d4",
    gradient: "linear-gradient(135deg, #06b6d4, #0284c7)",
    path: "/profile",
  },
  {
    id: "live-event",
    icon: "🔴",
    title: "Canlı Etkinlik",
    desc: "Hafta sonu özel bilgi yarışması",
    color: "#ef4444",
    gradient: "linear-gradient(135deg, #ef4444, #dc2626)",
    path: "/live-event",
    badge: "YAKINDA",
    pulse: true,
  },
];

function PulseDot({ color }) {
  return (
    <span style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{
        position: "absolute",
        width: "14px", height: "14px",
        borderRadius: "50%",
        background: color,
        opacity: 0.4,
        animation: "ping 1.4s ease-in-out infinite",
      }} />
      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: color, position: "relative" }} />
      <style>{`@keyframes ping { 0%,100%{transform:scale(1);opacity:.4} 50%{transform:scale(2.2);opacity:0} }`}</style>
    </span>
  );
}

/*
  Footer logo — sadece dağ çizgileri, daireye yok.
  viewBox yazının bulunduğu alana kesilmiş → yazıyla aynı yükseklik.
  Dağ x: 28–172 → padding ile 20–180 (genişlik 160)
  Dağ y: 52–132 → padding ile 45–138 (yükseklik 93)
*/
function AltayLogo() {
  return (
    <svg
      width="31"
      height="18"
      viewBox="20 45 160 93"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dağ çizgisi — altın, daire yok */}
      <path
        d="M28,132 L55,78 L74,108 L100,52 L126,108 L145,78 L172,132"
        fill="none"
        stroke="#F5A623"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Kar kapakları */}
      <path d="M93,67 L100,52 L107,67 Z"  fill="white" fillOpacity="0.9" />
      <path d="M49,89  L55,78  L61,89  Z"  fill="white" fillOpacity="0.72" />
      <path d="M139,89 L145,78 L151,89 Z"  fill="white" fillOpacity="0.72" />
    </svg>
  );
}

/* ── Hesap Sil Modalı ── */
function DeleteAccountModal({ onClose }) {
  const navigate = useNavigate();
  const [reason, setReason] = useState("");
  const [deleted, setDeleted] = useState(false);

  const handleDelete = () => {
    const keys = Object.keys(localStorage).filter(k => k.startsWith("quizmo_"));
    keys.forEach(k => localStorage.removeItem(k));
    setDeleted(true);
    setTimeout(() => { navigate("/"); window.location.reload(); }, 2000);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div className="glass-card animate-bounce-in" style={{ maxWidth: "420px", width: "100%", padding: "32px 28px", textAlign: "center" }}>
        {deleted ? (
          <>
            <div style={{ fontSize: "3rem", marginBottom: "12px" }}>✅</div>
            <div style={{ fontWeight: 800, fontSize: "1.1rem" }}>Hesabın silindi.</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginTop: "8px" }}>Yönlendiriliyorsun...</div>
          </>
        ) : (
          <>
            <div style={{ fontSize: "3rem", marginBottom: "10px" }}>😢</div>
            <h3 style={{ fontWeight: 900, fontSize: "1.3rem", marginBottom: "6px" }}>Üzgünüz</h3>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.88rem", marginBottom: "22px", lineHeight: 1.5 }}>
              Hesap silme nedeninizi bizimle paylaşır mısınız?
            </p>
            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="Nedeninizi buraya yazabilirsiniz..."
              rows={3}
              style={{
                width: "100%", boxSizing: "border-box",
                background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.15)",
                borderRadius: "12px", padding: "12px 14px", color: "white",
                fontFamily: "Nunito, sans-serif", fontSize: "0.9rem", resize: "vertical",
                outline: "none", marginBottom: "20px",
              }}
            />
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={onClose}
                style={{ flex: 1, padding: "13px", borderRadius: "12px", border: "1.5px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.07)", color: "white", fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer" }}
              >
                İptal
              </button>
              <button
                onClick={handleDelete}
                style={{ flex: 1, padding: "13px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg,#ef4444,#dc2626)", color: "white", fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", boxShadow: "0 6px 20px rgba(239,68,68,0.4)" }}
              >
                🗑️ Hesabı Sil
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Ayarlar Paneli ── */
function SettingsPanel({ onClose, onDeleteRequest }) {
  const [activeTheme,      setActiveTheme]      = useState(getSavedThemeId());
  const [activeColorblind, setActiveColorblind] = useState(getSavedColorblindMode());
  const [openSection,      setOpenSection]      = useState(null);
  const panelRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) onClose();
    }
    setTimeout(() => document.addEventListener("mousedown", handleClick), 50);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  const toggle = (id) => setOpenSection(v => v === id ? null : id);

  const CB_DESCS = {
    none:         "Standart renkler",
    protanopia:   "Kırmızı-yeşil (kırmızı zayıf)",
    deuteranopia: "Kırmızı-yeşil (yeşil zayıf)",
    tritanopia:   "Mavi-sarı renk körlüğü",
    grayscale:    "Tüm renkler griye dönüşür",
  };

  return (
    <>
      <div
        ref={panelRef}
        style={{
          position: "fixed", top: "68px", right: "16px",
          width: "min(360px, calc(100vw - 32px))",
          background: "rgba(15,12,41,0.97)",
          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: "22px", backdropFilter: "blur(30px)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
          zIndex: 9000, overflow: "hidden",
          animation: "settings-drop 0.28s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        <style>{`@keyframes settings-drop { from{opacity:0;transform:translateY(-14px) scale(0.95)} to{opacity:1;transform:translateY(0) scale(1)} }`}</style>

        {/* Header */}
        <div style={{ padding: "18px 20px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontWeight: 800, fontSize: "1rem" }}>⚙️ Ayarlar</div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: "8px", color: "white", width: "28px", height: "28px", cursor: "pointer", fontSize: "0.9rem" }}>✕</button>
        </div>

        <div style={{ maxHeight: "75vh", overflowY: "auto" }}>

          {/* ── Temalar accordion ── */}
          <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <button
              onClick={() => toggle("tema")}
              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", background: "none", border: "none", color: "white", fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer" }}
            >
              <span>🎨 Temalar</span>
              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", transition: "transform 0.2s", transform: openSection === "tema" ? "rotate(180deg)" : "none" }}>▼</span>
            </button>
            {openSection === "tema" && (
              <div style={{ padding: "0 12px 14px", display: "flex", flexDirection: "column", gap: "7px" }}>
                {THEMES.map((theme) => {
                  const sel = activeTheme === theme.id;
                  return (
                    <button key={theme.id} onClick={() => { setActiveTheme(theme.id); applyTheme(theme.id); }}
                      style={{ width: "100%", padding: 0, borderRadius: "12px", overflow: "hidden", border: `2px solid ${sel ? theme.accent : "rgba(255,255,255,0.08)"}`, cursor: "pointer", transition: "all 0.2s", boxShadow: sel ? `0 0 14px ${theme.accent}44` : "none" }}
                    >
                      <div style={{ height: "46px", background: theme.gradient, display: "flex", alignItems: "center", padding: "0 12px", gap: "8px" }}>
                        <span style={{ fontSize: "1.2rem" }}>{theme.emoji}</span>
                        <span style={{ fontWeight: 800, fontSize: "0.88rem", color: "white", flex: 1 }}>{theme.name}</span>
                        <div style={{ display: "flex", gap: "4px" }}>
                          <div style={{ width: "13px", height: "13px", borderRadius: "50%", background: theme.accent }} />
                          <div style={{ width: "13px", height: "13px", borderRadius: "50%", background: theme.accent2 }} />
                        </div>
                        {sel && <span style={{ fontSize: "0.8rem", marginLeft: "4px" }}>✓</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Erişilebilirlik accordion ── */}
          <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <button
              onClick={() => toggle("erisim")}
              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", background: "none", border: "none", color: "white", fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer" }}
            >
              <span>👁️ Erişilebilirlik</span>
              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", transition: "transform 0.2s", transform: openSection === "erisim" ? "rotate(180deg)" : "none" }}>▼</span>
            </button>
            {openSection === "erisim" && (
              <div style={{ padding: "0 12px 14px", display: "flex", flexDirection: "column", gap: "7px" }}>
                {COLORBLIND_MODES.map((mode) => {
                  const sel = activeColorblind === mode.id;
                  return (
                    <button key={mode.id} onClick={() => { setActiveColorblind(mode.id); applyColorblindMode(mode.id); }}
                      style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "11px", cursor: "pointer", border: `1.5px solid ${sel ? "#7c3aed" : "rgba(255,255,255,0.08)"}`, background: sel ? "rgba(124,58,237,0.18)" : "rgba(255,255,255,0.04)", width: "100%", fontFamily: "Nunito, sans-serif", transition: "all 0.2s" }}
                    >
                      <span style={{ fontSize: "1.3rem" }}>{mode.emoji}</span>
                      <div style={{ flex: 1, textAlign: "left" }}>
                        <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "white" }}>{mode.name}</div>
                        <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)" }}>{CB_DESCS[mode.id]}</div>
                      </div>
                      {sel && <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", color: "white", fontWeight: 900 }}>✓</div>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Hesabımı Sil ── */}
          <div style={{ padding: "14px 20px 18px" }}>
            <button
              onClick={() => { onClose(); onDeleteRequest(); }}
              style={{ width: "100%", padding: "12px", borderRadius: "12px", border: "1.5px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.08)", color: "#fca5a5", fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", transition: "all 0.2s" }}
            >
              🗑️ Hesabımı Sil
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Gear Icon SVG ── */
function GearIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [hovered,      setHovered]      = useState(null);
  const [top3,         setTop3]         = useState([]);
  const [localStats,   setLocalStats]   = useState({});
  const [showSettings, setShowSettings] = useState(false);
  const [showDelete,   setShowDelete]   = useState(false);
  const [xpData,       setXpData]       = useState({ total: 0, level: 1, current: 0, max: 500 });
  const [dailyQuest,   setDailyQuest]   = useState(null);
  const [questDef,     setQuestDef]     = useState(null);

  const playerName = localStorage.getItem("quizmo_profile_name") || "";
  const playerAvatar = localStorage.getItem("quizmo_profile_avatar") || "🧠";

  useEffect(() => {
    setLocalStats(getLocalStats());
    getWeeklyTop3().then(setTop3).catch(() => {});

    const { getTotalXP, getLevel, getLevelProgress, getLevelTitle } = xpModule;
    const total   = getTotalXP();
    const level   = getLevel(total);
    const prog    = getLevelProgress(total);
    setXpData({ total, level, current: prog.current, max: prog.max, title: getLevelTitle(level) });

    const quest = dailyQuestModule.getDailyQuest();
    const def   = quest ? dailyQuestModule.getQuestDef(quest.questId) : null;
    setDailyQuest(quest);
    setQuestDef(def);
  }, []);

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <Particles />
      {showDelete   && <DeleteAccountModal onClose={() => setShowDelete(false)} />}
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} onDeleteRequest={() => setShowDelete(true)} />}

      {/* Arka plan ışıkları */}
      <div style={{ position: "fixed", top: "-20%", left: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-20%", right: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {/* Sol üst XP widget */}
      <div
        onClick={() => navigate("/profile")}
        style={{
          position: "fixed", top: "12px", left: "12px", zIndex: 8999,
          background: "rgba(15,12,41,0.88)", backdropFilter: "blur(16px)",
          border: "1.5px solid rgba(255,255,255,0.12)", borderRadius: "18px",
          padding: "8px 14px 8px 10px", cursor: "pointer",
          display: "flex", alignItems: "center", gap: "10px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
          maxWidth: "200px", transition: "all 0.2s",
        }}
      >
        <div style={{ fontSize: "1.8rem", lineHeight: 1 }}>{playerAvatar}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontWeight: 800, fontSize: "0.82rem", color: "white", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "90px" }}>
              {playerName || "Misafir"}
            </span>
            <span style={{ fontSize: "0.65rem", fontWeight: 800, color: "#c084fc", background: "rgba(124,58,237,0.25)", padding: "1px 6px", borderRadius: "8px", flexShrink: 0 }}>
              Lv.{xpData.level}
            </span>
          </div>
          <div style={{ marginTop: "4px", height: "5px", background: "rgba(255,255,255,0.1)", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${Math.round((xpData.current / xpData.max) * 100)}%`, background: "linear-gradient(90deg,#7c3aed,#ec4899)", borderRadius: "3px", transition: "width 0.8s ease" }} />
          </div>
          <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", marginTop: "2px" }}>
            {xpData.current}/{xpData.max} XP
          </div>
        </div>
      </div>

      {/* Sağ üst ⚙️ butonu */}
      <button
        onClick={() => setShowSettings((v) => !v)}
        style={{
          position: "fixed",
          top: "16px",
          right: "16px",
          zIndex: 8999,
          width: "44px",
          height: "44px",
          borderRadius: "14px",
          border: showSettings ? "1.5px solid rgba(124,58,237,0.7)" : "1.5px solid rgba(255,255,255,0.15)",
          background: showSettings ? "rgba(124,58,237,0.22)" : "rgba(255,255,255,0.08)",
          color: "white",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(16px)",
          transition: "all 0.2s",
          boxShadow: showSettings ? "0 0 20px rgba(124,58,237,0.4)" : "0 4px 16px rgba(0,0,0,0.3)",
        }}
        title="Ayarlar"
      >
        <GearIcon />
      </button>

      {/* İçerik */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "780px",
          margin: "0 auto",
          padding: "40px 20px 50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "36px",
        }}
      >
        {/* ── Logo / Başlık ── */}
        <div className="animate-slide-up" style={{ textAlign: "center", paddingTop: "20px" }}>
          <div
            className="animate-float"
            style={{
              fontSize: "80px",
              lineHeight: 1,
              marginBottom: "16px",
              filter: "drop-shadow(0 0 20px rgba(124,58,237,0.5))",
            }}
          >
            🧠
          </div>
          <h1
            style={{
              fontSize: "clamp(2.2rem, 7vw, 4rem)",
              fontWeight: 900,
              background: "linear-gradient(135deg, #fff 0%, #c084fc 50%, #ec4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-2px",
              marginBottom: "10px",
              fontFamily: "Nunito, sans-serif",
            }}
          >
            Quizmo
          </h1>
        </div>

        {/* ── Günlük Görev ── */}
        {dailyQuest && questDef && (
          <div style={{ width: "100%" }} className="animate-slide-up">
            <div className="glass-card" style={{
              padding: "16px 20px",
              background: dailyQuest.completed
                ? "linear-gradient(135deg,rgba(16,185,129,0.2),rgba(16,185,129,0.08))"
                : "linear-gradient(135deg,rgba(251,191,36,0.12),rgba(245,158,11,0.06))",
              border: `1.5px solid ${dailyQuest.completed ? "rgba(16,185,129,0.4)" : "rgba(251,191,36,0.3)"}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ fontSize: "1.8rem" }}>{dailyQuest.completed ? "✅" : questDef.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <span style={{ fontSize: "0.65rem", fontWeight: 800, color: dailyQuest.completed ? "#6ee7b7" : "#fbbf24", textTransform: "uppercase", letterSpacing: "0.8px" }}>
                      🌟 Günlük Görev
                    </span>
                    {dailyQuest.completed && <span style={{ fontSize: "0.65rem", fontWeight: 800, color: "#6ee7b7" }}>TAMAMLANDI</span>}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "white" }}>{questDef.text}</div>
                  <div style={{ marginTop: "6px", height: "5px", background: "rgba(255,255,255,0.1)", borderRadius: "3px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${Math.min((dailyQuest.progress / questDef.goal) * 100, 100)}%`, background: dailyQuest.completed ? "#10b981" : "#fbbf24", borderRadius: "3px", transition: "width 0.8s ease" }} />
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginTop: "3px" }}>
                    {dailyQuest.progress}/{questDef.goal} · Ödül: +{questDef.xp} XP
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Menü Kartları ── */}
        <div className="home-grid">
          {MENU_ITEMS.map((item, i) => {
            const isHov = hovered === item.id;

            return (
              <div
                key={item.id}
                className="animate-slide-up"
                style={{
                  gridColumn: "span 2",
                  animationDelay: `${0.1 + i * 0.07}s`,
                  opacity: 0,
                }}
                onAnimationEnd={(e) => (e.currentTarget.style.opacity = 1)}
              >
                <button
                  onClick={() => navigate(item.path)}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: "140px",
                    background: isHov ? item.gradient : "rgba(255,255,255,0.06)",
                    border: `1.5px solid ${isHov ? "transparent" : "rgba(255,255,255,0.11)"}`,
                    borderRadius: "20px",
                    padding: "24px 16px 20px",
                    cursor: "pointer",
                    transition: "all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    transform: isHov ? "translateY(-5px)" : "translateY(0)",
                    boxShadow: isHov ? `0 18px 45px ${item.color}45` : "0 4px 20px rgba(0,0,0,0.2)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    backdropFilter: "blur(20px)",
                    textAlign: "center",
                    position: "relative",
                  }}
                >
                  {/* Badge */}
                  {item.badge && (
                    <div style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      background: "rgba(239,68,68,0.2)",
                      border: "1px solid rgba(239,68,68,0.4)",
                      borderRadius: "20px",
                      padding: "2px 8px",
                      fontSize: "0.6rem",
                      fontWeight: 800,
                      color: "#fca5a5",
                      letterSpacing: "0.5px",
                    }}>
                      {item.pulse && <PulseDot color="#ef4444" />}
                      {item.badge}
                    </div>
                  )}

                  <div style={{ fontSize: "2.2rem", lineHeight: 1 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: "1rem", fontWeight: 800, color: "white", marginBottom: "5px" }}>
                      {item.title}
                    </div>
                    <div style={{
                      fontSize: "0.75rem",
                      color: isHov ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.4)",
                      fontWeight: 600,
                      lineHeight: 1.45,
                      transition: "color 0.25s",
                    }}>
                      {item.desc}
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* ── İstatistikler ── */}
        {(() => {
          const entries      = Object.entries(localStats).filter(([, v]) => v.correct + v.wrong > 0);
          const totalCorrect = entries.reduce((s, [, v]) => s + v.correct, 0);
          const totalWrong   = entries.reduce((s, [, v]) => s + v.wrong,   0);
          const totalQ       = totalCorrect + totalWrong;
          const overallPct   = totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : null;
          const accColor     = overallPct == null ? "#818cf8"
                             : overallPct >= 70   ? "#10b981"
                             : overallPct >= 40   ? "#f59e0b"
                             : "#ef4444";

          return (
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "14px" }}>

              {/* ── Kişisel Özet ── */}
              <div className="glass-card" style={{ padding: "22px 24px" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "16px" }}>
                  📊 Kişisel İstatistikler
                </div>

                {totalQ === 0 ? (
                  <div style={{ textAlign: "center", padding: "10px 0" }}>
                    <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🎮</div>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}>
                      Henüz oyun oynamadın
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.25)", marginTop: "4px" }}>
                      Oynayınca istatistiklerin burada görünecek
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {/* Üst 3 metrik */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                      {[
                        { label: "Toplam Soru", value: totalQ,       icon: "❓", color: "#818cf8" },
                        { label: "Doğru",       value: totalCorrect, icon: "✅", color: "#10b981" },
                        { label: "Yanlış",      value: totalWrong,   icon: "❌", color: "#ef4444" },
                      ].map(m => (
                        <div key={m.label} style={{
                          textAlign: "center", padding: "12px 8px", borderRadius: "14px",
                          background: `${m.color}12`, border: `1px solid ${m.color}30`,
                        }}>
                          <div style={{ fontSize: "1.4rem", marginBottom: "4px" }}>{m.icon}</div>
                          <div style={{ fontWeight: 900, fontSize: "1.3rem", color: m.color }}>{m.value}</div>
                          <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", fontWeight: 700, marginTop: "2px" }}>{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Genel başarı barı */}
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "rgba(255,255,255,0.5)" }}>Genel Başarı Oranı</span>
                        <span style={{ fontWeight: 900, fontSize: "1rem", color: accColor }}>%{overallPct}</span>
                      </div>
                      <div style={{ height: "8px", background: "rgba(255,255,255,0.07)", borderRadius: "4px", overflow: "hidden" }}>
                        <div style={{
                          height: "100%", width: `${overallPct}%`, borderRadius: "4px",
                          background: `linear-gradient(90deg, ${accColor}aa, ${accColor})`,
                          boxShadow: `0 0 8px ${accColor}`,
                          transition: "width 1s ease",
                        }} />
                      </div>
                    </div>

                    {/* Kategori detayları */}
                    {entries.length > 0 && (
                      <div style={{ marginTop: "2px" }}>
                        <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "8px" }}>
                          Kategorilere Göre
                        </div>
                        <div style={{
                          display: "flex", flexDirection: "column", gap: "8px",
                          maxHeight: entries.length > 5 ? "230px" : "none",
                          overflowY: entries.length > 5 ? "auto" : "visible",
                          paddingRight: entries.length > 5 ? "4px" : "0",
                        }}>
                        {entries
                          .sort(([, a], [, b]) => (b.correct + b.wrong) - (a.correct + a.wrong))
                          .map(([catId, stat]) => {
                            const cat   = CATEGORIES.find(c => c.id === catId);
                            const total = stat.correct + stat.wrong;
                            const pct   = Math.round((stat.correct / total) * 100);
                            const col   = pct >= 70 ? "#10b981" : pct >= 40 ? "#f59e0b" : "#ef4444";
                            return (
                              <div key={catId}>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                                  <span style={{ fontSize: "0.9rem" }}>{cat?.icon ?? "❓"}</span>
                                  <span style={{ flex: 1, fontWeight: 700, fontSize: "0.82rem" }}>{cat?.name ?? catId}</span>
                                  <span style={{ fontSize: "0.72rem", color: "#6ee7b7", fontWeight: 700 }}>{stat.correct}✓</span>
                                  <span style={{ fontSize: "0.72rem", color: "#fca5a5", fontWeight: 700, margin: "0 5px" }}>{stat.wrong}✗</span>
                                  <span style={{ fontSize: "0.78rem", fontWeight: 900, color: col, minWidth: "36px", textAlign: "right" }}>%{pct}</span>
                                </div>
                                <div style={{ height: "4px", background: "rgba(255,255,255,0.07)", borderRadius: "2px", overflow: "hidden" }}>
                                  <div style={{ height: "100%", width: `${pct}%`, background: col, borderRadius: "2px", transition: "width 0.8s ease" }} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ── Haftalık Top 3 ── */}
              <div className="glass-card" style={{ padding: "22px 24px" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "14px" }}>
                  🏆 Bu Hafta En İyi 3
                </div>
                {top3.length === 0 ? (
                  <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.85rem", textAlign: "center", padding: "8px 0" }}>
                    Yükleniyor…
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {top3.map((entry, i) => (
                      <div key={i} style={{
                        display: "flex", alignItems: "center", gap: "12px",
                        padding: "10px 14px", borderRadius: "13px",
                        background: i === 0 ? "rgba(245,158,11,0.1)" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${i === 0 ? "rgba(245,158,11,0.25)" : "rgba(255,255,255,0.07)"}`,
                      }}>
                        <div style={{ fontSize: "1.3rem", width: "28px", textAlign: "center" }}>
                          {i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}
                        </div>
                        <div style={{ flex: 1, fontWeight: 700, fontSize: "0.9rem" }}>
                          {entry.playerName}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginRight: "8px" }}>
                          {entry.gamesPlayed} oyun
                        </div>
                        <div style={{ fontWeight: 900, fontSize: "1rem", color: i === 0 ? "#fcd34d" : "#c084fc" }}>
                          {entry.totalScore}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          );
        })()}

        {/* ── Footer ── */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", paddingBottom: "10px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <AltayLogo />
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "1px" }}>
              ALTAY INTERACTIVE
            </span>
          </div>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <button
              onClick={() => navigate("/privacy")}
              style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: "0.78rem", cursor: "pointer", fontFamily: "Nunito, sans-serif", textDecoration: "underline", padding: 0 }}
            >
              Gizlilik Sözleşmesi
            </button>
          </div>
          <div style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.72rem" }}>
            © 2026 Quizmo. Tüm hakları saklıdır.
          </div>
        </div>
      </div>
    </div>
  );
}
