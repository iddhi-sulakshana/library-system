import Joi from "joi";
import { model } from "mongoose";
import staffSchema from "./schemas/staff.js";

// Creating a Mongoose model
const Staff = model("Staff", staffSchema);
// Creating a Joi validation schema
const schema = new Joi.object({
    _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
    image: Joi.string().required(),
});
// function for validating the schema
function validate(Staff) {
    // Validate the provided object against the Joi schema
    const result = schema.validate(Staff);
    // If there is a validation error, return the error message
    if (result.error) return result.error.details[0].message;
    // If validation is successful, return null (indicating no errors)
    return null;
}

export { validate as validateStaff, Staff };
