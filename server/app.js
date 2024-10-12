import express from "express";
import { Server } from "socket.io";

const app = express();
const server = new Server(app);

const io = new Server(server, {});

app.get("/", (req, res) => {
  res.send("Hello World");
});

io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("message", (msg) => {
    console.log(msg);
    io.emit("message", msg);
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
