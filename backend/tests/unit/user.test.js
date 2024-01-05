import UserSchema from "../../models/schemas/user";
import mongoose from "mongoose";
const UserSchemaM = mongoose.model("User", UserSchema); 

describe("User Schema", () => {
    it("should require a name", () => {
        const user = new UserSchemaM();
        const validationError = user.validateSync();
        expect(validationError.errors.name).toBeDefined();
    });

    it("should require an email", () => {
        const user = new UserSchemaM();
        const validationError = user.validateSync();
        expect(validationError.errors.email).toBeDefined();
    });

    it("should require a password", () => {
        const user = new UserSchemaM();
        const validationError = user.validateSync();
        expect(validationError.errors.password).toBeDefined();
    });

    it("should allow a valid user", () => {
        const user = new UserSchemaM({
            name: "John Doe",
            email: "johndoe@example.com",
            password: "password123",
        });
        const validationError = user.validateSync();
        expect(validationError).toBeUndefined();
    });
});
