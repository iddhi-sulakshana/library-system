import { useEffect, useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import validateForm from "../FormValidation";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Form.css";
import { getURL } from "../../utils.js";
import { useUserContext } from "../../contexts/UserContext.jsx";

const LoginForm = () => {
    const { id, setId } = useUserContext();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    useEffect(() => {
        if (id) {
            navigate("/profile");
        }
    }, [id, navigate]);

    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm(formData, "login");
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            axios
                .post(getURL("login"), {
                    email: formData.email,
                    password: formData.password,
                })
                // Form is valid, proceed with submission
                .then((result) => {
                    console.log("Form submitted:", result);

                    // save intothe locastorage || appcontext
                    // usetoken
                    setId(result.headers["x-auth-token"]);
                    navigate(`/profile`);
                })
                .catch((err) => alert(err.response.data));
        } else {
            // Form is invalid, handle errors or show an alert
            console.log("Form validation failed");
        }
    };

    return (
        <div className="container1">
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Email"
                            required
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                        />
                        <FaUser className="icon" />
                        {errors.email && (
                            <p className="error-message">{errors.email}</p>
                        )}
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                        />
                        <FaLock className="icon" />
                        {errors.password && (
                            <p className="error-message">{errors.password}</p>
                        )}
                    </div>
                    <button type="submit">Login</button>

                    <div className="register-link">
                        <p>
                            Don&apos;t have an account ?{" "}
                            <Link to="/signup">Register</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
