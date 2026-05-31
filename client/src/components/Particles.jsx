import { useEffect, useRef } from "react";

const COLORS = [
  "rgba(124, 58, 237, 0.6)",
  "rgba(236, 72, 153, 0.6)",
  "rgba(59, 130, 246, 0.6)",
  "rgba(16, 185, 129, 0.6)",
  "rgba(245, 158, 11, 0.6)",
];

export default function Particles() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles = [];
    const isMobile = window.innerWidth < 640;
    const count = isMobile ? 10 : 20;

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      const size = Math.random() * 8 + 4;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const left = Math.random() * 100;
      const duration = Math.random() * 15 + 10;
      const delay = Math.random() * 10;

      el.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color};
        left: ${left}%;
        bottom: -20px;
        animation: particle-float ${duration}s ${delay}s linear infinite;
        filter: blur(1px);
      `;

      container.appendChild(el);
      particles.push(el);
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    />
  );
}
