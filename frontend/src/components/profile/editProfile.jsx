import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import validateEdit from "./validateEdit";
import { getURL } from "../../utils";
import { useUserContext } from "../../contexts/UserContext";

const EditProfile = () => {
    const navigate = useNavigate();
    const { email } = useParams();
    const [userData, setUserData] = useState({});
    const [errors, setErrors] = useState({});
    const { id } = useUserContext();

    useEffect(() => {
        if (!id) {
            navigate("/login");
        }
        const fetchUserData = async () => {
            try {
                // headers =  token
                const response = await axios.request({
                    method: "GET",
                    headers: {
                        "x-auth-token": id,
                    },
                    url: getURL("users"),
                });
                setUserData(response.data);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchUserData();
    }, [id, navigate]);

    function handleChange(event) {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
    }

    async function handleClick() {
        const validationErrors = validateEdit(userData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                axios
                    .request({
                        method: "PUT",
                        headers: {
                            "x-auth-token": id,
                        },
                        data: userData,
                        url: getURL(`users`),
                    })
                    .then((result) => {
                        alert("Form submitted:", result);

                        navigate(`/profile`);
                    });
            } catch (error) {
                console.error(error.message);
            }
        }
    }

    return (
        <div className="container container1 pt-5">
            <div className="wrappers">
                <h1>User Profile</h1>
                <div className="wrapper-profile">
                    <div className="profile-picture"></div>
                    <div className="profile">
                        <div className="profile-info">
                            <h2>
                                Username :{" "}
                                <input
                                    className="input"
                                    type="text"
                                    name="name"
                                    value={userData.name || ""}
                                    onChange={handleChange}
                                />
                            </h2>
                            {errors.name && (
                                <p className="error-message">{errors.name}</p>
                            )}
                            <h2>
                                Email :{" "}
                                <input
                                    className="input"
                                    type="text"
                                    name="email"
                                    value={userData.email || ""}
                                    onChange={handleChange}
                                />
                            </h2>
                            {errors.email && (
                                <p className="error-message">{errors.email}</p>
                            )}
                            <h2>
                                Password :{" "}
                                <input
                                    className="input"
                                    type="password"
                                    name="password"
                                    placeholder="New password"
                                    onChange={handleChange}
                                />
                            </h2>
                            {errors.password && (
                                <p className="error-message">
                                    {errors.password}
                                </p>
                            )}
                            <h2>
                                Confirm Password :{" "}
                                <input
                                    className="input"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    onChange={handleChange}
                                />
                            </h2>
                            {errors.confirmPassword && (
                                <p className="error-message">
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="button-section">
                    <button className="btn edit-profile" onClick={handleClick}>
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
