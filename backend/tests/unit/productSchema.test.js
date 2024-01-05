import productSchema from "../../models/schemas/productSchema";

describe("Product Schema", () => {
    it("should have a prodId field of type Number", () => {
        expect(productSchema.obj.prodId).toEqual({
            type: Number,
            required: true,
            default: expect.any(Function),
        });
    });

    it("should have a name field of type String", () => {
        expect(productSchema.obj.name).toEqual({
            type: String,
            required: true,
        });
    });

    it("should have a bookId field of type Number and reference 'books' collection", () => {
        expect(productSchema.obj.bookId).toEqual({
            type: Number,
            required: true,
            ref: "books",
        });
    });

    it("should have required fields", () => {
        expect(productSchema.obj.prodId.required).toBe(true);
        expect(productSchema.obj.name.required).toBe(true);
        expect(productSchema.obj.bookId.required).toBe(true);
    });

    it("should have a default value for prodId", () => {
        expect(productSchema.obj.prodId.default).toEqual(expect.any(Function));
    });
});
