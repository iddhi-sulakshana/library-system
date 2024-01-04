import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./profile.css";
import { getURL } from "../../utils";
import { useUserContext } from "../../contexts/UserContext";
const Profile = () => {
    // usertoke
    // is usertoken  != redirecte
    const navigate = useNavigate();
    const { email } = useParams();
    const { id, setId } = useUserContext();
    useEffect(() => {
        if (!id) {
            navigate("/login");
        }
    }, [id, navigate]);

    const [userData, setUserData] = useState();

    useEffect(() => {
        if (!id) {
            return;
        }
        // Fetch user data when the component mounts
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
    }, [id]);

    function handleClick() {
        navigate(`/editProfile/${userData.email}`);
    }
    async function handleDelete() {
        // Make a DELETE request to delete the user
        axios
            .request({
                method: "DELETE",
                headers: {
                    "x-auth-token": id,
                },
                url: getURL(`users`),
            })
            .then((result) => {
                setId(null);
            })
            .catch((err) => alert(err.response.data));
    }

    return (
        <div className="container1">
            <div className="wrappers">
                <h1>User Profile</h1>
                <div className="wrapper-profile">
                    <div className="profile-picture"></div>
                    <div className="profile">
                        <div className="profile-info">
                            {userData ? (
                                <>
                                    <h2>Username: {userData.name}</h2>
                                    <h2>Email: {userData.email}</h2>
                                    {/* Add other user data as needed */}
                                </>
                            ) : (
                                // Display a loading message while data is being fetched
                                <p>Loading...</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="button-section">
                    <button className="edit-profile" onClick={handleClick}>
                        Edit Profile
                    </button>
                    <button className="delete-profile" onClick={handleDelete}>
                        Delete Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
