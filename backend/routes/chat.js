import { Router } from "express";
import { ChatUser } from "../models/ChatUser.js";
import { Chat, validateChat } from "../models/Chat.js";
import { Message, validateMessage } from "../models/Message.js";
import allChats from "../models/pipelines/allChats.js";
import allMessages from "../models/pipelines/allMessages.js";

const router = Router();

// Get all the chat users already not in the chat
router.get("/users", async (req, res) => {
    const { user } = req.headers;
    // Find all chats where the current user is a participant
    const chats = await Chat.find({ participants: user });
    // Extract the participants from the chats
    const participants = chats.flatMap((chat) => chat.participants);
    const users = await ChatUser.find({
        _id: { $nin: [...participants, user] },
    });
    if (users.length === 0) {
        return res.status(404).send("No users found");
    }
    res.send(users);
});

// get all the chats for participant by participants id and last message
router.get("/all", async (req, res) => {
    const { user } = req.headers;
    const chats = await Chat.aggregate(allChats(user));
    if (chats.length === 0) {
        return res.status(404).send("No chats found");
    }
    res.send(chats);
});

// get all the messages for chat by chat id
router.get("/messages/:id", async (req, res) => {
    const { user } = req.headers;
    const { id } = req.params;
    const messages = await Chat.aggregate(allMessages(user, id));
    if (messages.length === 0) {
        return res.status(404).send("No messages found");
    }
    res.send(messages);
});

//  Create a new chat with participants
router.post("/new", async (req, res) => {
    const { user } = req.headers;
    const { participant } = req.body;
    // check if the participant is exist
    const participantExist = await ChatUser.findById(participant);
    if (!participantExist) {
        return res.status(404).send("Participant not found");
    }
    // Check if the chat already exists
    const chat = await Chat.findOne({
        participants: { $all: [user, participant] },
    });
    if (chat) {
        return res.status(400).send("Chat already exists");
    }
    const newChatData = {
        participants: [user, participant],
        messages: [],
    };
    const validError = validateChat(newChatData);
    if (validError) {
        return res.status(400).send("Invalid chat" + validError);
    }
    // Create a new chat
    const newChat = new Chat(newChatData);
    // Save the chat
    try {
        await newChat.save();
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
    // Send a response
    res.send("success");
});

// Add messages to the chat
router.put("/message", async (req, res) => {
    const { user } = req.headers;
    const { chatId, message } = req.body;
    // Check if the chat exists
    const chat = await Chat.findById(chatId);
    if (!chat) {
        return res.status(404).send("Chat not found");
    }
    // Check if the user is participant of the chat
    const isParticipant = chat.participants.includes(user);
    if (!isParticipant) {
        return res.status(403).send("User not a participant of the chat");
    }
    // Add the message to the Messages
    const newMessageData = {
        message: message,
        sender: user,
        timestamp: new Date(),
    };
    const validError = validateMessage(newMessageData);
    if (validError) {
        return res.status(400).send("Invalid message" + validError);
    }
    // Create a new message
    const newMessage = new Message(newMessageData);
    // Save the message
    try {
        await newMessage.save();
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
    // add the message to the chat
    chat.messages.push(newMessage._id);
    // Save the chat
    try {
        await chat.save();
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
    // Send a response
    res.send("success");
});

// delete a chat with its messages
router.delete("/:id", async (req, res) => {
    const { user } = req.headers;
    // Check if the chat exists
    const chat = await Chat.findById(req.params.id);
    if (!chat) {
        return res.status(404).send("Chat not found");
    }
    // Check if the user is participant of the chat
    const isParticipant = chat.participants.includes(user);
    if (!isParticipant) {
        return res.status(403).send("User not a participant of the chat");
    }
    // Delete the messages associate with the chat
    try {
        await Message.deleteMany({ _id: { $in: chat.messages } });
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
    // Delete the chat
    try {
        await Chat.deleteOne({ _id: req.params.id });
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
    // Send a response
    res.send("success");
});

// Insert Test Data into the database
router.post("/insertTestData", async (req, res) => {
    // Delete all the chats
    await Chat.deleteMany({});
    // Delete all the chat users
    await ChatUser.deleteMany({});
    // Delete all the messages
    await Message.deleteMany({});
    // Insert test data into the database
    const insertedChatUsers = await ChatUser.insertMany(testData);
    // Create a test messages list with time specified
    const testMessage = new Message({
        message: "Hello World!",
        sender: insertedChatUsers[0]._id,
        timestamp: new Date("2023-10-10T10:10:10"),
    });
    testMessage.save();
    // Create a test messages list with time specified
    const testMessage1 = new Message({
        message: "Hello There",
        sender: insertedChatUsers[1]._id,
        timestamp: new Date("2023-10-11T10:14:10"),
    });
    testMessage1.save();
    // Create a chat with test messages
    const chat = new Chat({
        participants: [insertedChatUsers[0]._id, insertedChatUsers[1]._id],
        messages: [testMessage._id, testMessage1._id],
    });
    // Save the chat
    await chat.save();
    // Send a response
    res.send("Inserted chat users and chats");
});

export default router;

///////// To Insert Test Data //////////
const testData = [
    {
        name: "Jhon Doe",
        avatar: "https://robohash.org/" + Math.random(),
        isAdmin: true,
    },
    {
        name: "Jane Doe",
        avatar: "https://robohash.org/" + Math.random(),
        isAdmin: false,
    },
    {
        name: "John Smith",
        avatar: "https://robohash.org/" + Math.random(),
        isAdmin: false,
    },
];
