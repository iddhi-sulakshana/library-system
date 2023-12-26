import Joi from "joi";
import { model } from "mongoose";
import messageSchema from "./schemas/Message.js";

// Creating a Mongoose model
const Message = model("Message", messageSchema);
// Creating a Joi validation schema
const schema = new Joi.object({
    _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    message: Joi.string().required(),
    sender: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    timestamp: Joi.date().optional(),
});
// function for validating the schema
function validate(message) {
    // Validate the provided object against the Joi schema
    const result = schema.validate(message);
    // If there is a validation error, return the error message
    if (result.error) return result.error.details[0].message;
    // If validation is successful, return null (indicating no errors)
    return null;
}

export { validate as validateMessage, Message };
