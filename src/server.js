import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
  debug: true   // 🔥 add this
});

import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { initSocket } from "./sockets/socket.js";
import userRoutes from "./routes/userRoutes.js";

console.log("MONGO_URI:", process.env.MONGO_URI); // debug


const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

initSocket(io);

server.listen(process.env.PORT || 5000, () => {
  console.log("Server running...");
});