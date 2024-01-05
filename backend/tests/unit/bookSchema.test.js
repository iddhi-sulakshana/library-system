import bookSchema from "../../models/schemas/bookSchema";

describe("bookSchema", () => {
    it("should have a bookId field of type Number", () => {
        const bookId = bookSchema.path("bookId");
        expect(bookId.instance).toBe("Number");
    });

    it("should have a name field of type String", () => {
        const name = bookSchema.path("name");
        expect(name.instance).toBe("String");
    });

    it("should have an author field of type String", () => {
        const author = bookSchema.path("author");
        expect(author.instance).toBe("String");
    });

    it("should have a price field of type Number", () => {
        const price = bookSchema.path("price");
        expect(price.instance).toBe("Number");
    });

    it("should have a description field of type String", () => {
        const description = bookSchema.path("description");
        expect(description.instance).toBe("String");
    });

    it("should have an imagePath field of type String", () => {
        const imagePath = bookSchema.path("imagePath");
        expect(imagePath.instance).toBe("String");
    });

    it("should have a category field of type String", () => {
        const category = bookSchema.path("category");
        expect(category.instance).toBe("String");
    });
});


