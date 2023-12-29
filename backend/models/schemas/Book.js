import { Schema } from "mongoose";

export default new Schema({
    bookid: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },

    book_image: {
        type: String,
        required: true,
    },
});
