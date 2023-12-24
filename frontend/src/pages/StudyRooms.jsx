import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import io from "socket.io-client";
import StudyRoomCard from "./StudyRoomCard";

function StudyRooms() {
  const [rooms, setRooms] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedRoom, setSelectedRoom] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudyRooms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/studyrooms"
        );
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching available rooms:", error);
      }
    };

    const socket = io("http://localhost:3000");
    socket.on("roomBooked", (data) => {
      setRooms((prevState) => {
        const index = prevState.findIndex((room) => room._id === data._id);
        if (index !== -1) {
          prevState[index].bookedSlots = data.bookedSlots;
        } else {
          return [...prevState, data];
        }
        return [...prevState];
      });
    });

    fetchStudyRooms();
  }, [selectedTimeSlot]);

  const isSlotOverlapping = (slot, selectedStartHour, selectedEndHour) => {
    const startHour = new Date(slot.startTime).getUTCHours();
    const endHour = new Date(slot.endTime).getUTCHours();
    return startHour < selectedEndHour && endHour > selectedStartHour;
  };

  const isRoomBooked = (room) => {
    if (!selectedTimeSlot) return false;
    return room.bookedSlots.some((slot) =>
      isSlotOverlapping(
        slot,
        selectedTimeSlot,
        parseInt(selectedTimeSlot, 10) + 2
      )
    );
  };

  const handleBook = (room) => {
    setSelectedRoom(room);
    let path = `/reserve/${room.roomId}-${room._id}`;
    navigate(path, { state: { isInitialBooking: true } });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 ms-3">Available Study Rooms</h1>
      <div className="row mb-4 ms-1">
        <div className="col-lg-2">
          <select
            className="form-select"
            onChange={(e) => setSelectedTimeSlot(e.target.value)}
          >
            <option value="">Select Time</option>
            <option value="08">8:00 - 10:00</option>
            <option value="10">10:00 - 12:00</option>
            <option value="12">12:00 - 14:00</option>
            <option value="14">14:00 - 16:00</option>
          </select>
        </div>
      </div>

      <div className="row">
        {rooms.map((room) => (
          <div key={room._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <StudyRoomCard
              room={room}
              onBook={handleBook}
              isBooked={isRoomBooked(room)}
              setSelectedRoom={setSelectedRoom}
              selectedTimeSlot={selectedTimeSlot}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudyRooms;
