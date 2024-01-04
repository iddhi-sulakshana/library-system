import request from "supertest";
import server, { db } from "../server";
import UserModel from "../../models/users";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

describe("User Routes Integration Tests", () => {
  afterEach(async () => {
    await UserModel.deleteMany();
  });
  
  afterAll(() => {
    mongoose.disconnect();
  });

  const UserData = {
    name: "badda",
    email: "badda@gmail.com",
    password: "123456",
  };

  describe("POST api/users", () => {
    it("should create a new user instance", async () => {

      const response = await request(server)
        .post("/api/users")
        .send(UserData)
        .expect(200);

      expect(response.body.name).toBe("badda");
      expect(response.body.email).toBe("badda@gmail.com");
      expect(response.body.password).toBe("123456");
    });
  });
  describe("GET api/users", () => {
    it("Should return all users", async () => {

      const user = new UserModel(UserData);
      await user.save();

      const response = await request(server).get("/api/users");

      expect(response.body).toEqual({});
    });
    it("Should return 401 for unauthorized users", async () => {
      const response = await request(server).get("/api/users");

      expect(response.status).toBe(401);
      expect(response.body).toEqual({});
    });
  });
  describe("PUT api/users/", () => {
    it("should update an existing user instance", async () => {

      const newUser = new UserModel(UserData);
      await newUser.save();

      const token = jwt.sign(
        { _id: newUser._id },
        process.env.JWT_PRIVATE_KEY,
        {
          expiresIn: "1d",
        }
      );

      const updatedUserData = {
        name: "pky",
        email: newUser.email,
        password: newUser.password,
      };

      const response = await request(server)
        .put(`/api/users`)
        .set("x-auth-token", token)
        .send(updatedUserData)
        .expect(200);

      expect(response.body.name).toBe("pky");
    });

    it("Should return 401 for unauthorized update", async () => {

      const newUser = new UserModel(UserData);
      await newUser.save();

      const updatedUserData = {
        name: "pky",
        email: newUser.email,
        password: newUser.password,
      };

      // Send a PUT request to update the user
      const response = await request(server)
        .put(`/api/users`)
        .send(updatedUserData)
        .expect(401);

      expect(response.statusCode).toBe(401);
    });
  });

  describe("DELETE api/user", () => {
    it("should delete the authenticated user", async () => {

      const newUser = new UserModel(UserData);
      await newUser.save();

      const token = jwt.sign(
        { _id: newUser._id },
        process.env.JWT_PRIVATE_KEY,
        {
          expiresIn: "1d",
        }
      );

      const response = await request(server)
        .delete("/api/users")
        .set("x-auth-token", token)
        .expect(200);

      expect(response.body._id).toEqual(newUser._id.toHexString());

      const deletedUser = await UserModel.findById(newUser._id);
      expect(deletedUser).toBeNull();
    });

    it("Should retur 401 for unauthorized delete", async () => {

      const newUser = new UserModel(UserData);
      await newUser.save();

      const response = await request(server).delete("/api/users").expect(401);

      expect(response.statusCode).toBe(401);
    });
  });
});
