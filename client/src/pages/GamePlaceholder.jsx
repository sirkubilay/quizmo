import { useNavigate, useLocation } from "react-router-dom";
import { CATEGORIES } from "../data/categories";
import Particles from "../components/Particles";

export default function GamePlaceholder() {
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.state?.category;
  const catData = category
    ? CATEGORIES.find((c) => c.id === (category?.id || category))
    : null;

  return (
    <div style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Particles />
      <div
        className="glass-card animate-bounce-in"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "480px",
          width: "90%",
          padding: "48px 40px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "4rem", marginBottom: "16px" }}>
          {catData?.icon || "🎮"}
        </div>
        <h2 style={{ fontWeight: 900, fontSize: "1.6rem", marginBottom: "12px" }}>
          Oyun Bölümü
        </h2>
        <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "8px", lineHeight: 1.6 }}>
          {catData ? (
            <>
              <strong style={{ color: "#c084fc" }}>{catData.name}</strong> kategorisi seçildi!
            </>
          ) : (
            "Kategori seçildi!"
          )}
        </p>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.9rem", marginBottom: "32px", lineHeight: 1.6 }}>
          🔨 Soru sistemi yakında eklenecek.<br />
          Şu an menü ve oda sistemi hazır!
        </p>

        <div
          style={{
            background: "rgba(124,58,237,0.15)",
            border: "1px solid rgba(124,58,237,0.3)",
            borderRadius: "14px",
            padding: "16px",
            marginBottom: "24px",
            fontSize: "0.85rem",
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.6,
          }}
        >
          💡 Soru eklemek için{" "}
          <strong style={{ color: "#c084fc" }}>opentdb.com</strong> veya kendi
          JSON dosyanı kullanabilirsin.
        </div>

        <button className="btn-primary" onClick={() => navigate("/")} style={{ width: "100%" }}>
          🏠 Ana Menüye Dön
        </button>
      </div>
    </div>
  );
}
