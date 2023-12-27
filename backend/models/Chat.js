import Joi from "joi";
import { model } from "mongoose";
import chatSchema from "./schemas/Chat.js";

// Creating a Mongoose model
const Chat = model("Chat", chatSchema);
// Creating a Joi validation schema
const schema = new Joi.object({
    _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    participants: Joi.array()
        .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
        .required(),
    messages: Joi.array()
        .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
        .optional(),
});

// function for validating the schema
function validate(chat) {
    // Validate the provided object against the Joi schema
    const result = schema.validate(chat);
    // If there is a validation error, return the error message
    if (result.error) return result.error.details[0].message;
    // If validation is successful, return null (indicating no errors)
    return null;
}

export { validate as validateChat, Chat };
