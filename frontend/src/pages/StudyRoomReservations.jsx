import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import PropTypes from "prop-types";
import { formatDate, getURL, formatTimestampWithTZ } from "../utils";
import { useUserContext } from "../contexts/UserContext";

function StudyRoomReservations() {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();
  const { id } = useUserContext();
  useEffect(() => {
    if (!id) navigate("/login");
    const fetchUserReservations = async () => {
      try {
        const response = await axios.get(getURL(`reservations/user`), {
          headers: {
            "x-auth-token": id,
          },
        });
        setReservations(response.data);
      } catch (error) {
        console.error("Error fetching user reservations:", error);
      }
    };

    fetchUserReservations();
  }, [id]);

  const handleUpdate = (reservation) => {
    let path = `/reserve/${reservation.roomId}-${reservation.studyRoomId}-${reservation._id}`;
    navigate(path);
  };

  const handleDelete = async (reservationId) => {
    const originalReservations = [...reservations];
    setReservations(reservations.filter((r) => r._id !== reservationId));

    try {
      const response = await axios.delete(
        getURL("reservations/" + reservationId),
        {
          headers: {
            "x-auth-token": id,
          },
        }
      );
      console.log(`Successfully deleted reservation with ID: ${reservationId}`);
    } catch (err) {
      console.log(err.message);
      setReservations(originalReservations);
      alert("Failed to delete reservation. Please try again.");
    }
  };

  return (
    <div className="container" style={{ paddingTop: "5rem" }}>
      <h2 className="mb-4">Your Reservations</h2>

      {reservations.length === 0 ? (
        <div className="alert alert-info">No reservations found.</div>
      ) : (
        <div className="row">
          {reservations.map((reservation) => (
            <div key={reservation._id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    Reservation ID: {reservation._id}
                  </h5>
                  <p className="card-text">Room ID: {reservation.roomId}</p>
                  <p className="card-text">
                    Start Time:{" "}
                    {formatDate(reservation.startTime) +
                      " " +
                      formatTimestampWithTZ(reservation.startTime, "UTC")}
                  </p>
                  <p className="card-text">
                    End Time:{" "}
                    {formatDate(reservation.endTime) +
                      " " +
                      formatTimestampWithTZ(reservation.endTime, "UTC")}
                  </p>
                  <div className="mt-3">
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleUpdate(reservation)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(reservation._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudyRoomReservations;
