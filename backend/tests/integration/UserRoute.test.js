import request from "supertest";
import server, { db } from "../server";
import UserModel from "../../models/users";
import mongoose from "mongoose";

describe("User Routes Integration Tests", () => {
  afterEach(async () => {
    await UserModel.deleteMany();
  });
  afterAll(() => {
    mongoose.disconnect();
  });
  describe("POST api/users", () => {
    it("should create a new user instance", async () => {
      const userData = {
        name: "badda",
        email: "badda@gmail.com",
        password: "123456",
      };

      const response = await request(server)
        .post("/api/users")
        .send(userData)
        .expect(200);

      expect(response.body.name).toBe("badda");
      expect(response.body.email).toBe("badda@gmail.com");
      expect(response.body.password).toBe("123456");
    });
  });
  describe("GET api/users", () => {
    it("Should return all users", async () => {
      const userData = {
        name: "badda",
        email: "badda@gmail.com",
        password: "123456",
      };
      const user = new UserModel(userData);
      await user.save();
      const response = await request(server).get("/api/users");

      expect(response.body).toEqual({});
      console.log(response.body);
    });
    it("Should return 404 for non exixtent users", async () => {
        const response = await request(server).get("/api/users");

        // Verify the response
        expect(response.status).toBe(404);
        expect(response.body).toEqual({});
    })
  });
  describe("PUT api/users/:email", () => {
    it("should update an existing user instance", async () => {
      const userData = {
        name: "badda",
        email: "badda@gmail.com",
        password: "123456",
      };
      const user = new UserModel(userData);
      await user.save();

      const updatedUser = {
        name: "pky",
        email: "badda@gmail.com",
        password: "123456",
      };

      const response = await request(server)
        .put(`/api/users/${updatedUser.email}`)
        .send(updatedUser)
        .expect(200);

      expect(response.body.name).toBe("pky");
    });
    it("Should return 404 for updating a non-existent user", async () => {
      const nonExistentUserData = {
        name: "nonexistent",
        email: "nonexistent@gmail.com",
        password: "password123",
      };

      // Send a PUT request to update the non-existent user
      const response = await request(server)
        .put(`/api/users/${nonExistentUserData.email}`)
        .send(nonExistentUserData)
        .expect(404);

      // Verify the response
      expect(response.body).toEqual({ error: "User not found" });
    });
  });
});
