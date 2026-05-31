import { useNavigate } from "react-router-dom";
import Particles from "../components/Particles";

const MOCK_SCORES = [
  { rank: 1, name: "KralBilgi", score: 9850, games: 42, winRate: 88 },
  { rank: 2, name: "ZekiMaster", score: 8720, games: 38, winRate: 79 },
  { rank: 3, name: "SoruYıkıcı", score: 7500, games: 31, winRate: 74 },
  { rank: 4, name: "Beyindeki", score: 6890, games: 27, winRate: 70 },
  { rank: 5, name: "PuanAvcısı", score: 6200, games: 24, winRate: 67 },
  { rank: 6, name: "QuizKing", score: 5750, games: 22, winRate: 64 },
  { rank: 7, name: "BilgiDenizi", score: 5100, games: 20, winRate: 60 },
  { rank: 8, name: "MantıkGuru", score: 4680, games: 18, winRate: 56 },
];

const RANK_STYLES = {
  1: { bg: "linear-gradient(135deg, #ffd700, #f59e0b)", glow: "rgba(245,158,11,0.4)", icon: "🥇" },
  2: { bg: "linear-gradient(135deg, #c0c0c0, #9ca3af)", glow: "rgba(156,163,175,0.3)", icon: "🥈" },
  3: { bg: "linear-gradient(135deg, #cd7f32, #92400e)", glow: "rgba(146,64,14,0.3)", icon: "🥉" },
};

export default function Leaderboard() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <Particles />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "680px",
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
            <h2 style={{ fontWeight: 800, fontSize: "1.6rem", margin: 0 }}>🏆 Liderlik Tablosu</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginTop: "4px" }}>
              En iyi Quizmo oyuncuları
            </p>
          </div>
        </div>

        {/* Top 3 - Podium */}
        <div
          className="glass-card"
          style={{
            padding: "28px",
            marginBottom: "20px",
            background: "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(236,72,153,0.1))",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: "16px" }}>
            {/* 2. */}
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🥈</div>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #c0c0c0, #9ca3af)",
                  margin: "0 auto 8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "1.3rem",
                  boxShadow: "0 4px 15px rgba(156,163,175,0.4)",
                }}
              >
                {MOCK_SCORES[1].name[0]}
              </div>
              <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>{MOCK_SCORES[1].name}</div>
              <div style={{ color: "#c0c0c0", fontWeight: 800 }}>{MOCK_SCORES[1].score.toLocaleString()}</div>
              <div
                style={{
                  height: "60px",
                  background: "linear-gradient(180deg, rgba(192,192,192,0.3), rgba(192,192,192,0.1))",
                  marginTop: "8px",
                  borderRadius: "8px 8px 0 0",
                }}
              />
            </div>

            {/* 1. */}
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>👑</div>
              <div
                style={{
                  width: "68px",
                  height: "68px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #ffd700, #f59e0b)",
                  margin: "0 auto 8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "1.6rem",
                  boxShadow: "0 6px 25px rgba(245,158,11,0.6)",
                  animation: "float 3s ease-in-out infinite",
                }}
              >
                {MOCK_SCORES[0].name[0]}
              </div>
              <div style={{ fontWeight: 800, fontSize: "0.95rem" }}>{MOCK_SCORES[0].name}</div>
              <div style={{ color: "#ffd700", fontWeight: 900, fontSize: "1.1rem" }}>
                {MOCK_SCORES[0].score.toLocaleString()}
              </div>
              <div
                style={{
                  height: "90px",
                  background: "linear-gradient(180deg, rgba(245,158,11,0.4), rgba(245,158,11,0.1))",
                  marginTop: "8px",
                  borderRadius: "8px 8px 0 0",
                }}
              />
            </div>

            {/* 3. */}
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🥉</div>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #cd7f32, #92400e)",
                  margin: "0 auto 8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  boxShadow: "0 4px 15px rgba(146,64,14,0.4)",
                }}
              >
                {MOCK_SCORES[2].name[0]}
              </div>
              <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>{MOCK_SCORES[2].name}</div>
              <div style={{ color: "#cd7f32", fontWeight: 800 }}>{MOCK_SCORES[2].score.toLocaleString()}</div>
              <div
                style={{
                  height: "40px",
                  background: "linear-gradient(180deg, rgba(205,127,50,0.3), rgba(205,127,50,0.1))",
                  marginTop: "8px",
                  borderRadius: "8px 8px 0 0",
                }}
              />
            </div>
          </div>
        </div>

        {/* Tüm liste */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {MOCK_SCORES.map((player, i) => (
            <div
              key={player.rank}
              className="glass-card animate-slide-up"
              style={{
                animationDelay: `${i * 0.06}s`,
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                background:
                  player.rank <= 3
                    ? `linear-gradient(135deg, ${RANK_STYLES[player.rank].bg.split(",")[1].trim().replace(")", "").replace(")", "")}15, transparent)`
                    : "rgba(255,255,255,0.05)",
                borderColor: player.rank <= 3 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.07)",
              }}
            >
              <div
                style={{
                  width: "36px",
                  fontWeight: 900,
                  fontSize: player.rank <= 3 ? "1.3rem" : "1rem",
                  textAlign: "center",
                  color:
                    player.rank === 1
                      ? "#ffd700"
                      : player.rank === 2
                      ? "#c0c0c0"
                      : player.rank === 3
                      ? "#cd7f32"
                      : "rgba(255,255,255,0.4)",
                }}
              >
                {player.rank <= 3 ? RANK_STYLES[player.rank].icon : `#${player.rank}`}
              </div>

              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, hsl(${(player.name.charCodeAt(0) * 37) % 360}, 70%, 50%), hsl(${(player.name.charCodeAt(0) * 37 + 60) % 360}, 70%, 40%))`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                {player.name[0]}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{player.name}</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
                  {player.games} oyun · %{player.winRate} kazanma
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "#c084fc" }}>
                  {player.score.toLocaleString()}
                </div>
                <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)" }}>puan</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
