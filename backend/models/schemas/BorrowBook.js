import { Schema } from "mongoose";
export default new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    bookid: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },

    pno: {
        type: Number,
        required: true,
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
