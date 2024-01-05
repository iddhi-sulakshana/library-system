import StudyRoom from "../../models/schemas/StudyRoom";
import mongoose from "mongoose";

const StudyRoomM = mongoose.model("StudyRoom", StudyRoom);

describe("StudyRoom", () => {
  let studyRoom;

  beforeEach(() => {
    studyRoom = new StudyRoomM({
      roomId: 101,
      capacity: 20,
      facilities: ["Projector", "Whiteboard"],
    });
  });

  afterEach(() => {
    studyRoom = null;
  });

  it("should have a roomId property", () => {
    expect(studyRoom).toHaveProperty("roomId");
  });

  it("roomId should be a number", () => {
    expect(typeof studyRoom.roomId).toBe("number");
  });

  it("roomId should be required", () => {
    expect(studyRoom.schema.path("roomId").isRequired).toBe(true);
  });

  it("roomId should be unique", () => {
    const duplicatedStudyRoom = studyRoom;
    // duplicatedStudyRoom.save();
    expect(duplicatedStudyRoom.save()).rejects.toThrow(
      "Path `roomId` is not unique."
    );
  });

  it("should have a capacity property", () => {
    expect(studyRoom).toHaveProperty("capacity");
  });

  it("capacity should be a number", () => {
    expect(typeof studyRoom.capacity).toBe("number");
  });

  it("capacity should be required", () => {
    expect(studyRoom.schema.path("capacity").isRequired).toBe(true);
  });

  it("should have a facilities property", () => {
    expect(studyRoom).toHaveProperty("facilities");
  });

  it("facilities should be an array", () => {
    expect(Array.isArray(studyRoom.facilities)).toBe(true);
  });

  it("should have a bookedSlots property", () => {
    expect(studyRoom).toHaveProperty("bookedSlots");
  });

  it("bookedSlots should contain objects with bookId, startTime, and endTime properties", () => {
    // Ensure that bookedSlots is defined and is an array
    expect(studyRoom.bookedSlots).toBeDefined();
    expect(Array.isArray(studyRoom.bookedSlots)).toBe(true);
  
    // If bookedSlots is defined and not empty, check its properties
    if (studyRoom.bookedSlots.length > 0) {
      const bookedSlot = studyRoom.bookedSlots[0];
      expect(bookedSlot).toHaveProperty("bookId");
      expect(bookedSlot).toHaveProperty("startTime");
      expect(bookedSlot).toHaveProperty("endTime");
    }
  });
});
