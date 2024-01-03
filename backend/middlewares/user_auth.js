import jwt from "jsonwebtoken";
import UserModel from "../models/users.js";
export default async function (req, res, next) {
    const token = req.header("x-auth-token");
    if (!token)
        return res.status(401).send("Access denied. No token provided.");
    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        const user = await UserModel.findById(decoded._id);
        if (!user) return res.status(400).send("Invalid token.");
        req.user = user;
        next();
    } catch (ex) {
        return res.status(400).send("Invalid token.");
    }
}
