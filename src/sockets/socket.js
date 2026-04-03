// src/sockets/socket.js
export const initSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("setup", (userId) => {
      socket.join(userId);
    });

    socket.on("join chat", (chatId) => {
      socket.join(chatId);
    });

    socket.on("typing", (chatId) => {
      socket.to(chatId).emit("typing");
    });

    socket.on("stop typing", (chatId) => {
      socket.to(chatId).emit("stop typing");
    });

    socket.on("new message", (message) => {
      const chat = message.chat;

      if (!chat.users) return;

      chat.users.forEach((user) => {
        if (user._id === message.sender._id) return;

        socket.to(user._id).emit("message received", message);
      });
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });
  });
};