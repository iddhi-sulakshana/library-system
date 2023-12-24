import express from "express";
import Reservation from "../models/Reservation.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const reservations = await Reservation.find();
  res.send(reservations);
});

router.post("/", async (req, res) => {
  try {
    const { userId, roomId, startTime, endTime } = req.body;

    const overlappingReservation = await Reservation.findOne({
      roomId,
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
    });

    if (overlappingReservation) {
      return res.status(400).send({ error: "Time slot is already booked" });
    }

    const reservation = new Reservation({
      userId,
      roomId,
      startTime,
      endTime,
    });

    const room = await StudyRoom.findOne({ roomId: roomId });

    if (!room) {
      return res.status(404).send({ error: "StudyRoom not found" });
    }

    reservation.studyRoomId = room._id;
    await reservation.save();

    room.bookedSlots.push({
      bookId: reservation._id,
      startTime: reservation.startTime,
      endTime: reservation.endTime,
    });

    await room.save();

    res.status(201).send({ message: "Reservation created successfully!" });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.put("/", async (req, res) => {
  try {
    const { bookingId, roomId, startTime, endTime } = req.body;

    const overlappingReservation = await Reservation.findOne({
      _id: { $ne: bookingId },
      roomId: roomId,
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
    });

    if (overlappingReservation) {
      return res.status(400).send({ error: "Time slot is already booked" });
    }

    const reservation = await Reservation.findById(bookingId);

    if (!reservation) {
      return res.status(404).send({ error: "Reservation not found" });
    }

    reservation.startTime = startTime;
    reservation.endTime = endTime;
    await reservation.save();

    const room = await StudyRoom.findOne({ roomId: reservation.roomId });

    if (!room) {
      return res.status(404).send({ error: "Room not found" });
    }

    const index = room.bookedSlots.findIndex(
      (slot) => slot.bookId.toString() === bookingId
    );

    if (index !== -1) {
      room.bookedSlots[index].startTime = startTime;
      room.bookedSlots[index].endTime = endTime;
      await room.save();
    }

    res.status(200).send({ message: "Reservation updated successfully!" });
  } catch (error) {
    console.error("Error updating reservation:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.delete("/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params;

    const reservation = await Reservation.findById(bookingId);

    if (!reservation) {
      return res.status(404).send({ error: "Reservation not found" });
    }

    await Reservation.findByIdAndDelete(bookingId);

    const room = await StudyRoom.findOne({ roomId: reservation.roomId });

    if (!room) {
      return res.status(404).send({ error: "Room not found" });
    }

    const index = room.bookedSlots.findIndex(
      (slot) => slot.bookId.toString() === bookingId
    );

    if (index !== -1) {
      room.bookedSlots.splice(index, 1);
      await room.save();
    }

    res.status(200).send({ message: "Reservation deleted successfully!" });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await Reservation.find({ userId });

    if (!reservations || reservations.length === 0) {
      return res
        .status(404)
        .send({ error: "No reservations found for the user" });
    }

    res.send(reservations);
  } catch (error) {
    console.error("Error fetching user reservations:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
