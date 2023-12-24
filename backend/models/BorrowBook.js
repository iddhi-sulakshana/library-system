import { model } from "mongoose";
import borrowbookSchema from "./schemas/BorrowBook.js";

export default model("BorrowBook", borrowbookSchema);
