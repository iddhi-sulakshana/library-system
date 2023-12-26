import { io } from "socket.io-client";

// variable to store the socket
let socket;

// initialize the socket
export const initSocket = (user, update, setUpdate) => {
    if (socket && socket.connected) {
        console.log("Socket already connected");
        return;
    }
    if (!user) {
        console.log("User not present");
        return;
    }
    socket = io("http://localhost:3000/socket/chat", {
        transports: ["polling", "websocket"],
        extraHeaders: {
            user: user,
        },
    })
        .on("connect", () => {
            console.log("Socket Connected");
            setUpdate(!update);
        })
        .on("disconnect", () => {
            console.log("Socket Disconnected");
            setUpdate(!update);
        })
        .on("error", (data) => {
            alert("Socket Error: ", data);
        });
    return socket;
};
// disconnect the socket
export const disconnectSocket = (update, setUpdate) => {
    console.log("Disconnecting socket...");
    if (socket) socket.disconnect();
    setUpdate(!update);
};
// get socket
export const getSocket = () => {
    if (!socket) {
        console.log("Socket not initialized");
        return;
    }
    return socket;
};
