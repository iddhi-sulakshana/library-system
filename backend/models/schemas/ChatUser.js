import { Schema } from "mongoose";

// Schema for ChatUser model
export default new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            required: false,
            default: function () {
                return Math.random();
            },
        },
        isAdmin: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    { versionKey: false }
);
