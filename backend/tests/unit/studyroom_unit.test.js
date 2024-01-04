import { validateStudyRoom } from "../../models/StudyRoom.js";

describe("StudyRoom Unit test for validateStudyRoom function", () => {
  it("should return null for valid input", () => {
    const validInput = {
      roomId: 1,
      capacity: 10,
      facilities: ["WiFi", "Projector"],
    };
    const result = validateStudyRoom(validInput);
    expect(result).toBeNull();
  });

  it("should return an error message for invalid input", () => {
    const invalidInput = {
      roomId: "invalid",
      capacity: "invalid",
      facilities: "invalid",
    };
    const result = validateStudyRoom(invalidInput);
    expect(result).toEqual(expect.any(String));
  });
});
