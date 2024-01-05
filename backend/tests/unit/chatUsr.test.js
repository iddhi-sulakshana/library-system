import mongoose, { Schema } from "mongoose";
import ChatUserSchema from "../../models/schemas/ChatUser";

describe("ChatUser model", () => {
    it("should require a name", () => {
        const chatUser = new mongoose.model('ChatUser',ChatUserSchema)();
        const validationError = chatUser.validateSync();
        expect(validationError.errors.name).toBeDefined();
    });

    it("should have a default avatar value", () => {
        const chatUser = new Schema(ChatUserSchema);
        expect(chatUser.path("avatar").defaultValue).toBeDefined();
    });

    it("should have a default isAdmin value of false", () => {
        const chatUser = new Schema(ChatUserSchema);
        expect(chatUser.path("isAdmin").defaultValue).toBe(false);
    });
});
