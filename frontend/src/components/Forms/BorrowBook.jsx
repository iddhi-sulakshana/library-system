import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import BorrowBookTable from "../Tables/BorrowBookTable";
import { useNavigate, useLocation } from "react-router-dom"; // Import useHistory and useLocation from react-router-dom
import { getURL } from "../../utils";
import { useUserContext } from "../../contexts/UserContext";

const BorrowBook = () => {
    const history = useNavigate();
    const location = useLocation();
    const isUpdateMode = location.state && location.state.isUpdateMode; // Check if in update mode
    const [availabilityMessage, setAvailabilityMessage] = useState("");
    const { id } = useUserContext();

    const [formData, setBookData] = useState({
        bookid: "",
        email: "",
        tackdate: "",
        deliverydate: "",
    });

    useEffect(() => {
        if (isUpdateMode && location.state && location.state.selectedRow) {
            setBookData(location.state.selectedRow);
        }
    }, [isUpdateMode, location.state]);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setBookData({ ...formData, [name]: value });

        if (name === "email" && value.trim() !== "") {
            setBookData({
                ...formData,
                email: value,
            });
        }

        if (name === "bookid" && value.trim() !== "") {
            try {
                const response = await axios.get(
                    getURL(`borrowbook/availability/${value}`),
                    {
                        headers: {
                            "x-auth-token": id,
                        },
                    }
                );
                const isBookAvailable = response.data.available;

                if (!isBookAvailable) {
                    setAvailabilityMessage(
                        "This book is not available for borrowing."
                    );
                } else {
                    setAvailabilityMessage("");
                }
            } catch (error) {
                setAvailabilityMessage(
                    "This book is not available for borrowing."
                );
                console.error("Error checking book availability:", error);
            }
        }
        if (name === "tackdate" && value.trim() !== "") {
            // Add 10 days to tackdate and set deliverydate
            const tackDate = new Date(value);
            tackDate.setDate(tackDate.getDate() + 10);
            const formattedDeliveryDate = tackDate.toISOString().split("T")[0]; // Format as 'YYYY-MM-DD'

            setBookData({
                ...formData,
                tackdate: value,
                deliverydate: formattedDeliveryDate,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (availabilityMessage) {
            // Book is not available, show a message and prevent submission
            console.error("Cannot borrow the book. It is not available.");
            window.alert("Cannot borrow the book. It is not available.");
            return;
        }

        if (isUpdateMode) {
            // If in update mode, send an update request
            axios
                .put(
                    getURL(`borrowbook/${formData._id}`, {
                        headers: {
                            "x-auth-token": id,
                        },
                    }),
                    formData
                )
                .then((response) => {
                    console.log("Book Updated successfully");
                    window.alert("Book Updated successfully");
                    history.push("/borrowbook"); // Redirect to the BorrowBookTable after update
                })
                .catch((error) => {
                    console.error("Error updating Borrow Book:", error);
                });
        } else {
            axios
                .post(getURL("borrowbook"), formData, {
                    headers: {
                        "x-auth-token": id,
                    },
                })
                .then((response) => {
                    // Handle success (e.g., show a success message, reset the form)
                    console.log("Book Borrowed successfully");
                    window.alert("Book Borrowed successfully");
                    // Reset the form fields
                    setBookData({
                        bookid: "",
                        email: "",
                        tackdate: "",
                        deliverydate: "",
                    });
                })
                .catch((error) => {
                    // Handle error (e.g., show an error message)
                    console.error("Error adding Borrow Book:", error);
                });
        }
    };

    return (
        <div className="container" style={{ paddingTop: "5rem" }}>
            <h2 className="mb-4">
                {isUpdateMode ? "Update Book" : "Book Registration"}
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">User Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email || ""}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Book ID:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="bookid"
                        value={formData.bookid || ""}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tack Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        name="tackdate"
                        value={formData.tackdate || ""}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">delivery date:</label>
                    <input
                        type="date"
                        className="form-control"
                        name="deliverydate"
                        value={formData.deliverydate || ""}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    {isUpdateMode ? "Update" : "Register"}
                </button>
            </form>
            <div>
                <br />
                <br />
                <br />
                <BorrowBookTable />
            </div>
        </div>
    );
};

export default BorrowBook;
