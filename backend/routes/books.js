import { Router } from "express";
import { booksmodel, validateBook } from "../models/bookModel.js";
import { productsModel } from "../models/productModel.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const books = await booksmodel.find();
        res.send(books);
    } catch (ex) {
        return res.status(400).send(ex.message);
        console.log(ex);
    }
});

router.get("/page/:id", async (req, res) => {

    try {
        const currentPage = parseInt(req.params.id);
        const books = await booksmodel.find().skip((currentPage - 1) * 5).limit(5);
        res.send(books);
    } catch (ex) {
        return res.status(400).send(ex.message);
        console.log(ex);
    }
}); 
router.get("/:id", async (req, res) => {
    try {
        const book = await booksmodel.findOne({ bookId: req.params.id });
        if (!book) return res.status(404).send("No book found");
        res.send(book);

    } catch (ex) {
        return res.status(400).send(ex.message);
        console.log(ex);
    }
});

router.post("/add", async (req, res) => {
    try {
        const error = validateBook(req.body);

        if(error){
            res.status(403).send(error);
            return;
        }

        const book = new booksmodel(req.body);
        await book.save();
        const response = await book.save();

        const product = new productsModel({
            name: response.name,
            bookId: response.bookId,
        });
        await product.save();        
        res.status(200).send("Book added successfully");

    } catch (ex) {
        return res.status(400).send(ex.message);
        console.log(ex);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const book = await booksmodel.findOneAndDelete({ bookId: req.params.id });
        if (!book) return res.status(404).send("No book found");

        const product = await productsModel.deleteMany({ bookId: req.params.id });
        if (!product) return res.status(404).send("Issue with product deletion");

        res.send("Deleted successfully, " +book.name);

    } catch (ex) {
        return res.status(400).send(ex.message);
        console.log(ex);
    }
});


export default router;
