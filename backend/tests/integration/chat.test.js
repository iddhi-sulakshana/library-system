import { Chat } from "../../models/Chat.js";
import { ChatUser } from "../../models/ChatUser.js";
import { Message } from "../../models/Message.js";
import server, { db } from "../serverSocket.js";
import { io } from "socket.io-client";
import { testUsers } from "./testData.js";
import mongoose from "mongoose";

const timeoutTime = 5000;
const longTimeoutTime = 10000;

describe("Chat Integration Test [WebSocket]", () => {
    let serverSocket;
    let clientSocket;
    let users;
    let chatId;
    const path = `http://localhost:${process.env.PORT}/socket/chat`;
    const options = {
        transports: ["polling", "websocket"],
        extraHeaders: {
            user: null,
        },
    };
    // setup the websocket server before running the tests
    beforeAll((done) => {
        serverSocket = server.listen(process.env.PORT, async () => {
            await Promise.all([
                Chat.deleteMany({}),
                ChatUser.deleteMany({}),
                Message.deleteMany({}),
            ]);
            users = await ChatUser.insertMany(testUsers);
            done();
        });
    }, 12000);
    beforeEach(() => {
        options.extraHeaders.user = users[0]?._id;
    });
    afterEach(() => {
        delete options.extraHeaders.user;
    });
    // close the websocket server after running the tests
    afterAll((done) => {
        serverSocket.close(done);
        mongoose.disconnect();
    });
    describe("Check Socket Connection", () => {
        it(
            "should connect to the websocket server",
            (done) => {
                clientSocket = io(path, options);
                clientSocket.on("connect", () => {
                    clientSocket.disconnect();
                    done();
                });
            },
            timeoutTime
        );
        it(
            "should refuse to connect to the server without headers",
            (done) => {
                delete options.extraHeaders.user;
                clientSocket = io(path, options);
                // wait for 2 seconds before checking the connection
                setTimeout(() => {
                    expect(clientSocket.connected).toBeFalsy();
                    done();
                }, 500);
            },
            timeoutTime
        );
    });
    describe("Update Event", () => {
        // check the update event triggering
        it(
            "should trigger update event",
            (done) => {
                clientSocket = io(path, options);
                clientSocket.on("update", (data) => {
                    expect(data).toBeTruthy();
                    clientSocket.disconnect();
                    done();
                });
            },
            timeoutTime
        );
    });
    describe("Get Users", () => {
        // check the users event triggering
        it(
            "should trigger users event and recieve user data",
            (done) => {
                clientSocket = io(path, options);
                clientSocket.on("connect", () => {
                    clientSocket.emit("users");
                });
                clientSocket.on("get_users", (data) => {
                    // data should expect object of array of 2 elements
                    expect(data).toBeDefined();
                    expect(Array.isArray(data)).toBe(true);
                    expect(data.length).toBe(2);
                    clientSocket.disconnect();
                    done();
                });
            },
            timeoutTime
        );
    });
    // get the chats
    describe("Get Chats", () => {
        // check the chats event triggering
        it(
            "should trigger chats event and recieve chats data",
            (done) => {
                clientSocket = io(path, options);
                clientSocket.on("connect", () => {
                    clientSocket.emit("chats");
                });
                clientSocket.on("get_chats", (data) => {
                    // data should expect expty array
                    expect(data).toBeDefined();
                    expect(Array.isArray(data)).toBe(true);
                    expect(data.length).toBe(0);
                    clientSocket.disconnect();
                    done(false);
                });
            },
            timeoutTime
        );
    });
    describe("New Chat", () => {
        // check the new chat event triggering
        it(
            "should trigger new chat event and emit update event",
            (done) => {
                clientSocket = io(path, options);
                clientSocket.on("connect", () => {
                    clientSocket.emit("new_chat", users[1]?._id);
                });
                clientSocket.on("update", async (data) => {
                    // get chats from the database
                    clientSocket.emit("chats");
                });
                clientSocket.on("get_chats", (data) => {
                    // data should expect array of 1 element
                    expect(data).toBeDefined();
                    expect(Array.isArray(data)).toBe(true);
                    expect(data.length).toBe(1);
                    clientSocket.disconnect();
                    chatId = data[0]?._id;
                    done();
                });
            },
            timeoutTime
        );
    });
    describe("Get Messages", () => {
        // check the messages event triggering
        it(
            "should trigger messages event and recieve messages data",
            (done) => {
                clientSocket = io(path, options);
                clientSocket.on("connect", async () => {
                    clientSocket.emit("messages", chatId);
                });
                clientSocket.on("get_messages", (data) => {
                    // data should expect expty array
                    expect(data).toBeDefined();
                    expect(Array.isArray(data)).toBe(true);
                    expect(data.length).toBe(0);
                    clientSocket.disconnect();
                    done();
                });
            },
            timeoutTime
        );
    });
    describe("New Message", () => {
        // check the new message event triggering
        it(
            "should trigger new message event and emit update event",
            (done) => {
                clientSocket = io(path, options);
                clientSocket.on("connect", () => {
                    clientSocket.emit("new_message", {
                        chatId,
                        message: "Hello",
                    });
                });
                clientSocket.on("update", async (data) => {
                    // get messages from the database
                    clientSocket.emit("messages", chatId);
                });
                clientSocket.on("get_messages", (data) => {
                    // data should expect array of 1 element
                    expect(data).toBeDefined();
                    expect(Array.isArray(data)).toBe(true);
                    expect(data.length).toBe(1);
                    expect(data[0].message).toBe("Hello");
                    clientSocket.disconnect();
                    done();
                });
            },
            timeoutTime
        );
    });
    describe("Delete Chat", () => {
        // check the delete chat event triggering
        it(
            "should trigger delete chat event and emit update event",
            (done) => {
                clientSocket = io(path, options);
                clientSocket.on("connect", () => {
                    clientSocket.emit("delete_chat", chatId);
                });
                clientSocket.on("update", async (data) => {
                    // get chats from the database
                    clientSocket.emit("chats");
                });
                clientSocket.on("get_chats", (data) => {
                    // data should expect array of 0 element
                    expect(data).toBeDefined();
                    expect(Array.isArray(data)).toBe(true);
                    expect(data.length).toBe(0);
                    clientSocket.disconnect();
                    done();
                });
            },
            timeoutTime
        );
    });
    describe("Reconnection Handling", () => {
        // check the reconnection handling
        it(
            "should reconnect to the websocket server",
            (done) => {
                clientSocket = io(path, options);
                clientSocket.on("connect", () => {
                    clientSocket.disconnect();
                });
                clientSocket.on("disconnect", () => {
                    clientSocket.on("connect", () => {
                        clientSocket.on("update", (data) => {
                            expect(data).toBeTruthy();
                            clientSocket.disconnect();
                            done();
                        });
                    });
                    clientSocket.connect();
                });
            },
            longTimeoutTime
        );
    });
});
