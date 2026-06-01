import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getQuestions } from "../data/questions/index.js";
import Particles from "../components/Particles";
import { saveLocalStats } from "../utils/stats";
import { saveGameResult, checkAchievements, dispatchAchievements } from "../utils/achievements";

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

/* ══════════════════════════════
   TIMER BAR
══════════════════════════════ */
function TimerBar({ timeLeft, total }) {
  const pct = (timeLeft / total) * 100;
  const color = pct > 50 ? "#10b981" : pct > 25 ? "#f59e0b" : "#ef4444";
  return (
    <div style={{ position: "relative", height: "6px", background: "rgba(255,255,255,0.08)", borderRadius: "3px", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${color}aa, ${color})`, borderRadius: "3px", transition: "width 1s linear, background 0.4s", boxShadow: `0 0 8px ${color}` }} />
    </div>
  );
}

/* ══════════════════════════════
   OPTION BUTTON (kendi hover state'i için ayrı bileşen)
══════════════════════════════ */
function OptionButton({ opt, idx, answered, hidden, overStyle, badgeStyle, badgeLabel, onSelect }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={() => onSelect(opt, idx)}
      onMouseEnter={() => !answered && !hidden && setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "100%", padding: "15px 18px", borderRadius: "16px",
        border: `2px solid ${overStyle.borderColor || (hov ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.1)")}`,
        background: overStyle.background || (hov ? "rgba(124,58,237,0.12)" : "rgba(255,255,255,0.05)"),
        color: overStyle.color || "white",
        cursor: answered || hidden ? "default" : "pointer",
        fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "0.95rem",
        textAlign: "left", display: "flex", alignItems: "center", gap: "14px",
        backdropFilter: "blur(10px)", transition: "all 0.2s",
        transform: hov && !answered && !hidden ? "translateX(4px)" : "translateX(0)",
        boxShadow: overStyle.boxShadow || (hov ? "0 4px 20px rgba(124,58,237,0.15)" : "none"),
        opacity: overStyle.opacity ?? 1,
        filter: overStyle.filter,
        lineHeight: 1.45,
        pointerEvents: overStyle.pointerEvents,
      }}
    >
      <span style={{ flexShrink: 0, width: "32px", height: "32px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "0.85rem", transition: "all 0.25s", ...badgeStyle }}>
        {badgeLabel}
      </span>
      <span style={{ flex: 1 }}>{opt}</span>
    </button>
  );
}

/* ══════════════════════════════
   JOKER BUTTON
══════════════════════════════ */
function JokerBtn({ icon, label, color, used, active, onClick, disabled }) {
  const [hov, setHov] = useState(false);
  const isDisabled = used || disabled;
  return (
    <button
      onClick={!isDisabled ? onClick : undefined}
      onMouseEnter={() => !isDisabled && setHov(true)}
      onMouseLeave={() => setHov(false)}
      title={label}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: "3px",
        padding: "10px 14px", borderRadius: "14px", cursor: isDisabled ? "not-allowed" : "pointer",
        border: `2px solid ${used ? "rgba(255,255,255,0.06)" : active ? color : hov ? color + "88" : "rgba(255,255,255,0.15)"}`,
        background: used ? "rgba(255,255,255,0.03)" : active ? `${color}30` : hov ? `${color}18` : "rgba(255,255,255,0.07)",
        opacity: used ? 0.35 : 1,
        transition: "all 0.2s",
        transform: hov && !isDisabled ? "scale(1.08)" : "scale(1)",
        boxShadow: active ? `0 0 16px ${color}60` : "none",
        minWidth: "74px",
        backdropFilter: "blur(8px)",
        fontFamily: "Nunito, sans-serif",
        position: "relative",
      }}
    >
      {used && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "12px", background: "rgba(0,0,0,0.4)" }}>
          <span style={{ fontSize: "1.1rem", opacity: 0.6 }}>✕</span>
        </div>
      )}
      <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>{icon}</span>
      <span style={{ fontSize: "0.62rem", fontWeight: 800, color: used ? "rgba(255,255,255,0.3)" : active ? color : "rgba(255,255,255,0.7)", textAlign: "center", lineHeight: 1.2 }}>{label}</span>
    </button>
  );
}

/* ══════════════════════════════
   SONUÇ EKRANI
══════════════════════════════ */
function ResultScreen({ score, questions, maxScore, category, onRestart, onHome }) {
  const pct      = maxScore ? Math.round((score / maxScore) * 100) : 0;
  const emoji    = pct >= 80 ? "🏆" : pct >= 60 ? "🥈" : pct >= 40 ? "😊" : "📚";
  const msg      = pct >= 80 ? "Mükemmel!" : pct >= 60 ? "Harika iş!" : pct >= 40 ? "Fena değil!" : "Daha çok çalış!";
  const barColor = pct >= 80 ? "#10b981" : pct >= 60 ? "#6366f1" : pct >= 40 ? "#f59e0b" : "#ef4444";

  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const text = `${emoji} ${category?.icon || ""} ${category?.name || "Quiz"}\n🎯 ${score} puan · %${pct} başarı\n\nQuizmo'da oyna!`;
    if (navigator.share) {
      try { await navigator.share({ title: "Quizmo Sonucu", text }); } catch {}
    } else {
      navigator.clipboard.writeText(text).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Particles />
      <div className="glass-card animate-bounce-in" style={{ position: "relative", zIndex: 1, maxWidth: "480px", width: "92%", padding: "clamp(28px, 8vw, 52px) clamp(20px, 6vw, 44px)", textAlign: "center" }}>
        <div style={{ fontSize: "5rem", marginBottom: "10px", filter: "drop-shadow(0 0 20px rgba(255,255,255,0.3))" }}>{emoji}</div>
        <h2 style={{ fontWeight: 900, fontSize: "2rem", marginBottom: "6px", background: "linear-gradient(135deg,#c084fc,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{msg}</h2>
        <p style={{ color: "rgba(255,255,255,0.45)", marginBottom: "30px", fontSize: "0.9rem" }}>{category?.icon} {category?.name}</p>

        <div style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.18), rgba(99,102,241,0.12))", border: "1px solid rgba(124,58,237,0.35)", borderRadius: "20px", padding: "28px", marginBottom: "20px" }}>
          <div style={{ fontSize: "3.2rem", fontWeight: 900, background: "linear-gradient(135deg,#c084fc,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>{score}</div>
          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.82rem", marginTop: "4px" }}>/ {maxScore} puan</div>
          <div style={{ margin: "18px 0 10px", height: "10px", background: "rgba(255,255,255,0.08)", borderRadius: "5px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: barColor, borderRadius: "5px", boxShadow: `0 0 10px ${barColor}`, transition: "width 1.2s ease" }} />
          </div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem" }}>%{pct} başarı oranı</div>
        </div>

        {/* Paylaş */}
        <button
          onClick={handleShare}
          style={{
            width: "100%", marginBottom: "12px", padding: "13px",
            borderRadius: "14px", border: "1.5px solid rgba(255,255,255,0.15)",
            background: copied ? "rgba(16,185,129,0.18)" : "rgba(255,255,255,0.07)",
            color: "white", fontFamily: "Nunito, sans-serif", fontWeight: 700,
            fontSize: "0.95rem", cursor: "pointer", transition: "all 0.2s",
          }}
        >
          {copied ? "✅ Kopyalandı!" : "📤 Sonucu Paylaş"}
        </button>

        <div style={{ display: "flex", gap: "12px" }}>
          <button className="btn-secondary" onClick={onHome}    style={{ flex: 1, padding: "14px", borderRadius: "14px", fontSize: "0.95rem" }}>🏠 Ana Menü</button>
          <button className="btn-primary"   onClick={onRestart} style={{ flex: 1, padding: "14px", borderRadius: "14px", fontSize: "0.95rem" }}>🔄 Tekrar</button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════
   ANA OYUN
══════════════════════════════ */
export default function Game() {
  const navigate = useNavigate();
  const location = useLocation();
  const { category, questionCount, timePerQuestion = 20, mode } = location.state || {};
  const TIMER = timePerQuestion;

  /* ─ Soru bankası ─ */
  const [questions, setQuestions] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [noQ,       setNoQ]       = useState(false);

  /* ─ Oyun durumu ─ */
  const [current,  setCurrent]  = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);       // seçilen idx
  const [timeLeft, setTimeLeft] = useState(TIMER);
  const [score,    setScore]    = useState(0);
  const [finished, setFinished] = useState(false);
  const correctRef = useRef(0);
  const wrongRef   = useRef(0);

  /* ─ Jokerler ─ */
  // 1) Yarı Yarıya
  const [fiftyUsed,    setFiftyUsed]    = useState(false);
  const [hiddenOpts,   setHiddenOpts]   = useState(new Set());  // gizlenen şık indexleri

  // 2) Çift Cevap
  const [dblAnsUsed,   setDblAnsUsed]   = useState(false);
  const [dblAnsActive, setDblAnsActive] = useState(false);
  const [firstWrong,   setFirstWrong]   = useState(null);       // ilk yanlış idx

  // 3) Çift Puan
  const [dblPtUsed,    setDblPtUsed]    = useState(false);
  const [dblPtActive,  setDblPtActive]  = useState(false);

  const timerRef = useRef(null);
  const fastAnswersRef = useRef(0);

  /* ─ Soruları yükle ─ */
  useEffect(() => {
    if (!category) { navigate("/"); return; }
    const qs = getQuestions(category.id, null, questionCount || 10);
    if (!qs?.length) { setNoQ(true); setLoading(false); return; }
    setQuestions(qs.map(q => ({ ...q, shuffledOptions: shuffle(q.options) })));
    setLoading(false);
  }, []);

  /* ─ Oyun bitince istatistik + achievement kaydet ─ */
  useEffect(() => {
    if (!finished || !category?.id) return;
    saveLocalStats(category.id, correctRef.current, wrongRef.current);
    const result = {
      categoryId: category.id,
      correct: correctRef.current,
      wrong: wrongRef.current,
      score,
      isMultiplayer: false,
      allJokersUsed: fiftyUsed && dblAnsUsed && dblPtUsed,
      fastAnswers: fastAnswersRef.current,
    };
    saveGameResult(result);
    const unlocked = checkAchievements(result);
    dispatchAchievements(unlocked);
  }, [finished]);

  /* ─ Timer ─ */
  const goNext = useCallback(() => {
    clearInterval(timerRef.current);
    setTimeout(() => {
      if (current + 1 >= questions.length) {
        setFinished(true);
      } else {
        setCurrent(c => c + 1);
        setSelected(null);
        setAnswered(false);
        setHiddenOpts(new Set());
        setDblAnsActive(false);
        setFirstWrong(null);
        setDblPtActive(false);
      }
    }, 1500);
  }, [current, questions.length]);

  const handleTimeout = useCallback(() => {
    if (answered) return;
    clearInterval(timerRef.current);
    setAnswered(true);
    setSelected(null);
    goNext();
  }, [answered, goNext]);

  useEffect(() => {
    if (loading || finished || answered) return;
    setTimeLeft(TIMER);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timerRef.current); handleTimeout(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [current, loading, finished]);

  /* ─ Şık seç ─ */
  const handleSelect = (optText, idx) => {
    if (answered || hiddenOpts.has(idx)) return;
    const q = questions[current];
    const isCorrect = optText === q.answer;

    if (dblAnsActive && !firstWrong) {
      // Çift cevap: ilk seçim
      if (isCorrect) {
        clearInterval(timerRef.current);
        const pts = Math.max(timeLeft * 10, 10) * (dblPtActive ? 2 : 1);
        setScore(s => s + pts);
        setSelected(idx);
        setAnswered(true);
        setDblPtActive(false);
        goNext();
      } else {
        // ilk yanlış — bir hak daha ver
        setFirstWrong(idx);
        // devam et, timer çalışmaya devam eder
      }
      return;
    }

    // Normal seçim veya çift cevap ikinci deneme
    clearInterval(timerRef.current);
    setSelected(idx);
    setAnswered(true);
    if (isCorrect) {
      const pts = Math.max(timeLeft * 10, 10) * (dblPtActive ? 2 : 1);
      setScore(s => s + pts);
      correctRef.current++;
      if (timeLeft <= 10) fastAnswersRef.current++;
    } else {
      wrongRef.current++;
    }
    setDblPtActive(false);
    goNext();
  };

  /* ─ Joker: Yarı Yarıya ─ */
  const useJokerFifty = () => {
    if (fiftyUsed || answered) return;
    const q = questions[current];
    const correctIdx = q.shuffledOptions.findIndex(o => o === q.answer);
    const wrongIdxs  = q.shuffledOptions.map((_, i) => i).filter(i => i !== correctIdx);
    const toHide     = shuffle(wrongIdxs).slice(0, 2);
    setHiddenOpts(new Set(toHide));
    setFiftyUsed(true);
  };

  /* ─ Joker: Çift Cevap ─ */
  const useJokerDblAns = () => {
    if (dblAnsUsed || answered) return;
    setDblAnsActive(true);
    setDblAnsUsed(true);
  };

  /* ─ Joker: Çift Puan ─ */
  const useJokerDblPt = () => {
    if (dblPtUsed || answered) return;
    setDblPtActive(true);
    setDblPtUsed(true);
  };

  /* ─ Loading/no-q ─ */
  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Particles />
      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "16px" }}>⏳</div>
        <p style={{ color: "rgba(255,255,255,0.5)" }}>Sorular hazırlanıyor…</p>
      </div>
    </div>
  );

  if (noQ) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Particles />
      <div className="glass-card" style={{ position: "relative", zIndex: 1, padding: "40px", textAlign: "center", maxWidth: "420px" }}>
        <div style={{ fontSize: "3rem", marginBottom: "16px" }}>😕</div>
        <h2 style={{ marginBottom: "12px" }}>Soru bulunamadı</h2>
        <button className="btn-primary" onClick={() => navigate(-1)} style={{ width: "100%" }}>← Geri Dön</button>
      </div>
    </div>
  );

  if (finished) {
    const maxScore = questions.length * 200;
    return <ResultScreen score={score} questions={questions} maxScore={maxScore} category={category} onRestart={() => navigate("/solo")} onHome={() => navigate("/")} />;
  }

  /* ─ Aktif soru ─ */
  const q = questions[current];
  const correctIdx = q.shuffledOptions.findIndex(o => o === q.answer);
  const letters = ["A", "B", "C", "D"];
  const timePct  = (timeLeft / TIMER) * 100;
  const timerColor = timePct > 50 ? "#10b981" : timePct > 25 ? "#f59e0b" : "#ef4444";

  const getOptStyle = (idx) => {
    const isHidden    = hiddenOpts.has(idx);
    const isCorrect   = idx === correctIdx;
    const isSelected  = idx === selected;
    const isFirstWrong = idx === firstWrong;

    if (isHidden) return { opacity: 0.15, pointerEvents: "none", filter: "blur(1px)" };
    if (!answered && !isFirstWrong) return {};
    if (isCorrect && answered)  return { borderColor: "#10b981", background: "rgba(16,185,129,0.2)", color: "#6ee7b7", boxShadow: "0 0 20px rgba(16,185,129,0.35)" };
    if (isSelected && !isCorrect) return { borderColor: "#ef4444", background: "rgba(239,68,68,0.2)", color: "#fca5a5", boxShadow: "0 0 20px rgba(239,68,68,0.3)" };
    if (isFirstWrong)           return { borderColor: "#ef4444", background: "rgba(239,68,68,0.15)", color: "#fca5a5", opacity: 0.8 };
    return { opacity: 0.35 };
  };

  const getBadgeStyle = (idx) => {
    const isCorrect   = idx === correctIdx;
    const isSelected  = idx === selected;
    const isFirstWrong = idx === firstWrong;
    if (answered && isCorrect)          return { background: "#10b981", color: "white" };
    if (answered && isSelected && !isCorrect) return { background: "#ef4444", color: "white" };
    if (isFirstWrong)                   return { background: "#ef4444", color: "white" };
    return { background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.8)" };
  };

  const getBadgeLabel = (idx) => {
    const isCorrect   = idx === correctIdx;
    const isSelected  = idx === selected;
    const isFirstWrong = idx === firstWrong;
    if (answered && isCorrect)                return "✓";
    if ((answered && isSelected && !isCorrect) || isFirstWrong) return "✗";
    return letters[idx];
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <Particles />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "720px", margin: "0 auto", padding: "24px 20px 60px" }}>

        {/* ══ ÜST BAR ══ */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
          <button onClick={() => navigate(-1)} className="btn-secondary" style={{ padding: "8px 14px", fontSize: "0.82rem" }}>✕ Çık</button>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 800, fontSize: "0.92rem", color: "white" }}>{category?.icon} {category?.name}</div>
            <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>
              {current + 1} / {questions.length}
            </div>
          </div>

          {/* Puan + çift puan göstergesi */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {dblPtActive && (
              <div style={{ background: "rgba(245,158,11,0.25)", border: "1px solid rgba(245,158,11,0.5)", borderRadius: "8px", padding: "4px 8px", fontSize: "0.72rem", fontWeight: 800, color: "#fcd34d", animation: "pulse 1s infinite" }}>
                ×2
              </div>
            )}
            <div style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.3),rgba(99,102,241,0.2))", border: "1px solid rgba(124,58,237,0.4)", borderRadius: "12px", padding: "8px 18px", fontWeight: 900, fontSize: "1.05rem", color: "#c084fc" }}>
              {score} pt
            </div>
          </div>
        </div>

        {/* ══ TIMER ══ */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          <div style={{ flex: 1 }}><TimerBar timeLeft={timeLeft} total={TIMER} /></div>
          <div style={{ minWidth: "36px", textAlign: "right", fontWeight: 900, fontSize: "0.95rem", color: timerColor, transition: "color 0.3s" }}>
            {timeLeft}
          </div>
        </div>

        {/* ══ JOKERLER ══ */}
        <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "20px" }}>
          <JokerBtn
            icon="🔀" label="Yarı Yarıya" color="#06b6d4"
            used={fiftyUsed} active={false}
            onClick={useJokerFifty} disabled={answered}
          />
          <JokerBtn
            icon="💬" label="Çift Cevap" color="#10b981"
            used={dblAnsUsed} active={dblAnsActive}
            onClick={useJokerDblAns} disabled={answered}
          />
          <JokerBtn
            icon="⚡" label="Çift Puan" color="#f59e0b"
            used={dblPtUsed} active={dblPtActive}
            onClick={useJokerDblPt} disabled={answered}
          />
        </div>

        {/* Çift cevap bilgisi */}
        {dblAnsActive && !answered && (
          <div style={{ textAlign: "center", marginBottom: "10px", fontSize: "0.78rem", fontWeight: 700, color: "#6ee7b7", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "10px", padding: "6px 12px", display: "inline-block", marginLeft: "50%", transform: "translateX(-50%)" }}>
            {firstWrong !== null ? "⚠️ Son bir hakkın var!" : "💬 İki şık seçebilirsin"}
          </div>
        )}

        {/* ══ SORU KUTUSU ══ */}
        <div
          style={{
            position: "relative",
            borderRadius: "24px",
            padding: "2px",
            background: dblPtActive
              ? "linear-gradient(135deg, #f59e0b, #d97706)"
              : "linear-gradient(135deg, rgba(124,58,237,0.6), rgba(99,102,241,0.4), rgba(14,165,233,0.3))",
            marginBottom: "14px",
            boxShadow: dblPtActive
              ? "0 0 30px rgba(245,158,11,0.25)"
              : "0 0 30px rgba(124,58,237,0.15)",
          }}
        >
          <div style={{ background: "linear-gradient(135deg, rgba(15,10,40,0.97), rgba(20,15,50,0.95))", borderRadius: "22px", padding: "28px 28px 24px" }}>
            {/* Üst satır: numara */}
            <div style={{ marginBottom: "16px" }}>
              <div style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)", borderRadius: "10px", padding: "3px 12px", fontSize: "0.75rem", fontWeight: 800, color: "#a78bfa", display: "inline-block" }}>
                Soru {current + 1}
              </div>
            </div>

            <p style={{ fontWeight: 800, fontSize: "1.12rem", lineHeight: 1.6, margin: 0, color: "white", letterSpacing: "0.01em" }}>
              {q.question}
            </p>
          </div>
        </div>

        {/* ══ ŞIKLAR ══ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
          {q.shuffledOptions.map((opt, idx) => (
            <OptionButton
              key={idx}
              opt={opt}
              idx={idx}
              answered={answered}
              hidden={hiddenOpts.has(idx)}
              overStyle={getOptStyle(idx)}
              badgeStyle={getBadgeStyle(idx)}
              badgeLabel={getBadgeLabel(idx)}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {/* ══ SÜRE DOLDU MESAJI ══ */}
        {answered && selected === null && (
          <div style={{ padding: "12px 20px", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "14px", color: "#fca5a5", fontWeight: 700, fontSize: "0.88rem", textAlign: "center" }}>
            ⏰ Süre doldu! Doğru cevap: <strong style={{ color: "#6ee7b7" }}>{q.answer}</strong>
          </div>
        )}

        {/* ══ İLERLEME NOKTALARI ══ */}
        <div style={{ display: "flex", justifyContent: "center", gap: "5px", marginTop: "24px" }}>
          {questions.map((_, i) => (
            <div key={i} style={{
              width: i === current ? "22px" : "7px", height: "7px", borderRadius: "4px",
              background: i < current ? "rgba(99,102,241,0.7)" : i === current ? "#818cf8" : "rgba(255,255,255,0.12)",
              transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.7;transform:scale(1.05)} }
      `}</style>
    </div>
  );
}
