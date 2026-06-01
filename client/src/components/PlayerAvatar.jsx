import { getAvatarMeta, isPremium } from "../data/avatars";

const KEYFRAMES = `
@keyframes glow-gold    { 0%,100%{box-shadow:0 0 12px 3px #ffd70066,0 0 24px 6px #f59e0b33} 50%{box-shadow:0 0 22px 8px #ffd700aa,0 0 44px 14px #f59e0b55} }
@keyframes glow-purple  { 0%,100%{box-shadow:0 0 12px 3px #8b5cf666} 50%{box-shadow:0 0 22px 8px #a855f7aa} }
@keyframes glow-cyan    { 0%,100%{box-shadow:0 0 12px 3px #06b6d466} 50%{box-shadow:0 0 22px 8px #0ea5e9aa} }
@keyframes glow-amber   { 0%,100%{box-shadow:0 0 12px 3px #f59e0b66} 50%{box-shadow:0 0 22px 8px #fbbf24aa} }
@keyframes glow-yellow  { 0%,100%{box-shadow:0 0 12px 3px #eab30866} 50%{box-shadow:0 0 22px 8px #fde04799} }
@keyframes glow-blue    { 0%,100%{box-shadow:0 0 12px 3px #3b82f666} 50%{box-shadow:0 0 22px 8px #60a5faaa} }
@keyframes glow-orange  { 0%,100%{box-shadow:0 0 12px 3px #f9731666} 50%{box-shadow:0 0 22px 8px #fb923caa} }
@keyframes glow-grey    { 0%,100%{box-shadow:0 0 10px 2px #94a3b844} 50%{box-shadow:0 0 18px 6px #cbd5e177} }
@keyframes glow-pink    { 0%,100%{box-shadow:0 0 12px 3px #f472b666} 50%{box-shadow:0 0 22px 8px #fb7185aa} }
@keyframes glow-red     { 0%,100%{box-shadow:0 0 12px 3px #ef444466} 50%{box-shadow:0 0 22px 8px #f87171aa} }
@keyframes glow-indigo  { 0%,100%{box-shadow:0 0 12px 3px #6366f166} 50%{box-shadow:0 0 22px 8px #818cf8aa} }
@keyframes glow-green   { 0%,100%{box-shadow:0 0 12px 3px #10b98166} 50%{box-shadow:0 0 22px 8px #34d39999} }
@keyframes glow-rainbow {
  0%  {box-shadow:0 0 16px 5px #ec489966}
  25% {box-shadow:0 0 16px 5px #8b5cf666}
  50% {box-shadow:0 0 16px 5px #06b6d466}
  75% {box-shadow:0 0 16px 5px #f59e0b66}
  100%{box-shadow:0 0 16px 5px #ec489966}
}
@keyframes shimmer-slide { 0%{left:-100%} 50%{left:120%} 100%{left:120%} }
@keyframes float-avatar  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
`;

let injected = false;
function injectKeyframes() {
  if (injected || typeof document === "undefined") return;
  const style = document.createElement("style");
  style.textContent = KEYFRAMES;
  document.head.appendChild(style);
  injected = true;
}

/**
 * PlayerAvatar — evrensel avatar bileşeni
 *
 * Props:
 *   emoji   : string  — gösterilecek emoji
 *   size    : number  — piksel cinsinden boyut (varsayılan: 44)
 *   float   : bool    — yukarı-aşağı float animasyonu (varsayılan: false)
 *   shimmer : bool    — premium shimmer efekti (varsayılan: true)
 *   style   : object  — ek stil
 */
export default function PlayerAvatar({ emoji, size = 44, float = false, shimmer = true, style: extraStyle = {} }) {
  injectKeyframes();

  const meta    = getAvatarMeta(emoji);
  const premium = isPremium(emoji);

  const fontSize   = Math.round(size * 0.52);
  const borderR    = Math.round(size * 0.36);

  const containerStyle = {
    width:          `${size}px`,
    height:         `${size}px`,
    borderRadius:   `${borderR}px`,
    display:        "flex",
    alignItems:     "center",
    justifyContent: "center",
    fontSize:       `${fontSize}px`,
    flexShrink:     0,
    position:       "relative",
    overflow:       premium ? "hidden" : "visible",
    background:     premium
      ? `linear-gradient(135deg, ${meta.glow}28, ${meta.glow}10)`
      : "rgba(255,255,255,0.08)",
    border:         premium
      ? `1.5px solid ${meta.glow}55`
      : "1.5px solid rgba(255,255,255,0.12)",
    animation:      [
      premium          ? `${meta.anim} 2.5s ease-in-out infinite` : null,
      float            ? "float-avatar 3s ease-in-out infinite"    : null,
    ].filter(Boolean).join(", ") || undefined,
    ...extraStyle,
  };

  return (
    <div style={containerStyle}>
      {emoji}
      {/* Shimmer — sadece premium */}
      {premium && shimmer && (
        <div style={{
          position:   "absolute",
          top:        0,
          left:       "-100%",
          width:      "60%",
          height:     "100%",
          background: `linear-gradient(90deg, transparent, ${meta.glow}44, transparent)`,
          animation:  "shimmer-slide 3s ease-in-out infinite",
          pointerEvents: "none",
        }} />
      )}
    </div>
  );
}
