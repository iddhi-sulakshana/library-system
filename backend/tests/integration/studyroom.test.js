import request from "supertest";
import server from "../server.js";
import StudyRoom from "../../models/StudyRoom.js";
import mongoose from "mongoose";

describe("StudyRooms Integration Tests", () => {
  afterEach(async () => {
    await StudyRoom.deleteMany({});
  });
  afterAll(() => {
    mongoose.disconnect();
  });

  describe("GET /studyrooms", () => {
    it("should fetch all study rooms", async () => {
      const response = await request(server).get("/api/studyrooms");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);

      if (response.body.length > 0) {
        const studyRoom = response.body[0];
        expect(studyRoom).toHaveProperty("_id");
        expect(studyRoom).toHaveProperty("roomId");
        expect(studyRoom).toHaveProperty("capacity");
        expect(studyRoom).toHaveProperty("facilities");
        expect(studyRoom).toHaveProperty("bookedSlots");
      }
    });
  });

  describe("POST /studyrooms", () => {
    it("should create a new study room", async () => {
      const newStudyRoom = {
        roomId: 201,
        capacity: 5,
        facilities: ["Wi-Fi", "Whiteboard"],
      };

      const response = await request(server)
        .post("/api/studyrooms")
        .send(newStudyRoom);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(newStudyRoom);
    });

    it("should return an error if a room with the same roomId already exists", async () => {
      const existingStudyRoom = {
        roomId: 201,
        capacity: 5,
        facilities: ["Wi-Fi", "Whiteboard"],
      };
      await request(server).post("/api/studyrooms").send(existingStudyRoom);
      const response = await request(server)
        .post("/api/studyrooms")
        .send(existingStudyRoom);

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        message: "Room with that ID already exists.",
      });
    });
  });

  describe("DELETE /studyrooms/:id", () => {
    let roomId;

    beforeEach(async () => {
      const newStudyRoom = {
        roomId: 202,
        capacity: 5,
        facilities: ["Wi-Fi", "Whiteboard"],
      };

      const response = await request(server)
        .post("/api/studyrooms")
        .send(newStudyRoom);

      roomId = response.body._id;
    });

    it("should delete a study room by ID", async () => {
      const response = await request(server).delete(
        `/api/studyrooms/${roomId}`
      );

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        message: "Room deleted successfully",
      });
    });

    it("should return an error if the room with the given ID does not exist", async () => {
      const nonExistentId = "60aebf7b91a0652f1a8e3e1f";

      const response = await request(server).delete(
        `/api/studyrooms/${nonExistentId}`
      );

      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({ error: "Room not found" });
    });
  });
  describe("GET /studyrooms/:id/reservedTimes", () => {
    let roomId;

    beforeEach(async () => {
      const newStudyRoom = {
        roomId: 203,
        capacity: 5,
        facilities: ["Wi-Fi", "Whiteboard"],
      };

      const response = await request(server)
        .post("/api/studyrooms")
        .send(newStudyRoom);

      roomId = response.body._id;
    });

    it("should fetch reserved times for a study room by ID", async () => {
      const bookedSlots = [
        { startTime: "2024-01-04T10:00:00Z", endTime: "2024-01-04T12:00:00Z" },
        { startTime: "2024-01-05T12:00:00Z", endTime: "2024-01-05T14:00:00Z" },
      ];

      await StudyRoom.findByIdAndUpdate(roomId, { bookedSlots: bookedSlots });

      const response = await request(server).get(
        `/api/studyrooms/${roomId}/reservedTimes`
      );

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);

      if (response.body.length > 0) {
        const reservedTime = response.body[0];
        expect(reservedTime).toHaveProperty("startTime");
        expect(reservedTime).toHaveProperty("endTime");
      }
    });

    it("should return an error if the study room with the given ID does not exist", async () => {
      const nonExistentId = "60aebf7b91a0652f1a8e3e1f";

      const response = await request(server).get(
        `/api/studyrooms/${nonExistentId}/reservedTimes`
      );

      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({ error: "Room not found" });
    });
  });
});
