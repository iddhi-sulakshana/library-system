import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import BorrowBookTable from "../Tables/BorrowBookTable";
import { useNavigate, useLocation } from "react-router-dom"; // Import useHistory and useLocation from react-router-dom

const BorrowBook = () => {
    const history = useNavigate();
    const location = useLocation();
    const isUpdateMode = location.state && location.state.isUpdateMode; // Check if in update mode
    const [availabilityMessage, setAvailabilityMessage] = useState("");

    const [formData, setBookData] = useState({
        id: "",
        username: "",
        bookid: "",
        address: "",
        email: "",
        pno: "",
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

        if (name === "id" && value.trim() !== "") {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/users/${value}`
                );
                const userData = response.data;
                setBookData({
                    ...formData,
                    id: userData.id,
                    username: userData.username,
                    address: userData.address,
                    email: userData.email,
                    pno: userData.pno,

                    // Add other fields based on your user schema
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }

        if (name === "bookid" && value.trim() !== "") {
            try {
                const response = await axios.get(
                    `http://localhost:5000/borrowbook/bookavailability/${value}`
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
        console.log(formData);

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
                    `http://localhost:5000/borrowbook/update/${formData._id}`,
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
                .post(
                    "http://localhost:5000/borrowbook/borrowbookregister",
                    formData
                )
                .then((response) => {
                    // Handle success (e.g., show a success message, reset the form)
                    console.log("Book Borrowed successfully");
                    window.alert("Book Borrowed successfully");
                    // Reset the form fields
                    setBookData({
                        id: "",
                        username: "",
                        bookid: "",
                        address: "",
                        email: "",
                        pno: "",
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
        <div className="container mt-5">
            <h2 className="mb-4">
                {isUpdateMode ? "Update Book" : "Book Registration"}
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">User ID:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="id"
                        value={formData.id || ""}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">User Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={formData.username || ""}
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
                    <label className="form-label">address:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={formData.address || ""}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
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
                    <label className="form-label">Phone No:</label>
                    <input
                        type="number"
                        className="form-control"
                        name="pno"
                        value={formData.pno || ""}
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
