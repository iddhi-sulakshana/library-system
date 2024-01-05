import { validateMessage, Message } from "../../models/Message"; // Replace 'path-to-your-module' with the actual path

describe("Message Module", () => {
  describe("Message Model", () => {
    it("should create a new message", () => {
      const message = new Message({
        _id: "abcdef123456789012345678", // This will be converted to ObjectId by Mongoose
        message: "Hello, World!",
        sender: "abcdef123456789012345678",
        timestamp: new Date("2022-01-01T12:00:00Z"),
      });

      expect(message).toBeDefined();
      expect(message).toBeInstanceOf(Message);
      expect(typeof message._id).toBe("object"); // Expect _id to be an object (ObjectId)
      expect(message.message).toBe("Hello, World!");
      expect(typeof message.sender).toBe("object");
      expect(message.timestamp).toEqual(new Date("2022-01-01T12:00:00Z"));
    });
  });

  describe("Joi Validation", () => {
    it("should validate a message with valid properties", () => {
      const validMessage = {
        _id: "abcdef123456789012345678",
        message: "Hello, World!",
        sender: "abcdef123456789012345678",
        timestamp: "2022-01-01T12:00:00Z",
      };

      const validationResult = validateMessage(validMessage);
      expect(validationResult).toBeNull();
    });

    it("should return an error for a message with invalid properties", () => {
      const invalidMessage = {
        _id: "invalid-id",
        message: "", // Empty message (required)
        sender: "invalid-id",
        timestamp: "invalid-date",
      };

      const validationResult = validateMessage(invalidMessage);
      expect(validationResult).toBeDefined();
      expect(validationResult).toContain(
        '"_id" with value "invalid-id" fails to match the required pattern: /^[0-9a-fA-F]{24}$/'
      );
      expect(validationResult).toContain(
        '"_id" with value "invalid-id" fails to match the required pattern: /^[0-9a-fA-F]{24}$/'
      );
      expect(validationResult).toContain(
        '"_id" with value "invalid-id" fails to match the required pattern: /^[0-9a-fA-F]{24}$/'
      );
    });
  });
});
