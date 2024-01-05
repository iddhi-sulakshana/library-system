// import mongoose from "mongoose";
// import MessageSchema from "../../models/schemas/Message";

// //const MessageModel = model("Message", MessageSchema);
// const MessageModel = mongoose.model('Message', MessageSchema);

// describe("Message Model", () => {
//     it("should create a new message", () => {
//         const senderObjectId = new mongoose.Types.ObjectId();
//         const message = MessageModel.create({
//             message: "Hello, world!",
//             sender: senderObjectId,
//             timestamp: new Date(),
//         });
//         //const { errors } = borrowBook.validateSync();
//         //expect(errors.bookid).toBeDefined();
//         // const message = new MessageModel({
//         //     message: "Hello, world!",
//         //     sender: "1234567890",
//         //     timestamp: new Date(),
//         // });

//         console.log(message);
//         expect(message.message).toBe("Hello, world!");
//         expect(message.sender).toEqual(senderObjectId);
//         expect(message.timestamp).toBeInstanceOf(Date);
//     });

//     it("should require a message", () => {
//         const message = new MessageSchema({
//             sender: "1234567890",
//             timestamp: new Date(),
//         });

//         const validationResult = message.validateSync();
//         const { errors } = validationResult;

//         expect(errors.message).toBeDefined();
//     });

//     it("should have a default timestamp", () => {
//         const message = new MessageSchema({
//             message: "Hello, world!",
//             sender: "1234567890",
//         });

//         expect(message.timestamp).toBeInstanceOf(Date);
//     });
// });
