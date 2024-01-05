import request from "supertest";
import server, { db } from "../server";
import mongoose from "mongoose";
import { Staff } from "../../models/staff.js";
import { booksmodel } from "../../models/bookModel";
import { encrypt } from "../../utils/hash.js";
import jwt from "jsonwebtoken";

describe("Book Router Integration Tests", () => {
    afterEach(async () => {
        await booksmodel.deleteMany();
    });

    afterEach(async () => {
        await Staff.deleteMany();
    });

    afterAll(() => {
        mongoose.disconnect();
    });
    let token;

    beforeAll(async () => {
        const hashedPassword = await encrypt("admin");
        // insert default staff to database
        const staff = new Staff({
            firstname: "Admin",
            lastname: "Admin",
            email: "admins@email.com",
            password: hashedPassword,
            role: "Administrator",
            image: Math.random(),
        });
        await staff.save();

        token = jwt.sign(
            { _id: staff._id, isAdmin: true },
            process.env.JWT_PRIVATE_KEY
        );
    });

    const books = {
        name: "Book1",
        author: "Author1",
        price: 20,
        description: "Description1",
        imagePath: "path1",
        category: "Category1",
    };

    describe("GET /api/books", () => {
        it("should get all books", async () => {
            // Create sample books in the database for testing

            const booksData = new booksmodel(books);
            await booksData.save();

            // Make the request to get all books
            const response = await request(server)
                .get("/api/books")
                .expect(200);

            // Expect the response body to be an array of books
            expect(response.body).toHaveLength(1);
            // You may add more specific assertions based on your actual response structure
        });
    });

    // Similar tests for other routes (GET /api/books/page/:id, GET /api/books/:id, POST /api/books/add, PUT /api/books/:id, DELETE /api/books/:id)
    // ...

    //   describe("POST /api/books/add", () => {
    //     it("should add a new book", async () => {
    //         const pathToImage = "./1kb.png";
    //       // Mock data for the new book
    //       const newBookData = {
    //         name: "NewBook",
    //         author: "NewAuthor",
    //         price: 30,
    //         description: "NewDescription",
    //         category: "NewCategory",
    //       };
    //       const filePath = path.join(__dirname, '1kb.png');
    //     const fileBuffer = fs.readFileSync(filePath);
    //     console.log(fileBuffer, filePath);

    //       // Make the request to add a new book
    //       const response = await request(server)
    //         .post("/api/books/add")
    //         .set("x-auth-token", token)
    //         .set("Content-Type", "multipart/form-data",)
    //         .field("name", newBookData.name)

    //         .field("imagePath", "pathToImage")
    //         .field("author", newBookData.author)
    //         .field("price", newBookData.price)
    //         .field("description", newBookData.description)
    //         .field("category", newBookData.category)

    //         .attach("file",fileBuffer, "1kb.png") // Attach a file if needed
    //         .expect(200);

    //       // Expect the response body to contain the success message
    //       expect(response.text).toBe("Book added successfully");
    //       // You may add more specific assertions based on your actual response structure

    //       // Optional: You can check the database to ensure the new book is added
    //       const addedBook = await booksmodel.findOne({ name: newBookData.name });
    //       expect(addedBook).toBeDefined();
    //     });
});

// Similar tests for other routes (PUT /api/books/:id, DELETE /api/books/:id)
