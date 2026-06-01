import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CATEGORIES } from "../data/categories";
import { getQuestions } from "../data/questions/index.js";
import socket from "../socket";
import Particles from "../components/Particles";
import { saveLocalStats, saveWeeklyScore } from "../utils/stats";
import { getJokers, useJoker } from "../utils/jokers";
import { saveGameResult, checkAchievements, dispatchAchievements } from "../utils/achievements";
import { addXP, calcGameXP } from "../utils/xp";
import { updateDailyQuestProgress } from "../utils/dailyQuest";

// Varsayılan süre — location.state'ten ya da question_start'tan override edilir
const DEFAULT_TIME = 20;

function fisherYates(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ══════════════════════════════
   TIMER BAR
══════════════════════════════ */
function TimerBar({ timeLeft, total }) {
  const pct   = (timeLeft / total) * 100;
  const color = pct > 50 ? "#10b981" : pct > 25 ? "#f59e0b" : "#ef4444";
  return (
    <div style={{ position: "relative", height: "8px", background: "rgba(255,255,255,0.08)", borderRadius: "4px", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0, height: "100%",
        width: `${pct}%`,
        background: `linear-gradient(90deg, ${color}aa, ${color})`,
        borderRadius: "4px",
        transition: "width 1s linear, background 0.4s",
        boxShadow: `0 0 8px ${color}`,
      }} />
    </div>
  );
}

/* ══════════════════════════════
   COUNTDOWN PHASE
══════════════════════════════ */
function CountdownPhase() {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count <= 0) return;
    const t = setTimeout(() => setCount(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", minHeight: "70vh", gap: "20px",
    }}>
      <div style={{
        fontSize: "0.88rem", fontWeight: 700,
        color: "rgba(255,255,255,0.45)",
        textTransform: "uppercase", letterSpacing: "3px",
      }}>
        Hazır Ol!
      </div>

      <div
        key={count}
        style={{
          fontSize: count === 0 ? "3.5rem" : "9rem",
          fontWeight: 900,
          lineHeight: 1,
          background: "linear-gradient(135deg, #c084fc, #ec4899)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "mp-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        }}
      >
        {count === 0 ? "BAŞLA! 🚀" : count}
      </div>

      <style>{`
        @keyframes mp-pop {
          from { transform: scale(0.2); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════
   QUESTION RESULTS (soru arası)
══════════════════════════════ */
function QuestionResults({ correctAnswer, results, players, myId, isLast }) {
  const myResult = results.find(r => r.id === myId);
  const sorted   = [...players].sort((a, b) => b.score - a.score);

  const resultsByPlayer = Object.fromEntries(results.map(r => [r.id, r]));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", animation: "mp-fadein 0.4s ease" }}>

      {/* Kişisel sonuç banner */}
      <div style={{
        padding: "24px",
        borderRadius: "20px",
        background: myResult?.correct
          ? "linear-gradient(135deg, rgba(16,185,129,0.22), rgba(16,185,129,0.08))"
          : "linear-gradient(135deg, rgba(239,68,68,0.22), rgba(239,68,68,0.08))",
        border: `1.5px solid ${myResult?.correct ? "rgba(16,185,129,0.45)" : "rgba(239,68,68,0.45)"}`,
        textAlign: "center",
      }}>
        <div style={{ fontSize: "3rem", marginBottom: "10px" }}>
          {myResult?.correct ? "✅" : myResult?.answer ? "❌" : "⏰"}
        </div>
        <div style={{ fontWeight: 900, fontSize: "1.2rem", color: myResult?.correct ? "#6ee7b7" : "#fca5a5", marginBottom: "6px" }}>
          {myResult?.correct
            ? `+${myResult.points} puan kazandın!`
            : myResult?.answer
              ? "Yanlış cevap"
              : "Süre doldu!"}
        </div>
        <div style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.5)" }}>
          Doğru cevap:{" "}
          <strong style={{ color: "#6ee7b7" }}>{correctAnswer}</strong>
        </div>
      </div>

      {/* Anlık sıralama */}
      <div className="glass-card" style={{ padding: "22px" }}>
        <div style={{
          fontSize: "0.72rem", fontWeight: 700,
          color: "rgba(255,255,255,0.35)",
          textTransform: "uppercase", letterSpacing: "0.8px",
          marginBottom: "14px",
        }}>
          📊 Anlık Sıralama
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {sorted.map((p, i) => {
            const res    = resultsByPlayer[p.id];
            const gained = res?.correct ? res.points : 0;
            return (
              <div
                key={p.id}
                style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "11px 14px", borderRadius: "13px",
                  background: p.id === myId
                    ? "rgba(124,58,237,0.18)"
                    : "rgba(255,255,255,0.04)",
                  border: `1px solid ${p.id === myId ? "rgba(124,58,237,0.35)" : "rgba(255,255,255,0.07)"}`,
                }}
              >
                {/* Sıra */}
                <div style={{
                  width: "26px", textAlign: "center", fontWeight: 900,
                  fontSize: "0.95rem",
                  color: i === 0 ? "#fcd34d" : i === 1 ? "#9ca3af" : i === 2 ? "#cd7c2f" : "rgba(255,255,255,0.35)",
                }}>
                  {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`}
                </div>

                <div style={{ flex: 1, fontWeight: 700, fontSize: "0.92rem" }}>{p.name}</div>

                {/* Bu turda kazandığı puan */}
                {gained > 0 && (
                  <div style={{
                    fontSize: "0.72rem", fontWeight: 800,
                    color: "#6ee7b7",
                    background: "rgba(16,185,129,0.12)",
                    border: "1px solid rgba(16,185,129,0.25)",
                    borderRadius: "8px", padding: "2px 8px",
                  }}>
                    +{gained}
                  </div>
                )}
                {res && !res.correct && res.answer && (
                  <div style={{ fontSize: "0.72rem", color: "#fca5a5" }}>✗</div>
                )}
                {res && !res.answer && (
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)" }}>⏰</div>
                )}

                {/* Toplam skor */}
                <div style={{ fontWeight: 900, fontSize: "1rem", color: "#c084fc", minWidth: "40px", textAlign: "right" }}>
                  {p.score}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", fontWeight: 600 }}>
        {isLast ? "🏆 Oyun bitiyor…" : "⏳ Sonraki soru geliyor…"}
      </div>

      <style>{`
        @keyframes mp-fadein {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════
   GAME OVER / FİNAL SIRALAMASI
══════════════════════════════ */
function GameOverScreen({ players, myId, onHome, onRematch, rematchVoted, rematchInfo }) {
  const sorted  = [...players].sort((a, b) => b.score - a.score);
  const myRank  = sorted.findIndex(p => p.id === myId) + 1;
  const myP     = sorted.find(p => p.id === myId);

  const trophy  = myRank === 1 ? "🏆" : myRank === 2 ? "🥈" : myRank === 3 ? "🥉" : "🎮";
  const msg     = myRank === 1 ? "Tebrikler, kazandın!" : myRank <= 3 ? "Harika iş!" : "İyi oynadın!";

  const [copied, setCopied] = useState(false);
  const handleShare = async () => {
    const text = `${trophy} Multiplayer Quiz\n${myRank}. sıra · ${myP?.score || 0} puan\n\nQuizmo'da oyna!`;
    if (navigator.share) {
      try { await navigator.share({ title: "Quizmo Sonucu", text }); } catch {}
    } else {
      navigator.clipboard.writeText(text).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", animation: "mp-fadein 0.5s ease" }}>

      {/* Kişisel özet */}
      <div className="glass-card" style={{ padding: "36px", textAlign: "center" }}>
        <div style={{ fontSize: "5rem", marginBottom: "12px", filter: "drop-shadow(0 0 20px rgba(255,255,255,0.25))" }}>
          {trophy}
        </div>
        <h2 style={{
          fontWeight: 900, fontSize: "1.9rem", margin: "0 0 8px",
          background: "linear-gradient(135deg, #c084fc, #ec4899)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          {msg}
        </h2>
        {myP && (
          <p style={{ color: "rgba(255,255,255,0.4)", margin: 0, fontSize: "0.9rem" }}>
            <strong style={{ color: "white" }}>{myP.name}</strong>
            {" · "}
            <strong style={{ color: "#c084fc" }}>{myP.score} puan</strong>
            {" · "}
            {myRank}. sıra
          </p>
        )}
      </div>

      {/* Final sıralama */}
      <div className="glass-card" style={{ padding: "24px" }}>
        <div style={{
          fontSize: "0.72rem", fontWeight: 700,
          color: "rgba(255,255,255,0.35)",
          textTransform: "uppercase", letterSpacing: "0.8px",
          marginBottom: "16px",
        }}>
          🏆 Final Sıralaması
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {sorted.map((p, i) => (
            <div
              key={p.id}
              style={{
                display: "flex", alignItems: "center", gap: "14px",
                padding: "14px 16px", borderRadius: "14px",
                background: p.id === myId
                  ? "linear-gradient(135deg, rgba(124,58,237,0.22), rgba(99,102,241,0.12))"
                  : i === 0
                  ? "linear-gradient(135deg, rgba(245,158,11,0.1), rgba(245,158,11,0.04))"
                  : "rgba(255,255,255,0.04)",
                border: `1px solid ${
                  p.id === myId
                    ? "rgba(124,58,237,0.35)"
                    : i === 0
                    ? "rgba(245,158,11,0.25)"
                    : "rgba(255,255,255,0.07)"
                }`,
              }}
            >
              <div style={{ fontSize: "1.5rem", width: "34px", textAlign: "center" }}>
                {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}`}
              </div>

              <div style={{ flex: 1, fontWeight: 700, fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "8px" }}>
                {p.name}
                {p.id === myId && (
                  <span style={{
                    fontSize: "0.68rem", background: "rgba(124,58,237,0.3)",
                    color: "#c084fc", padding: "2px 8px", borderRadius: "10px",
                  }}>
                    Sen
                  </span>
                )}
              </div>

              <div style={{
                fontWeight: 900, fontSize: "1.15rem",
                color: i === 0 ? "#fcd34d" : i === 1 ? "#d1d5db" : i === 2 ? "#cd7c2f" : "#c084fc",
              }}>
                {p.score}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Paylaş */}
      <button
        onClick={handleShare}
        style={{
          padding: "13px", borderRadius: "14px",
          border: "1.5px solid rgba(255,255,255,0.15)",
          background: copied ? "rgba(16,185,129,0.18)" : "rgba(255,255,255,0.07)",
          color: "white", fontFamily: "Nunito, sans-serif", fontWeight: 700,
          fontSize: "0.95rem", cursor: "pointer", transition: "all 0.2s",
        }}
      >
        {copied ? "✅ Kopyalandı!" : "📤 Sonucu Paylaş"}
      </button>

      {/* Yeniden Oyna */}
      {onRematch && (
        <button
          className="btn-primary"
          onClick={onRematch}
          disabled={rematchVoted}
          style={{ padding: "16px", fontSize: "1rem", opacity: rematchVoted ? 0.7 : 1 }}
        >
          {rematchVoted
            ? rematchInfo
              ? `⏳ ${rematchInfo.count}/${rematchInfo.total} hazır…`
              : "⏳ Bekleniyor…"
            : "🔄 Yeniden Oyna"}
        </button>
      )}

      <button
        className="btn-secondary"
        onClick={onHome}
        style={{ padding: "14px", fontSize: "0.95rem" }}
      >
        🏠 Ana Menüye Dön
      </button>

      <style>{`
        @keyframes mp-fadein {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════
   ANA OYUN BİLEŞENİ
══════════════════════════════ */
export default function MultiplayerGame() {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomCode, category: categoryId, isMatchmaking, isHost, timePerQuestion: initTime, questionCount: initQCount } = location.state || {};

  const catData = CATEGORIES.find(c => c.id === categoryId);

  /* ─ Oyun durumu ─ */
  const [phase,          setPhase]          = useState("countdown");
  // countdown | question | answered | results | finished

  const [question,       setQuestion]       = useState(null);
  const [shuffledOpts,   setShuffledOpts]   = useState([]);
  const [questionIndex,  setQuestionIndex]  = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [timeLeft,       setTimeLeft]       = useState(initTime || DEFAULT_TIME);
  const [totalTime,      setTotalTime]      = useState(initTime || DEFAULT_TIME);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answeredCount,  setAnsweredCount]  = useState(0);
  const [playerCount,    setPlayerCount]    = useState(0);

  /* ─ Jokerler ─ */
  const [jokerCounts,   setJokerCounts]   = useState({ fifty: 0, doubleAnswer: 0, doublePoints: 0 });
  const [fiftyUsed,     setFiftyUsed]     = useState(false);
  const [hiddenOpts,    setHiddenOpts]    = useState(new Set());
  const [dblAnsUsed,    setDblAnsUsed]    = useState(false);
  const [dblAnsActive,  setDblAnsActive]  = useState(false);
  const [firstWrong,    setFirstWrong]    = useState(null);
  const [dblPtUsed,     setDblPtUsed]     = useState(false);
  const [dblPtActive,   setDblPtActive]   = useState(false);

  /* ─ Soru sonu ─ */
  const [correctAnswer,    setCorrectAnswer]    = useState(null);
  const [questionResults,  setQuestionResults]  = useState([]);
  const [players,          setPlayers]          = useState([]);
  const [isLast,           setIsLast]           = useState(false);

  /* ─ Oyun sonu ─ */
  const [finalPlayers, setFinalPlayers] = useState([]);

  /* ─ Rematch ─ */
  const [rematchVoted, setRematchVoted] = useState(false);
  const [rematchInfo,  setRematchInfo]  = useState(null); // { count, total }

  /* ─ UI ─ */
  const [showExitModal, setShowExitModal] = useState(false);
  const [notification,  setNotification]  = useState("");

  const timerRef      = useRef(null);
  const watchdogRef   = useRef(null); // "results" fazında Q2 gelmezse devreye girer
  const correctRef    = useRef(0);
  const wrongRef      = useRef(0);
  const myId          = socket.id;

  const showNotif = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3500);
  };

  const handleExit = () => {
    socket.disconnect();
    navigate("/");
  };

  /* ─ Joker sayılarını yükle ─ */
  useEffect(() => {
    setJokerCounts(getJokers());
  }, []);

  /* ─ Her yeni soruda joker durumlarını sıfırla ─ */
  useEffect(() => {
    if (phase === "question") {
      setHiddenOpts(new Set());
      setDblAnsActive(false);
      setFirstWrong(null);
      setDblPtActive(false);
    }
  }, [questionIndex]);

  /* ─ Güvenlik yönlendirmesi + matchmaking auto-start ─ */
  useEffect(() => {
    if (!roomCode) { navigate("/"); return; }

    // Matchmaking modunda host soruları seçer ve oyunu başlatır
    // (Lobby yok, kullanıcı buton tıklamaz — otomatik)
    if (isMatchmaking && isHost) {
      const questions = getQuestions(categoryId, null, initQCount || 10);
      socket.emit("start_game", { questions });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ─ Yeniden bağlanma (oyundan düşme koruması) ─ */
  useEffect(() => {
    const playerName = (localStorage.getItem("quizmo_profile_name") || "").trim()
      || `Misafir${localStorage.getItem("quizmo_guest_id") || ""}`;

    const onReconnect = () => {
      if (roomCode) {
        socket.emit("rejoin_room", { roomCode, playerName });
      }
    };
    socket.on("connect", onReconnect);
    return () => socket.off("connect", onReconnect);
  }, [roomCode]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ─ Socket dinleyicileri ─ */
  useEffect(() => {
    if (!socket.connected) socket.connect();

    const onQuestionStart = ({ question: q, index, total, timeLimit }) => {
      clearTimeout(watchdogRef.current); // soru geldi, watchdog'u iptal et
      clearInterval(timerRef.current);
      setQuestion(q);
      setShuffledOpts(fisherYates(q.options));
      setQuestionIndex(index);
      setTotalQuestions(total);
      setTotalTime(timeLimit);
      setTimeLeft(timeLimit);
      setSelectedAnswer(null);
      setAnsweredCount(0);
      setPhase("question");
    };

    const onPlayerAnswered = ({ count, total }) => {
      setAnsweredCount(count);
      setPlayerCount(total);
    };

    const onQuestionEnd = ({ correctAnswer: ca, results, players: updatedPlayers, isLast: last }) => {
      clearInterval(timerRef.current);
      const myResult = results.find(r => r.id === socket.id);
      if (myResult?.correct) correctRef.current++;
      else if (myResult?.answer) wrongRef.current++;
      setCorrectAnswer(ca);
      setQuestionResults(results);
      setPlayers(updatedPlayers);
      setIsLast(last);
      setPhase("results");

      // Son soru değilse: sonraki question_start gelmezse 7s sonra zorla yeniden bağlan
      if (!last) {
        clearTimeout(watchdogRef.current);
        watchdogRef.current = setTimeout(() => {
          const pName = (localStorage.getItem("quizmo_profile_name") || "").trim()
            || `Misafir${localStorage.getItem("quizmo_guest_id") || ""}`;
          socket.emit("rejoin_room", { roomCode, playerName: pName });
        }, 7000);
      }
    };

    const onGameOver = ({ players: finalP }) => {
      clearInterval(timerRef.current);
      const sorted   = [...finalP].sort((a, b) => b.score - a.score);
      const myPlayer = finalP.find(p => p.id === socket.id);
      if (myPlayer) {
        saveWeeklyScore(myPlayer.name, myPlayer.score);
        saveLocalStats(categoryId, correctRef.current, wrongRef.current);
        const myRank = sorted.findIndex(p => p.id === socket.id) + 1;
        const result = {
          categoryId,
          correct: correctRef.current,
          wrong:   wrongRef.current,
          score:   myPlayer.score,
          isMultiplayer: true,
          rank: myRank,
          allJokersUsed: false,
        };
        saveGameResult(result);
        const unlocked = checkAchievements(result);
        dispatchAchievements(unlocked);
        addXP(calcGameXP(correctRef.current, wrongRef.current, true));
        updateDailyQuestProgress(result);
      }
      setFinalPlayers(finalP);
      setPhase("finished");
    };

    const onPlayerLeft = ({ playerName }) => {
      showNotif(`${playerName} oyundan ayrıldı 👋`);
    };

    const onRematchVoteUpdate = ({ count, total }) => {
      setRematchInfo({ count, total });
    };

    const onRematchReady = () => {
      // Tüm state'i sıfırla, countdown'a dön
      clearInterval(timerRef.current);
      setPhase("countdown");
      setQuestion(null);
      setShuffledOpts([]);
      setQuestionIndex(0);
      setSelectedAnswer(null);
      setAnsweredCount(0);
      setCorrectAnswer(null);
      setQuestionResults([]);
      setFinalPlayers([]);
      setIsLast(false);
      setRematchVoted(false);
      setRematchInfo(null);
      correctRef.current = 0;
      wrongRef.current   = 0;

      // Host yeni soruları gönderir
      if (isHost) {
        const questions = getQuestions(categoryId, null, initQCount || 10);
        socket.emit("start_game", { questions });
      }
    };

    socket.on("question_start",       onQuestionStart);
    socket.on("player_answered",      onPlayerAnswered);
    socket.on("question_end",         onQuestionEnd);
    socket.on("game_over",            onGameOver);
    socket.on("player_left",          onPlayerLeft);
    socket.on("rematch_vote_update",  onRematchVoteUpdate);
    socket.on("rematch_ready",        onRematchReady);

    return () => {
      socket.off("question_start",       onQuestionStart);
      socket.off("player_answered",      onPlayerAnswered);
      socket.off("question_end",         onQuestionEnd);
      socket.off("game_over",            onGameOver);
      socket.off("player_left",          onPlayerLeft);
      socket.off("rematch_vote_update",  onRematchVoteUpdate);
      socket.off("rematch_ready",        onRematchReady);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ─ Geri sayım zamanlayıcısı ─ */
  useEffect(() => {
    if (phase !== "question") {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [phase, question]);

  /* ─ Joker: Yarı Yarıya ─ */
  const useJokerFifty = () => {
    if (fiftyUsed || phase !== "question" || selectedAnswer) return;
    if (!useJoker("fifty")) return;
    const correctIdx = shuffledOpts.findIndex(o => o === question?.answer);
    // question.answer yok (sunucu göndermedi) — tek sorun bu; server'dan gelmediği için
    // client-side'da doğru cevabı bilmiyoruz. Yarı yarıyayı seçeneklerden rastgele 2'sini sakla
    const wrongIdxs = shuffledOpts.map((_, i) => i).filter(i => i !== correctIdx);
    // correctIdx bulunamazsa (== -1), rastgele 2'yi sakla
    const toHide = correctIdx === -1
      ? [...shuffledOpts.keys()].sort(() => Math.random() - 0.5).slice(0, 2)
      : wrongIdxs.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenOpts(new Set(toHide));
    setFiftyUsed(true);
    setJokerCounts(getJokers());
  };

  /* ─ Joker: Çift Cevap ─ */
  const useJokerDbl = () => {
    if (dblAnsUsed || phase !== "question" || selectedAnswer) return;
    if (!useJoker("doubleAnswer")) return;
    setDblAnsUsed(true);
    setDblAnsActive(true);
    setJokerCounts(getJokers());
  };

  /* ─ Joker: Çift Puan ─ */
  const useJokerPts = () => {
    if (dblPtUsed || phase !== "question" || selectedAnswer) return;
    if (!useJoker("doublePoints")) return;
    setDblPtUsed(true);
    setDblPtActive(true);
    setJokerCounts(getJokers());
  };

  /* ─ Cevap seç ─ */
  const handleAnswer = (opt, idx) => {
    if (phase !== "question" || timeLeft === 0) return;
    if (hiddenOpts.has(idx)) return;

    if (dblAnsActive && !firstWrong) {
      // Çift cevap: ilk seçimde doğruyu bilemeyiz (server-side cevap gizli)
      // Doğruyu bilmeden çalışamaz — bu jokeri sadece server bilir
      // Basit çözüm: ilk seçimi "deneme" olarak kabul et, yanlışsa ikinci hak ver
      setFirstWrong(idx);
      // Server'a göndermiyoruz henüz — 2. cevabı bekle
      return;
    }

    if (selectedAnswer !== null) return; // zaten cevaplandı

    setSelectedAnswer(opt);
    setPhase("answered");
    socket.emit("player_answer", { answer: opt, doublePts: dblPtActive });
    setDblPtActive(false);
  };

  /* ═══════════════════════ RENDER ═══════════════════════ */

  /* ─ Çıkış modal + bildirim (ortak) ─ */
  const ExitModal = () => (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
    }}>
      <div className="glass-card" style={{ padding: "32px", maxWidth: "360px", width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: "2.8rem", marginBottom: "14px" }}>🚪</div>
        <h3 style={{ fontWeight: 900, fontSize: "1.2rem", margin: "0 0 10px" }}>Oyundan Çıkılsın mı?</h3>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.86rem", margin: "0 0 24px" }}>
          Çıkarsan rakibin otomatik kazanır.
        </p>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className="btn-secondary"
            onClick={() => setShowExitModal(false)}
            style={{ flex: 1, padding: "12px" }}
          >
            İptal
          </button>
          <button
            className="btn-danger"
            onClick={handleExit}
            style={{ flex: 1, padding: "12px" }}
          >
            Çık
          </button>
        </div>
      </div>
    </div>
  );

  const Notification = () => notification ? (
    <div style={{
      position: "fixed", top: "20px", left: "50%", transform: "translateX(-50%)",
      background: "rgba(30,20,60,0.95)", backdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.15)", borderRadius: "14px",
      padding: "12px 24px", fontWeight: 700, fontSize: "0.9rem",
      zIndex: 900, whiteSpace: "nowrap",
      animation: "mp-fadein 0.3s ease",
    }}>
      {notification}
    </div>
  ) : null;

  const ExitBtn = () => (
    <button
      onClick={() => setShowExitModal(true)}
      style={{
        position: "fixed", top: "max(18px, env(safe-area-inset-top, 18px))", right: "18px", zIndex: 800,
        width: "44px", height: "44px", borderRadius: "50%",
        background: "rgba(239,68,68,0.15)", border: "1.5px solid rgba(239,68,68,0.35)",
        color: "#fca5a5", cursor: "pointer", fontSize: "1rem",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s",
      }}
      title="Oyundan Çık"
    >
      ✕
    </button>
  );

  /* Countdown */
  if (phase === "countdown") {
    return (
      <div style={{ minHeight: "100vh", position: "relative" }}>
        <Particles />
        {showExitModal && <ExitModal />}
        <Notification />
        <ExitBtn />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "720px", margin: "0 auto", padding: "40px 20px" }}>
          <CountdownPhase />
        </div>
      </div>
    );
  }

  const handleRematch = () => {
    setRematchVoted(true);
    socket.emit("want_rematch");
  };

  /* Oyun bitti */
  if (phase === "finished") {
    return (
      <div style={{ minHeight: "100vh", position: "relative" }}>
        <Particles />
        <Notification />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "680px", margin: "0 auto", padding: "40px 20px 80px" }}>
          <GameOverScreen
            players={finalPlayers}
            myId={myId}
            onHome={() => { socket.disconnect(); navigate("/"); }}
            onRematch={handleRematch}
            rematchVoted={rematchVoted}
            rematchInfo={rematchInfo}
          />
        </div>
      </div>
    );
  }

  /* Soru arası sonuçlar */
  if (phase === "results") {
    return (
      <div style={{ minHeight: "100vh", position: "relative" }}>
        <Particles />
        {showExitModal && <ExitModal />}
        <Notification />
        <ExitBtn />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "680px", margin: "0 auto", padding: "40px 20px 80px" }}>
          {/* Üst bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px", padding: "8px 14px",
              fontSize: "0.82rem", fontWeight: 700, color: "rgba(255,255,255,0.45)",
            }}>
              {questionIndex + 1} / {totalQuestions}
            </div>
            {catData && (
              <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "rgba(255,255,255,0.6)" }}>
                {catData.icon} {catData.name}
              </div>
            )}
          </div>

          <QuestionResults
            correctAnswer={correctAnswer}
            results={questionResults}
            players={players}
            myId={myId}
            isLast={isLast}
          />
        </div>
      </div>
    );
  }

  /* Soru yüklenmedi */
  if (!question) return null;

  /* ─ Aktif soru (question | answered) ─ */
  const letters    = ["A", "B", "C", "D"];
  const isAnswered = phase === "answered";
  const timePct    = (timeLeft / totalTime) * 100;
  const timerColor = timePct > 50 ? "#10b981" : timePct > 25 ? "#f59e0b" : "#ef4444";

  const getOptStyle = (opt, idx) => {
    if (hiddenOpts.has(idx)) return { opacity: 0, pointerEvents: "none" };
    if (firstWrong === idx)  return { opacity: 0.35, borderColor: "rgba(239,68,68,0.5)" };
    if (isAnswered) {
      if (opt === selectedAnswer) return {
        borderColor: "#f59e0b",
        background:  "rgba(245,158,11,0.15)",
        color:       "#fcd34d",
        boxShadow:   "0 0 18px rgba(245,158,11,0.25)",
      };
      return { opacity: 0.28 };
    }
    if (timeLeft === 0) return { opacity: 0.28 };
    return {};
  };

  const getBadge = (opt, idx) => {
    if (firstWrong === idx)
      return { label: "✗", style: { background: "rgba(239,68,68,0.3)", color: "#fca5a5" } };
    if (isAnswered && opt === selectedAnswer)
      return { label: "✓", style: { background: "#f59e0b", color: "#1a1a2e" } };
    if (dblAnsActive && !firstWrong && !isAnswered)
      return { label: letters[idx], style: { background: "rgba(139,92,246,0.3)", color: "#c084fc" } };
    return {
      label: letters[idx],
      style: { background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.8)" },
    };
  };

  /* Joker buton bileşeni */
  const JokerBtn = ({ icon, label, color, used, active, count, onClick }) => (
    <button
      onClick={onClick}
      disabled={used || count === 0 || isAnswered || timeLeft === 0}
      title={count === 0 ? "Joker kalmadı" : label}
      style={{
        flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "3px",
        padding: "8px 6px", borderRadius: "12px", cursor: used || count === 0 ? "not-allowed" : "pointer",
        border: `1.5px solid ${used || count === 0 ? "rgba(255,255,255,0.06)" : active ? color : color + "55"}`,
        background: used || count === 0 ? "rgba(255,255,255,0.03)" : active ? color + "30" : color + "15",
        opacity: used || count === 0 ? 0.35 : 1,
        transition: "all 0.2s", fontFamily: "Nunito, sans-serif", position: "relative",
      }}
    >
      <span style={{ fontSize: "1.25rem", lineHeight: 1 }}>{icon}</span>
      <span style={{ fontSize: "0.58rem", fontWeight: 800, color: used || count === 0 ? "rgba(255,255,255,0.3)" : active ? color : "rgba(255,255,255,0.65)", textAlign: "center", lineHeight: 1.2 }}>
        {label}
      </span>
      {count > 0 && !used && (
        <span style={{
          position: "absolute", top: "4px", right: "4px",
          background: color, color: "#fff", borderRadius: "50%",
          fontSize: "0.55rem", fontWeight: 900, width: "14px", height: "14px",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {count}
        </span>
      )}
    </button>
  );

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <Particles />
      {showExitModal && <ExitModal />}
      <Notification />
      <ExitBtn />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "720px", margin: "0 auto", padding: "24px 20px 60px" }}>

        {/* ══ ÜST BAR ══ */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
          {/* Soru sayacı */}
          <div style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px", padding: "8px 14px",
            fontSize: "0.82rem", fontWeight: 700, color: "rgba(255,255,255,0.45)",
          }}>
            {questionIndex + 1} / {totalQuestions}
          </div>

          {/* Kategori */}
          <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "rgba(255,255,255,0.55)" }}>
            {catData ? `${catData.icon} ${catData.name}` : "🌐 Online"}
          </div>

          {/* Süre */}
          <div style={{
            minWidth: "46px", textAlign: "center",
            fontWeight: 900, fontSize: "1rem",
            color: timerColor,
            background: "rgba(255,255,255,0.06)",
            border: `1.5px solid ${timerColor}55`,
            borderRadius: "12px", padding: "8px 12px",
            transition: "color 0.3s, border-color 0.3s",
          }}>
            {timeLeft}
          </div>
        </div>

        {/* ══ TIMER BAR ══ */}
        <div style={{ marginBottom: "14px" }}>
          <TimerBar timeLeft={timeLeft} total={totalTime} />
        </div>

        {/* ══ CEVAPLAYAN SAYISI ══ */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
          <div style={{
            background: answeredCount > 0 ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.05)",
            border: `1px solid ${answeredCount > 0 ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.1)"}`,
            borderRadius: "20px", padding: "6px 18px",
            fontSize: "0.78rem", fontWeight: 700,
            color: answeredCount > 0 ? "#6ee7b7" : "rgba(255,255,255,0.35)",
            transition: "all 0.3s",
          }}>
            {answeredCount > 0
              ? `✅ ${answeredCount}/${playerCount || "?"} oyuncu cevapladı`
              : "⏳ Cevaplar bekleniyor…"}
          </div>
        </div>

        {/* ══ SORU KUTUSU ══ */}
        <div style={{
          position: "relative", borderRadius: "24px", padding: "2px",
          background: "linear-gradient(135deg, rgba(124,58,237,0.6), rgba(99,102,241,0.4), rgba(14,165,233,0.3))",
          marginBottom: "14px",
          boxShadow: "0 0 30px rgba(124,58,237,0.15)",
        }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(15,10,40,0.97), rgba(20,15,50,0.95))",
            borderRadius: "22px", padding: "28px 28px 24px",
          }}>
            <div style={{ marginBottom: "14px" }}>
              <div style={{
                background: "rgba(124,58,237,0.22)", border: "1px solid rgba(124,58,237,0.4)",
                borderRadius: "10px", padding: "3px 12px",
                fontSize: "0.74rem", fontWeight: 800, color: "#a78bfa", display: "inline-block",
              }}>
                Soru {questionIndex + 1}
              </div>
            </div>

            <p style={{
              fontWeight: 800, fontSize: "1.1rem", lineHeight: 1.65,
              margin: 0, color: "white",
            }}>
              {question.question}
            </p>
          </div>
        </div>

        {/* ══ JOKER BAR ══ */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
          <JokerBtn
            icon="✂️" label="Yarı Yarıya" color="#f59e0b"
            used={fiftyUsed} active={false} count={jokerCounts.fifty}
            onClick={useJokerFifty}
          />
          <JokerBtn
            icon="🔄" label="Çift Cevap" color="#8b5cf6"
            used={dblAnsUsed} active={dblAnsActive} count={jokerCounts.doubleAnswer}
            onClick={useJokerDbl}
          />
          <JokerBtn
            icon="⚡" label="Çift Puan" color="#10b981"
            used={dblPtUsed} active={dblPtActive} count={jokerCounts.doublePoints}
            onClick={useJokerPts}
          />
        </div>

        {/* ══ ŞIKLAR ══ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
          {shuffledOpts.map((opt, idx) => {
            const os    = getOptStyle(opt, idx);
            const badge = getBadge(opt, idx);
            const isHidden = hiddenOpts.has(idx);
            return (
              <button
                key={idx}
                onClick={() => !isHidden && handleAnswer(opt, idx)}
                disabled={isAnswered || timeLeft === 0 || isHidden}
                style={{
                  width: "100%", padding: "15px 18px", borderRadius: "16px",
                  border: `2px solid ${os.borderColor || "rgba(255,255,255,0.1)"}`,
                  background: os.background || "rgba(255,255,255,0.05)",
                  color: os.color || "white",
                  cursor: isAnswered || timeLeft === 0 || isHidden ? "default" : "pointer",
                  fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "0.95rem",
                  textAlign: "left", display: "flex", alignItems: "center", gap: "14px",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.22s",
                  boxShadow: os.boxShadow || "none",
                  opacity: os.opacity ?? 1,
                  lineHeight: 1.45,
                  pointerEvents: os.pointerEvents,
                }}
              >
                <span style={{
                  flexShrink: 0, width: "32px", height: "32px", borderRadius: "10px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900, fontSize: "0.85rem",
                  ...badge.style,
                }}>
                  {badge.label}
                </span>
                <span style={{ flex: 1 }}>{opt}</span>
              </button>
            );
          })}
        </div>

        {/* ══ SÜRE DOLDU MESAJI ══ */}
        {timeLeft === 0 && !selectedAnswer && (
          <div style={{
            padding: "12px 20px", textAlign: "center",
            background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: "14px", color: "#fca5a5", fontWeight: 700, fontSize: "0.88rem",
          }}>
            ⏰ Süre doldu! Sonuçlar hazırlanıyor…
          </div>
        )}

        {/* Cevabını seçtin, bekliyorsun */}
        {isAnswered && (
          <div style={{
            padding: "12px 20px", textAlign: "center",
            background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)",
            borderRadius: "14px", color: "#fcd34d", fontWeight: 700, fontSize: "0.85rem",
          }}>
            ✅ Cevabın kaydedildi! Diğer oyuncular bekleniyor…
          </div>
        )}

        {/* ══ İLERLEME NOKTALARI ══ */}
        <div style={{ display: "flex", justifyContent: "center", gap: "5px", marginTop: "24px" }}>
          {Array.from({ length: totalQuestions }, (_, i) => (
            <div
              key={i}
              style={{
                width: i === questionIndex ? "22px" : "7px",
                height: "7px", borderRadius: "4px",
                background:
                  i < questionIndex
                    ? "rgba(99,102,241,0.7)"
                    : i === questionIndex
                    ? "#818cf8"
                    : "rgba(255,255,255,0.12)",
                transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
