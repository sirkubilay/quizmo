import { useEffect, useState } from "react";

/* ════════════════════════════════════════════════════════
   TIMING (ms) — tüm hız ayarları tek yerden
   ════════════════════════════════════════════════════════ */
const T = {
  mountain: { delay: 0,    duration: 1300 }, // yavaş dağ çizimi
  snow:     { delay: 1250, duration: 220  }, // dağ bitmeden hemen önce
  text:     { delay: 1300, duration: 500  }, // dağ bitince başla
  circle:   { delay: 1900, duration: 600  }, // metin bittikten sonra
  fadeOut:  2500,   // daire tamamlanınca solar  (1900+600)
  complete: 3050,   // onComplete — fade bittikten sonra
  fadeDur:  550,    // solma süresi (ms)
};

/* ════════════════════════════════════════════════════════
   SVG GEOMETRİSİ
   ════════════════════════════════════════════════════════ */
const CX = 100, CY = 100;

const RING_R = 88;
const RING_C = +(2 * Math.PI * RING_R).toFixed(2); // 552.92

// Dağ çizgisi (sol → sağ, 3 tepe)
const MOUNTAIN_D   = "M28,132 L55,78 L74,108 L100,52 L126,108 L145,78 L172,132";
const MOUNTAIN_LEN = 316;

// Kar başlıkları
const SNOW_MID   = "M93,67 L100,52 L107,67 Z";
const SNOW_LEFT  = "M49,89 L55,78 L61,89 Z";
const SNOW_RIGHT = "M139,89 L145,78 L151,89 Z";

/* ════════════════════════════════════════════════════════
   CSS ANIMASYONLARI
   ════════════════════════════════════════════════════════ */
const CSS = `
  .sp-mountain {
    stroke-dasharray: ${MOUNTAIN_LEN};
    stroke-dashoffset: ${MOUNTAIN_LEN};
    animation: sp-draw ${T.mountain.duration}ms cubic-bezier(0.4, 0, 0.2, 1)
               ${T.mountain.delay}ms forwards;
  }
  /* Kar kapakları: her biri ayrı delay ile aşağıdan yukarıya dolsun */
  .sp-snow {
    opacity: 0;
    transform-box: fill-box;
    transform-origin: center bottom;  /* üçgenin tabanından büyüsün */
    animation: sp-snow-rise 400ms ease-out forwards;
    /* animation-delay her elemanda inline style ile verilir */
  }
  .sp-text {
    opacity: 0;
    transform-box: fill-box;
    transform-origin: center bottom;
    animation: sp-slideup ${T.text.duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)
               ${T.text.delay}ms forwards;
  }
  .sp-ring {
    stroke-dasharray: ${RING_C};
    stroke-dashoffset: ${RING_C};
    transform-box: fill-box;
    transform-origin: center;
    transform: rotate(-90deg);
    animation: sp-draw ${T.circle.duration}ms ease-in-out
               ${T.circle.delay}ms forwards;
  }

  @keyframes sp-draw { to { stroke-dashoffset: 0; } }

  /* Kar: taban sabit, tepe aşağıdan yukarıya doğru çıkıyor */
  @keyframes sp-snow-rise {
    from { opacity: 0; transform: scaleY(0); }
    to   { opacity: 1; transform: scaleY(1); }
  }

  @keyframes sp-slideup {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

/* ════════════════════════════════════════════════════════
   COMPONENT
   ════════════════════════════════════════════════════════ */
export default function SplashScreen({ onComplete, onDone }) {
  const finish = onComplete ?? onDone;
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFadingOut(true), T.fadeOut);
    const t2 = setTimeout(() => finish?.(),          T.complete);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [finish]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        /* Ana ekranla aynı arka plan — geçiş yumuşak görünür */
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        /* Soft geçiş */
        opacity: fadingOut ? 0 : 1,
        transition: fadingOut ? `opacity ${T.fadeDur}ms ease-in-out` : "none",
        pointerEvents: fadingOut ? "none" : "auto",
      }}
    >
      <style>{CSS}</style>

      <svg
        width="300"
        height="300"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ══ 3 · Altın daire — 1400ms → 2000ms ══ */}
        <circle
          className="sp-ring"
          cx={CX} cy={CY} r={RING_R}
          fill="none"
          stroke="#F5A623"
          strokeWidth="2.6"
          strokeLinecap="round"
        />

        {/* ══ 1 · Dağ çizgisi — 0ms → 800ms ══ */}
        <path
          className="sp-mountain"
          d={MOUNTAIN_D}
          fill="none"
          stroke="#F5A623"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/*
          ══ Kar kapakları ══
          Çizgi her tepeye ulaştığı anda o tepenin karı aşağıdan yukarı dolar.
          Delay = çizginin o tepeye kadar geçen süre (1300ms toplam / 316 birim)
            Sol tepe  (55,78)  : 60.4 / 316 × 1300 ≈ 248ms  → 280ms
            Orta tepe (100,52) : 157.6/ 316 × 1300 ≈ 649ms  → 680ms
            Sağ tepe  (145,78) : 254.8/ 316 × 1300 ≈ 1048ms → 1080ms
        */}
        <path
          className="sp-snow"
          style={{ animationDelay: "280ms" }}
          d={SNOW_LEFT}
          fill="white"
          fillOpacity="0.78"
        />
        <path
          className="sp-snow"
          style={{ animationDelay: "680ms" }}
          d={SNOW_MID}
          fill="white"
          fillOpacity="0.95"
        />
        <path
          className="sp-snow"
          style={{ animationDelay: "1080ms" }}
          d={SNOW_RIGHT}
          fill="white"
          fillOpacity="0.78"
        />

        {/* ══ 2 · Metin — 800ms → 1300ms ══ */}
        <text
          className="sp-text"
          x={CX} y="153"
          textAnchor="middle"
          fill="white"
          fontFamily="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
          fontWeight="800"
          fontSize="21"
          letterSpacing="6"
        >
          ALTAY
        </text>

        <text
          className="sp-text"
          x={CX} y="166"
          textAnchor="middle"
          fill="rgba(255,255,255,0.42)"
          fontFamily="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
          fontWeight="500"
          fontSize="7.5"
          letterSpacing="3.8"
        >
          INTERACTIVE
        </text>
      </svg>
    </div>
  );
}
