import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CssStyles/login.css';
import backgroundImage from '../images/book.jpg';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        console.error('Please provide both email and password');
        alert('Please fill in all the required details');
        return;
      }
  
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.status === 200) {
        const { token } = await response.json();
  
        // Store the token in localStorage
        localStorage.setItem('authToken', `${token}`); // Add 'Bearer ' prefix
  
        console.log('Login successful');
        console.log('Token:', token); // Add this line to log the token
        navigate('/dashboard');
      } else if (response.status === 401) {
        console.error('Login failed - email and password do not match');
        alert('Email and password do not match');
      } else {
        console.error('Login failed');
        console.log('Response status:', response.status); // Add this line to log the response status
      }
    } catch (error) {
      console.error('Error during login', error);
    }
  };
  
  
  const handleLogout = () => {

    // Navigate to the home page or any other desired location
    navigate('/');
  };
  return (
    <div className="login-container">
      <div className="background-image" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
      <h1>Login</h1>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="form-group">
        <button onClick={handleLogin}>Login</button>
      </div>
      <div className="logout-button-container">
        {/* Add Logout button here */}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
);
};

export default LoginPage;
