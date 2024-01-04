import request from "supertest";
import express from "express";
import jwt from "jsonwebtoken";
import user_auth from "../../middlewares/user_auth";
import UserModel from "../../models/users";
import environment from "../../configs/environment";

environment();

const app = express();

// Mocking the UserModel methods for testing
jest.mock("../../models/users", () => ({
  findById: jest.fn(),
}));

app.use(user_auth);

describe("User Authentication Middleware Unit Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 401 if no token provided", async () => {
    const response = await request(app).get("/test-route");
    expect(response.status).toBe(401);
    expect(response.text).toBe("Access denied. No token provided.");
  });

  it("should return 400 if invalid token", async () => {
    const response = await request(app)
      .get("/test-route")
      .set("x-auth-token", "invalid-token");
    expect(response.status).toBe(400);
    expect(response.text).toBe("Invalid token.");
  });

  it("should return 400 if user not found", async () => {
    const token = jwt.sign({ _id: "valid-user-id" }, "secret-key");
    UserModel.findById.mockReturnValueOnce(null);

    const response = await request(app)
      .get("/test-route")
      .set("x-auth-token", token);
    expect(response.status).toBe(400);
    expect(response.text).toBe("Invalid token.");
  });

  it("should set req.user and call next() if valid token and user found", async () => {
    const token = jwt.sign({ _id: "valid-user-id" },process.env.JWT_PRIVATE_KEY);
    const mockUser = { _id: "valid-user-id"};
    UserModel.findById.mockReturnValueOnce(mockUser);

    const response = await request(app)
      .get("/test-route")
      .set("x-auth-token", token);
    expect(response.status).toBe(200);
    expect(response.text).toBe("OK");
    expect(UserModel.findById).toHaveBeenCalledWith("valid-user-id");
  });
});