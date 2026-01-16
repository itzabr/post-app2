const { Server } = require("socket.io");
const Message = require("./models/message");
const Notification = require("./models/notification");

module.exports = function (server) {

  const io = new Server(server);

  const onlineUsers = {}; // userId -> socketId

  io.on("connection", socket => {
    console.log("🔌 Socket connected:", socket.id);

    // user joins
    socket.on("join", userId => {
      onlineUsers[userId] = socket.id;
      console.log("User online:", userId);
    });

    // disconnect
    socket.on("disconnect", () => {
      for (let id in onlineUsers) {
        if (onlineUsers[id] === socket.id) {
          delete onlineUsers[id];
        }
      }
      console.log("❌ Socket disconnected:", socket.id);
    });

    // real-time message
    socket.on("sendMessage", async data => {
      try {
        const { from, to, text } = data;

        // 1️⃣ save message
        const msg = await Message.create({ from, to, text });

        // 2️⃣ send to receiver if online
        const receiverSocket = onlineUsers[to];
        if (receiverSocket) {
          io.to(receiverSocket).emit("newMessage", msg);
        }

        // 3️⃣ send back to sender
        socket.emit("newMessage", msg);

        // 4️⃣ notification
        if (from !== to) {
          await Notification.create({
            user: to,
            from,
            type: "message",
            message: "sent you a message"
          });
        }
      } catch (err) {
        console.error("Socket error:", err);
      }
    });
  });
};
