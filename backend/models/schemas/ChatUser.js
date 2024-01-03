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
        },
        isAdmin: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    { versionKey: false }
);