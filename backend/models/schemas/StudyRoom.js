import { Schema } from "mongoose";
export default new Schema({
  roomId: {
    type: Number,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  facilities: [String],
  bookedSlots: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reservation",
      },
      startTime: {
        type: Date,
      },
      endTime: {
        type: Date,
      },
    },
  ],
});
