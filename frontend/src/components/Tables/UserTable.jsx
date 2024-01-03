import React, { useState, useEffect } from "react";

import axios from "axios";
import { getURL } from "../../utils";

const UserTable = () => {
    const [UserData, setUserData] = useState([]);

    useEffect(() => {
        axios
            .get(getURL("users/userregister"))
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
                    {UserData &&
                        UserData.map((row, index) => (
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
