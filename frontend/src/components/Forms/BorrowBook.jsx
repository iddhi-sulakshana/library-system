import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import BorrowBookTable from "../Tables/BorrowBookTable";
import { useNavigate, useLocation } from "react-router-dom"; // Import usenavigate and useLocation from react-router-dom
import { getURL } from "../../utils";
import { useUserContext } from "../../contexts/UserContext";
import useGetAllUsersEmail from "../../hooks/useGetAllUsersEmail";
import useGetAvailableBooks from "../../hooks/useGetAvailableBooks";

const BorrowBook = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isUpdateMode = location.state && location.state.isUpdateMode; // Check' if in update mode'
    const { id } = useUserContext();
    const [refresh, setRefresh] = useState(false);
    const userEmails = useGetAllUsersEmail();
    const availableBooks = useGetAvailableBooks(refresh);

    const [formData, setBookData] = useState({
        bookid: "",
        email: "",
        tackdate: "",
        deliverydate: "",
    });

    useEffect(() => {
        if (!isUpdateMode) {
            setBookData({
                bookid: "",
                email: "",
                tackdate: "",
                deliverydate: "",
            });
        }
        if (isUpdateMode && location.state && location.state.selectedRow) {
            const { selectedRow } = location.state;
            console.log(selectedRow);
            setBookData({
                _id: selectedRow._id,
                bookid: selectedRow.bookid.bookId,
                email: selectedRow.userid.email,
                tackdate: new Date(selectedRow.tackdate).toLocaleDateString(
                    "fr-ca"
                ),
                deliverydate: new Date(
                    selectedRow.deliverydate
                ).toLocaleDateString("fr-ca"),
            });
        }
        if (location.state?.bookId) {
            setBookData({ ...formData, bookid: location.state.bookId });
        }
    }, [isUpdateMode, location.state]);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setBookData({ ...formData, [name]: value });
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

    function handleSubmit(e) {
        e.preventDefault();

        if (isUpdateMode) {
            // If in update mode, send an update request
            console.log(formData._id);
            axios
                .put(getURL(`borrowbook/${formData._id}`), formData, {
                    headers: {
                        "x-auth-token": id,
                    },
                })
                .then((response) => {
                    console.log("Book Updated successfully");
                    window.alert("Book Updated successfully");
                    navigate("/borrowbook", {
                        state: { isUpdateMode: null, selectedRow: null },
                    }); // Redirect to the BorrowBookTable after update
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
                    setRefresh(!refresh);
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
    }

    return (
        <div className="container" style={{ paddingTop: "5rem" }}>
            <h2 className="mb-4">
                {isUpdateMode ? "Update Book" : "Borrow Book"}
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">User Email:</label>
                    <select
                        className="form-select"
                        name="email"
                        value={formData.email || ""}
                        onChange={handleChange}
                        required
                        disabled={isUpdateMode}
                    >
                        {isUpdateMode && (
                            <option value={formData.email} disabled>
                                {formData.email}
                            </option>
                        )}
                        {!isUpdateMode && userEmails?.length === 0 && (
                            <option value="" disabled>
                                No users found
                            </option>
                        )}
                        {!isUpdateMode && userEmails?.length > 0 && (
                            <>
                                <option value="">Select User Email</option>
                                {userEmails?.map((user) => (
                                    <option key={user.email} value={user.email}>
                                        {user.name} - {user.email}
                                    </option>
                                ))}
                            </>
                        )}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Book ID:</label>
                    <select
                        className="form-select"
                        name="bookid"
                        value={formData.bookid || ""}
                        onChange={handleChange}
                        required
                        disabled={isUpdateMode}
                    >
                        {isUpdateMode && (
                            <option value={formData.bookid} disabled>
                                {formData.bookid}
                            </option>
                        )}
                        {!isUpdateMode && availableBooks?.length === 0 && (
                            <option value="" disabled>
                                No books found
                            </option>
                        )}
                        {!isUpdateMode && availableBooks?.length > 0 && (
                            <>
                                <option value="">Select Book ID</option>
                                {availableBooks?.map((book) => (
                                    <option key={book._id} value={book.bookId}>
                                        {book.bookId} - {book.name}
                                    </option>
                                ))}
                            </>
                        )}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Tack Date:</label>
                    <input
                        type="date"
                        min={new Date().toLocaleDateString("fr-ca")}
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
                <BorrowBookTable refresh={refresh} setRefresh={setRefresh} />
            </div>
        </div>
    );
};

export default BorrowBook;
