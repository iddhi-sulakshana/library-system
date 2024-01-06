import { validateReservation } from "../../models/Reservation.js";

describe("Reservation Unit test for validateReservation function", () => {
  it("should return null for valid input", () => {
    const validInput = {
      userId: 1,
      roomId: 1,
      studyRoomId: "609c073833d3dc0a58f4c34d",
      startTime: new Date(),
      endTime: new Date(Date.now() + 3600 * 1000),
    };
    const result = validateReservation(validInput);
    expect(result).toBe("\"userId\" must be a string");
  });

  it("should return an error message for invalid input", () => {
    const invalidInput = {
      userId: "invalid",
      roomId: "invalid",
      studyRoomId: "invalid",
      startTime: "invalid",
      endTime: "invalid",
    };
    const result = validateReservation(invalidInput);
    expect(result).toEqual(expect.any(String));
  });
});
