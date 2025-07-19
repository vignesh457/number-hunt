const setupSocket = (io) => {
  const rooms = {};
  const roomState = {}; // 👈 ADD: holds who’s turn + round count

  console.log("Socket setup");

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("create_room", ({ roomCode, name, userId }, callback) => {
      socket.userId = userId;

      if (rooms[roomCode]) {
        callback({ success: false, message: "Sorry, Room with this code already exists! Try again." });
        return;
      }

      socket.join(roomCode);
      rooms[roomCode] = [{ id: userId, name, isHost: true }];

      // 👇 Initialize game state for this room
      roomState[roomCode] = {
        currentTurn: userId,
        round: 1,
      };

      callback({ success: true });
      console.log(`Room ${roomCode} created by ${name} with id ${socket.id} (${userId})`);
      io.to(roomCode).emit("room_updated", { message: `${socket.id} created`, players: rooms[roomCode] });
    });

    socket.on("join_room", ({ roomCode, name, userId }, callback) => {
      socket.userId = userId;

      if (!rooms[roomCode]) {
        callback({ success: false, message: "Room does not exist." });
        return;
      }

      if (rooms[roomCode].length === 2) {
        callback({ success: false, message: "Sorry, Room is full." });
        return;
      }

      if (rooms[roomCode].find((p) => p.id === userId)) {
        callback({ success: false, message: "You are already in the room." });
        return;
      }

      socket.join(roomCode);
      rooms[roomCode].push({ id: userId, name, isHost: false });

      callback({ success: true });
      io.to(roomCode).emit("room_updated", { message: `${socket.id} joined`, players: rooms[roomCode] });
    });

    // Player 1 selects a number for Player 2
    socket.on("select_number", ({ roomCode, number }) => {
      const state = roomState[roomCode];
      if (!state) return;

      if (state.currentTurn !== socket.userId) {
        console.log("Not your turn to select");
        return;
      }

      const players = rooms[roomCode];
      const target = players.find((p) => p.id !== socket.userId);
      if (!target) return;

      io.to(roomCode).emit("number_selected", {
        targetNumber: number,
        targetPlayer: target.id,
      });
    });

    // Player 2 found number → give points → switch turn → next round
    socket.on("number_found", ({ roomCode, points, userId }) => {
      const state = roomState[roomCode];
      if (!state) return;

      const players = rooms[roomCode];
      const next = players.find((p) => p.id !== userId);
      if (!next) return;

      state.currentTurn = next.id;
      state.round += 1;

      io.to(roomCode).emit("add_points", { playerId: userId, points });
      io.to(roomCode).emit("turn_switched", {
        currentTurnUserId: next.id,
        round: state.round,
      });
    });

    socket.on("start_game", ({ roomCode }) => {
      const state = roomState[roomCode];
      io.to(roomCode).emit("start_game", {
        state: {
          currentTurn: state?.currentTurn,
          round: state?.round,
        },
      });
    });

    socket.on("disconnect", () => {
      console.log(`Socket ${socket.id} disconnected`);

      for (const roomCode in rooms) {
        rooms[roomCode] = rooms[roomCode].filter((p) => p.id !== socket.userId);

        if (rooms[roomCode].length === 0) {
          delete rooms[roomCode];
          delete roomState[roomCode]; // 👈 Also clean up
        } else {
          io.to(roomCode).emit("room_updated", {
            message: `${socket.userId} disconnected`,
            players: rooms[roomCode],
          });
        }
      }
    });
  });
};

module.exports = { setupSocket };
