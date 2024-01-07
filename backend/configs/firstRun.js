import { Chat } from "../models/Chat.js";
import { ChatUser } from "../models/ChatUser.js";
import UserModel from "../models/users.js";
import { Message } from "../models/Message.js";
import { Staff } from "../models/staff.js";
import { StudyRoom } from "../models/StudyRoom.js";
import { Reservation } from "../models/Reservation.js";
import { encrypt } from "../utils/hash.js";
import BorrowBook from "../models/BorrowBook.js";
import { booksmodel } from "../models/bookModel.js";

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
    await BorrowBook.deleteMany({});
    await booksmodel.deleteMany({});
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
    const user2 = new UserModel({
        name: "User",
        email: "asd2@asd.com",
        password: "asdasd",
    });
    await user2.save();
    const chatUser2 = new ChatUser({
        _id: user2._id,
        name: user2.name,
        avatar: Math.random(),
        isAdmin: false,
    });
    await chatUser2.save();
    const chatUser3 = new ChatUser({
        _id: user2._id,
        name: user2.name,
        avatar: Math.random(),
        isAdmin: false,
    });

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

    // insert 10 to database using insert many
    const booksmodelData = [
        {
            name: "Generative AI",
            author: "Jeff Dummine",
            price: 2500,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque purus semper. Ut tellus elementum sagittis vitae et leo duis ut. Non odio euismod lacinia at quis risus sed vulputate. Id ornare arcu odio ut sem nulla pharetra diam sit. Risus nec feugiat in fermentum posuere urna. Aliquet nibh praesent tristique magna sit. Et leo duis ut diam quam nulla porttitor massa id. Habitasse platea dictumst quisque sagittis purus sit amet. Senectus et netus et malesuada fames. Metus dictum at tempor commodo ullamcorper. Condimentum vitae sapien pellentesque habitant morbi tristique senectus. Fermentum et sollicitudin ac orci phasellus egestas. Accumsan sit amet nulla facilisi morbi tempus. Id donec ultrices tincidunt arcu non sodales neque sodales. Vestibulum morbi blandit cursus risus at ultrices mi.",
            imagePath: "b1.jpg",
            category: "fiction",
            bookId: 193974,
            availability: false,
        },
        {
            name: "Revenant",
            author: "R. Valentine",
            price: 5500,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque purus semper. Ut tellus elementum sagittis vitae et leo duis ut. Non odio euismod lacinia at quis risus sed vulputate. Id ornare arcu odio ut sem nulla pharetra diam sit. Risus nec feugiat in fermentum posuere urna. Aliquet nibh praesent tristique magna sit. Et leo duis ut diam quam nulla porttitor massa id. Habitasse platea dictumst quisque sagittis purus sit amet. Senectus et netus et malesuada fames. Metus dictum at tempor commodo ullamcorper. Condimentum vitae sapien pellentesque habitant morbi tristique senectus. Fermentum et sollicitudin ac orci phasellus egestas. Accumsan sit amet nulla facilisi morbi tempus. Id donec ultrices tincidunt arcu non sodales neque sodales. Vestibulum morbi blandit cursus risus at ultrices mi.",
            imagePath: "b2.jpg",
            category: "other",
            bookId: 293974,
        },
        {
            name: "Playing by her Rules",
            author: "Sapna Bhog",
            price: 6000,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque purus semper. Ut tellus elementum sagittis vitae et leo duis ut. Non odio euismod lacinia at quis risus sed vulputate. Id ornare arcu odio ut sem nulla pharetra diam sit. Risus nec feugiat in fermentum posuere urna. Aliquet nibh praesent tristique magna sit. Et leo duis ut diam quam nulla porttitor massa id. Habitasse platea dictumst quisque sagittis purus sit amet. Senectus et netus et malesuada fames. Metus dictum at tempor commodo ullamcorper. Condimentum vitae sapien pellentesque habitant morbi tristique senectus. Fermentum et sollicitudin ac orci phasellus egestas. Accumsan sit amet nulla facilisi morbi tempus. Id donec ultrices tincidunt arcu non sodales neque sodales. Vestibulum morbi blandit cursus risus at ultrices mi.",
            imagePath: "b3.jpg",
            category: "poetry",
            bookId: 393974,
        },
        {
            name: "The Lucky Puppy",
            author: "Mike Grylls",
            price: 1200,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque purus semper. Ut tellus elementum sagittis vitae et leo duis ut. Non odio euismod lacinia at quis risus sed vulputate. Id ornare arcu odio ut sem nulla pharetra diam sit. Risus nec feugiat in fermentum posuere urna. Aliquet nibh praesent tristique magna sit. Et leo duis ut diam quam nulla porttitor massa id. Habitasse platea dictumst quisque sagittis purus sit amet. Senectus et netus et malesuada fames. Metus dictum at tempor commodo ullamcorper. Condimentum vitae sapien pellentesque habitant morbi tristique senectus. Fermentum et sollicitudin ac orci phasellus egestas. Accumsan sit amet nulla facilisi morbi tempus. Id donec ultrices tincidunt arcu non sodales neque sodales. Vestibulum morbi blandit cursus risus at ultrices mi.",
            imagePath: "b4.jpg",
            category: "other",
            bookId: 493974,
        },
        {
            name: "The Book Thief",
            author: "Markus Zusak",
            price: 6200,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque purus semper. Ut tellus elementum sagittis vitae et leo duis ut. Non odio euismod lacinia at quis risus sed vulputate. Id ornare arcu odio ut sem nulla pharetra diam sit. Risus nec feugiat in fermentum posuere urna. Aliquet nibh praesent tristique magna sit. Et leo duis ut diam quam nulla porttitor massa id. Habitasse platea dictumst quisque sagittis purus sit amet. Senectus et netus et malesuada fames. Metus dictum at tempor commodo ullamcorper. Condimentum vitae sapien pellentesque habitant morbi tristique senectus. Fermentum et sollicitudin ac orci phasellus egestas. Accumsan sit amet nulla facilisi morbi tempus. Id donec ultrices tincidunt arcu non sodales neque sodales. Vestibulum morbi blandit cursus risus at ultrices mi.",
            imagePath: "b5.jpg",
            category: "non-fiction",
            bookId: 593974,
        },
        {
            name: "Silly Christmas",
            author: "Will Peter",
            price: 2700,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque purus semper. Ut tellus elementum sagittis vitae et leo duis ut. Non odio euismod lacinia at quis risus sed vulputate. Id ornare arcu odio ut sem nulla pharetra diam sit. Risus nec feugiat in fermentum posuere urna. Aliquet nibh praesent tristique magna sit. Et leo duis ut diam quam nulla porttitor massa id. Habitasse platea dictumst quisque sagittis purus sit amet. Senectus et netus et malesuada fames. Metus dictum at tempor commodo ullamcorper. Condimentum vitae sapien pellentesque habitant morbi tristique senectus. Fermentum et sollicitudin ac orci phasellus egestas. Accumsan sit amet nulla facilisi morbi tempus. Id donec ultrices tincidunt arcu non sodales neque sodales. Vestibulum morbi blandit cursus risus at ultrices mi.",
            imagePath: "b6.jpg",
            category: "other",
            bookId: 693974,
        },
        {
            name: "Tuesday with Morrie",
            author: "Mitch Albom",
            price: 7700,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque purus semper. Ut tellus elementum sagittis vitae et leo duis ut. Non odio euismod lacinia at quis risus sed vulputate. Id ornare arcu odio ut sem nulla pharetra diam sit. Risus nec feugiat in fermentum posuere urna. Aliquet nibh praesent tristique magna sit. Et leo duis ut diam quam nulla porttitor massa id. Habitasse platea dictumst quisque sagittis purus sit amet. Senectus et netus et malesuada fames. Metus dictum at tempor commodo ullamcorper. Condimentum vitae sapien pellentesque habitant morbi tristique senectus. Fermentum et sollicitudin ac orci phasellus egestas. Accumsan sit amet nulla facilisi morbi tempus. Id donec ultrices tincidunt arcu non sodales neque sodales. Vestibulum morbi blandit cursus risus at ultrices mi.",
            imagePath: "b7.jpg",
            category: "Drama/Play",
            bookId: 793974,
        },
        {
            name: "Over My Dead Body",
            author: "Jeff Archer",
            price: 10750,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque purus semper. Ut tellus elementum sagittis vitae et leo duis ut. Non odio euismod lacinia at quis risus sed vulputate. Id ornare arcu odio ut sem nulla pharetra diam sit. Risus nec feugiat in fermentum posuere urna. Aliquet nibh praesent tristique magna sit. Et leo duis ut diam quam nulla porttitor massa id. Habitasse platea dictumst quisque sagittis purus sit amet. Senectus et netus et malesuada fames. Metus dictum at tempor commodo ullamcorper. Condimentum vitae sapien pellentesque habitant morbi tristique senectus. Fermentum et sollicitudin ac orci phasellus egestas. Accumsan sit amet nulla facilisi morbi tempus. Id donec ultrices tincidunt arcu non sodales neque sodales. Vestibulum morbi blandit cursus risus at ultrices mi.",
            imagePath: "b8.jpg",
            category: "fiction",
            bookId: 893974,
        },
        {
            name: "Forever Yours",
            author: "Neha Chenani",
            price: 3750,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque purus semper. Ut tellus elementum sagittis vitae et leo duis ut. Non odio euismod lacinia at quis risus sed vulputate. Id ornare arcu odio ut sem nulla pharetra diam sit. Risus nec feugiat in fermentum posuere urna. Aliquet nibh praesent tristique magna sit. Et leo duis ut diam quam nulla porttitor massa id. Habitasse platea dictumst quisque sagittis purus sit amet. Senectus et netus et malesuada fames. Metus dictum at tempor commodo ullamcorper. Condimentum vitae sapien pellentesque habitant morbi tristique senectus. Fermentum et sollicitudin ac orci phasellus egestas. Accumsan sit amet nulla facilisi morbi tempus. Id donec ultrices tincidunt arcu non sodales neque sodales. Vestibulum morbi blandit cursus risus at ultrices mi.",
            imagePath: "b9.jpg",
            category: "other",
            bookId: 993974,
        },
        {
            name: "The Armour of Light",
            author: "Ken Follett",
            price: 12500,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque purus semper. Ut tellus elementum sagittis vitae et leo duis ut. Non odio euismod lacinia at quis risus sed vulputate. Id ornare arcu odio ut sem nulla pharetra diam sit. Risus nec feugiat in fermentum posuere urna. Aliquet nibh praesent tristique magna sit. Et leo duis ut diam quam nulla porttitor massa id. Habitasse platea dictumst quisque sagittis purus sit amet. Senectus et netus et malesuada fames. Metus dictum at tempor commodo ullamcorper. Condimentum vitae sapien pellentesque habitant morbi tristique senectus. Fermentum et sollicitudin ac orci phasellus egestas. Accumsan sit amet nulla facilisi morbi tempus. Id donec ultrices tincidunt arcu non sodales neque sodales. Vestibulum morbi blandit cursus risus at ultrices mi.",
            imagePath: "b10.jpg",
            category: "non-fiction",
            bookId: 1093974,
        },
    ];
    const books = await booksmodel.insertMany(booksmodelData);
    const borrowBook = new BorrowBook({
        userid: user2._id,
        bookid: books[0]._id,
        tackdate: new Date(
            new Date().setDate(new Date().getDate() - 14)
        ).toISOString(),
        deliverydate: new Date(
            new Date().setDate(new Date().getDate() - 7)
        ).toISOString(),
    });
    await borrowBook.save();
}

export { FirstRun, DeleteAll };
