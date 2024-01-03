import { createServer } from "http";
import { Server } from "socket.io";
import chatSocket from "../sockets/chat.js";

export default function initWebSocket(app) {
    const httpServer = createServer(app);
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["user"],
        },
    });
    // initialize chat socket
    chatSocket(io);
    return httpServer;
}
