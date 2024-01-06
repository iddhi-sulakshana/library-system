import request from "supertest";
import server, { db } from "../server.js";
import { Reservation } from "../../models/Reservation.js";
import { StudyRoom } from "../../models/StudyRoom.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import UserModel from "../../models/users.js";

describe("Reservations Integration Tests", () => {
  let studyRoomId;
  let token;

  beforeEach(async () => {
    const roomData = {
      roomId: "123",
      capacity: 4,
      facilities: ["whiteboard", "projector"],
    };
    const studyRoom = new StudyRoom(roomData);
    const savedRoom = await studyRoom.save();
    studyRoomId = roomData.roomId;

    const userData = {
      name: "test",
      email: "testing@gmail.com",
      password: "123123",
    };
    const user = new UserModel(userData);
    const savedUser = await user.save();

    token = jwt.sign({ _id: savedUser._id }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: "1h",
    });
  });

  afterEach(async () => {
    await StudyRoom.deleteMany({});
    await Reservation.deleteMany({});
    await UserModel.deleteMany({});
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  describe("GET /reservations", () => {
    it("should fetch all reservations", async () => {
      const response = await request(server)
        .get("/api/reservations")
        .set("x-auth-token", token);

      expect(response.status).toBe(200);

      expect(Array.isArray(response.body)).toBe(true);

      if (response.body.length > 0) {
        const reservation = response.body[0];
        expect(reservation).toHaveProperty("_id");
        expect(reservation).toHaveProperty("roomId");
        expect(reservation).toHaveProperty("startTime");
        expect(reservation).toHaveProperty("endTime");
        expect(reservation).toHaveProperty("createdAt");
      }
    });
  });

  describe("POST /reservations", () => {
    it("should create a new reservation", async () => {
      const reservationData = {
        userId: 100,
        roomId: studyRoomId,
        startTime: "2023-12-22T10:00:00.000+00:00",
        endTime: "2023-12-22T12:00:00.000+00:00",
      };

      const response = await request(server)
        .post("/api/reservations")
        .send(reservationData)
        .set("x-auth-token", token)
        .expect(201);

      expect(response.body).toHaveProperty(
        "message",
        "Reservation created successfully!"
      );
    });
    it("should not create a reservation if the time slot is already booked", async () => {
      const reservationData = {
        userId: 200,
        roomId: studyRoomId,
        startTime: "2023-12-22T08:00:00.000+00:00",
        endTime: "2023-12-22T10:00:00.000+00:00",
      };

      await request(server)
        .post("/api/reservations")
        .send(reservationData)
        .set("x-auth-token", token)
        .expect(201);

      const conflictingReservationData = {
        userId: 300,
        roomId: studyRoomId,
        startTime: "2023-12-22T08:00:00.000+00:00",
        endTime: "2023-12-22T10:00:00.000+00:00",
      };

      const response = await request(server)
        .post("/api/reservations")
        .send(conflictingReservationData)
        .set("x-auth-token", token)
        .expect(400);

      expect(response.body).toHaveProperty(
        "error",
        "Time slot is already booked"
      );
    });
  });

  describe("PUT /reservations", () => {
    let reservationId;

    beforeEach(async () => {
      const reservationData = {
        userId: 550,
        roomId: studyRoomId,
        startTime: "2023-12-22T10:00:00.000+00:00",
        endTime: "2023-12-22T12:00:00.000+00:00",
      };

      const response = await request(server)
        .post("/api/reservations")
        .send(reservationData)
        .set("x-auth-token", token)
        .expect(201);

      reservationId = response.body.reservation._id;
    });

    it("should update a reservation to a non-conflicting time slot", async () => {
      const updateReservationData = {
        bookingId: reservationId,
        roomId: studyRoomId,
        startTime: "2023-12-22T10:00:00.000+00:00",
        endTime: "2023-12-22T12:00:00.000+00:00",
      };

      const response = await request(server)
        .put("/api/reservations")
        .send(updateReservationData)
        .set("x-auth-token", token)
        .expect(200);

      expect(response.body).toHaveProperty(
        "message",
        "Reservation updated successfully!"
      );
    });

    it("should not update a reservation to a conflicting time slot", async () => {
      const reservationData = {
        userId: 502,
        roomId: studyRoomId,
        startTime: "2023-12-22T12:00:00.000+00:00",
        endTime: "2023-12-22T14:00:00.000+00:00",
      };
      const newReservation = await request(server)
        .post("/api/reservations")
        .send(reservationData)
        .set("x-auth-token", token)
        .expect(201);

      const conflictingUpdatedReservationData = {
        bookingId: reservationId,
        roomId: studyRoomId,
        startTime: "2023-12-22T12:00:00.000+00:00",
        endTime: "2023-12-22T14:00:00.000+00:00",
      };

      const response = await request(server)
        .put("/api/reservations")
        .send(conflictingUpdatedReservationData)
        .set("x-auth-token", token)
        .expect(400);

      expect(response.body).toHaveProperty(
        "error",
        "Time slot is already booked"
      );
    });
  });

  describe("DELETE /reservations/:bookingId", () => {
    let reservationId;

    beforeEach(async () => {
      const reservationData = {
        userId: 550,
        roomId: studyRoomId,
        startTime: "2023-12-22T10:00:00.000+00:00",
        endTime: "2023-12-22T12:00:00.000+00:00",
      };

      const response = await request(server)
        .post("/api/reservations")
        .send(reservationData)
        .set("x-auth-token", token)
        .expect(201);

      reservationId = response.body.reservation._id;
    });

    it("should delete a reservation by its ID", async () => {
      const response = await request(server)
        .delete(`/api/reservations/${reservationId}`)
        .set("x-auth-token", token)
        .expect(200);

      expect(response.body).toHaveProperty(
        "message",
        "Reservation deleted successfully!"
      );
    });

    it("should return an error if the reservation does not exist", async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const response = await request(server)
        .delete(`/api/reservations/${nonExistentId}`)
        .set("x-auth-token", token)
        .expect(404);

      expect(response.body).toHaveProperty("error", "Reservation not found");
    });
  });

  describe("GET /reservations/user/:userId", () => {
    let userId;

    beforeEach(async () => {
      userId = 550;
      const reservationData = {
        userId: userId,
        roomId: studyRoomId,
        startTime: "2023-12-22T10:00:00.000+00:00",
        endTime: "2023-12-22T12:00:00.000+00:00",
      };

      await request(server)
        .post("/api/reservations")
        .send(reservationData)
        .set("x-auth-token", token)
        .expect(201);
    });

    it("should fetch reservations for a specific user", async () => {
      const response = await request(server)
        .get(`/api/reservations/user`)
        .set("x-auth-token", token)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty("userId");
    });
  });
});
