import Joi from "joi";
import { model } from "mongoose";
import studyRoomSchema from "./schemas/StudyRoom.js";

const StudyRoom = model("StudyRoom", studyRoomSchema);

const schema = new Joi.object({
  roomId: Joi.number().required(),
  capacity: Joi.number().required(),
  facilities: Joi.array().items(Joi.string()).default([]),
  bookedSlots: Joi.array()
    .items(
      Joi.object({
        bookId: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required(),
        startTime: Joi.date(),
        endTime: Joi.date(),
      })
    )
    .default([]),
});

function validate(StudyRoom) {
  const result = schema.validate(StudyRoom);
  if (result.error) return result.error.details[0].message;
  return null;
}

export { validate as validateStudyRoom, StudyRoom };
