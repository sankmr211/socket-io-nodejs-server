const { createServer } = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");

const httpServer = createServer();

const io = new Server(httpServer, { 
  cors: {
    origin: (_req, callback) => {
      callback(null, true);
    },
    credentials: true
  }
 });

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("new_chat", (chat) => {
    console.log("Chat Message: ",chat)
    replay()
  });
});

function replay(params) {
  io.sockets.emit("replay", "everyone");
}

instrument(io, {
  auth: false,
  mode: "development",
});

httpServer.listen(8015, () => {
  console.log("Socket Started...");
});