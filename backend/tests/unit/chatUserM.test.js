import { validateChatUser, ChatUser } from "../../models/ChatUser";

describe("ChatUser", () => {
    describe("validateChatUser", () => {
        test("should return null for a valid chat user", () => {
            const chatUser = {
                _id: "123456789012345678901234",
                name: "John Doe",
                avatar: "https://example.com/avatar.jpg",
                isAdmin: true,
            };

            const result = validateChatUser(chatUser);

            expect(result).toBeNull();
        });

        test("should return an error message for an invalid chat user", () => {
            const chatUser = {
                _id: "invalid_id",
                name: "",
                avatar: "https://example.com/avatar.jpg",
                isAdmin: "true",
            };

            const result = validateChatUser(chatUser);

            expect(result).toBe("\"_id\" with value \"invalid_id\" fails to match the required pattern: /^[0-9a-fA-F]{24}$/");
        });
    });
});
