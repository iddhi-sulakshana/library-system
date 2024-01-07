import PropTypes from "prop-types";

function StudyRoomCard({
    room,
    onBook,
    isBooked,
    setSelectedRoom,
    selectedTimeSlot,
}) {
    const isSlotOverlappingForTimeSlot = (slot) => {
        if (!selectedTimeSlot) return false;
        const selectedStartHour = parseInt(selectedTimeSlot, 10);
        const selectedEndHour = selectedStartHour + 2;
        const startHour = new Date(slot.startTime).getUTCHours();
        const endHour = new Date(slot.endTime).getUTCHours();
        return startHour < selectedEndHour && endHour > selectedStartHour;
    };

    return (
        <div
            className="card"
            style={{ width: "18rem", height: "13rem", margin: "1rem" }}
        >
            <div className="card-body">
                <h5 className="card-title">Room {room.roomId}</h5>
                <p className="card-text">Capacity: {room.capacity}</p>
                <p className="card-text">
                    Facilities: {room.facilities.join(", ")}
                </p>

                {isBooked ? (
                    room.bookedSlots.some(isSlotOverlappingForTimeSlot) ? (
                        <button
                            className="btn btn-danger w-100 mt-auto "
                            disabled
                        >
                            Booked Out
                        </button>
                    ) : (
                        <button
                            className="btn btn-primar mt-auto "
                            onClick={() => {
                                setSelectedRoom(room);
                                onBook(room);
                            }}
                        >
                            Book Now
                        </button>
                    )
                ) : (
                    <button
                        className="btn btn-primary mt-auto"
                        onClick={() => {
                            setSelectedRoom(room);
                            onBook(room);
                        }}
                    >
                        Book Now
                    </button>
                )}
            </div>
        </div>
    );
}

StudyRoomCard.propTypes = {
    room: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        roomId: PropTypes.number.isRequired,
        capacity: PropTypes.number.isRequired,
        facilities: PropTypes.arrayOf(PropTypes.string).isRequired,
        bookedSlots: PropTypes.array.isRequired,
    }).isRequired,
    onBook: PropTypes.func.isRequired,
    isBooked: PropTypes.bool.isRequired,
    setSelectedRoom: PropTypes.func.isRequired,
    selectedTimeSlot: PropTypes.string.isRequired,
};

export default StudyRoomCard;
