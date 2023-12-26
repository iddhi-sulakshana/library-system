import { Schema } from "mongoose";

// Schema for Message model
export default new Schema(
    {
        message: {
            type: String,
            required: true,
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: "ChatUser",
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
    { versionKey: false }
);
