import staff_auth from "../../middlewares/staff_auth"; // Replace with the correct path
import staff from "../../models/schemas/staff";
import { Staff } from "../../models/staff";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken");

describe("staff_auth Middleware", () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    mockReq = {
      header: jest.fn(),
      file: { /* mock file object */ },
    };
    mockRes = {
      status: jest.fn(() => mockRes),
      send: jest.fn(),
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 401 if no token provided", async () => {
    mockReq.header.mockReturnValueOnce(undefined);

    await staff_auth(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.send).toHaveBeenCalledWith("Access denied. No token provided.");
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should return 400 if invalid token", async () => {
    const invalidToken = "invalid-token";
    jwt.verify.mockImplementationOnce(() => {
      throw new Error("Invalid token");
    });
    mockReq.header.mockReturnValueOnce(invalidToken);

    await staff_auth(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith("Invalid token.");
    expect(mockNext).not.toHaveBeenCalled();
  });

});
