import { model } from "mongoose";
import userSchema from "./schemas/User.js";

export default model("User1", userSchema);
