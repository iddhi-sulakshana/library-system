import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import validateEdit from "./validateEdit";

const EditProfile = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  const [userData, setUserData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/register/${email}`);
        setUserData(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchUserData();
  }, [email]);

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
        const response = await axios.put(`http://localhost:3001/api/register/${email}`, userData);
        console.log(response.data);
        navigate(`/profile/${userData.email}`);
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  return (
    <div className="wrappers">
      <h1>User Profile</h1>
      <div className="wrapper-profile">
        <div className="profile-picture"></div>
        <div className="profile">
          <div className="profile-info">
            <h2>Username : <input type="text" name="name" value={userData.name || ''} onChange={handleChange} /></h2>
            {errors.name && <p className="error-message">{errors.name}</p>}
            <h2>Email : <input type="text" name="email" value={userData.email || ''} onChange={handleChange} /></h2>
            {errors.email && <p className="error-message">{errors.email}</p>}
            <h2>Password : <input type="password" name="password" placeholder="New password" onChange={handleChange} /></h2>
            {errors.password && <p className="error-message">{errors.password}</p>}
            <h2>Confirm Password : <input type="password" name="confirmPassword" placeholder="Confirm password" onChange={handleChange} /></h2>
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          </div>
        </div>
      </div>
      <div className="button-section">
        <button className="edit-profile" onClick={handleClick}>
          Update
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
