import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CATEGORIES } from "../data/categories";
import { getQuestions } from "../data/questions/index.js";
import socket from "../socket";
import Particles from "../components/Particles";

export default function Lobby() {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomCode, isHost } = location.state || {};

  const [players, setPlayers] = useState(location.state?.room?.players || []);
  const [category] = useState(location.state?.room?.category || "");
  const [copied, setCopied] = useState(false);
  const [notification, setNotification] = useState("");

  const catData = CATEGORIES.find((c) => c.id === category);

  useEffect(() => {
    if (!roomCode) { navigate("/"); return; }

    socket.on("players_updated", ({ players: newPlayers }) => {
      setPlayers(newPlayers);
    });

    socket.on("player_left", ({ playerName }) => {
      showNotification(`${playerName} odadan ayrıldı 👋`);
    });

    socket.on("host_changed", ({ newHost }) => {
      showNotification(`${newHost} artık oda sahibi 👑`);
    });

    socket.on("game_started", () => {
      navigate("/multiplayer-game", { state: { roomCode, category } });
    });

    return () => {
      socket.off("players_updated");
      socket.off("player_left");
      socket.off("host_changed");
      socket.off("game_started");
    };
  }, [roomCode, navigate, category]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReady = () => socket.emit("toggle_ready");
  const handleStart = () => {
    // Soruları host tarafında seç ve sunucuya gönder
    const questions = getQuestions(category, null, 10);
    socket.emit("start_game", { questions });
  };
  const handleLeave = () => {
    socket.disconnect();
    navigate("/");
  };

  const myPlayer = players.find((p) => p.id === socket.id);
  const allReady = players.filter((p) => !p.isHost).every((p) => p.isReady);
  const canStart = isHost && players.length >= 1;

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <Particles />

      {/* Bildirim */}
      {notification && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(124,58,237,0.9)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "14px",
            padding: "12px 24px",
            fontWeight: 700,
            fontSize: "0.9rem",
            zIndex: 999,
            animation: "bounce-in 0.4s ease",
          }}
        >
          {notification}
        </div>
      )}

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "700px",
          margin: "0 auto",
          padding: "40px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Başlık */}
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontWeight: 900, fontSize: "2rem", margin: 0 }}>🎮 Oyun Lobisi</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", marginTop: "6px" }}>
            Arkadaşların katılsın, sonra başlayın!
          </p>
        </div>

        {/* Oda kodu */}
        <div
          className="glass-card animate-pulse-glow"
          style={{ padding: "28px", textAlign: "center" }}
        >
          <p style={{ color: "rgba(255,255,255,0.45)", fontWeight: 700, marginBottom: "10px", fontSize: "0.85rem" }}>
            ODA KODU - Arkadaşlarına ver 👇
          </p>
          <div
            style={{
              fontSize: "clamp(2rem, 8vw, 3.5rem)",
              fontWeight: 900,
              letterSpacing: "12px",
              background: "linear-gradient(135deg, #c084fc, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "16px",
              fontFamily: "Nunito, sans-serif",
            }}
          >
            {roomCode}
          </div>
          <button
            onClick={copyCode}
            className={copied ? "btn-secondary" : "btn-primary"}
            style={{ padding: "10px 28px", fontSize: "0.9rem" }}
          >
            {copied ? "✅ Kopyalandı!" : "📋 Kodu Kopyala"}
          </button>
        </div>

        {/* Kategori bilgisi */}
        {catData && (
          <div
            className="glass-card"
            style={{
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              background: `linear-gradient(135deg, ${catData.color}15, ${catData.color}08)`,
              borderColor: catData.color + "30",
            }}
          >
            <span style={{ fontSize: "1.8rem" }}>{catData.icon}</span>
            <div>
              <div style={{ fontWeight: 800 }}>{catData.name}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>
                {catData.description}
              </div>
            </div>
            <div
              style={{
                marginLeft: "auto",
                background: catData.color + "25",
                color: catData.color,
                padding: "4px 14px",
                borderRadius: "20px",
                fontSize: "0.8rem",
                fontWeight: 700,
                border: `1px solid ${catData.color}40`,
              }}
            >
              {catData.questionCount} soru
            </div>
          </div>
        )}

        {/* Oyuncu listesi */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontWeight: 800, fontSize: "1rem", margin: 0 }}>
              👥 Oyuncular ({players.length})
            </h3>
            {!isHost && myPlayer && !myPlayer.isHost && (
              <button
                onClick={handleReady}
                style={{
                  background: myPlayer?.isReady
                    ? "rgba(16,185,129,0.2)"
                    : "rgba(255,255,255,0.08)",
                  border: `1px solid ${myPlayer?.isReady ? "#10b981" : "rgba(255,255,255,0.2)"}`,
                  borderRadius: "10px",
                  color: myPlayer?.isReady ? "#10b981" : "rgba(255,255,255,0.7)",
                  padding: "8px 18px",
                  cursor: "pointer",
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  transition: "all 0.2s",
                }}
              >
                {myPlayer?.isReady ? "✅ Hazırım" : "⏳ Hazır Değilim"}
              </button>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {players.map((player, i) => (
              <div
                key={player.id}
                className="animate-slide-up"
                style={{
                  animationDelay: `${i * 0.06}s`,
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "14px 16px",
                  background:
                    player.id === socket.id
                      ? "rgba(124,58,237,0.15)"
                      : "rgba(255,255,255,0.04)",
                  borderRadius: "14px",
                  border: `1px solid ${
                    player.id === socket.id
                      ? "rgba(124,58,237,0.3)"
                      : "rgba(255,255,255,0.06)"
                  }`,
                  transition: "all 0.3s",
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, hsl(${(player.name.charCodeAt(0) * 37) % 360}, 70%, 50%), hsl(${(player.name.charCodeAt(0) * 37 + 60) % 360}, 70%, 40%))`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    flexShrink: 0,
                  }}
                >
                  {player.name[0].toUpperCase()}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "6px" }}>
                    {player.name}
                    {player.id === socket.id && (
                      <span style={{ fontSize: "0.7rem", background: "rgba(124,58,237,0.3)", color: "#c084fc", padding: "2px 8px", borderRadius: "10px" }}>
                        Sen
                      </span>
                    )}
                  </div>
                  {player.isHost && (
                    <div style={{ fontSize: "0.75rem", color: "#f59e0b", fontWeight: 600 }}>
                      👑 Oda Sahibi
                    </div>
                  )}
                </div>

                {/* Hazırlık durumu */}
                <div style={{ fontSize: "1.3rem" }}>
                  {player.isHost ? "👑" : player.isReady ? "✅" : "⏳"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Butonlar */}
        <div style={{ display: "flex", gap: "12px" }}>
          <button className="btn-danger" onClick={handleLeave} style={{ flex: 1, padding: "14px" }}>
            🚪 Odadan Ayrıl
          </button>
          {isHost && (
            <button
              className="btn-primary"
              onClick={handleStart}
              disabled={!canStart}
              style={{
                flex: 2,
                padding: "14px",
                opacity: canStart ? 1 : 0.5,
                cursor: canStart ? "pointer" : "not-allowed",
              }}
            >
              {allReady || players.length === 1
                ? "🚀 Oyunu Başlat!"
                : `⏳ Bekleniyor... (${players.filter((p) => !p.isHost && p.isReady).length}/${players.length - 1} hazır)`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
