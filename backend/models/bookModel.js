import Joi from "joi";
import { model } from "mongoose";
import bookModel from "./schemas/bookSchema.js";

// Creating a Mongoose model
const booksmodel = model("Book", bookModel);
// Creating a Joi validation schema
const schema = new Joi.object({
    name: Joi.string().required(),
    author: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    imagePath: Joi.string().required(),
    category: Joi.string().required(),
});
// function for validating the schema
function validate(book) {
    // Validate the provided object against the Joi schema
    const result = schema.validate(book);
    // If there is a validation error, return the error message
    if (result.error) return result.error.details[0].message;
    // If validation is successful, return null (indicating no errors)
    return null;
}

export { validate as validateBook, booksmodel };
