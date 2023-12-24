import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BorrowBookTable = () => {
    const history = useNavigate();
    const [BorrowBookData, setBorrowBookData] = useState([]);

    const handleUpdate = (row) => {
        // Navigate to the BorrowBook form and pass selected row data as state
        history.push({
            pathname: "/borrowbook",
            state: { isUpdateMode: true, selectedRow: row },
        });
    };

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/borrowbook/borrowbookregister`)
            .then((response) => {
                setBorrowBookData(response.data);
            })

            .catch((error) => {
                console.error("Error fetching vehicles:", error);
            });
    }, []);

    const handleDelete = (_id) => {
        axios
            .delete(
                `http://localhost:3000/api/borrowbook/borrowbookregister/${_id}`
            )
            .then((response) => {
                // Update the state after successful deletion
                const updatedData = BorrowBookData.filter(
                    (row) => row._id !== _id
                );
                setBorrowBookData(updatedData);
            })
            .catch((error) => {
                console.error("Error deleting BorrowBook:", error);
            });
    };

    const calculateFine = (deliveryDate) => {
        const today = new Date();
        const formattedDeliveryDate = new Date(deliveryDate);

        // If the delivery date has passed
        if (formattedDeliveryDate < today) {
            const daysLate = Math.ceil(
                (today - formattedDeliveryDate) / (1000 * 60 * 60 * 24)
            );
            const fineAmount = daysLate * 10;
            return `Rs. ${fineAmount} fine`;
        }

        return "No fine";
    };

    return (
        <div className="">
            {/* Your CSS styles for the table */}
            <style>
                {`
        /* YourTableComponent.css */

        /* Custom styles for the entire table */
        .table {
            font-size: 16px;
            background-color: lightblue;
          }
          
          /* Custom styles for table headers */
          .table th {
            background-color: #ff000d; /* Header background color */
            color: white; /* Header text color */
          }
          
          /* Custom styles for table rows */
          .table tr:nth-child(even) {
            background-color: #f2f2f2; /* Alternate row background color */
          }
          
          /* Define more custom styles as needed */
          
      `}
            </style>

            <table className="table table-responsive">
                <thead>
                    <tr>
                        <th>BorrowBook ID</th>
                        <th>User Name</th>
                        <th>Book ID</th>
                        <th>User Address</th>
                        <th>User Email</th>
                        <th>Phone No</th>
                        <th>Tack Date</th>
                        <th>Delivery Date</th>
                        <th>Fine Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {BorrowBookData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.id}</td>
                            <td>{row.username}</td>
                            <td>{row.bookid}</td>
                            <td>{row.address}</td>
                            <td>{row.email}</td>
                            <td>{row.pno}</td>
                            <td>{row.tackdate}</td>
                            <td>{row.deliverydate}</td>
                            <td>{calculateFine(row.deliverydate)}</td>
                            <td>
                                <button
                                    type="button"
                                    class="btn btn-outline-danger"
                                    onClick={() => handleDelete(row._id)}
                                >
                                    Return Book
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-outline-warning"
                                    onClick={() => handleUpdate(row)}
                                >
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BorrowBookTable;
