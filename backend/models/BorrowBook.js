import mongoose from "mongoose";
import BorrowBookSchema from "./schemas/BorrowBook.js";

const Borrowbook = mongoose.model("Borrowbook", BorrowBookSchema);
export default Borrowbook;
