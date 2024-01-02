import { useState } from "react";
import axios from "axios";

const AddUser = () => {
    const [formData, setUserData] = useState({
        id: "",
        username: "",
        address: "",
        age: "",
        email: "",
        pno: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);

        axios
            .post("http://localhost:3000/api/users/userregister", formData)
            .then((response) => {
                // Handle success (e.g., show a success message, reset the form)
                console.log("User added successfully");
                // Reset the form fields
                setUserData({
                    id: "",
                    username: "",
                    address: "",
                    age: "",
                    email: "",
                    pno: "",
                });
            })
            .catch((error) => {
                // Handle error (e.g., show an error message)
                console.error("Error adding User:", error);
            });
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">User Registration</h2>
            <form onSubmit={handleSubmit}>
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
                    <label className="form-label">User Address:</label>
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
                    <label className="form-label">User Age:</label>
                    <input
                        type="number"
                        className="form-control"
                        name="age"
                        value={formData.age || ""}
                        onChange={handleChange}
                        required
                    />
                </div>
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
                    <label className="form-label">User Phone NO:</label>
                    <input
                        type="number"
                        className="form-control"
                        name="pno"
                        value={formData.pno || ""}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
        </div>
    );
};

export default AddUser;
