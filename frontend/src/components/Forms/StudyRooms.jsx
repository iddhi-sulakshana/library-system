import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import StudyRoomCard from "./StudyRoomCard";

function StudyRooms() {
  const [rooms, setRooms] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedRoom, setSelectedRoom] = useState();

  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/studyrooms")
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching available rooms:", error);
      });
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
    let path = `/reserve/${selectedRoom.roomId}-${selectedRoom.roomId._id}`;
    navigate(path, { state: { isInitialBooking: true } });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Available Study Rooms</h2>
      <select onChange={(e) => setSelectedTimeSlot(e.target.value)}>
        <option value="">Select Time</option>
        <option value="08">8:00 - 10:00</option>
        <option value="10">10:00 - 12:00</option>
        <option value="12">12:00 - 14:00</option>
        <option value="14">14:00 - 16:00</option>
      </select>

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
