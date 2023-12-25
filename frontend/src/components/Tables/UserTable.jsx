import React, { useState, useEffect } from "react";

import axios from "axios";

const UserTable = () => {
    const [UserData, setUserData] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/users/userregister`)
            .then((response) => {
                setUserData(response.data);
            })

            .catch((error) => {
                console.error("Error fetching vehicles:", error);
            });
    }, []);

    // Include userRole and officeLocation in the dependency array

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
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>User Address</th>
                        <th>User Age</th>
                        <th>User Email</th>
                        <th>User Phone No</th>
                    </tr>
                </thead>
                <tbody>
                    {UserData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.id}</td>
                            <td>{row.username}</td>
                            <td>{row.address}</td>
                            <td>{row.age}</td>
                            <td>{row.email}</td>
                            <td>{row.pno}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
