import { createServer } from "http";
import { Server } from "socket.io";
import chatSocket from "../sockets/chat.js";
let io;
export default function initWebSocket(app) {
  const httpServer = createServer(app);
  io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["user"],
    },
  });

  // initialize chat socket
  chatSocket(io);
  //roomSocet(io);
  return httpServer;
}
export const ioServer = io;
