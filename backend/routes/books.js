import { Router, response } from "express";
import { booksmodel, validateBook } from "../models/bookModel.js";
import { productsModel } from "../models/productModel.js";
import multer from "multer";
import { join } from "path";

const router = Router();

var uniqueFilename = "";

// Specify the destination folder for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, join("./", "public", "bookCovers"));
    },
    filename: (req, file, cb) => {
        // Generate a unique filename using uuid
        uniqueFilename =
            Math.random().toString(36).substring(2) + file.originalname;
        // Use the unique filename for the uploaded file
        cb(null, uniqueFilename);
    },
});

const upload = multer({ storage: storage });

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
        const books = await booksmodel
            .find()
            .skip((currentPage - 1) * 5)
            .limit(5);
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

router.post("/add", upload.single("file"), async (req, res) => {
    // Creating a JSON object
    const reqData = {
        name: req.body.name,
        imagePath: uniqueFilename,
        author: req.body.author,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
    };

    try {
        const error = validateBook(reqData);

        console.log(error);

        if (error) {
            res.status(403).send(error);
            return;
        }

        const book = new booksmodel(reqData);
        console.log(book);
        await book.save();

        // in progress

        // const product = new productsModel({
        //     name: response.name,
        //     bookId: response.bookId,
        // });
        // await product.save();

        res.status(200).send("Book added successfully");
    } catch (ex) {
        console.log(ex);
        return res.status(400).send(ex.message);
    }
});

router.put("/:id", upload.single("file"), async (req, res) => {
    const imgPath = req.file ? uniqueFilename : req.body.fileName;
    // Creating a JSON object
    const reqData = {
        name: req.body.name,
        imagePath: imgPath,
        author: req.body.author,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
    };

    try {
        console.log(reqData);
        const error = validateBook(reqData);

        console.log(error);

        if (error) {
            res.status(403).send(error);
            return;
        }
        //update one book
        await booksmodel.findOneAndUpdate({ bookId: req.params.id }, reqData);

        // in progress

        // const product = new productsModel({
        //     name: response.name,
        //     bookId: response.bookId,
        // });
        // await product.save();

        res.status(200).send("Book Updated successfully");
    } catch (ex) {
        return res.status(400).send(ex.message);
        console.log(ex);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const book = await booksmodel.findOneAndDelete({
            bookId: req.params.id,
        });
        if (!book) return res.status(404).send("No book found");

        const product = await productsModel.deleteMany({
            bookId: req.params.id,
        });
        if (!product)
            return res.status(404).send("Issue with product deletion");

        res.send("Deleted successfully, " + book.name);
    } catch (ex) {
        return res.status(400).send(ex.message);
        console.log(ex);
    }
});

export default router;
