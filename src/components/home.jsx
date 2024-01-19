// Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../CssStyles/home.css";
import backgroundImage from '../images/book.jpg';

const Home = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="home-container">
      <div className="background-image" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
      <div className="welcome-text">
        <h1>Welcome to the Book Management System</h1>
      </div>
      <div className="home-buttons">
        <button onClick={() => navigateTo('/register')}>Register</button>
        <button onClick={() => navigateTo('/login')}>Login</button>
      </div>
    </div>
  );
};

export default Home;
