import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

let connectedUsers = 0; // Counter to track number of connected users

app.get("/", (req, res) => {
  res.send("Hello World");
});

io.on("connection", (socket) => {
  connectedUsers++; // Increment user count when a new connection is made
  console.log(`User connected. Total users: ${connectedUsers}`);
  console.log("socket id:", socket.id);
  console.log("cookies:", socket.handshake.headers.cookie);

  // Broadcast the total number of connected users to all clients
  io.emit("user-count", connectedUsers);

  // Handle receiving a message from a client
  socket.on("message", (msg) => {
    console.log("Received message:", msg);
    io.emit("message", msg); // Broadcast the message to all connected clients
  });


  socket.on("disconnect", () => {
    connectedUsers--; 
    console.log(`User disconnected. Total users: ${connectedUsers}`);


    io.emit("user-count", connectedUsers);
  });
});

httpServer.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
