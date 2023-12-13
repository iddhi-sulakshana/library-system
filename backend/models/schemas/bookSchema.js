import { Schema } from "mongoose";

// model for example model
export default new Schema({
    bookId: {
        type: Number,
        required: true,
        default: () => Math.floor(Math.random() * 1000000),
    },
    name: {
        type: String,
        required: true,
    },
    author : {
        type: String,
        required: true,
    },
    price : {
        type: Number,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    // image : {
    //     type: String,
    //     required: true,
    // },
    category : {
        type: String,
        required: true,
    },
});
