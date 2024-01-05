import express from "express";
import UserModel from "../models/users.js";
import { ChatUser } from "../models/ChatUser.js";
import user_auth from "../middlewares/user_auth.js";
import staff_auth from "../middlewares/staff_auth.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };

        const user = await UserModel.create(userData);

        // create chat user
        const chatUser = new ChatUser({
            _id: user._id,
            name: user.name,
            isAdmin: false,
        });
        await chatUser.save();
        res.json(user);
    } catch (error) {
        console.error("Error saving to the database:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/all", staff_auth, async (req, res) => {
    try {
        const users = await UserModel.find({}).select("email name");
        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.get("/", user_auth, async (req, res) => {
    req.user.password = undefined;
    return res.json(req.user);
});

router.put("/", user_auth, async (req, res) => {
    try {
        // Find the user by email
        const user = await UserModel.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update user data
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password; // You may want to hash the password before saving it

        // Save the updated user
        const updatedUser = await user.save();

        res.json(updatedUser);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete user route
router.delete("/", user_auth, async (req, res) => {
    try {
        // Find the user by email and delete
        const deletedUser = await UserModel.findByIdAndDelete(req.user._id);

        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(deletedUser);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
