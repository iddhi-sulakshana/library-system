import { Chat } from "../models/Chat.js";
import { ChatUser } from "../models/ChatUser.js";
import UserModel from "../models/users.js";
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
    await UserModel.deleteMany({});
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
        _id: staff._id,
        name: staff.firstname + " " + staff.lastname,
        avatar: staff.image,
        isAdmin: true,
    });
    await chatUser.save();

    // insert default user to database
    const user = new UserModel({
        name: "User",
        email: "asd1@asd.com",
        password: "asdasd",
    });
    await user.save();
    const chatUser2 = new ChatUser({
        _id: user._id,
        name: user.name,
        avatar: Math.random(),
        isAdmin: false,
    });
    await chatUser2.save();
}

export { FirstRun, DeleteAll };
