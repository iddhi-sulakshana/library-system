import request from "supertest";
import server, { db } from "../server";
import UserModel from "../../models/users";
import mongoose from "mongoose";
// import jwt from "jsonwebtoken";

describe("User Login Integration Tests", () => {
  afterEach(async () => {
    await UserModel.deleteMany();
  });
  afterAll(() => {
    mongoose.disconnect();
  });
  const userData = {
    name: "badda",
    email: "badda@gmail.com",
    password: "123456",
  };

  describe("POST api/Login", () => {
    it("should login an existing user instance", async () => {
      const user = new UserModel(userData);
      await user.save();
      const response = await request(server)
        .post("/api/Login")
        .send(userData)
        .expect(200);
      expect(response.text).toEqual("Successfully logged in");
    //   console.log(response.body);
    });
    it("Should return jwt token", async () => {
      const user = new UserModel(userData);
      await user.save();
      const response = await request(server)
        .post("/api/Login")
        .send(userData)
        .expect(200);
      expect(response.headers["x-auth-token"]).toBeDefined();
    //   console.log(response.body);
    });
    it("Should return 400 for invalid password", async () => {
      const user = new UserModel(userData);
      await user.save();

      const WronguserData = {
        name: "badda",
        email: "badda@gmail.com",
        password: "12345",
      };

      const response = await request(server)
        .post("/api/Login")
        .send(WronguserData)
        .expect(400);
      expect(response.body).toBe("The password dosent match");
    });

    it("Should return 400 if user dosen't exist", async () => {
      const user = new UserModel(userData);
      await user.save();

      const WronguserData = {
        name: "badda",
        email: "badd@gmail.com",
        password: "1234567",
      };

      const response = await request(server)
        .post("/api/Login")
        .send(WronguserData)
        .expect(400);
      expect(response.body).toBe("The user dosent exist");
    });
  });
});
