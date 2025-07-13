const setupSocket = (io) => {
  const rooms = {};
  console.log("Socket setup");

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

   socket.on("create_room", ({ roomCode, name, userId }, callback) => {
      socket.userId = userId;
      // ✅ Check if the room already exists
      if (rooms[roomCode]) {
        callback({ success: false, message: "Sorry, Room with this code already exists! Try again." });
        return;
      }

      socket.join(roomCode);
      rooms[roomCode] = [{ id: userId, name, isHost: true }];

      callback({ success: true });
      console.log(`Room ${roomCode} created by ${name} with id ${socket.id} (${userId})`);
      io.to(roomCode).emit("room_updated", {message: `${socket.id} created`, players: rooms[roomCode]});
    });


    socket.on("join_room", ({ roomCode, name, userId }, callback) => {
      socket.userId = userId;
      // ✅ Check if the room exists
      if (!rooms[roomCode]) {
        callback({ success: false, message: "Room does not exist." });
        return;
      }

      // ✅ Check if the room is full
      if (rooms[roomCode].length === 2) {
        callback({ success: false, message: "Sorry, Room is full." });
        return;
      }

      // ✅ Check if the user is already in the room
      if (rooms[roomCode].find((p) => p.id === userId)) {
        callback({ success: false, message: "You are already in the room." });
        return;
      }

      // Join the room
      socket.join(roomCode);
      rooms[roomCode].push({ id: userId, name, isHost: false });

      callback({ success: true });
      io.to(roomCode).emit("room_updated", {message: `${socket.id} joined`, players: rooms[roomCode]});

      // if (rooms[roomCode].length === 2) {
      //   io.to(roomCode).emit("start_game");
      // }
    });

    socket.on("start_game", ({ roomCode }) => {
      io.to(roomCode).emit("start_game");
    });

    socket.on("select_number", ({ roomCode, number }) => {
      socket.to(roomCode).emit("number_selected", number);
    });

    socket.on("number_found", ({ roomCode, points }) => {
      socket.to(roomCode).emit("add_points", points);
    });

    socket.on("disconnect", () => {
      console.log(`Socket ${socket.id} disconnected`);

      for (const roomCode in rooms) {
        rooms[roomCode] = rooms[roomCode].filter((p) => p.id !== socket.userId);

        // If room is empty, you may want to clean it up:
        if (rooms[roomCode].length === 0) {
          delete rooms[roomCode];
        } else {
          // Notify remaining players
          console.log(`Room ${roomCode} updated on disconnect by ${socket.userId}`);
          io.to(roomCode).emit("room_updated", {message: `${socket.userId} disconnected`, players: rooms[roomCode]});
        }
      }
    });
  });
};

module.exports = {setupSocket};