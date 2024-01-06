import Joi from "joi";
import { model, Types } from "mongoose";
import reservationSchema from "./schemas/Reservation.js";

const Reservation = model("Reservation", reservationSchema);

const schema = new Joi.object({
    bookingId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .optional(),
    userId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    roomId: Joi.number().optional(),
    studyRoomId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .label("StudyRoom ID")
        .optional(),
    startTime: Joi.date(),
    endTime: Joi.date(),
    createdAt: Joi.date().default(Date.now).optional(),
}).or("bookingId", "roomId", "startTime", "endTime");

function validate(Reservation) {
    const result = schema.validate(Reservation);
    if (result.error) return result.error.details[0].message;
    return null;
}

export { validate as validateReservation, Reservation };
