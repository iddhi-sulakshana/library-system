import productSchema from "../../models/schemas/productSchema";

describe("productSchema", () => {
    it("should have a prodId property of type Number", () => {
        const prodIdField = productSchema.obj.prodId;

        // Check the type
        expect(prodIdField.type).toBe(Number);

        // Check the required property
        expect(prodIdField.required).toBe(true);

        // Check the default property is a function
        expect(typeof prodIdField.default).toBe("function");
    });

    it("should have a name property of type String", () => {
        const nameField = productSchema.obj.name;

        // Check the type
        expect(nameField.type).toBe(String);
    });

    it("should have a bookId property of type Number", () => {
        const bookIdField = productSchema.obj.bookId;

        // Check the type
        expect(bookIdField.type).toBe(Number);
    });

    it("should have a required prodId property", () => {
        const requiredProdIdField = productSchema.obj.prodId;
        expect(requiredProdIdField.required).toBe(true);
    });

    it("should have a required name property", () => {
        const requiredNameField = productSchema.obj.name;
        expect(requiredNameField.required).toBe(true);
    });

    it("should have a required bookId property", () => {
        expect(productSchema.obj.bookId.required).toBe(true);
    });

    it("should have a default value for prodId", () => {
        const defaultProdIdField = productSchema.obj.prodId
        expect(defaultProdIdField.default).toBeDefined();
    });

    it("should have a ref property for bookId", () => {
        const refField = productSchema.obj.bookId.ref;
        expect(refField).toBe("books");
    });
});
