// import request from "supertest";
// import server, { db } from "../server.js";
// import { Reservation } from "../models/Reservation.js";
// import mongoose from "mongoose";

import request from "supertest";
import server, { db } from "../server.js";
import { Reservation } from "../../models/Reservation.js";

describe("Reservation Routes", () => {
  // beforeAll(async () => {
  //   // Populate the database with test reservations
  //   await Reservation.insertMany([
  //     {
  //       roomId: 110,
  //       startTime: new Date("2024-01-01T09:00:00Z"),
  //       endTime: new Date("2024-01-01T11:00:00Z"),
  //     },
  //     // Add more test reservations as needed
  //   ]);
  // });

  it("should fetch all reservations", async () => {
    const response = await request(server).get("/api/reservations");

    // Check the response status code
    expect(response.status).toBe(200);

    // Check if the response body contains an array of reservations
    expect(Array.isArray(response.body)).toBe(true);

    // If there are reservations in the response, check their structure
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
// describe("Reservation Routes Integration Tests", () => {
//   afterEach(async () => {
//     await Reservation.deleteMany();
//   });

//   afterAll(() => {
//     mongoose.disconnect();
//   });

//   describe("GET /", () => {
//     it("should return a list of reservations", async () => {
//       // Insert some sample reservations for testing
//       await Reservation.create([
//         {
//           room: "StudyRoom1",
//           startTime: "2024-01-01T10:00:00",
//           endTime: "2024-01-01T11:00:00",
//         },
//         {
//           room: "StudyRoom2",
//           startTime: "2024-01-02T10:00:00",
//           endTime: "2024-01-02T11:00:00",
//         },
//       ]);

//       const response = await request(server).get("/").expect(200);

//       // Assuming you have two reservations in the database
//       expect(response.body.length).toBe(2);

//       // Optionally, you can check if the returned data structure matches the expected schema
//       // For instance, if each reservation has fields room, startTime, and endTime
//       expect(response.body[0]).toHaveProperty("room");
//       expect(response.body[0]).toHaveProperty("startTime");
//       expect(response.body[0]).toHaveProperty("endTime");
//     });

//     it("should return an empty list if no reservations", async () => {
//       const response = await request(server).get("/").expect(200);

//       expect(response.body).toEqual([]);
//     });
//   });
// });
