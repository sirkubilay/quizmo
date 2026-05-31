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

const rooms           = {};
const questionTimers  = {}; // roomCode → setTimeout handle
const matchQueue      = []; // { socketId, playerName, category }
const matchBotTimers  = {}; // socketId → setTimeout (15 sn bot tetikleyici)
const botAnswerTimers = {}; // roomCode → setTimeout (bot cevabı)

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
    setTimeout(() => startQuestion(roomCode, nextIdx), 4_000);
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
  socket.on("create_room", ({ playerName, category, maxPlayers }) => {
    let roomCode;
    do { roomCode = generateRoomCode(); } while (rooms[roomCode]);

    rooms[roomCode] = {
      code:              roomCode,
      category,
      maxPlayers:        maxPlayers || 8,
      timePerQuestion:   20,
      players:           [{ id: socket.id, name: playerName, score: 0, isHost: true, isReady: false }],
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
  socket.on("join_room", ({ playerName, roomCode }) => {
    const code = roomCode.toUpperCase().trim();
    const room = rooms[code];

    if (!room)                        { socket.emit("error", { message: "Oda bulunamadı! Kodu kontrol et." }); return; }
    if (room.status !== "waiting")    { socket.emit("error", { message: "Oyun zaten başlamış!" }); return; }
    if (room.players.length >= room.maxPlayers) { socket.emit("error", { message: "Oda dolu!" }); return; }
    if (room.players.find(p => p.name === playerName)) { socket.emit("error", { message: "Bu isim zaten kullanılıyor!" }); return; }

    room.players.push({ id: socket.id, name: playerName, score: 0, isHost: false, isReady: false });
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

    // Soruları kaydet, skorları sıfırla
    room.questions = Array.isArray(questions) ? questions : [];
    room.players.forEach(p => { p.score = 0; });
    room.status = "playing";

    io.to(code).emit("game_started", { category: room.category });
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
  socket.on("find_match", ({ playerName, category, timePerQuestion }) => {
    // Zaten kuyrukta mı?
    if (matchQueue.find(p => p.socketId === socket.id)) return;

    // Kuyrukta biri var mı?
    const opponentIdx = matchQueue.findIndex(p => p.socketId !== socket.id);

    if (opponentIdx !== -1) {
      const opponent = matchQueue.splice(opponentIdx, 1)[0];

      // Kategori ve süre: kuyruğa giren ilk oyuncunun (host) ayarları geçerli
      const matchCategory       = opponent.category        || category        || "genel-kultur";
      const matchTimePerQuestion = opponent.timePerQuestion || timePerQuestion || 20;

      // Oda oluştur (zaten "playing" olarak başlar, lobby yok)
      let roomCode;
      do { roomCode = generateRoomCode(); } while (rooms[roomCode]);

      rooms[roomCode] = {
        code: roomCode,
        category:        matchCategory,
        maxPlayers:      2,
        timePerQuestion: matchTimePerQuestion,
        players: [
          { id: opponent.socketId, name: opponent.playerName, score: 0, isHost: true,  isReady: true },
          { id: socket.id,         name: playerName,          score: 0, isHost: false, isReady: true },
        ],
        status:            "waiting", // start_game gelince "playing" olacak
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
        players:         rooms[roomCode].players,
        hostId:          opponent.socketId,
      });

      console.log(`🎯 Eşleşme: ${opponent.playerName} vs ${playerName} | ${matchCategory} | ${roomCode}`);
    } else {
      // Kuyruğa ekle
      matchQueue.push({ socketId: socket.id, playerName, category: category || null, timePerQuestion: timePerQuestion || 20 });
      socket.emit("match_queued");
      console.log(`⏳ Kuyruğa eklendi: ${playerName} (toplam: ${matchQueue.length})`);

      // 15 saniyede insan bulunamazsa bot eşleşmesi
      matchBotTimers[socket.id] = setTimeout(() => {
        const idx = matchQueue.findIndex(p => p.socketId === socket.id);
        if (idx === -1) return; // zaten eşleşti
        matchQueue.splice(idx, 1);

        const matchCategory        = category        || "genel-kultur";
        const matchTimePerQuestion = timePerQuestion || 20;
        const botId   = `bot_${Math.random().toString(36).slice(2, 8)}`;
        const botName = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];

        let roomCode;
        do { roomCode = generateRoomCode(); } while (rooms[roomCode]);

        rooms[roomCode] = {
          code:            roomCode,
          category:        matchCategory,
          maxPlayers:      2,
          timePerQuestion: matchTimePerQuestion,
          players: [
            { id: socket.id, name: playerName, score: 0, isHost: true,  isReady: true },
            { id: botId,     name: botName,     score: 0, isHost: false, isReady: true, isBot: true },
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
          players:         rooms[roomCode].players,
          hostId:          socket.id,
        });

        console.log(`🤖 Bot eşleşmesi: ${playerName} vs ${botName} | ${matchCategory} | ${roomCode}`);
      }, 15_000);
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

    const code = socket.roomCode;
    if (!code || !rooms[code]) return;

    const room  = rooms[code];
    const pIdx  = room.players.findIndex(p => p.id === socket.id);
    if (pIdx === -1) return;

    const { isHost, name } = room.players[pIdx];
    room.players.splice(pIdx, 1);
    console.log(`❌ ${name} ayrıldı: ${code}`);

    if (room.players.length === 0) {
      delete rooms[code];
      clearTimeout(questionTimers[code]);
      delete questionTimers[code];
      console.log(`🗑️ Oda silindi: ${code}`);
      return;
    }

    // Oyun sürerken tek oyuncu/bot kaldıysa
    if (room.status === "playing" && room.players.length === 1) {
      clearTimeout(questionTimers[code]);
      delete questionTimers[code];
      clearTimeout(botAnswerTimers[code]);
      delete botAnswerTimers[code];

      if (room.players[0].isBot) {
        // Sadece bot kaldı — odayı sil, kimseye bildirme
        delete rooms[code];
        console.log(`🤖 Bot odası silindi (insan ayrıldı): ${code}`);
      } else {
        // Tek insan kaldı — kazandı
        room.status = "finished";
        io.to(code).emit("player_left", { playerName: name });
        io.to(code).emit("game_over", { players: [...room.players] });
        console.log(`🏆 Rakip ayrıldı, kazanan: ${room.players[0].name} | ${code}`);
      }
      return;
    }

    if (isHost) {
      room.players[0].isHost = true;
      io.to(code).emit("host_changed", { newHost: room.players[0].name });
    }

    io.to(code).emit("players_updated", { players: room.players });
    io.to(code).emit("player_left",     { playerName: name });

    // Oyun sürerken: kalan tüm oyuncular cevapladıysa soruyu bitir
    if (room.status === "playing" && room.answers && room.players.length > 0) {
      const remaining = room.players.map(p => p.id);
      const answeredRemaining = remaining.filter(id => room.answers[id]).length;
      if (answeredRemaining >= room.players.length) {
        clearTimeout(questionTimers[code]);
        endQuestion(code, room.currentQuestion);
      }
    }
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
