import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export default function chatSocket(socket, next) {
    // check if the user header is present
    if (!socket.handshake.headers.user) {
        return next(new Error("User not present in the header"));
    }
    const decoded = jwt.verify(
        socket.handshake.headers.user,
        process.env.JWT_PRIVATE_KEY
    );
    socket.handshake.headers.user = decoded._id;
    // check if the user is valid mongoose object id
    if (!mongoose.isValidObjectId(socket.handshake.headers.user)) {
        return next(new Error("Invalid user id"));
    }
    next();
}
