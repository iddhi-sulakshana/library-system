import { Schema } from "mongoose";

// model for example model
export default new Schema({
    prodId: {
        type: Number,
        required: true,
        default: () => Math.floor(Math.random() * 1000000),
    },
    name: {
        type: String,
        required: true,
    },
    bookId : {
        type: Number,
        required: true,
        ref: "books",
    },
});
