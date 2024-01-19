import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CssStyles/userprofile.css';
import backgroundImage from '../images/book.jpg';

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
          console.error('Authentication token not found');
          navigate('/');
          return;
        }

        const response = await fetch('http://localhost:3000/user-profile', {
          method: 'GET',
          headers: {
            'Authorization': `${authToken}`,
          },
        });

        if (response.status === 200) {
          const user = await response.json();
          setUserData(user);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    // localStorage.removeItem('authToken');
    navigate('/dashboard');
  };

  return (
    <div className="user-profile-container">
     <div className="background-image" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
      <h1 className="user-profile-heading">User Profile</h1>
      <div className="user-profile-detail">
        <strong>Name:</strong> {userData.name}
      </div>
      <div className="user-profile-detail">
        <strong>Email:</strong> {userData.email}
      </div>
      <div className="user-profile-detail">
        <strong>Password:</strong> ********
      </div>
      <div className="user-profile-detail">
        <strong>Gender:</strong> {userData.gender}
      </div>
      <button className="user-profile-button2" onClick={handleLogout}>
        Go to dashboard
      </button>
    </div>
  );
};

export default UserProfile;
