import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Particles from "../components/Particles";

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

export default function HomePage() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <Particles />

      {/* Arka plan ışıkları */}
      <div style={{ position: "fixed", top: "-20%", left: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-20%", right: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "14px",
            width: "100%",
          }}
        >
          {MENU_ITEMS.map((item, i) => {
            const isHov = hovered === item.id;
            // 6 items × span 2 = tam 3×2 grid
            const gridColumn = "span 2";

            return (
              <div
                key={item.id}
                className="animate-slide-up"
                style={{
                  gridColumn,
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
