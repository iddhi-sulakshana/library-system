import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import chatSocket from "../../middlewares/chatSocket"; // Replace with the correct path

jest.mock("jsonwebtoken");

describe("chatSocket Middleware", () => {
  let mockSocket;
  let mockNext;

  beforeEach(() => {
    mockSocket = {
      handshake: {
        headers: {
          user: "valid-token",
        },
      },
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call next() if user header is present and valid", () => {
    jwt.verify.mockReturnValueOnce({ _id: "valid-user-id" });

    chatSocket(mockSocket, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  it("should return an error if user header is not present", () => {
    delete mockSocket.handshake.headers.user;

    chatSocket(mockSocket, mockNext);

    expect(mockNext).toHaveBeenCalledWith(
      new Error("User not present in the header")
    );
    expect(mockNext).toHaveBeenCalledTimes(1);
  });

//   it("should return an error if user header contains an invalid token", () => {
//     jwt.verify.mockImplementationOnce(() => {
//       throw new Error("Invalid token");
//     });

//     chatSocket(mockSocket, mockNext);

//     expect(mockNext).toHaveBeenCalledWith(new Error("Invalid token"));
//     expect(mockNext).toHaveBeenCalledTimes(1);
//   });

  it("should return an error if user header contains an invalid mongoose object id", () => {
    jwt.verify.mockReturnValueOnce({ _id: "invalid-user-id" });

    chatSocket(mockSocket, mockNext);

    expect(mockNext).toHaveBeenCalledWith(new Error("Invalid user id"));
    expect(mockNext).toHaveBeenCalledTimes(1);
  });
});
