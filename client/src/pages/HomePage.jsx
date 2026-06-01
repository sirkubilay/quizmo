import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Particles from "../components/Particles";
import { getLocalStats, getWeeklyTop3 } from "../utils/stats";
import { CATEGORIES } from "../data/categories";
import { THEMES, applyTheme, getSavedThemeId, COLORBLIND_MODES, applyColorblindMode, getSavedColorblindMode } from "../utils/theme";

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

/* ── Ayarlar Paneli ── */
function SettingsPanel({ onClose }) {
  const [activeTheme,     setActiveTheme]     = useState(getSavedThemeId());
  const [activeColorblind, setActiveColorblind] = useState(getSavedColorblindMode());
  const [settingsTab,     setSettingsTab]     = useState("tema");
  const panelRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) onClose();
    }
    setTimeout(() => document.addEventListener("mousedown", handleClick), 50);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  const handleTheme = (id) => {
    setActiveTheme(id);
    applyTheme(id);
  };

  const handleColorblind = (id) => {
    setActiveColorblind(id);
    applyColorblindMode(id);
  };

  return (
    <div
      ref={panelRef}
      style={{
        position: "fixed",
        top: "68px",
        right: "16px",
        width: "min(360px, calc(100vw - 32px))",
        background: "rgba(15,12,41,0.97)",
        border: "1px solid rgba(255,255,255,0.14)",
        borderRadius: "22px",
        backdropFilter: "blur(30px)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.2)",
        zIndex: 9000,
        overflow: "hidden",
        animation: "settings-drop 0.28s cubic-bezier(0.34,1.56,0.64,1)",
      }}
    >
      <style>{`
        @keyframes settings-drop {
          from { opacity: 0; transform: translateY(-14px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)     scale(1);    }
        }
      `}</style>

      {/* Panel header */}
      <div style={{ padding: "18px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontWeight: 800, fontSize: "1rem" }}>⚙️ Ayarlar</div>
        <button
          onClick={onClose}
          style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: "8px", color: "white", width: "28px", height: "28px", cursor: "pointer", fontSize: "0.9rem" }}
        >✕</button>
      </div>

      {/* İç tab bar */}
      <div style={{ display: "flex", gap: "6px", padding: "14px 16px 0" }}>
        {[{ id: "tema", label: "🎨 Tema" }, { id: "erisim", label: "👁️ Erişim" }].map((t) => (
          <button
            key={t.id}
            onClick={() => setSettingsTab(t.id)}
            style={{
              flex: 1, padding: "8px", borderRadius: "10px", cursor: "pointer",
              border: settingsTab === t.id ? "none" : "1px solid rgba(255,255,255,0.1)",
              background: settingsTab === t.id ? "linear-gradient(135deg,#7c3aed,#6366f1)" : "rgba(255,255,255,0.05)",
              color: settingsTab === t.id ? "white" : "rgba(255,255,255,0.5)",
              fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "0.8rem",
              transition: "all 0.2s",
            }}
          >{t.label}</button>
        ))}
      </div>

      <div style={{ padding: "14px 16px 18px", maxHeight: "70vh", overflowY: "auto" }}>

        {/* TEMA SEKMESİ */}
        {settingsTab === "tema" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {THEMES.map((theme) => {
              const sel = activeTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => handleTheme(theme.id)}
                  style={{
                    width: "100%", padding: 0, borderRadius: "14px", overflow: "hidden",
                    border: `2px solid ${sel ? theme.accent : "rgba(255,255,255,0.08)"}`,
                    cursor: "pointer", transition: "all 0.25s",
                    boxShadow: sel ? `0 0 18px ${theme.accent}44` : "none",
                    transform: sel ? "scale(1.015)" : "scale(1)",
                  }}
                >
                  <div style={{ height: "52px", background: theme.gradient, display: "flex", alignItems: "center", padding: "0 14px", gap: "10px", position: "relative" }}>
                    <span style={{ fontSize: "1.4rem" }}>{theme.emoji}</span>
                    <span style={{ fontWeight: 800, fontSize: "0.92rem", color: "white" }}>{theme.name}</span>
                    <div style={{ marginLeft: "auto", display: "flex", gap: "5px" }}>
                      <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: theme.accent }} />
                      <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: theme.accent2 }} />
                    </div>
                    {sel && (
                      <div style={{ position: "absolute", right: "40px", top: "50%", transform: "translateY(-50%)", width: "20px", height: "20px", borderRadius: "50%", background: theme.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", color: "white", fontWeight: 900 }}>✓</div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* ERİŞİLEBİLİRLİK SEKMESİ */}
        {settingsTab === "erisim" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>
              Renk Körlüğü Modu
            </div>
            {COLORBLIND_MODES.map((mode) => {
              const sel = activeColorblind === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => handleColorblind(mode.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "12px 14px", borderRadius: "12px", cursor: "pointer",
                    border: `1.5px solid ${sel ? "#7c3aed" : "rgba(255,255,255,0.08)"}`,
                    background: sel ? "rgba(124,58,237,0.18)" : "rgba(255,255,255,0.04)",
                    transition: "all 0.2s", width: "100%",
                    fontFamily: "Nunito, sans-serif",
                  }}
                >
                  <span style={{ fontSize: "1.4rem" }}>{mode.emoji}</span>
                  <div style={{ flex: 1, textAlign: "left" }}>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "white" }}>{mode.name}</div>
                    {mode.id === "none" && <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)" }}>Standart renkler</div>}
                    {mode.id === "protanopia" && <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)" }}>Kırmızı-yeşil (kırmızı zayıf)</div>}
                    {mode.id === "deuteranopia" && <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)" }}>Kırmızı-yeşil (yeşil zayıf)</div>}
                    {mode.id === "tritanopia" && <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)" }}>Mavi-sarı renk körlüğü</div>}
                    {mode.id === "grayscale" && <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)" }}>Tüm renkler griye dönüşür</div>}
                  </div>
                  {sel && <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", color: "white", fontWeight: 900, flexShrink: 0 }}>✓</div>}
                </button>
              );
            })}

            <div style={{ marginTop: "8px", padding: "12px 14px", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>
                💡 Renk körlüğü modu tüm oyun ekranlarını etkiler. Doğru/yanlış renkleri, grafikler ve arayüz unsurları seçilen moda göre görünür.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
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

  useEffect(() => {
    setLocalStats(getLocalStats());
    getWeeklyTop3().then(setTop3).catch(() => {});
  }, []);

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <Particles />
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}

      {/* Arka plan ışıkları */}
      <div style={{ position: "fixed", top: "-20%", left: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-20%", right: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

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
        <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingBottom: "10px" }}>
          <AltayLogo />
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "1px" }}>
            ALTAY INTERACTIVE
          </span>
        </div>
      </div>
    </div>
  );
}
