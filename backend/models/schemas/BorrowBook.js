import { Schema } from "mongoose";
export default new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    bookid: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Book",
    },
    tackdate: {
        type: Date,
        required: true,
    },
    deliverydate: {
        type: Date,
        required: true,
    },
});
