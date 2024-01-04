import { Chat } from "../models/Chat.js";
import { ChatUser } from "../models/ChatUser.js";
import { Message } from "../models/Message.js";
import { Staff } from "../models/staff.js";
import { encrypt } from "../utils/hash.js";

async function DeleteAll() {
    // delete all the collection data from
    // Staff, ChatUser, Chat, Message
    await Staff.deleteMany({});
    await ChatUser.deleteMany({});
    await Chat.deleteMany({});
    await Message.deleteMany({});
}
async function FirstRun() {
    const hashedPassword = await encrypt("admin");
    // insert default staff to database
    const staff = new Staff({
        firstname: "Admin",
        lastname: "Admin",
        email: "admin@email.com",
        password: hashedPassword,
        role: "Administrator",
        image: Math.random(),
    });
    await staff.save();
    const chatUser = new ChatUser({
        name: staff.firstname + " " + staff.lastname,
        avatar: staff.image,
        isAdmin: true,
    });
    await chatUser.save();
}

export { FirstRun, DeleteAll };
