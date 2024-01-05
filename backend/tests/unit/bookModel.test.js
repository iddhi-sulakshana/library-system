import { validateBook, booksmodel } from "../../models/bookModel.js";

describe("bookModel", () => {
    it("should create a new book model", () => {
        const book = new booksmodel({
            name: "Book 1",
            author: "Author 1",
            price: 10,
            description: "Description 1",
            imagePath: "/path/to/image1.jpg",
            category: "Category 1",
        });
        expect(book).toBeDefined();
    });

    it("should validate a book with all required fields", () => {
        const book = {
            name: "Book 2",
            author: "Author 2",
            price: 20,
            description: "Description 2",
            imagePath: "/path/to/image2.jpg",
            category: "Category 2",
        };
        const validationResult = validateBook(book);
        expect(validationResult).toBeNull();
    });

    it("should not validate a book without a name", () => {
        const book = {
            author: "Author 3",
            price: 30,
            description: "Description 3",
            imagePath: "/path/to/image3.jpg",
            category: "Category 3",
        };
        const validationResult = validateBook(book);
        expect (validationResult).toBe("\"name\" is required")
        expect(validationResult.error).not.toBeNull();
    });

    it("should not validate a book without an author", () => {
        const book = {
            name: "Book 4",
            price: 40,
            description: "Description 4",
            imagePath: "/path/to/image4.jpg",
            category: "Category 4",
        };
        const validationResult = validateBook(book);
        expect (validationResult).toBe("\"author\" is required")
        expect(validationResult.error).not.toBeNull();
    });

    it("should not validate a book without a price", () => {
        const book = {
            name: "Book 5",
            author: "Author 5",
            description: "Description 5",
            imagePath: "/path/to/image5.jpg",
            category: "Category 5",
        };
        const validationResult = validateBook(book);
        expect (validationResult).toBe("\"price\" is required")
        expect(validationResult.error).not.toBeNull();
    });

    it("should not validate a book without a description", () => {
        const book = {
            name: "Book 6",
            author: "Author 6",
            price: 60,
            imagePath: "/path/to/image6.jpg",
            category: "Category 6",
        };
        const validationResult = validateBook(book);
        expect (validationResult).toBe("\"description\" is required")
        expect(validationResult.error).not.toBeNull();
    });

    it("should not validate a book without an image path", () => {
        const book = {
            name: "Book 7",
            author: "Author 7",
            price: 70,
            description: "Description 7",
            category: "Category 7",
        };
        const validationResult = validateBook(book);
        expect (validationResult).toBe("\"imagePath\" is required")
        expect(validationResult.error).not.toBeNull();
    });
    it("should not validate a book without a category", () => {
        const book = {
            name: "Book 8",
            author: "Author 8",
            price: 80,
            description: "Description 8",
            imagePath: "/path/to/image8.jpg",
        };
        const validationResult = validateBook(book);
        expect (validationResult).toBe("\"category\" is required")
        expect(validationResult.error).not.toBeNull();
    });

});
