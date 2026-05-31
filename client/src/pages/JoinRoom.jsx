import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import Particles from "../components/Particles";

export default function JoinRoom() {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState(localStorage.getItem("playerName") || "");
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    socket.connect();

    socket.on("room_joined", ({ roomCode, room }) => {
      localStorage.setItem("playerName", playerName);
      navigate("/lobby", { state: { roomCode, room, isHost: false } });
    });

    socket.on("error", ({ message }) => {
      setError(message);
      setLoading(false);
    });

    return () => {
      socket.off("room_joined");
      socket.off("error");
    };
  }, [playerName, navigate]);

  const handleJoin = () => {
    if (!playerName.trim()) { setError("İsim gir!"); return; }
    if (!roomCode.trim() || roomCode.length < 4) { setError("Geçerli bir oda kodu gir!"); return; }
    setError("");
    setLoading(true);
    socket.emit("join_room", { playerName: playerName.trim(), roomCode: roomCode.toUpperCase().trim() });
  };

  const handleCodeChange = (e) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
    setRoomCode(val);
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <Particles />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "480px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
          <button onClick={() => navigate(-1)} className="btn-secondary" style={{ padding: "10px 16px" }}>
            ← Geri
          </button>
          <div>
            <h2 style={{ fontWeight: 800, fontSize: "1.6rem", margin: 0 }}>🚪 Odaya Katıl</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginTop: "4px" }}>
              Arkadaşından aldığın kodu gir
            </p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Büyük oda kodu input */}
          <div className="glass-card" style={{ padding: "32px 24px", textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🔑</div>
            <p style={{ fontWeight: 700, color: "rgba(255,255,255,0.5)", marginBottom: "16px", fontSize: "0.9rem" }}>
              ODA KODU
            </p>
            <input
              type="text"
              value={roomCode}
              onChange={handleCodeChange}
              placeholder="ABC123"
              maxLength={6}
              onKeyDown={(e) => e.key === "Enter" && handleJoin()}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "2px solid rgba(124,58,237,0.4)",
                borderRadius: "16px",
                padding: "16px",
                color: "white",
                fontSize: "2rem",
                fontFamily: "Nunito, sans-serif",
                fontWeight: 900,
                width: "100%",
                textAlign: "center",
                letterSpacing: "8px",
                outline: "none",
                transition: "all 0.3s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#7c3aed";
                e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.25)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(124,58,237,0.4)";
                e.target.style.boxShadow = "none";
              }}
            />
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem", marginTop: "10px" }}>
              6 karakterlik kod (harf ve rakam)
            </p>
          </div>

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
              onKeyDown={(e) => e.key === "Enter" && handleJoin()}
            />
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

          <button
            className="btn-primary"
            onClick={handleJoin}
            disabled={loading}
            style={{
              width: "100%",
              padding: "16px",
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "⏳ Katılınıyor..." : "🚀 Odaya Gir"}
          </button>
        </div>
      </div>
    </div>
  );
}
