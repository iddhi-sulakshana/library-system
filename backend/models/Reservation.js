import { model } from "mongoose";
import reservationSchema from "./schemas/Reservation.js";

export default model("Reservation", reservationSchema);
