import { Router } from "express";
import { Staff, validateStaff } from "../models/staff.js";
import { encrypt, validPassword } from "../utils/hash.js";
import staff_auth from "../middlewares/staff_auth.js";
import jwt from "jsonwebtoken";
import { ChatUser } from "../models/ChatUser.js";
import { Chat } from "../models/Chat.js";
const router = Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email) return res.status(400).send("Email is required.");
    if (!password) return res.status(400).send("Password is required.");
    const staff = await Staff.findOne({ email });
    if (!staff) return res.status(400).send("Invalid email");
    const isValidPassword = await validPassword(password, staff.password);
    if (!isValidPassword) return res.status(400).send("Invalid password");
    staff.password = undefined;
    const token = jwt.sign({ _id: staff._id }, process.env.JWT_PRIVATE_KEY, {
        expiresIn: "1h",
    });

    res.set("Access-Control-Expose-Headers", "x-auth-token");
    res.header("x-auth-token", token).send("Successfully logged in");
});

router.get("/", staff_auth, async (req, res) => {
    // get all the users expect current logged user
    const staff = await Staff.find({ _id: { $ne: req.user._id } });
    res.send(staff);
});

router.get("/personal", staff_auth, async (req, res) => {
    const staff = await Staff.findById(req.user._id);
    if (!staff) return res.status(404).send("Staff not found.");
    res.send(staff);
});

router.post("/", async (req, res) => {
    const error = validateStaff(req.body);
    if (error) return res.status(400).send(error);
    const staff = new Staff(req.body);
    try {
        staff.password = await encrypt(staff.password);
        await staff.save();
        // create a chat user
        const chatUser = new ChatUser({
            _id: staff._id,
            name: staff.firstname + " " + staff.lastname,
            avatar: staff.image,
            isAdmin: true,
        });
        await chatUser.save();
        res.send(staff);
    } catch (ex) {
        if (ex.code && ex.code === 11000)
            return res.status(400).send("Staff already registered with email.");
        return res.status(400).send(ex.message);
    }
});

router.patch("/personal", staff_auth, async (req, res) => {
    const staff = await Staff.findById(req.user._id);
    if (!staff) return res.status(404).send("Staff not found.");
    let newStaff = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        role: req.body.role,
        image: staff.image,
        password: staff.password,
    };
    const error = validateStaff(newStaff);
    if (error) return res.status(400).send(error);
    try {
        await Staff.findByIdAndUpdate(req.user._id, newStaff);
        // update chat user
        const chatUser = await ChatUser.findById(req.user._id);
        chatUser.name = newStaff.firstname + " " + newStaff.lastname;
        await chatUser.save();
        res.send("Successfully updated personal details");
    } catch (ex) {
        if (ex.code && ex.code === 11000)
            return res.status(400).send("Staff already registered with email.");
        return res.status(400).send(ex.message);
    }
});

// patch password
router.patch("/password", staff_auth, async (req, res) => {
    const staff = await Staff.findById(req.user._id);
    if (!staff) return res.status(404).send("Staff not found.");
    const isValidPassword = await validPassword(
        req.body.currentPassword,
        staff.password
    );
    if (!isValidPassword) return res.status(400).send("Invalid password");
    let newStaff = {
        firstname: staff.firstname,
        lastname: staff.lastname,
        email: staff.email,
        role: staff.role,
        image: staff.image,
        password: req.body.password,
    };
    const error = validateStaff(newStaff);
    if (error) return res.status(400).send(error);
    try {
        newStaff.password = await encrypt(newStaff.password);
        await Staff.findByIdAndUpdate(req.user._id, newStaff);
        res.send("Successfully updated password");
    } catch (ex) {
        if (ex.code && ex.code === 11000)
            return res.status(400).send("Staff already registered with email.");
        return res.status(400).send(ex.message);
    }
});

router.delete("/:id", staff_auth, async (req, res) => {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) return res.status(404).send("Staff not found.");
    // delete chat user
    await ChatUser.findByIdAndDelete(req.params.id);
    // delete all the chats of this user
    const chats = await Chat.deleteMany({
        participants: { $in: [req.params.id] },
    });
    res.send(staff);
});

export default router;
