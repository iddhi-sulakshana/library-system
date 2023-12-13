import { Router } from "express";
import { booksmodel, validateBook } from "../models/bookModel.js";
const router = Router();

router.post("/add", async (req, res) => {
    try {
        const error = validateBook(req.body);

        if(error){
            res.status(403).send(error);
            return;
        }

        const book = new booksmodel(req.body);
        await book.save();
        
        res.status(200).send("Book added successfully");

    } catch (ex) {
        return res.status(400).send(ex.message);
        console.log(ex);
    }
});

export default router;
