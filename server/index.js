const express = require("express");
const http    = require("http");
const { Server } = require("socket.io");
const cors    = require("cors");

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const PORT       = process.env.PORT       || 3001;

const app = express();
app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: CLIENT_URL, methods: ["GET", "POST"] },
});

const rooms             = {};
const questionTimers    = {}; // roomCode → setTimeout handle
const nextQTimers       = {}; // roomCode → setTimeout (sonraki soru geçiş)
const matchQueue        = []; // { socketId, playerName, category }
const matchBotTimers    = {}; // socketId → setTimeout (15 sn bot tetikleyici)
const botAnswerTimers   = {}; // roomCode → setTimeout (bot cevabı)
const rematchVotes      = {}; // roomCode → Set<socketId>
const disconnectTimers  = {}; // "roomCode:socketId" → setTimeout (8s tolerans)

const BOT_NAMES = ["Burak", "Ayşe", "Emre", "Fatma", "Can", "Zeynep", "Mert", "Selin", "Berk", "Elif", "Ozan", "Derya"];
const BOT_ACCURACY_MIN = 0.50; // %50
const BOT_ACCURACY_MAX = 0.72; // %72

/* ─────────────────────────────────────────────────────────
   YARDIMCI FONKSİYONLAR
───────────────────────────────────────────────────────── */

function generateRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

/* Soruyu başlat: doğru cevap olmadan gönder, 21s timeout kur */
function startQuestion(roomCode, idx) {
  const room = rooms[roomCode];
  if (!room || room.status !== "playing") return;

  const q = room.questions[idx];
  if (!q) return;

  room.currentQuestion  = idx;
  room.answers          = {}; // { socketId: { answer, points } }
  room.questionStartTime = Date.now();

  // Doğru cevabı çıkar
  const { answer, ...sanitized } = q;

  const tpq = room.timePerQuestion || 20;

  io.to(roomCode).emit("question_start", {
    question:  sanitized,
    index:     idx,
    total:     room.questions.length,
    timeLimit: tpq,
  });

  console.log(`❓ Soru ${idx + 1}/${room.questions.length}: ${roomCode}`);

  // Süre + 1 s tolerans
  questionTimers[roomCode] = setTimeout(() => endQuestion(roomCode, idx), (tpq + 1) * 1000);

  // Bot varsa: rastgele gecikmeyle cevap ver
  const bot = room.players.find(p => p.isBot);
  if (bot) {
    const minDelay = 2.5;
    const maxDelay = Math.max(tpq - 2, minDelay + 1);
    const botDelay = (minDelay + Math.random() * (maxDelay - minDelay)) * 1000;
    botAnswerTimers[roomCode] = setTimeout(() => botAnswer(roomCode), botDelay);
  }
}

/* Soruyu bitir: skorları hesapla, sonuçları yayınla, sonraki soruyu planla */
function endQuestion(roomCode, idx) {
  const room = rooms[roomCode];
  if (!room || room.currentQuestion !== idx) return; // zaten bitti

  room.currentQuestion = -1; // çifte tetiklemeyi engelle

  clearTimeout(questionTimers[roomCode]);
  delete questionTimers[roomCode];
  clearTimeout(botAnswerTimers[roomCode]);
  delete botAnswerTimers[roomCode];

  const q = room.questions[idx];
  if (!q) return;

  // Doğru cevap verenler puan kazanır
  Object.entries(room.answers).forEach(([socketId, ans]) => {
    if (ans.answer === q.answer) {
      const player = room.players.find(p => p.id === socketId);
      if (player) player.score += ans.points;
    }
  });

  // Sonuç verisi (her oyuncu için)
  const results = room.players.map(p => {
    const ans     = room.answers[p.id];
    const correct = ans?.answer === q.answer;
    return {
      id:      p.id,
      name:    p.name,
      score:   p.score,
      answer:  ans?.answer ?? null,
      points:  correct ? (ans?.points ?? 0) : 0,
      correct,
    };
  });

  const nextIdx = idx + 1;
  const isLast  = nextIdx >= room.questions.length;

  io.to(roomCode).emit("question_end", {
    correctAnswer: q.answer,
    results,
    players: room.players,
    isLast,
  });

  console.log(`✅ Soru ${idx + 1} bitti: ${roomCode}`);

  if (!isLast) {
    // Sonraki soruya 4 s sonra geç
    nextQTimers[roomCode] = setTimeout(() => startQuestion(roomCode, nextIdx), 4_000);
  } else {
    // Oyun bitti
    setTimeout(() => {
      if (!rooms[roomCode]) return;
      rooms[roomCode].status = "finished";
      const sorted = [...rooms[roomCode].players].sort((a, b) => b.score - a.score);
      io.to(roomCode).emit("game_over", { players: sorted });
      console.log(`🏆 Oyun bitti: ${roomCode}`);
    }, 5_000);
  }
}

/* Bot cevabı — startQuestion tarafından gecikmeyle çağrılır */
function botAnswer(roomCode) {
  const room = rooms[roomCode];
  if (!room || room.status !== "playing") return;

  const bot = room.players.find(p => p.isBot);
  if (!bot || room.answers[bot.id]) return;

  const q = room.questions[room.currentQuestion];
  if (!q) return;

  // %50-72 doğruluk oranı (her oyun farklı)
  const accuracy  = BOT_ACCURACY_MIN + Math.random() * (BOT_ACCURACY_MAX - BOT_ACCURACY_MIN);
  const isCorrect = Math.random() < accuracy;
  const answer    = isCorrect
    ? q.answer
    : q.options.filter(o => o !== q.answer)[Math.floor(Math.random() * (q.options.length - 1))];

  const tpq         = room.timePerQuestion || 20;
  const elapsed     = (Date.now() - room.questionStartTime) / 1000;
  const timeLeft    = Math.max(tpq - elapsed, 0);
  const points      = Math.max(Math.round(timeLeft * 10), 10);

  room.answers[bot.id] = { answer, points };

  const answeredCount = Object.keys(room.answers).length;
  io.to(roomCode).emit("player_answered", { count: answeredCount, total: room.players.length });
  console.log(`🤖 Bot cevapladı (${isCorrect ? "✓" : "✗"}): ${roomCode}`);

  if (answeredCount >= room.players.length) {
    clearTimeout(questionTimers[roomCode]);
    endQuestion(roomCode, room.currentQuestion);
  }
}

/* ─────────────────────────────────────────────────────────
   SOCKET OLAYLARI
───────────────────────────────────────────────────────── */

io.on("connection", (socket) => {
  console.log(`✅ Bağlandı: ${socket.id}`);

  /* ── Oda oluştur ── */
  socket.on("create_room", ({ playerName, category, maxPlayers, avatar }) => {
    let roomCode;
    do { roomCode = generateRoomCode(); } while (rooms[roomCode]);

    rooms[roomCode] = {
      code:              roomCode,
      category,
      maxPlayers:        maxPlayers || 8,
      timePerQuestion:   20,
      players:           [{ id: socket.id, name: playerName, score: 0, isHost: true, isReady: false, avatar: avatar || "😊" }],
      status:            "waiting",
      currentQuestion:   0,
      questions:         [],
      answers:           {},
      questionStartTime: null,
    };

    socket.join(roomCode);
    socket.roomCode = roomCode;
    socket.emit("room_created", { roomCode, room: rooms[roomCode] });
    console.log(`🏠 Oda oluşturuldu: ${roomCode} | Kategori: ${category}`);
  });

  /* ── Odaya katıl ── */
  socket.on("join_room", ({ playerName, roomCode, avatar }) => {
    const code = roomCode.toUpperCase().trim();
    const room = rooms[code];

    if (!room)                        { socket.emit("error", { message: "Oda bulunamadı! Kodu kontrol et." }); return; }
    if (room.status !== "waiting")    { socket.emit("error", { message: "Oyun zaten başlamış!" }); return; }
    if (room.players.length >= room.maxPlayers) { socket.emit("error", { message: "Oda dolu!" }); return; }
    if (room.players.find(p => p.name === playerName)) { socket.emit("error", { message: "Bu isim zaten kullanılıyor!" }); return; }

    room.players.push({ id: socket.id, name: playerName, score: 0, isHost: false, isReady: false, avatar: avatar || "😊" });
    socket.join(code);
    socket.roomCode = code;

    socket.emit("room_joined", { roomCode: code, room });
    io.to(code).emit("players_updated", { players: room.players });
    console.log(`👤 ${playerName} odaya katıldı: ${code}`);
  });

  /* ── Hazır durumu ── */
  socket.on("toggle_ready", () => {
    const code = socket.roomCode;
    if (!rooms[code]) return;
    const player = rooms[code].players.find(p => p.id === socket.id);
    if (player && !player.isHost) {
      player.isReady = !player.isReady;
      io.to(code).emit("players_updated", { players: rooms[code].players });
    }
  });

  /* ── Oyunu başlat (sadece host) ── */
  socket.on("start_game", ({ questions } = {}) => {
    const code = socket.roomCode;
    if (!rooms[code]) return;

    const room = rooms[code];
    const host = room.players.find(p => p.id === socket.id);
    if (!host?.isHost) return;
    if (room.status === "playing") return; // çifte tetiklemeye karşı koruma

    // Soruları kaydet, skorları sıfırla
    room.questions = Array.isArray(questions) ? questions : [];
    room.players.forEach(p => { p.score = 0; });
    room.status = "playing";

    io.to(code).emit("game_started", {
      category:        room.category,
      timePerQuestion: room.timePerQuestion,
      questionCount:   room.questions.length,
    });
    console.log(`🎮 Oyun başladı: ${code} | ${room.questions.length} soru`);

    // 3 s sonra ilk soru (istemci countdown ile eş zamanlı)
    setTimeout(() => startQuestion(code, 0), 3_000);
  });

  /* ── Oyuncu cevap verdi ── */
  socket.on("player_answer", ({ answer, doublePts }) => {
    const code = socket.roomCode;
    if (!code || !rooms[code]) return;

    const room = rooms[code];
    if (room.status !== "playing") return;
    if (room.answers[socket.id])  return; // zaten cevapladı

    // Sunucu tarafında geçen süreyi hesapla (hile koruması)
    const tpq          = room.timePerQuestion || 20;
    const elapsed      = (Date.now() - room.questionStartTime) / 1000;
    const serverTimeLeft = Math.max(tpq - elapsed, 0);
    let   points       = Math.max(Math.round(serverTimeLeft * 10), 10);
    if (doublePts) points = Math.min(points * 2, 400); // Çift Puan jokeri

    room.answers[socket.id] = { answer, points };

    const answeredCount = Object.keys(room.answers).length;
    io.to(code).emit("player_answered", {
      count: answeredCount,
      total: room.players.length,
    });

    const pName = room.players.find(p => p.id === socket.id)?.name ?? socket.id;
    console.log(`💬 ${pName} cevapladı (${Math.round(serverTimeLeft)}s kaldı): ${code}`);

    // Herkes cevapladıysa erken bitir
    if (answeredCount >= room.players.length) {
      clearTimeout(questionTimers[code]);
      endQuestion(code, room.currentQuestion);
    }
  });

  /* ── Rastgele eşleşme: kuyruğa gir ── */
  socket.on("find_match", ({ playerName, category, timePerQuestion, questionCount, avatar }) => {
    // Zaten kuyrukta mı?
    if (matchQueue.find(p => p.socketId === socket.id)) return;

    // Kuyrukta biri var mı?
    const opponentIdx = matchQueue.findIndex(p => p.socketId !== socket.id);

    if (opponentIdx !== -1) {
      const opponent = matchQueue.splice(opponentIdx, 1)[0];

      // Kategori, süre ve soru sayısı: ilk kuyruğa girenin (host) ayarları geçerli
      const matchCategory        = opponent.category        || category        || "genel-kultur";
      const matchTimePerQuestion = opponent.timePerQuestion || timePerQuestion || 20;
      const matchQuestionCount   = opponent.questionCount   || questionCount   || 10;

      // Oda oluştur (zaten "playing" olarak başlar, lobby yok)
      let roomCode;
      do { roomCode = generateRoomCode(); } while (rooms[roomCode]);

      rooms[roomCode] = {
        code: roomCode,
        category:        matchCategory,
        maxPlayers:      2,
        timePerQuestion: matchTimePerQuestion,
        questionCount:   matchQuestionCount,
        players: [
          { id: opponent.socketId, name: opponent.playerName, score: 0, isHost: true,  isReady: true, avatar: opponent.avatar || "😊" },
          { id: socket.id,         name: playerName,          score: 0, isHost: false, isReady: true, avatar: avatar || "😊" },
        ],
        status:            "waiting",
        currentQuestion:   0,
        questions:         [],
        answers:           {},
        questionStartTime: null,
      };

      // Her iki soketi odaya al
      const opponentSocket = io.sockets.sockets.get(opponent.socketId);
      if (opponentSocket) { opponentSocket.join(roomCode); opponentSocket.roomCode = roomCode; }
      socket.join(roomCode);
      socket.roomCode = roomCode;

      io.to(roomCode).emit("match_found", {
        roomCode,
        category:        matchCategory,
        timePerQuestion: matchTimePerQuestion,
        questionCount:   matchQuestionCount,
        players:         rooms[roomCode].players,
        hostId:          opponent.socketId,
      });

      console.log(`🎯 Eşleşme: ${opponent.playerName} vs ${playerName} | ${matchCategory} | ${roomCode}`);
    } else {
      // Kuyruğa ekle
      matchQueue.push({ socketId: socket.id, playerName, category: category || null, timePerQuestion: timePerQuestion || 20, questionCount: questionCount || 10, avatar: avatar || "😊" });
      socket.emit("match_queued");
      console.log(`⏳ Kuyruğa eklendi: ${playerName} (toplam: ${matchQueue.length})`);

      // 15 saniyede insan bulunamazsa bot eşleşmesi
      matchBotTimers[socket.id] = setTimeout(() => {
        const idx = matchQueue.findIndex(p => p.socketId === socket.id);
        if (idx === -1) return; // zaten eşleşti
        matchQueue.splice(idx, 1);

        const matchCategory        = category        || "genel-kultur";
        const matchTimePerQuestion = timePerQuestion || 20;
        const matchQuestionCount   = questionCount   || 10;
        const botId   = `bot_${Math.random().toString(36).slice(2, 8)}`;
        const botName = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];

        let roomCode;
        do { roomCode = generateRoomCode(); } while (rooms[roomCode]);

        rooms[roomCode] = {
          code:            roomCode,
          category:        matchCategory,
          maxPlayers:      2,
          timePerQuestion: matchTimePerQuestion,
          questionCount:   matchQuestionCount,
          players: [
            { id: socket.id, name: playerName, score: 0, isHost: true,  isReady: true, avatar: avatar || "😊" },
            { id: botId,     name: botName,     score: 0, isHost: false, isReady: true, isBot: true, avatar: "🤖" },
          ],
          status:            "waiting",
          currentQuestion:   0,
          questions:         [],
          answers:           {},
          questionStartTime: null,
        };

        socket.join(roomCode);
        socket.roomCode = roomCode;

        io.to(roomCode).emit("match_found", {
          roomCode,
          category:        matchCategory,
          timePerQuestion: matchTimePerQuestion,
          questionCount:   matchQuestionCount,
          players:         rooms[roomCode].players,
          hostId:          socket.id,
        });

        console.log(`🤖 Bot eşleşmesi: ${playerName} vs ${botName} | ${matchCategory} | ${matchQuestionCount}s | ${roomCode}`);
      }, 15_000);
    }
  });

  /* ── Yeniden oyna oylaması ── */
  socket.on("want_rematch", () => {
    const code = socket.roomCode;
    if (!code || !rooms[code]) return;
    const room = rooms[code];
    if (room.status !== "finished") return;

    if (!rematchVotes[code]) rematchVotes[code] = new Set();
    rematchVotes[code].add(socket.id);

    const humanPlayers = room.players.filter(p => !p.isBot);
    const count = rematchVotes[code].size;
    const total = humanPlayers.length;

    io.to(code).emit("rematch_vote_update", { count, total });

    if (count >= total) {
      delete rematchVotes[code];
      room.players.forEach(p => { p.score = 0; p.isReady = true; });
      room.status   = "waiting";
      room.currentQuestion = 0;
      room.answers  = {};
      io.to(code).emit("rematch_ready");
      console.log(`🔄 Rematch: ${code}`);
    }
  });

  /* ── Yeniden bağlanma (oyundan düşme) ── */
  socket.on("rejoin_room", ({ roomCode: rc, playerName }) => {
    const code = (rc || "").toUpperCase().trim();
    if (!code || !rooms[code]) { socket.emit("error", { message: "Oda artık mevcut değil." }); return; }
    const room = rooms[code];
    const player = room.players.find(p => p.name === playerName);
    if (!player) return;

    // Grace timer varsa iptal et (bağlantı geri geldi)
    const timerKey = `${code}:${player.id}`;
    if (disconnectTimers[timerKey]) {
      clearTimeout(disconnectTimers[timerKey]);
      delete disconnectTimers[timerKey];
    }

    const oldId = player.id;
    player.id = socket.id;
    player.disconnected = false;
    socket.join(code);
    socket.roomCode = code;

    if (room.answers[oldId]) {
      room.answers[socket.id] = room.answers[oldId];
      delete room.answers[oldId];
    }

    socket.emit("rejoined", { room, status: room.status, currentQuestion: room.currentQuestion });
    io.to(code).emit("players_updated", { players: room.players });
    console.log(`🔄 ${playerName} yeniden bağlandı: ${code}`);

    // Oyun devam ediyorsa mevcut soruyu tekrar gönder (client event kaçırmış olabilir)
    if (room.status === "playing" && room.currentQuestion >= 0) {
      const q = room.questions[room.currentQuestion];
      if (q) {
        const { answer, ...sanitized } = q;
        const tpq      = room.timePerQuestion || 20;
        const elapsed  = room.questionStartTime ? (Date.now() - room.questionStartTime) / 1000 : 0;
        const timeLeft = Math.max(tpq - elapsed, 1);
        socket.emit("question_start", {
          question:  sanitized,
          index:     room.currentQuestion,
          total:     room.questions.length,
          timeLimit: Math.round(timeLeft),
        });
      }
    }
  });

  /* ── Eşleşme aramasını iptal et ── */
  socket.on("cancel_match", () => {
    const idx = matchQueue.findIndex(p => p.socketId === socket.id);
    if (idx !== -1) {
      matchQueue.splice(idx, 1);
      console.log(`❌ Kuyruktan çıktı: ${socket.id}`);
    }
    clearTimeout(matchBotTimers[socket.id]);
    delete matchBotTimers[socket.id];
  });

  /* ── Bağlantı kesildi ── */
  socket.on("disconnect", () => {
    // Matchmaking kuyruğundan ve bot timer'dan temizle
    const qIdx = matchQueue.findIndex(p => p.socketId === socket.id);
    if (qIdx !== -1) matchQueue.splice(qIdx, 1);
    clearTimeout(matchBotTimers[socket.id]);
    delete matchBotTimers[socket.id];

    // Rematch oylarından temizle
    for (const code of Object.keys(rematchVotes)) {
      rematchVotes[code].delete(socket.id);
      if (rematchVotes[code].size === 0) delete rematchVotes[code];
    }

    const code = socket.roomCode;
    if (!code || !rooms[code]) return;

    const room = rooms[code];
    const pIdx = room.players.findIndex(p => p.id === socket.id);
    if (pIdx === -1) return;

    const player = room.players[pIdx];

    // Oyun sırasında geçici kopma olabilir (mobil arka plan, sinyal vb.)
    // Doğrudan silmek yerine 8 saniyelik tolerans ver
    if (room.status === "playing") {
      player.disconnected = true;
      console.log(`⚠️ ${player.name} geçici koptu (8s tolerans): ${code}`);

      const timerKey = `${code}:${socket.id}`;
      disconnectTimers[timerKey] = setTimeout(() => {
        delete disconnectTimers[timerKey];
        if (!rooms[code]) return;
        // Hâlâ kopuk mu kontrol et (geri bağlanmadıysa)
        const stillIdx = rooms[code].players.findIndex(p => p.id === socket.id || (p.name === player.name && p.disconnected));
        if (stillIdx === -1) return;

        const { isHost, name } = rooms[code].players[stillIdx];
        rooms[code].players.splice(stillIdx, 1);
        console.log(`❌ ${name} zaman aşımı ile ayrıldı: ${code}`);

        if (rooms[code].players.length === 0) {
          clearTimeout(questionTimers[code]);
          clearTimeout(nextQTimers[code]);
          delete questionTimers[code];
          delete nextQTimers[code];
          delete rooms[code];
          return;
        }

        if (rooms[code].status === "playing" && rooms[code].players.filter(p => !p.isBot).length === 0) {
          delete rooms[code];
          return;
        }

        if (rooms[code].status === "playing" && rooms[code].players.length === 1) {
          clearTimeout(questionTimers[code]);
          clearTimeout(nextQTimers[code]);
          delete questionTimers[code];
          delete nextQTimers[code];
          if (rooms[code].players[0].isBot) {
            delete rooms[code];
          } else {
            rooms[code].status = "finished";
            io.to(code).emit("player_left", { playerName: name });
            io.to(code).emit("game_over", { players: [...rooms[code].players] });
          }
          return;
        }

        if (isHost && rooms[code].players.length > 0) {
          rooms[code].players[0].isHost = true;
          io.to(code).emit("host_changed", { newHost: rooms[code].players[0].name });
        }

        io.to(code).emit("players_updated", { players: rooms[code].players });
        io.to(code).emit("player_left",     { playerName: name });

        // Kalan oyuncuların hepsi cevapladıysa soruyu bitir
        if (rooms[code].status === "playing") {
          const active   = rooms[code].players.map(p => p.id);
          const answered = active.filter(id => rooms[code].answers[id]).length;
          if (answered >= active.length) {
            clearTimeout(questionTimers[code]);
            endQuestion(code, rooms[code].currentQuestion);
          }
        }
      }, 8_000);

      // Diğer oyunculara bildir ama oyunu bitirme
      io.to(code).emit("player_left", { playerName: player.name });
      return;
    }

    // Oyun dışında (lobi/bekleme) → normal silme
    const { isHost, name } = player;
    room.players.splice(pIdx, 1);
    console.log(`❌ ${name} ayrıldı: ${code}`);

    if (room.players.length === 0) {
      delete rooms[code];
      clearTimeout(questionTimers[code]);
      delete questionTimers[code];
      return;
    }

    if (isHost) {
      room.players[0].isHost = true;
      io.to(code).emit("host_changed", { newHost: room.players[0].name });
    }

    io.to(code).emit("players_updated", { players: room.players });
    io.to(code).emit("player_left",     { playerName: name });
  });
});

/* ─────────────────────────────────────────────────────────
   HTTP ENDPOINT'LERİ
───────────────────────────────────────────────────────── */

const registeredNames = new Map(); // normalName → clientId

app.get("/check-username", (req, res) => {
  const raw      = (req.query.name     || "").trim();
  const clientId = (req.query.clientId || "").trim();
  const name     = raw.toLowerCase();

  if (!name || name.length < 2) return res.json({ available: false, reason: "too_short" });

  const takenBy = registeredNames.get(name);
  res.json({ available: !takenBy || takenBy === clientId });
});

app.post("/register-username", (req, res) => {
  const raw      = (req.body.name     || "").trim();
  const clientId = (req.body.clientId || "").trim();
  const name     = raw.toLowerCase();

  if (!clientId)        return res.json({ success: false, reason: "no_client_id" });
  if (name.length < 2)  return res.json({ success: false, reason: "too_short" });
  if (name.length > 20) return res.json({ success: false, reason: "too_long" });

  const takenBy = registeredNames.get(name);
  if (takenBy && takenBy !== clientId) return res.json({ success: false, reason: "taken" });

  for (const [n, id] of registeredNames) {
    if (id === clientId) registeredNames.delete(n);
  }
  registeredNames.set(name, clientId);
  res.json({ success: true });
});

app.get("/rooms", (req, res) => res.json(rooms));

server.listen(PORT, () => console.log(`\n🚀 Sunucu çalışıyor: http://localhost:${PORT}\n`));
