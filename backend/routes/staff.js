import { Router } from "express";
import { Staff, validateStaff } from "../models/staff.js";
import { encrypt, validPassword } from "../utils/hash.js";
import staff_auth from "../middlewares/staff_auth.js";
import jwt from "jsonwebtoken";
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

router.post("/", staff_auth, async (req, res) => {
    const error = validateStaff(req.body);
    if (error) return res.status(400).send(error);
    const staff = new Staff(req.body);
    try {
        staff.password = await encrypt(staff.password);
        await staff.save();
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
    console.log(req.params.id);
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) return res.status(404).send("Staff not found.");
    res.send(staff);
});

export default router;
