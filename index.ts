const io = require("socket.io")(8800, {
  cors: {
    origin: "*",
  },
});
let activeUser: { userId: string; socketId: string }[] = [];

io.on("connection", (socket: any) => {
  // add nes user
  socket.on("new-user-add", (newUserId: string) => {
    console.log("a user connected");
    if (!activeUser.some((user) => user.userId === newUserId)) {
      activeUser.push({ userId: newUserId, socketId: socket.id });
    }

    console.log("user connected ", activeUser);
    //send all user online to client side
    io.emit("get-users", activeUser);
  });
  // disconnect
  socket.on("disconnect", () => {
    activeUser = activeUser.filter((user) => user.userId !== socket.id);
    console.log("user disconnected ", activeUser);
    //send all user online to client side
    io.emit("get-users", activeUser);
  });
});
