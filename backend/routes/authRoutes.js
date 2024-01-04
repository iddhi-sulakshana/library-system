import express from "express";
import UserModel from "../models/users.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email }).then((user) => {
        if (user) {
            if (user.password === password) {
                const token = jwt.sign(
                    { _id: user._id, isAdmin: false },
                    process.env.JWT_PRIVATE_KEY,
                    {
                        expiresIn: "1h",
                    }
                );
                res.set("Access-Control-Expose-Headers", "x-auth-token");
                res.header("x-auth-token", token).send(
                    "Successfully logged in"
                );
            } else {
                res.status(400).json("The password dosent match");
            }
        } else {
            res.status(400).json("The user dosent exist");
        }
    });
});

export default router;
