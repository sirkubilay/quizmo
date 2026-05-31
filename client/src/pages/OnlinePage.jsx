import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORY_GROUPS } from "../data/categories";
import socket from "../socket";
import Particles from "../components/Particles";
import { getPlayerName } from "../utils/playerName";

/* ══════════════════════════════
   SABİTLER
══════════════════════════════ */
const TIME_OPTIONS = [
  { value: 15, label: "15 sn", icon: "⚡", color: "#ef4444" },
  { value: 20, label: "20 sn", icon: "🎯", color: "#f59e0b" },
  { value: 30, label: "30 sn", icon: "🧠", color: "#10b981" },
];

const QUESTION_OPTIONS = [
  { value: 5,  label: "5",  icon: "🔥", color: "#ef4444" },
  { value: 10, label: "10", icon: "🎯", color: "#f59e0b" },
  { value: 15, label: "15", icon: "📚", color: "#6366f1" },
  { value: 20, label: "20", icon: "🧠", color: "#10b981" },
];

const arrowBtn = {
  background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: "7px", color: "rgba(255,255,255,0.65)", width: "26px", height: "26px", cursor: "pointer",
  fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center",
  transition: "background 0.2s", fontFamily: "Nunito, sans-serif", flexShrink: 0,
};

/* ══════════════════════════════
   KATEGORİ KARTI
══════════════════════════════ */
function CategoryCard({ cat, selected, onSelect }) {
  const [hov, setHov] = useState(false);
  const active = selected || hov;
  return (
    <button
      onClick={() => onSelect(cat)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flexShrink: 0,
        width: "100px",
        padding: "13px 8px 11px",
        borderRadius: "16px",
        border: `2px solid ${active ? cat.color : "rgba(255,255,255,0.09)"}`,
        background: active
          ? `linear-gradient(145deg, ${cat.color}28, ${cat.color}10)`
          : "rgba(255,255,255,0.04)",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s, background 0.2s",
        transform: active ? "translateY(-4px)" : "translateY(0)",
        boxShadow: active ? `0 8px 22px ${cat.color}50` : "none",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "7px",
        backdropFilter: "blur(10px)", outline: "none", userSelect: "none",
      }}
    >
      <span style={{ fontSize: "1.55rem", lineHeight: 1 }}>{cat.icon}</span>
      <span style={{
        fontWeight: 700, fontSize: "0.7rem",
        color: active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.55)",
        textAlign: "center", lineHeight: 1.25,
        transition: "color 0.2s",
      }}>
        {cat.name}
      </span>
      {selected && (
        <div style={{
          width: "6px", height: "6px", borderRadius: "50%",
          background: cat.color,
          boxShadow: `0 0 6px ${cat.color}`,
        }} />
      )}
    </button>
  );
}

/* ══════════════════════════════
   KATEGORİ SATIRI (yatay scroll + drag)
══════════════════════════════ */
function CategoryRow({ group, selectedId, onSelect }) {
  const rowRef = useRef(null);
  const scroll = (dir) => rowRef.current?.scrollBy({ left: dir * 330, behavior: "smooth" });

  const onMouseDown = (e) => {
    const el = rowRef.current;
    el.dataset.down = "1";
    el.dataset.startX = e.pageX - el.offsetLeft;
    el.dataset.scrollLeft = el.scrollLeft;
    el.style.cursor = "grabbing";
  };
  const onMouseLeave = () => { rowRef.current.dataset.down = "0"; rowRef.current.style.cursor = "grab"; };
  const onMouseUp    = () => { rowRef.current.dataset.down = "0"; rowRef.current.style.cursor = "grab"; };
  const onMouseMove  = (e) => {
    const el = rowRef.current;
    if (el.dataset.down !== "1") return;
    e.preventDefault();
    el.scrollLeft = Number(el.dataset.scrollLeft) - (e.pageX - el.offsetLeft - Number(el.dataset.startX));
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      {/* Grup başlığı */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px", padding: "0 2px" }}>
        <h3 style={{ fontWeight: 700, fontSize: "0.75rem", margin: 0, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.6px" }}>
          {group.name}
        </h3>
        <div style={{ display: "flex", gap: "5px" }}>
          <button onClick={() => scroll(-1)} style={arrowBtn}>‹</button>
          <button onClick={() => scroll(1)}  style={arrowBtn}>›</button>
        </div>
      </div>

      {/* Kaydırmalı liste */}
      <div
        ref={rowRef}
        style={{
          display: "flex", gap: "9px",
          overflowX: "auto", overflowY: "visible",
          paddingTop: "6px", paddingBottom: "14px", paddingLeft: "2px", paddingRight: "2px",
          scrollbarWidth: "none", msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          cursor: "grab",
        }}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {group.categories.map(cat => (
          <CategoryCard
            key={cat.id}
            cat={cat}
            selected={selectedId === cat.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════
   ARAMA ANİMASYONU
══════════════════════════════ */
function SearchingView({ elapsed, onCancel }) {
  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  return (
    <div className="glass-card" style={{ padding: "52px 32px", textAlign: "center" }}>
      {/* Pulse halkalar */}
      <div style={{ position: "relative", width: "90px", height: "90px", margin: "0 auto 28px" }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            border: "3px solid rgba(124,58,237,0.5)",
            animation: `ol-ping 1.8s ease-out ${i * 0.6}s infinite`,
          }} />
        ))}
        <div style={{
          position: "absolute", inset: "18px", borderRadius: "50%",
          background: "linear-gradient(135deg, #7c3aed, #ec4899)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.5rem", boxShadow: "0 0 20px rgba(124,58,237,0.5)",
        }}>
          🔍
        </div>
      </div>

      <h3 style={{ fontWeight: 800, fontSize: "1.3rem", margin: "0 0 10px" }}>
        Oyuncu Aranıyor…
      </h3>
      <div style={{
        fontSize: "2rem", fontWeight: 900, color: "#c084fc",
        fontVariantNumeric: "tabular-nums", marginBottom: "20px",
      }}>
        {fmt(elapsed)}
      </div>
      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.85rem", marginBottom: "28px" }}>
        Müsait bir rakip bekleniyor…
      </p>
      <button className="btn-danger" onClick={onCancel} style={{ padding: "12px 32px" }}>
        ✕ İptal Et
      </button>

      <style>{`
        @keyframes ol-ping {
          0%   { transform: scale(0.5); opacity: 0.8; }
          100% { transform: scale(1.9); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════
   EŞLEŞME BULUNDU ANİMASYONU
══════════════════════════════ */
function FoundView({ players }) {
  const [a, b] = players || [];
  return (
    <div className="glass-card" style={{ padding: "52px 32px", textAlign: "center", animation: "ol-fadein 0.4s ease" }}>
      <div style={{ fontSize: "3.5rem", marginBottom: "14px", animation: "ol-bounce 0.6s ease" }}>🎉</div>
      <h3 style={{
        fontWeight: 900, fontSize: "1.6rem", margin: "0 0 10px",
        background: "linear-gradient(135deg, #c084fc, #ec4899)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>
        Eşleşme Bulundu!
      </h3>
      {a && b && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "18px", margin: "18px 0 14px" }}>
          <div style={{ fontWeight: 800, fontSize: "1rem", color: "white" }}>{a.name}</div>
          <div style={{ fontWeight: 900, fontSize: "1.3rem", color: "rgba(255,255,255,0.25)" }}>VS</div>
          <div style={{ fontWeight: 800, fontSize: "1rem", color: "white" }}>{b.name}</div>
        </div>
      )}
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>Oyun başlıyor…</p>
      <style>{`
        @keyframes ol-fadein { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ol-bounce  { 0%,100%{transform:scale(1)} 40%{transform:scale(1.35)} 70%{transform:scale(0.9)} }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════
   ANA BİLEŞEN
══════════════════════════════ */
export default function OnlinePage() {
  const navigate = useNavigate();

  /* Profil sayfasından kaydedilen isim */
  const playerName = getPlayerName();

  const [selectedCatId,   setSelectedCatId]   = useState(null); // null = rastgele
  const [timePerQuestion, setTimePerQuestion]  = useState(20);
  const [questionCount,   setQuestionCount]    = useState(10);
  const [uiState,         setUiState]          = useState("idle"); // idle | searching | found
  const [elapsed,         setElapsed]          = useState(0);
  const [foundPlayers,    setFoundPlayers]     = useState(null);
  const [error,           setError]            = useState("");

  const elapsedTimer = useRef(null);
  const uiStateRef   = useRef("idle");
  uiStateRef.current = uiState;

  /* ── Socket bağlantısı ── */
  useEffect(() => {
    socket.connect();

    socket.on("match_queued", () => {
      setUiState("searching");
      setElapsed(0);
      elapsedTimer.current = setInterval(() => setElapsed(e => e + 1), 1000);
    });

    socket.on("match_found", ({ roomCode, category, timePerQuestion: tpq, questionCount: qc, players, hostId }) => {
      clearInterval(elapsedTimer.current);
      setFoundPlayers(players);
      setUiState("found");

      setTimeout(() => {
        socket.off("match_queued");
        socket.off("match_found");
        socket.off("error");
        navigate("/multiplayer-game", {
          state: {
            roomCode,
            category,
            timePerQuestion: tpq,
            questionCount:   qc,
            isMatchmaking:   true,
            isHost:          socket.id === hostId,
          },
        });
      }, 1800);
    });

    socket.on("error", ({ message }) => {
      setError(message);
      setUiState("idle");
    });

    return () => {
      socket.off("match_queued");
      socket.off("match_found");
      socket.off("error");
      clearInterval(elapsedTimer.current);
      if (uiStateRef.current === "searching") socket.emit("cancel_match");
    };
  }, [navigate]);

  /* ── Kategori seç / seçimi kaldır ── */
  const handleCatSelect = (cat) => {
    setSelectedCatId(prev => (prev === cat.id ? null : cat.id));
  };

  /* ── Eşleşme bul ── */
  const handleFind = () => {
    setError("");
    socket.emit("find_match", {
      playerName,
      category:        selectedCatId,
      timePerQuestion,
      questionCount,
      avatar: localStorage.getItem("quizmo_profile_avatar") || "😊",
    });
  };

  /* ── İptal ── */
  const handleCancel = () => {
    socket.emit("cancel_match");
    clearInterval(elapsedTimer.current);
    setUiState("idle");
    setElapsed(0);
  };

  /* ══════════════════════════════
     RENDER
  ══════════════════════════════ */
  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <Particles />

      <div style={{ position: "fixed", top: "-15%", left: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-15%", right: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1000px", margin: "0 auto", padding: "36px 20px 80px" }}>

        {/* ── Başlık ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "32px" }}>
          <button
            onClick={() => { if (uiState === "searching") handleCancel(); navigate(-1); }}
            className="btn-secondary"
            style={{ padding: "10px 16px", flexShrink: 0 }}
          >
            ← Geri
          </button>
          <div>
            <h2 style={{ fontWeight: 900, fontSize: "1.5rem", margin: 0 }}>🌐 Online Oyna</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.82rem", marginTop: "4px" }}>
              {uiState === "idle"
                ? `${playerName} olarak oynayacaksın · Kategori seç ve eşleşmeyi bul`
                : uiState === "searching"
                ? "Rakip aranıyor…"
                : "Eşleşme bulundu!"}
            </p>
          </div>

          {/* Seçili kategori chip */}
          {uiState === "idle" && selectedCatId && (() => {
            const cat = CATEGORY_GROUPS.flatMap(g => g.categories).find(c => c.id === selectedCatId);
            return cat ? (
              <div style={{
                marginLeft: "auto", flexShrink: 0,
                background: `${cat.color}22`, border: `1px solid ${cat.color}55`,
                borderRadius: "12px", padding: "8px 14px",
                display: "flex", alignItems: "center", gap: "8px",
              }}>
                <span>{cat.icon}</span>
                <span style={{ fontWeight: 700, fontSize: "0.82rem", color: cat.color }}>{cat.name}</span>
                <button
                  onClick={() => setSelectedCatId(null)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: "0.9rem", lineHeight: 1, padding: "0 0 0 4px" }}
                >
                  ✕
                </button>
              </div>
            ) : null;
          })()}
        </div>

        {/* ── ARAMA ── */}
        {uiState === "searching" && (
          <div style={{ maxWidth: "480px", margin: "0 auto" }}>
            <SearchingView elapsed={elapsed} onCancel={handleCancel} />
          </div>
        )}

        {/* ── BULUNDU ── */}
        {uiState === "found" && (
          <div style={{ maxWidth: "480px", margin: "0 auto" }}>
            <FoundView players={foundPlayers} />
          </div>
        )}

        {/* ── FORM ── */}
        {uiState === "idle" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>

            {/* Rastgele seçenek + başlık */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", padding: "0 2px" }}>
              <h3 style={{ fontWeight: 800, fontSize: "1rem", margin: 0 }}>🎯 Kategori Seç</h3>
              <button
                onClick={() => setSelectedCatId(null)}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "7px 14px", borderRadius: "10px",
                  border: `2px solid ${selectedCatId === null ? "#7c3aed" : "rgba(255,255,255,0.12)"}`,
                  background: selectedCatId === null ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.04)",
                  color: selectedCatId === null ? "#c084fc" : "rgba(255,255,255,0.5)",
                  cursor: "pointer", fontFamily: "Nunito, sans-serif",
                  fontWeight: 700, fontSize: "0.78rem",
                  transition: "all 0.18s",
                  boxShadow: selectedCatId === null ? "0 0 14px rgba(124,58,237,0.3)" : "none",
                }}
              >
                <span>🎲</span>
                <span>Rastgele</span>
                {selectedCatId === null && <span style={{ fontSize: "0.65rem" }}>✓</span>}
              </button>
            </div>

            {/* Kategori grupları — CategorySelect ile aynı düzen */}
            {CATEGORY_GROUPS.map(group => (
              <CategoryRow
                key={group.id}
                group={group}
                selectedId={selectedCatId}
                onSelect={handleCatSelect}
              />
            ))}

            {/* Soru Başına Süre + Soru Sayısı */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "4px", marginBottom: "16px" }}>

              {/* Süre */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap", minWidth: "52px" }}>
                  ⏱ Süre
                </span>
                <div style={{ display: "flex", gap: "7px", flex: 1 }}>
                  {TIME_OPTIONS.map(opt => {
                    const active = timePerQuestion === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setTimePerQuestion(opt.value)}
                        style={{
                          flex: 1, padding: "7px 8px", borderRadius: "10px",
                          border: `1.5px solid ${active ? opt.color : "rgba(255,255,255,0.1)"}`,
                          background: active ? `${opt.color}20` : "rgba(255,255,255,0.04)",
                          color: active ? opt.color : "rgba(255,255,255,0.45)",
                          cursor: "pointer", fontFamily: "Nunito, sans-serif", fontWeight: 800,
                          fontSize: "0.78rem", transition: "all 0.18s",
                          display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
                          boxShadow: active ? `0 0 12px ${opt.color}35` : "none",
                        }}
                      >
                        <span style={{ fontSize: "0.88rem" }}>{opt.icon}</span>
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Soru Sayısı */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap", minWidth: "52px" }}>
                  ❓ Soru
                </span>
                <div style={{ display: "flex", gap: "7px", flex: 1 }}>
                  {QUESTION_OPTIONS.map(opt => {
                    const active = questionCount === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setQuestionCount(opt.value)}
                        style={{
                          flex: 1, padding: "7px 8px", borderRadius: "10px",
                          border: `1.5px solid ${active ? opt.color : "rgba(255,255,255,0.1)"}`,
                          background: active ? `${opt.color}20` : "rgba(255,255,255,0.04)",
                          color: active ? opt.color : "rgba(255,255,255,0.45)",
                          cursor: "pointer", fontFamily: "Nunito, sans-serif", fontWeight: 800,
                          fontSize: "0.78rem", transition: "all 0.18s",
                          display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
                          boxShadow: active ? `0 0 12px ${opt.color}35` : "none",
                        }}
                      >
                        <span style={{ fontSize: "0.88rem" }}>{opt.icon}</span>
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Hata */}
            {error && (
              <div style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.35)", borderRadius: "12px", padding: "12px 16px", color: "#fca5a5", fontWeight: 700, fontSize: "0.88rem", marginBottom: "14px" }}>
                ⚠️ {error}
              </div>
            )}

            {/* Eşleşme Bul */}
            <button
              className="btn-primary"
              onClick={handleFind}
              style={{ width: "100%", padding: "18px", fontSize: "1.05rem", fontWeight: 800 }}
            >
              🔍 Eşleşme Bul
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
