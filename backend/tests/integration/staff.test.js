import request from "supertest";
import server from "../server.js";
import { Staff } from "../../models/staff.js";
import mongoose from "mongoose";
import { encrypt } from "../../utils/hash.js";
import jwt from "jsonwebtoken";
import { ChatUser } from "../../models/ChatUser.js";

describe("Staff Routes Integration Tests", () => {
    let hashedPassword;
    let staff;
    let token;
    beforeAll(async () => {
        hashedPassword = await encrypt("admin");
    });
    beforeEach(async () => {
        await Staff.deleteMany();
        await ChatUser.deleteMany();
        staff = new Staff({
            firstname: "Admin",
            lastname: "Admin",
            email: "admin@email.com",
            password: hashedPassword,
            role: "admin",
            image: "profile.jpg",
        });
        await staff.save();
        const chatUser = new ChatUser({
            _id: staff._id,
            name: staff.firstname + " " + staff.lastname,
            avatar: staff.image,
            isAdmin: true,
        });
        await chatUser.save();
        token = jwt.sign(
            { _id: staff._id, isAdmin: true },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: "1h" }
        );
    });
    afterAll(() => {
        mongoose.disconnect();
    });
    describe("POST /api/staff/login", () => {
        it("Should login user with valid creadintials", async () => {
            const formData = {
                email: "admin@email.com",
                password: "admin",
            };
            const response = await request(server)
                .post("/api/staff/login")
                .send(formData)
                .expect(200);
        });
        it("Should return user token in header for success login", async () => {
            const formData = {
                email: "admin@email.com",
                password: "admin",
            };
            const response = await request(server)
                .post("/api/staff/login")
                .send(formData)
                .expect(200);
            expect(response.header).toHaveProperty("x-auth-token");
        });
        it("should return 400 if email is not present", async () => {
            const formData = {
                password: "admin",
            };
            const response = await request(server)
                .post("/api/staff/login")
                .send(formData)
                .expect(400);
            expect(response.text).toEqual("Email is required.");
        });
        it("should return 400 if password is not present", async () => {
            const formData = {
                email: "admin@email.com",
            };
            const response = await request(server)
                .post("/api/staff/login")
                .send(formData)
                .expect(400);
            expect(response.text).toEqual("Password is required.");
        });
        it("should return 400 if email is invalid", async () => {
            const formData = {
                email: "admin",
                password: "admin",
            };
            const response = await request(server)
                .post("/api/staff/login")
                .send(formData)
                .expect(400);
            expect(response.text).toEqual("Invalid email");
        });
        it("should return 400 if password is invalid", async () => {
            const formData = {
                email: "admin@email.com",
                password: "invalid",
            };
            const response = await request(server)
                .post("/api/staff/login")
                .send(formData)
                .expect(400);
            expect(response.text).toEqual("Invalid password");
        });
    });
    describe("GET /api/staff", () => {
        it("should reject if no token is provided", async () => {
            const response = await request(server)
                .get("/api/staff")
                .expect(401);
            expect(response.text).toEqual("Access denied. No token provided.");
        });
        it("should reject if token is invalid", async () => {
            const response = await request(server)
                .get("/api/staff")
                .set("x-auth-token", "123")
                .expect(400);
            expect(response.text).toEqual("Invalid token.");
        });
        it("should return all staff if token is valid", async () => {
            const newStaff = new Staff({
                firstname: "John",
                lastname: "Doe",
                email: "second@gmail.com",
                password: hashedPassword,
                role: "admin",
                image: "profile.jpg",
            });
            await newStaff.save();
            const response = await request(server)
                .get("/api/staff")
                .set("x-auth-token", token)
                .expect(200);
            expect(response.body.length).toBe(1);
        });
    });
    describe("GET /api/staff/personal", () => {
        it("should reject if no token is provided", async () => {
            const response = await request(server)
                .get("/api/staff/personal")
                .expect(401);
            expect(response.text).toEqual("Access denied. No token provided.");
        });
        it("should reject if token is invalid", async () => {
            const response = await request(server)
                .get("/api/staff/personal")
                .set("x-auth-token", "123")
                .expect(400);
            expect(response.text).toEqual("Invalid token.");
        });
        it("should return staff if token is valid", async () => {
            const response = await request(server)
                .get("/api/staff/personal")
                .set("x-auth-token", token)
                .expect(200);
            expect(response.body).toHaveProperty("firstname", "Admin");
        });
    });
    describe("POST /api/staff", () => {
        let formData;
        beforeEach(() => {
            formData = {
                firstname: "John",
                lastname: "Doe",
                email: "newadmin@gmail.com",
                password: hashedPassword,
                role: "admin",
                image: "profile.jpg",
            };
        });
        it("should return 400 if image is not present", async () => {
            delete formData.image;
            const response = await request(server)
                .post("/api/staff")
                .send(formData)
                .expect(400);
            expect(response.text).toEqual(
                expect.stringContaining('"image" is required')
            );
        });
        it("should return 400 if role is not present", async () => {
            delete formData.role;
            const response = await request(server)
                .post("/api/staff")
                .send(formData)
                .expect(400);
            expect(response.text).toEqual(
                expect.stringContaining('"role" is required')
            );
        });
        it("should return 400 if password is not present", async () => {
            delete formData.password;
            const response = await request(server)
                .post("/api/staff")
                .send(formData)
                .expect(400);
            expect(response.text).toEqual(
                expect.stringContaining('"password" is required')
            );
        });
        it("should return 400 if email is not present", async () => {
            delete formData.email;
            const response = await request(server)
                .post("/api/staff")
                .send(formData)
                .expect(400);
            expect(response.text).toEqual(
                expect.stringContaining('"email" is required')
            );
        });
        it("should return 400 if lastname is not present", async () => {
            delete formData.lastname;
            const response = await request(server)
                .post("/api/staff")
                .send(formData)
                .expect(400);
            expect(response.text).toEqual(
                expect.stringContaining('"lastname" is required')
            );
        });
        it("should return 400 if firstname is not present", async () => {
            delete formData.firstname;
            const response = await request(server)
                .post("/api/staff")
                .send(formData)
                .expect(400);
            expect(response.text).toEqual(
                expect.stringContaining('"firstname" is required')
            );
        });
        it("should return 400 if email is invalid", async () => {
            formData.email = "invalid";
            const response = await request(server)
                .post("/api/staff")
                .send(formData)
                .expect(400);
            expect(response.text).toEqual('"email" must be a valid email');
        });
        it("should return 400 if email is already registered", async () => {
            formData.email = staff.email;
            const response = await request(server)
                .post("/api/staff")
                .send(formData)
                .expect(400);
            expect(response.text).toEqual(
                "Staff already registered with email."
            );
        });
        it("should return 200 if staff is valid", async () => {
            const response = await request(server)
                .post("/api/staff")
                .send(formData)
                .expect(200);
            expect(response.text).toEqual("Successfully registered staff.");
        });
        it("should create chat user if staff is valid", async () => {
            await request(server).post("/api/staff").send(formData).expect(200);
            const user = await Staff.findOne({
                email: formData.email,
            });
            const chatUser = await ChatUser.findById(user._id);
            expect(chatUser).toHaveProperty("name", "John Doe");
        });
    });
    describe("PATCH /api/staff/personal", () => {
        let formData;
        beforeEach(() => {
            formData = {
                firstname: "New",
                lastname: "Admin",
                email: "admin@email.com",
                role: "admin",
            };
        });
        it("should return 400 if role is not present", async () => {
            delete formData.role;

            const response = await request(server)
                .patch("/api/staff/personal")
                .set("x-auth-token", token)
                .send(formData)
                .expect(400);
            expect(response.text).toEqual(
                expect.stringContaining('"role" is required')
            );
        });
        it("should return 400 if email is not present", async () => {
            delete formData.email;

            const response = await request(server)
                .patch("/api/staff/personal")
                .set("x-auth-token", token)
                .send(formData)
                .expect(400);
            expect(response.text).toEqual(
                expect.stringContaining('"email" is required')
            );
        });
        it("should return 400 if lastname is not present", async () => {
            delete formData.lastname;

            const response = await request(server)
                .patch("/api/staff/personal")
                .set("x-auth-token", token)
                .send(formData)
                .expect(400);
            expect(response.text).toEqual(
                expect.stringContaining('"lastname" is required')
            );
        });
        it("should return 400 if firstname is not present", async () => {
            delete formData.firstname;

            const response = await request(server)
                .patch("/api/staff/personal")
                .set("x-auth-token", token)
                .send(formData)
                .expect(400);
            expect(response.text).toEqual(
                expect.stringContaining('"firstname" is required')
            );
        });
        it("should return 200 if staff is valid", async () => {
            const response = await request(server)
                .patch("/api/staff/personal")
                .set("x-auth-token", token)
                .send(formData);
            expect(response.text).toEqual(
                "Successfully updated personal details"
            );
        });
        it("should update staff if staff is valid", async () => {
            await request(server)
                .patch("/api/staff/personal")
                .set("x-auth-token", token)
                .send(formData);
            const user = await Staff.findOne({
                email: formData.email,
            });
            expect(user).toHaveProperty("firstname", "New");
        });
        it("should update chat user if staff is valid", async () => {
            await request(server)
                .patch("/api/staff/personal")
                .set("x-auth-token", token)
                .send(formData);
            const chatUser = await ChatUser.findById(staff._id);
            expect(chatUser).toHaveProperty("name", "New Admin");
        });
    });
    describe("PATCH /api/staff/password", () => {
        let formData;
        beforeEach(() => {
            formData = {
                currentPassword: "admin",
                password: "newpassword",
            };
        });
        it("should return 400 if currentPassword is not present", async () => {
            delete formData.currentPassword;

            const response = await request(server)
                .patch("/api/staff/password")
                .set("x-auth-token", token)
                .send(formData)
                .expect(400);
            expect(response.text).toEqual(
                expect.stringContaining("Current password is required.")
            );
        });
        it("should return 400 if password is not present", async () => {
            delete formData.password;

            const response = await request(server)
                .patch("/api/staff/password")
                .set("x-auth-token", token)
                .send(formData)
                .expect(400);
            expect(response.text).toEqual(
                expect.stringContaining('"password" is required')
            );
        });
        it("should return 400 if currentPassword is invalid", async () => {
            formData.currentPassword = "invalid";

            const response = await request(server)
                .patch("/api/staff/password")
                .set("x-auth-token", token)
                .send(formData)
                .expect(400);
            expect(response.text).toEqual("Invalid password");
        });
        it("should return 200 if staff is valid", async () => {
            const response = await request(server)
                .patch("/api/staff/password")
                .set("x-auth-token", token)
                .send(formData);
            expect(response.text).toEqual("Successfully updated password");
        });
        it("should update staff if staff is valid", async () => {
            await request(server)
                .patch("/api/staff/password")
                .set("x-auth-token", token)
                .send(formData);
            const user = await Staff.findOne({
                email: staff.email,
            });
            // check if password is updated
            expect(user.password).not.toEqual(hashedPassword);
        });
    });
    describe("DELETE /api/staff/:id", () => {
        it("should return 404 if invalid object id send", async () => {
            const response = await request(server)
                .delete("/api/staff/123")
                .set("x-auth-token", token)
                .expect(400);
            expect(response.text).toEqual("Invalid staff id provided.");
        });
        it("should return 404 if staff is not found", async () => {
            const response = await request(server)
                .delete("/api/staff/" + new mongoose.Types.ObjectId())
                .set("x-auth-token", token)
                .expect(404);
            expect(response.text).toEqual("Staff not found.");
        });
        it("should return 200 if staff is found", async () => {
            const newStaff = new Staff({
                firstname: "John",
                lastname: "Doe",
                email: "new@admin.com",
                password: hashedPassword,
                role: "admin",
                image: "profile.jpg",
            });
            await newStaff.save();
            const response = await request(server)
                .delete("/api/staff/" + newStaff._id)
                .set("x-auth-token", token)
                .expect(200);
            expect(response.text).toEqual("Successfully deleted staff.");
        });
    });
});
