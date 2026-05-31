import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CATEGORY_GROUPS } from "../data/categories";
import socket from "../socket";
import Particles from "../components/Particles";

const arrowBtn = {
  background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: "7px", color: "rgba(255,255,255,0.65)", width: "26px", height: "26px", cursor: "pointer",
  fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center",
  transition: "background 0.2s", fontFamily: "Nunito, sans-serif", flexShrink: 0,
};

function CategoryRow({ group, selectedId, onSelect }) {
  const rowRef = useRef(null);
  const scroll = (dir) => rowRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });

  const onMouseDown = (e) => {
    const el = rowRef.current;
    el.dataset.down = "1";
    el.dataset.startX = e.pageX - el.offsetLeft;
    el.dataset.scrollLeft = el.scrollLeft;
    el.style.cursor = "grabbing";
  };
  const onMouseLeave = () => { if (rowRef.current) { rowRef.current.dataset.down = "0"; rowRef.current.style.cursor = "grab"; } };
  const onMouseUp    = () => { if (rowRef.current) { rowRef.current.dataset.down = "0"; rowRef.current.style.cursor = "grab"; } };
  const onMouseMove  = (e) => {
    const el = rowRef.current;
    if (!el || el.dataset.down !== "1") return;
    e.preventDefault();
    el.scrollLeft = Number(el.dataset.scrollLeft) - (e.pageX - el.offsetLeft - Number(el.dataset.startX));
  };

  return (
    <div style={{ marginBottom: "18px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
        <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", fontWeight: 700, margin: 0, textTransform: "uppercase", letterSpacing: "0.5px" }}>
          {group.name}
        </p>
        <div style={{ display: "flex", gap: "5px" }}>
          <button onClick={() => scroll(-1)} style={arrowBtn}>‹</button>
          <button onClick={() => scroll(1)}  style={arrowBtn}>›</button>
        </div>
      </div>

      <div
        ref={rowRef}
        style={{
          display: "flex", gap: "8px",
          overflowX: "auto", overflowY: "visible",
          paddingBottom: "8px", paddingTop: "4px", paddingLeft: "2px", paddingRight: "2px",
          scrollbarWidth: "none", msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          cursor: "grab",
        }}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {group.categories.map((cat) => {
          const active = selectedId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat)}
              style={{
                flexShrink: 0,
                padding: "9px 13px",
                borderRadius: "12px",
                border: `2px solid ${active ? cat.color : "rgba(255,255,255,0.1)"}`,
                background: active ? cat.color + "22" : "rgba(255,255,255,0.04)",
                color: active ? cat.color : "rgba(255,255,255,0.65)",
                cursor: "pointer",
                fontFamily: "Nunito, sans-serif",
                fontWeight: 700,
                fontSize: "0.8rem",
                transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: "6px",
                whiteSpace: "nowrap",
                boxShadow: active ? `0 0 12px ${cat.color}40` : "none",
                transform: active ? "translateY(-2px)" : "translateY(0)",
              }}
            >
              <span style={{ fontSize: "1.1rem" }}>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

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
  }, [navigate]);

  const handleCreate = () => {
    if (!selectedCategory) { setError("Kategori seç!"); return; }
    setError("");
    setLoading(true);
    socket.emit("create_room", {
      playerName: playerName.trim(),
      category: selectedCategory.id,
      maxPlayers,
    });
  };

  const handleCatSelect = (cat) => {
    setSelectedCategory(prev => prev?.id === cat.id ? null : cat);
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <Particles />
      <div style={{ position: "relative", zIndex: 1, maxWidth: "600px", margin: "0 auto", padding: "40px 20px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
          <button onClick={() => navigate(-1)} className="btn-secondary" style={{ padding: "10px 16px" }}>
            ← Geri
          </button>
          <div>
            <h2 style={{ fontWeight: 800, fontSize: "1.6rem", margin: 0 }}>🏠 Oda Oluştur</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginTop: "4px" }}>
              Kendi odanı kur, arkadaşlarını davet et
            </p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* Profil adı */}
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
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>
                Profil adın · Değiştirmek için Profil sayfasına git
              </div>
            </div>
            {selectedCategory && (
              <div style={{
                marginLeft: "auto", flexShrink: 0,
                background: selectedCategory.color + "22",
                border: `1px solid ${selectedCategory.color}55`,
                borderRadius: "10px", padding: "5px 12px",
                fontSize: "0.8rem", fontWeight: 700, color: selectedCategory.color,
                display: "flex", alignItems: "center", gap: "6px",
              }}>
                <span>{selectedCategory.icon}</span>
                <span>{selectedCategory.name}</span>
              </div>
            )}
          </div>

          {/* Kategori */}
          <div className="glass-card" style={{ padding: "22px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <label style={{ fontWeight: 700, fontSize: "0.95rem" }}>🎯 Kategori Seç</label>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", fontFamily: "Nunito, sans-serif" }}
                >
                  Temizle ✕
                </button>
              )}
            </div>

            {CATEGORY_GROUPS.map((group) => (
              <CategoryRow
                key={group.id}
                group={group}
                selectedId={selectedCategory?.id}
                onSelect={handleCatSelect}
              />
            ))}
          </div>

          {/* Max Oyuncu */}
          <div className="glass-card" style={{ padding: "22px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              <label style={{ fontWeight: 700, fontSize: "0.95rem" }}>👥 Maksimum Oyuncu</label>
              <div style={{
                background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)",
                borderRadius: "10px", padding: "4px 14px",
                fontWeight: 900, fontSize: "1.1rem", color: "#c084fc",
              }}>
                {maxPlayers}
              </div>
            </div>
            <input
              type="range" min={2} max={6} value={maxPlayers}
              onChange={(e) => setMaxPlayers(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#7c3aed", height: "6px", cursor: "pointer" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
              {[2,3,4,5,6].map(n => (
                <span key={n} style={{ fontSize: "0.75rem", color: n === maxPlayers ? "#c084fc" : "rgba(255,255,255,0.3)", fontWeight: n === maxPlayers ? 800 : 500, transition: "color 0.2s" }}>
                  {n}
                </span>
              ))}
            </div>
          </div>

          {/* Hata */}
          {error && (
            <div style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.4)", borderRadius: "12px", padding: "12px 16px", color: "#fca5a5", fontWeight: 700, fontSize: "0.9rem" }}>
              ⚠️ {error}
            </div>
          )}

          {/* Buton */}
          <button
            className="btn-primary"
            onClick={handleCreate}
            disabled={loading || !selectedCategory}
            style={{ width: "100%", padding: "16px", opacity: loading || !selectedCategory ? 0.6 : 1, cursor: loading || !selectedCategory ? "not-allowed" : "pointer" }}
          >
            {loading ? "⏳ Oda oluşturuluyor..." : "🏠 Oda Oluştur"}
          </button>
        </div>
      </div>
    </div>
  );
}
