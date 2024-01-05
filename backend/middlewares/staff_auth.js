import { Staff } from "../models/staff.js";
import jwt from "jsonwebtoken";

export default async function (req, res, next) {
    // Get the token from the header if present
    const token = req.header("x-auth-token");
    console.log(token);
    // If no token found, return response (without going to the next middelware)
    if (!token)
        return res.status(401).send("Access denied. No token provided.");
    try {
        // If can verify the token, set req.user and pass to next middleware
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        // check if the user is exist
        const user = await Staff.findById(decoded._id);
        if (!user) return res.status(400).send("Invalid token.");
        req.user = user;
        next();
    } catch (ex) {
        // If invalid token
        return res.status(400).send("Invalid token.");
    }
}
