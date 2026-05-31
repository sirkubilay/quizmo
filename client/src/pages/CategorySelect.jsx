import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CATEGORY_GROUPS, QUESTION_COUNTS } from "../data/categories";
import Particles from "../components/Particles";

const TIME_OPTIONS = [
  { value: 15, label: "15 sn", icon: "⚡", desc: "Hızlı tempo", color: "#ef4444" },
  { value: 20, label: "20 sn", icon: "🎯", desc: "Standart",    color: "#f59e0b" },
  { value: 30, label: "30 sn", icon: "🧠", desc: "Düşünmek için zaman", color: "#10b981" },
];

/* ─── Yatay Scroll Satırı ─── */
function CategoryRow({ group, onSelect, selectedId }) {
  const rowRef = useRef(null);
  const scroll = (dir) => rowRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });

  return (
    <div style={{ marginBottom: "32px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px", padding: "0 4px" }}>
        <h3 style={{ fontWeight: 800, fontSize: "1.1rem", margin: 0 }}>{group.name}</h3>
        <div style={{ display: "flex", gap: "6px" }}>
          <button onClick={() => scroll(-1)} style={arrowBtn}>‹</button>
          <button onClick={() => scroll(1)}  style={arrowBtn}>›</button>
        </div>
      </div>
      <div
        ref={rowRef}
        style={{ display: "flex", gap: "12px", overflowX: "auto", overflowY: "visible", paddingTop: "10px", paddingBottom: "18px", paddingLeft: "4px", paddingRight: "4px", scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch", cursor: "grab" }}
        onMouseDown={(e) => { const el = rowRef.current; el.dataset.down = "1"; el.dataset.startX = e.pageX - el.offsetLeft; el.dataset.scrollLeft = el.scrollLeft; el.style.cursor = "grabbing"; }}
        onMouseLeave={() => { rowRef.current.dataset.down = "0"; rowRef.current.style.cursor = "grab"; }}
        onMouseUp={() => { rowRef.current.dataset.down = "0"; rowRef.current.style.cursor = "grab"; }}
        onMouseMove={(e) => { const el = rowRef.current; if (el.dataset.down !== "1") return; e.preventDefault(); el.scrollLeft = Number(el.dataset.scrollLeft) - (e.pageX - el.offsetLeft - Number(el.dataset.startX)); }}
      >
        {group.categories.map((cat) => (
          <CategoryCard key={cat.id} cat={cat} selected={selectedId === cat.id} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}

const hideScrollbarStyle = document.createElement("style");
hideScrollbarStyle.textContent = `div::-webkit-scrollbar { display: none; }`;
document.head.appendChild(hideScrollbarStyle);

/* ─── Kategori Kartı ─── */
function CategoryCard({ cat, selected, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const active = selected || hovered;
  return (
    <button
      onClick={() => onSelect(cat)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0, width: "150px", padding: "20px 12px 16px", borderRadius: "18px",
        border: `2px solid ${active ? cat.color : "rgba(255,255,255,0.1)"}`,
        background: active ? `linear-gradient(145deg, ${cat.color}30, ${cat.color}15)` : "rgba(255,255,255,0.05)",
        cursor: "pointer", transition: "transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease, background 0.22s ease",
        transform: active ? "translateY(-6px)" : "translateY(0)",
        boxShadow: active ? `0 12px 32px ${cat.color}55, 0 0 0 1px ${cat.color}30` : "none",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
        backdropFilter: "blur(12px)", outline: "none", userSelect: "none",
        willChange: "transform",
      }}
    >
      <div style={{ fontSize: "2rem", lineHeight: 1 }}>{cat.icon}</div>
      <div style={{ fontWeight: 800, fontSize: "0.82rem", color: "white", textAlign: "center", lineHeight: 1.3 }}>{cat.name}</div>
      <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.4)", textAlign: "center", lineHeight: 1.3 }}>{cat.description}</div>
      {selected && (
        <div style={{ background: cat.color, color: "white", fontSize: "0.65rem", fontWeight: 800, padding: "2px 10px", borderRadius: "20px", marginTop: "2px" }}>
          ✓ Seçildi
        </div>
      )}
    </button>
  );
}

const arrowBtn = {
  background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: "8px", color: "white", width: "32px", height: "32px", cursor: "pointer",
  fontSize: "1.2rem", lineHeight: "1", display: "flex", alignItems: "center",
  justifyContent: "center", transition: "background 0.2s", fontFamily: "Nunito, sans-serif",
};

/* ─── Ana Sayfa ─── */
export default function CategorySelect() {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode || "solo";

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questionCount, setQuestionCount]       = useState(10);
  const [timePerQuestion, setTimePerQuestion]   = useState(20);
  const [step, setStep]                         = useState(1);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setTimeout(() => setStep(2), 300);
  };

  const handleStart = () => {
    const state = { category: selectedCategory, questionCount, timePerQuestion };
    if (mode === "create") {
      navigate("/create-room", { state });
    } else {
      navigate("/game", { state: { ...state, mode: "solo" } });
    }
  };

  const totalCategories = CATEGORY_GROUPS.reduce((s, g) => s + g.categories.length, 0);

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <Particles />
      <div style={{ position: "relative", zIndex: 1, maxWidth: "1000px", margin: "0 auto", padding: "36px 20px 60px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "32px" }}>
          <button onClick={() => (step === 2 ? setStep(1) : navigate(-1))} className="btn-secondary" style={{ padding: "10px 16px", flexShrink: 0 }}>
            ← Geri
          </button>
          <div>
            <h2 style={{ fontWeight: 900, fontSize: "1.5rem", margin: 0 }}>
              {step === 1 ? "🎯 Kategori Seç" : `${selectedCategory?.icon} ${selectedCategory?.name}`}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.82rem", marginTop: "4px" }}>
              {step === 1
                ? `${totalCategories} kategori • Grupları kaydırarak gez`
                : "Oyun ayarlarını belirle"}
            </p>
          </div>

          {step === 1 && selectedCategory && (
            <div style={{ marginLeft: "auto", background: `${selectedCategory.color}25`, border: `1px solid ${selectedCategory.color}60`, borderRadius: "12px", padding: "8px 16px", display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
              <span>{selectedCategory.icon}</span>
              <span style={{ fontWeight: 700, fontSize: "0.85rem", color: selectedCategory.color }}>{selectedCategory.name}</span>
              <button onClick={() => setStep(2)} className="btn-primary" style={{ padding: "5px 14px", fontSize: "0.78rem", borderRadius: "8px" }}>
                Devam →
              </button>
            </div>
          )}
        </div>

        {/* ─── STEP 1: Kategoriler ─── */}
        {step === 1 && (
          <div>
            {CATEGORY_GROUPS.map((group) => (
              <CategoryRow key={group.id} group={group} selectedId={selectedCategory?.id} onSelect={handleCategorySelect} />
            ))}
          </div>
        )}

        {/* ─── STEP 2: Ayarlar ─── */}
        {step === 2 && selectedCategory && (
          <div className="animate-slide-up" style={{ maxWidth: "540px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Seçilen kategori */}
            <div className="glass-card" style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: "16px", background: `linear-gradient(135deg, ${selectedCategory.color}20, ${selectedCategory.color}10)`, borderColor: selectedCategory.color + "50" }}>
              <div style={{ fontSize: "2.5rem" }}>{selectedCategory.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: "1.1rem" }}>{selectedCategory.name}</div>
                <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem" }}>{selectedCategory.description}</div>
              </div>
              <button onClick={() => setStep(1)} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "10px", color: "rgba(255,255,255,0.6)", padding: "6px 12px", cursor: "pointer", fontSize: "0.78rem", fontFamily: "Nunito, sans-serif", fontWeight: 700 }}>
                Değiştir
              </button>
            </div>

            {/* Soru Sayısı */}
            <div className="glass-card" style={{ padding: "24px" }}>
              <h3 style={{ fontWeight: 800, marginBottom: "16px", fontSize: "1rem" }}>❓ Soru Sayısı</h3>
              <div style={{ display: "flex", gap: "10px" }}>
                {QUESTION_COUNTS.map((count) => (
                  <button
                    key={count}
                    onClick={() => setQuestionCount(count)}
                    style={{
                      flex: 1, padding: "14px 8px", borderRadius: "14px",
                      border: `2px solid ${questionCount === count ? "#7c3aed" : "rgba(255,255,255,0.1)"}`,
                      background: questionCount === count ? "rgba(124,58,237,0.25)" : "rgba(255,255,255,0.04)",
                      color: questionCount === count ? "#c084fc" : "rgba(255,255,255,0.55)",
                      cursor: "pointer", fontFamily: "Nunito, sans-serif", fontWeight: 800,
                      fontSize: "1.2rem", transition: "all 0.2s",
                      boxShadow: questionCount === count ? "0 0 18px rgba(124,58,237,0.3)" : "none",
                    }}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            {/* Soru Süresi */}
            <div className="glass-card" style={{ padding: "24px" }}>
              <h3 style={{ fontWeight: 800, marginBottom: "16px", fontSize: "1rem" }}>⏱ Soru Başına Süre</h3>
              <div style={{ display: "flex", gap: "10px" }}>
                {TIME_OPTIONS.map((opt) => {
                  const active = timePerQuestion === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => setTimePerQuestion(opt.value)}
                      style={{
                        flex: 1, padding: "16px 8px", borderRadius: "14px",
                        border: `2px solid ${active ? opt.color : "rgba(255,255,255,0.1)"}`,
                        background: active ? `${opt.color}22` : "rgba(255,255,255,0.04)",
                        color: active ? opt.color : "rgba(255,255,255,0.5)",
                        cursor: "pointer", fontFamily: "Nunito, sans-serif", fontWeight: 800,
                        fontSize: "0.88rem", transition: "all 0.2s",
                        display: "flex", flexDirection: "column", alignItems: "center", gap: "5px",
                        boxShadow: active ? `0 0 18px ${opt.color}40` : "none",
                      }}
                    >
                      <span style={{ fontSize: "1.5rem" }}>{opt.icon}</span>
                      <span style={{ fontSize: "1.1rem", fontWeight: 900 }}>{opt.label}</span>
                      <span style={{ fontSize: "0.68rem", opacity: 0.75 }}>{opt.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Özet */}
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "14px 20px", display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
              {[
                { icon: "❓", label: `${questionCount} Soru` },
                { icon: "⏱", label: `${timePerQuestion}s / Soru` },
                { icon: "🃏", label: "3 Joker" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", fontWeight: 700 }}>
                  <span>{item.icon}</span><span>{item.label}</span>
                </div>
              ))}
            </div>

            <button className="btn-primary" onClick={handleStart} style={{ width: "100%", padding: "16px", fontSize: "1.05rem" }}>
              {mode === "create" ? "🏠 Oda Oluştur" : "🚀 Oyunu Başlat"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
