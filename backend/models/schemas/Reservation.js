import { Schema } from "mongoose";
export default new Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  userId: {
    type: Number,
    required: true,
  },
  roomId: {
    type: Number,
    required: true,
  },
  studyRoomId: {
    type: mongoose.Schema.Types.ObjectId,
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
