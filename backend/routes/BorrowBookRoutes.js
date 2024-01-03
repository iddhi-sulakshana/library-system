import express from "express";
import { booksmodel as Book } from "../models/bookModel.js";
import User from "../models/users.js";
import BorrowBook from "../models/BorrowBook.js";
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        // Check if both user and book exist
        const existingUser = await User.findOne({ email: req.body.email });
        const existingBook = await Book.findOne({ bookId: req.body.bookid });

        if (existingUser && existingBook) {
            // Check if a document with the same userid already exists
            const existingBorrow = await BorrowBook.findOne({
                id: req.body.id,
            });

            if (existingBorrow) {
                return res
                    .status(409)
                    .json({ message: "User already borrowed a book." });
            }

            // Continue with the original code
            const newBorrowBook = new BorrowBook({
                userid: existingUser._id,
                bookid: existingBook._id,
                tackdate: req.body.tackdate,
                deliverydate: req.body.deliverydate,
            });
            await newBorrowBook.save();

            return res.status(201).send(newBorrowBook);
        } else {
            return res
                .status(409)
                .send({ message: "User or Book is not valid" });
        }
    } catch (error) {
        console.error("Error adding Borrow Book:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

router.get("/", async (req, res) => {
    try {
        // Check if both user and book exist
        // remove userid.password
        const Borrow = await BorrowBook.find({})
            .populate("userid", {
                password: 0,
            })
            .populate("bookid");

        return res.status(201).json(Borrow);
    } catch (error) {
        console.error("Error fetching Borrow Book:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

// Check the availability of a book based on its ID
router.get("/availability/:bookid", async (req, res) => {
    try {
        const bookId = req.params.bookid;

        // Check if the book with the given ID exists
        const existingBook = await Book.findOne({ bookId });

        if (!existingBook) {
            return res
                .status(404)
                .json({ available: false, message: "Book not found." });
        }

        // Check if the book is already borrowed
        const existingBorrow = await BorrowBook.findOne({ bookId });

        if (existingBorrow) {
            return res.status(200).json({
                available: false,
                message: "Book is not available for borrowing.",
            });
        }

        // If the book exists and is not borrowed, it is available
        return res.status(200).json({
            available: true,
            message: "Book is available for borrowing.",
        });
    } catch (error) {
        console.error("Error checking book availability:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Inside your backend route file
router.delete("/:_id", async (req, res) => {
    try {
        const deletedBorrowBook = await BorrowBook.findByIdAndDelete(
            req.params._id
        );
        if (!deletedBorrowBook) {
            return res.status(404).json({ message: "BorrowBook not found" });
        }
        res.json({ message: "BorrowBook deleted successfully" });
    } catch (error) {
        console.error("Error deleting BorrowBook:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Add a route for updating a BorrowBook record
router.put("/:_id", async (req, res) => {
    try {
        // Check if the BorrowBook with the given ID exists
        const existingBorrowBook = await BorrowBook.findById(req.params._id);

        if (!existingBorrowBook) {
            return res.status(404).json({ message: "BorrowBook not found" });
        }

        // Update the BorrowBook data
        Object.assign(existingBorrowBook, req.body);
        await existingBorrowBook.save();

        return res.status(200).json(existingBorrowBook);
    } catch (error) {
        console.error("Error updating BorrowBook:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
