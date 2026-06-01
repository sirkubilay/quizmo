import { useState, useEffect, useCallback } from "react";

export default function AchievementToast() {
  const [queue, setQueue] = useState([]);
  const [current, setCurrent] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      setQueue((q) => [...q, ...e.detail]);
    };
    window.addEventListener("quizmo-achievement", handler);
    return () => window.removeEventListener("quizmo-achievement", handler);
  }, []);

  const showNext = useCallback(() => {
    setQueue((q) => {
      if (!q.length) return q;
      const [next, ...rest] = q;
      setCurrent(next);
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          setCurrent(null);
          setQueue((inner) => inner); // trigger re-render to process next
        }, 500);
      }, 3200);
      return rest;
    });
  }, []);

  useEffect(() => {
    if (!current && queue.length > 0) {
      showNext();
    }
  }, [queue, current, showNext]);

  if (!current) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: `translateX(-50%) translateY(${visible ? "0" : "-130px"})`,
        transition: "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
        zIndex: 99999,
        background: `linear-gradient(135deg, rgba(15,12,41,0.96), rgba(30,27,75,0.96))`,
        border: `1.5px solid ${current.color}77`,
        borderRadius: "22px",
        padding: "16px 22px 16px 18px",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        backdropFilter: "blur(24px)",
        boxShadow: `0 8px 40px ${current.color}44, 0 2px 8px rgba(0,0,0,0.5)`,
        minWidth: "260px",
        maxWidth: "88vw",
        pointerEvents: "none",
      }}
    >
      {/* Renkli sol çizgi */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "12px",
          bottom: "12px",
          width: "4px",
          borderRadius: "4px",
          background: current.color,
          boxShadow: `0 0 12px ${current.color}`,
        }}
      />

      <div style={{ fontSize: "2.4rem", lineHeight: 1, marginLeft: "6px" }}>
        {current.emoji}
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: "0.65rem",
            fontWeight: 800,
            color: current.color,
            textTransform: "uppercase",
            letterSpacing: "1.2px",
            marginBottom: "3px",
          }}
        >
          🏅 Başarım Açıldı!
        </div>
        <div style={{ fontWeight: 800, color: "white", fontSize: "1rem", lineHeight: 1.2 }}>
          {current.name}
        </div>
        <div style={{ fontSize: "0.76rem", color: "rgba(255,255,255,0.45)", marginTop: "3px" }}>
          {current.description}
        </div>
      </div>
    </div>
  );
}
