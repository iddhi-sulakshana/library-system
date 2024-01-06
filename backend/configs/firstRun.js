import { Chat } from "../models/Chat.js";
import { ChatUser } from "../models/ChatUser.js";
import UserModel from "../models/users.js";
import { Message } from "../models/Message.js";
import { Staff } from "../models/staff.js";
import { StudyRoom } from "../models/StudyRoom.js";
import { Reservation } from "../models/Reservation.js";
import { encrypt } from "../utils/hash.js";
// import {BorrowBook} from "../models/BorrowBook.js";

async function DeleteAll() {
    // delete all the collection data from
    // Staff, ChatUser, Chat, Message
    await Staff.deleteMany({});
    await ChatUser.deleteMany({});
    await Chat.deleteMany({});
    await Message.deleteMany({});
    await UserModel.deleteMany({});
    await Reservation.deleteMany({});
    await StudyRoom.deleteMany({});
    // await BorrowBook.deleteMany({});
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

    // insert study rooms to database
    const studyRoom = new StudyRoom({
        roomId: 1001,
        capacity: 5,
        facilities: ["Wi-Fi", "Whiteboard", "Computers"],
    });
    await studyRoom.save();
    const studyRoom1Id = studyRoom._id;

    const studyRoom2 = new StudyRoom({
        roomId: 1002,
        capacity: 5,
        facilities: ["Wi-Fi", "Whiteboard", "Computers", "A/C"],
    });
    await studyRoom2.save();
    const studyRoom2Id = studyRoom2._id;

    const studyRoom3 = new StudyRoom({
        roomId: 1003,
        capacity: 5,
        facilities: ["Wi-Fi", "Whiteboard", "Computers", "A/C"],
    });
    await studyRoom3.save();
    const studyRoom3Id = studyRoom3._id;

    const studyRoom4 = new StudyRoom({
        roomId: 1004,
        capacity: 5,
        facilities: ["Wi-Fi", "Whiteboard", "Computers"],
    });
    await studyRoom4.save();
    const studyRoom4Id = studyRoom4._id;

    //insert reservations to database
    const reservation = new Reservation({
        userId: user._id,
        roomId: 1001,
        startTime: "2023-12-22T10:00:00.000+00:00",
        endTime: "2023-12-22T12:00:00.000+00:00",
        studyRoomId: studyRoom1Id,
    });
    await reservation.save();
    studyRoom.bookedSlots.push({
        bookId: reservation._id,
        startTime: reservation.startTime,
        endTime: reservation.endTime,
    });
    await studyRoom.save();

    const reservation2 = new Reservation({
        userId: user._id,
        roomId: 1002,
        startTime: "2023-12-22T08:00:00.000+00:00",
        endTime: "2023-12-22T10:00:00.000+00:00",
        studyRoomId: studyRoom2Id,
    });
    await reservation2.save();
    studyRoom2.bookedSlots.push({
        bookId: reservation2._id,
        startTime: reservation2.startTime,
        endTime: reservation2.endTime,
    });
    await studyRoom2.save();

    const reservation3 = new Reservation({
        userId: user._id,
        roomId: 1003,
        startTime: "2023-12-22T12:00:00.000+00:00",
        endTime: "2023-12-22T14:00:00.000+00:00",
        studyRoomId: studyRoom3Id,
    });
    await reservation3.save();
    studyRoom3.bookedSlots.push({
        bookId: reservation3._id,
        startTime: reservation3.startTime,
        endTime: reservation3.endTime,
    });
    await studyRoom3.save();

    const reservation4 = new Reservation({
        userId: user._id,
        roomId: 1004,
        startTime: "2023-12-22T14:00:00.000+00:00",
        endTime: "2023-12-22T16:00:00.000+00:00",
        studyRoomId: studyRoom4Id,
    });
    await reservation4.save();
    studyRoom4.bookedSlots.push({
        bookId: reservation4._id,
        startTime: reservation4.startTime,
        endTime: reservation4.endTime,
    });
    await studyRoom4.save();
}

export { FirstRun, DeleteAll };
