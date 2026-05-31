import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CATEGORIES, CATEGORY_GROUPS } from "../data/categories";
import socket from "../socket";
import Particles from "../components/Particles";

export default function CreateRoom() {
  const navigate = useNavigate();
  const location = useLocation();
  const preCategory = location.state?.category || null;

  const [playerName] = useState(
    (localStorage.getItem("quizmo_profile_name") ||
     localStorage.getItem("playerName") ||
     "Misafir").trim()
  );
  const [selectedCategory, setSelectedCategory] = useState(preCategory);
  const [maxPlayers, setMaxPlayers] = useState(6);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    socket.connect();

    socket.on("room_created", ({ roomCode, room }) => {
      localStorage.setItem("playerName", playerName);
      navigate("/lobby", { state: { roomCode, room, isHost: true } });
    });

    socket.on("error", ({ message }) => {
      setError(message);
      setLoading(false);
    });

    return () => {
      socket.off("room_created");
      socket.off("error");
    };
  }, [playerName, navigate]);

  const handleCreate = () => {
    if (!playerName.trim()) {
      setError("İsim gir!");
      return;
    }
    if (!selectedCategory) {
      setError("Kategori seç!");
      return;
    }
    setError("");
    setLoading(true);
    socket.emit("create_room", {
      playerName: playerName.trim(),
      category: selectedCategory.id,
      maxPlayers,
    });
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <Particles />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "560px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
          <button
            onClick={() => navigate(-1)}
            className="btn-secondary"
            style={{ padding: "10px 16px" }}
          >
            ← Geri
          </button>
          <div>
            <h2 style={{ fontWeight: 800, fontSize: "1.6rem", margin: 0 }}>🏠 Oda Oluştur</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginTop: "4px" }}>
              Kendi odanı oluştur, arkadaşlarını davet et
            </p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* İsim gösterimi (salt okunur) */}
          <div className="glass-card" style={{ padding: "16px 24px", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "40px", height: "40px", borderRadius: "50%", flexShrink: 0,
              background: `linear-gradient(135deg, hsl(${(playerName.charCodeAt(0) * 37) % 360}, 70%, 50%), hsl(${(playerName.charCodeAt(0) * 37 + 60) % 360}, 70%, 40%))`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 800, fontSize: "1rem",
            }}>
              {playerName[0]?.toUpperCase()}
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "0.95rem" }}>{playerName}</div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>Profil adın · Değiştirmek için Profil sayfasına git</div>
            </div>
          </div>

          {/* Kategori */}
          <div className="glass-card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              <label style={{ fontWeight: 700, fontSize: "0.95rem" }}>🎯 Kategori Seç</label>
              {selectedCategory && (
                <span style={{ fontSize: "0.8rem", color: selectedCategory.color, fontWeight: 700 }}>
                  {selectedCategory.icon} {selectedCategory.name}
                </span>
              )}
            </div>

            {/* Gruplu yatay scroll */}
            {CATEGORY_GROUPS.map((group) => (
              <div key={group.id} style={{ marginBottom: "16px" }}>
                <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", fontWeight: 700, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {group.name}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    overflowX: "auto",
                    paddingBottom: "4px",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {group.categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        flexShrink: 0,
                        padding: "8px 12px",
                        borderRadius: "10px",
                        border: `2px solid ${selectedCategory?.id === cat.id ? cat.color : "rgba(255,255,255,0.1)"}`,
                        background: selectedCategory?.id === cat.id ? cat.color + "22" : "rgba(255,255,255,0.04)",
                        color: selectedCategory?.id === cat.id ? cat.color : "rgba(255,255,255,0.65)",
                        cursor: "pointer",
                        fontFamily: "Nunito, sans-serif",
                        fontWeight: 700,
                        fontSize: "0.78rem",
                        transition: "all 0.2s",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Max Oyuncu */}
          <div className="glass-card" style={{ padding: "24px" }}>
            <label style={{ display: "block", fontWeight: 700, marginBottom: "14px", fontSize: "0.95rem" }}>
              👥 Maksimum Oyuncu: {maxPlayers}
            </label>
            <input
              type="range"
              min={2}
              max={6}
              value={maxPlayers}
              onChange={(e) => setMaxPlayers(Number(e.target.value))}
              style={{
                width: "100%",
                accentColor: "#7c3aed",
                height: "6px",
                cursor: "pointer",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
              <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>2</span>
              <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>6</span>
            </div>
          </div>

          {/* Hata */}
          {error && (
            <div
              style={{
                background: "rgba(239,68,68,0.15)",
                border: "1px solid rgba(239,68,68,0.4)",
                borderRadius: "12px",
                padding: "12px 16px",
                color: "#fca5a5",
                fontWeight: 700,
                fontSize: "0.9rem",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* Buton */}
          <button
            className="btn-primary"
            onClick={handleCreate}
            disabled={loading}
            style={{
              width: "100%",
              padding: "16px",
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "⏳ Oda oluşturuluyor..." : "🏠 Oda Oluştur"}
          </button>
        </div>
      </div>
    </div>
  );
}
