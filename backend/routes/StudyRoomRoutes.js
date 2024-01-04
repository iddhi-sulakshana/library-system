import express from "express";
import { validateStudyRoom, StudyRoom } from "../models/StudyRoom.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const rooms = await StudyRoom.find();
    res.status(200).send(rooms);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const error = validateStudyRoom(req.body);
    if (error) return res.status(400).send(error);
    console.log(error);

    const { roomId, capacity, facilities } = req.body;

    const existingRoom = await StudyRoom.findOne({ roomId: roomId });
    if (existingRoom) {
      return res
        .status(400)
        .send({ message: "Room with that ID already exists." });
    }

    const studyroom = new StudyRoom({
      roomId: roomId,
      capacity: capacity,
      facilities: facilities,
    });

    const result = await studyroom.save();

    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const room = await StudyRoom.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).send({ error: "Room not found" });
    }
    res.status(200).send({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id/reservedTimes", async (req, res) => {
  try {
    const room = await StudyRoom.findById(req.params.id);
    if (!room) {
      return res.status(404).send({ error: "Room not found" });
    }

    const reservedTimes = room.bookedSlots.map((slot) => {
      const startHour = new Date(slot.startTime).getUTCHours().toString();
      const endHour = new Date(slot.endTime).getUTCHours().toString();
      return {
        startTime: startHour,
        endTime: endHour,
      };
    });

    res.status(200).send(reservedTimes);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
