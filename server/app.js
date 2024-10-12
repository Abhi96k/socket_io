import express from "express";
import { createServer } from "http"; 
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {}); 

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

httpServer.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
