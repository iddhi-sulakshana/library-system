import { model } from "mongoose";
import bookSchema from "./schemas/Book.js";

export default model("Book", bookSchema);
