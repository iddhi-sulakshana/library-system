import { Schema } from "mongoose";

// Schema for Chat Model
export default new Schema(
    {
        // participant count should be 2 and participants should be unique and not null
        participants: [
            {
                type: Schema.Types.ObjectId,
                ref: "ChatUser",
                required: true,
                unique: true,
            },
        ],
        messages: [
            {
                type: Schema.Types.ObjectId,
                ref: "Message",
            },
        ],
    },
    { versionKey: false },
    {
        indexes: [
            { "participants.0": 1, "participants.1": 1 },
            { unique: true },
        ],
    }
);
