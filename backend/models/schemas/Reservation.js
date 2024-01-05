import { Schema, Types } from "mongoose";
export default new Schema({
    bookingId: {
        type: Schema.Types.ObjectId,
        default: new Types.ObjectId(),
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    roomId: {
        type: Number,
        required: true,
    },
    studyRoomId: {
        type: Schema.Types.ObjectId,
        ref: "StudyRoom",
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
