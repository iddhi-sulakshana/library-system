import { useNavigate,  useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import "./profile.css";
const Profile = () => {
  // usertoke
  // is usertoken  != redirecte

    const {email } = useParams()
    console.log(email);

    const navigate = useNavigate();
    const [userData, setUserData] = useState();

    useEffect(() => {
        // Fetch user data when the component mounts
        const fetchUserData = async () => {
          try {
            // headers =  token 
            const response = await axios.get(`http://localhost:3001/api/register/${email}`);
            console.log(response.data);
            setUserData(response.data);
            console.log(userData.email, userData.name);
          } catch (error) {
            console.error(error.message);
          }
        };
        fetchUserData();
    }, []);

    function handleClick(){
        navigate(`/editProfile/${userData.email}`);
    }
    async function handleDelete() {
      try {
        // Make a DELETE request to delete the user
        const response = await axios.delete(`http://localhost:3001/api/register/${email}`);
  
        // Handle the response as needed (e.g., show a success message)
        console.log(response.data);
  
        // Redirect to the signup page
        navigate('/');
        alert('Your account has been deleted');
      } catch (error) {
        console.error(error.message);
        // Handle errors (e.g., show an error message to the user)
      }
    }


  return (
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
        <button className="edit-profile" onClick={handleClick}>Edit Profile</button>
        <button className="delete-profile" onClick={handleDelete}>Delete Profile</button>
      </div>
    </div>
  );
};

export default Profile;
