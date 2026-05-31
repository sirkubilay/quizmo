import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CATEGORIES, CATEGORY_GROUPS } from "../data/categories";
import socket from "../socket";
import Particles from "../components/Particles";

export default function CreateRoom() {
  const navigate = useNavigate();
  const location = useLocation();
  const preCategory = location.state?.category || null;

  const [playerName, setPlayerName] = useState(
    localStorage.getItem("playerName") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(preCategory);
  const [maxPlayers, setMaxPlayers] = useState(8);
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
          {/* İsim */}
          <div className="glass-card" style={{ padding: "24px" }}>
            <label style={{ display: "block", fontWeight: 700, marginBottom: "10px", fontSize: "0.95rem" }}>
              👤 Oyuncu Adın
            </label>
            <input
              className="input-field"
              type="text"
              placeholder="Adını gir..."
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              maxLength={20}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            />
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
              max={12}
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
              <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>12</span>
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
