import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import _ from "lodash";
import axios from "axios";
import { getURL } from "../../utils";
import { useUserContext } from "../../contexts/UserContext";

function StudyRoomReservationForm() {
    const [selectedSlot, setSelectedSlot] = useState([null, null]);
    const [bookedTimes, setBookedTimes] = useState([]);
    const [email, setEmail] = useState("");
    const [showModal, setShowModal] = useState(false);

    const { id: roomId } = useParams();
    const navigate = useNavigate();

    // add user id here
    const path = `/reservations/`;

    const location = useLocation();
    const isInitialBooking = location.state
        ? location.state.isInitialBooking
        : false;

    const [roomNumber, studyRoomId, bookingId] = _.split(roomId, "-");
    const { id } = useUserContext();

    useEffect(() => {
        axios
            .get(getURL(`studyrooms/${studyRoomId}/reservedTimes`))
            .then((response) => {
                setBookedTimes(response.data);
            })
            .catch((error) => {
                console.error("Error fetching booked times:", error);
            });
    }, [studyRoomId]);

    const getCurrentDateISOString = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const currentDateISOString = getCurrentDateISOString();

    const handleRadioChange = (startTime, endTime) => {
        setSelectedSlot([startTime, endTime]);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const [year, month, day] = currentDateISOString.split("-");
        const startTimeDate = new Date(
            Date.UTC(year, month - 1, day, selectedSlot[0])
        );
        const endTimeDate = new Date(
            Date.UTC(year, month - 1, day, selectedSlot[1])
        );

        const formData = {
            ...(isInitialBooking ? { userId: id } : { bookingId: bookingId }),
            roomId: roomNumber,
            startTime: startTimeDate,
            endTime: endTimeDate,
        };

        let response, request;
        try {
            if (isInitialBooking) {
                request = "POST";
                response = await axios.post(getURL("reservations"), formData, {
                    headers: {
                        "x-auth-token": id,
                    },
                });
            } else {
                request = "PUT";
                response = await axios.put(getURL("reservations"), formData, {
                    headers: {
                        "x-auth-token": id,
                    },
                });
            }
            console.log(`Response from ${request} request:`, response.data);

            setShowModal(true);
        } catch (error) {
            console.error(`Error sending ${request} request: `, error);
        }
    };

    return (
        <div className="container" style={{ paddingTop: "5rem" }}>
            <form onSubmit={handleFormSubmit} className="border p-4 rounded">
                <div className="mb-3">
                    <label className="form-label">Room ID:</label>
                    <input
                        type="text"
                        value={roomNumber}
                        className="form-control"
                        readOnly
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Available Times:</label>
                </div>
                <div className="mb-3">
                    <table>
                        <tr>
                            <td>
                                <input
                                    type="radio"
                                    name="timeSlot"
                                    value="08:00-10:00"
                                    onChange={() =>
                                        handleRadioChange("08", "10")
                                    }
                                    disabled={bookedTimes.some(
                                        (timeSlot) =>
                                            timeSlot.startTime === "8" &&
                                            timeSlot.endTime === "10"
                                    )}
                                />
                            </td>
                            <td>
                                <label className="ms-2">8am-10am</label>
                            </td>
                        </tr>
                    </table>
                </div>
                <div className="mb-3">
                    <table>
                        <tr>
                            <td>
                                <input
                                    type="radio"
                                    name="timeSlot"
                                    value="10:00-12:00"
                                    onChange={() =>
                                        handleRadioChange("10", "12")
                                    }
                                    disabled={bookedTimes.some(
                                        (timeSlot) =>
                                            timeSlot.startTime === "10" &&
                                            timeSlot.endTime === "12"
                                    )}
                                />
                            </td>
                            <td>
                                <label className="ms-2">10am-12pm</label>
                            </td>
                        </tr>
                    </table>
                </div>
                <div className="mb-3">
                    <table>
                        <tr>
                            <td>
                                <input
                                    type="radio"
                                    name="timeSlot"
                                    value="12:00-14:00"
                                    onChange={() =>
                                        handleRadioChange("12", "14")
                                    }
                                    disabled={bookedTimes.some(
                                        (timeSlot) =>
                                            timeSlot.startTime === "12" &&
                                            timeSlot.endTime === "14"
                                    )}
                                />{" "}
                            </td>
                            <td>
                                <label className="ms-2">12pm-2pm</label>
                            </td>
                        </tr>
                    </table>
                </div>
                <div className="mb-3">
                    <table>
                        <tr>
                            <td>
                                <input
                                    type="radio"
                                    name="timeSlot"
                                    value="14:00-16:00"
                                    onChange={() =>
                                        handleRadioChange("14", "16")
                                    }
                                    disabled={bookedTimes.some(
                                        (timeSlot) =>
                                            timeSlot.startTime === "14" &&
                                            timeSlot.endTime === "16"
                                    )}
                                />{" "}
                            </td>
                            <td>
                                <label className="ms-2">2pm-4pm</label>
                            </td>
                        </tr>
                    </table>
                </div>
                <button type="submit" className="btn btn-primary">
                    Book Room
                </button>
            </form>

            <div
                className={`modal fade ${showModal ? "show" : ""}`}
                tabIndex="-1"
                role="dialog"
                style={{ display: showModal ? "block" : "none" }}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Success</h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={() => setShowModal(false)}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {isInitialBooking
                                ? "Room booked successfully"
                                : "Record updated successfully!"}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => {
                                    navigate(path);
                                    setShowModal(false);
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudyRoomReservationForm;
