import Joi from "joi";
import { model } from "mongoose";
import chatUserSchema from "./schemas/ChatUser.js";

// Creating a Mongoose model
const ChatUser = model("ChatUser", chatUserSchema);
// Creating a Joi validation schema
const schema = new Joi.object({
    _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    name: Joi.string().required(),
    avatar: Joi.string().optional(),
    isAdmin: Joi.boolean().optional().default(false),
});
// function for validating the schema
function validate(chatUser) {
    // Validate the provided object against the Joi schema
    const result = schema.validate(chatUser);
    // If there is a validation error, return the error message
    if (result.error) return result.error.details[0].message;
    // If validation is successful, return null (indicating no errors)
    return null;
}

export { validate as validateChatUser, ChatUser };
