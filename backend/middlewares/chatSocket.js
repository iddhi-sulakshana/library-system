import mongoose from "mongoose";

export default function chatSocket(socket, next) {
    // check if the user header is present
    if (!socket.handshake.headers.user) {
        return next(new Error("User not present in the header"));
    }
    // check if the user is valid mongoose object id
    if (!mongoose.isValidObjectId(socket.handshake.headers.user)) {
        return next(new Error("Invalid user id"));
    }
    next();
}
