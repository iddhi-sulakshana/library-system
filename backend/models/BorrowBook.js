import mongoose from "mongoose";
import BorrowBookSchema from "./schemas/BorrowBook.js";

const Borrowbooka = mongoose.model("Borrowbook", BorrowBookSchema);
export default Borrowbooka;
