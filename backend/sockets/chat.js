import morgan from "morgan";
import socketMiddleware from "../middlewares/chatSocket.js";
import { Chat, validateChat } from "../models/Chat.js";
import { ChatUser } from "../models/ChatUser.js";
import allChats from "../models/pipelines/allChats.js";
import allMessages from "../models/pipelines/allMessages.js";
import { Message, validateMessage } from "../models/Message.js";
export default function chatSocket(io) {
    io.of("/socket/chat")
        .on("connection", async (socket) => {
            const user = socket.handshake.headers.user;

            // Implementation
            // initial update for the user
            socket.emit("update", "true");

            // get all the users
            socket.on("users", async () => {
                // find all the chats where the current user is a participant
                const chats = await Chat.find({ participants: user });
                // extract the participants from the chats
                const participants = chats.flatMap((chat) => chat.participants);
                // find all the users where the participants are not in the chats
                const users = await ChatUser.find({
                    _id: { $nin: [...participants, user] },
                });
                // send users emit to the user
                socket.emit("get_users", users);
            });

            // get all the chats
            socket.on("chats", async () => {
                // find all the chats where the current user is a participant
                const chats = await Chat.aggregate(allChats(user));
                // send chats emit to the user
                socket.emit("get_chats", chats);
            });

            // get all the messages for a chat
            socket.on("messages", async (chatId) => {
                // find all the messages for the chat
                const messages = await Chat.aggregate(
                    allMessages(user, chatId)
                );
                // send messages emit to the user
                socket.emit("get_messages", messages);
            });

            // create a new chat
            socket.on("new_chat", async (participant) => {
                if (!participant) {
                    return socket.emit("error", "Participant not present");
                }
                // check if the participant is exist
                const participantExist = await ChatUser.findById(participant);
                if (!participantExist) {
                    return socket.emit("error", "Participant not found");
                }
                // check if the chat already exists
                const chat = await Chat.findOne({
                    participants: { $all: [user, participant] },
                });
                if (chat) {
                    return socket.emit("error", "Chat already exists");
                }
                // create a new chat
                const newChatData = {
                    participants: [user, participant],
                    messages: [],
                };
                const validError = validateChat(newChatData);
                if (validError) {
                    return socket.emit("error", validError);
                }
                const newChat = Chat(newChatData);
                await newChat.save();

                // update all the users
                socket.emit("update", "true");
                socket.broadcast.emit("update", "true");
            });

            // send a new message
            socket.on("new_message", async ({ chatId, message }) => {
                // find the chat
                const chat = await Chat.findOne({
                    _id: chatId,
                });
                if (!chat) {
                    return socket.emit("error", "Chat not found");
                }
                // check if the user is a participant of the chat
                const isParticipant = chat.participants.includes(user);
                if (!isParticipant) {
                    return socket.emit(
                        "error",
                        "User not a participant of this chat"
                    );
                }
                // add the message to the Messages
                const newMessageData = {
                    message,
                    sender: user,
                    timestamp: new Date(),
                };
                const validError = validateMessage(newMessageData);
                if (validError) {
                    return socket.emit("error", validError);
                }
                const newMessage = new Message(newMessageData);
                await newMessage.save();
                // update the chat
                chat.messages.push(newMessage._id);
                // save the chat
                await chat.save();

                // update all the users
                socket.emit("update", "true");
                socket.broadcast.emit("update", "true");
            });

            // delete a chat
            socket.on("delete_chat", async (chatId) => {
                // find the chat
                const chat = await Chat.findOne({
                    _id: chatId,
                });
                if (!chat) {
                    return socket.emit("error", "Chat not found");
                }
                // check if the user is a participant of the chat
                const isParticipant = chat.participants.includes(user);
                if (!isParticipant) {
                    return socket.emit(
                        "error",
                        "User not a participant of this chat"
                    );
                }
                // delete the messages associate with the chat
                await Message.deleteMany({ _id: { $in: chat.messages } });
                // delete the chat
                await Chat.deleteOne({ _id: chat._id });

                // update all the users
                socket.emit("update", "true");
                socket.broadcast.emit("update", "true");
            });

            // End Implementation
        })
        .use(socketMiddleware);
}
