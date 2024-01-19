import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../CssStyles/register.css";
import backgroundImage from '../images/book.jpg';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (!emailRegex.test(event.target.value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (!passwordRegex.test(event.target.value)) {
      setPasswordError(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number'
      );
    } else {
      setPasswordError('');
    }
  };

  const handleRegister = async () => {
    try {
      // Validate the input fields
      if (!name || !email || !password || !gender) {
        console.error('Please fill in all the registration fields');
        alert("Please fill in all the required fields");
        return;
      }
  
      // Additional validation for email and password
      if (!emailRegex.test(email)) {
        setEmailError('Please enter a valid email address');
        return;
      } else {
        setEmailError('');
      }
  
      if (!passwordRegex.test(password)) {
        setPasswordError(
          'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number'
        );
        return;
      } else {
        setPasswordError('');
      }
  
      // Send a request to the server to register the user
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, gender }),
      });
  
      // Log the response data
      const responseData = await response.json();
      console.log('Server Response:', responseData);
  
      if (response.status === 201) {
        console.log('Registration successful');
        // Redirect to the login page
        navigate('/login');
      } else {
        console.error('Error during registration');
      }
    } catch (error) {
      console.error('Error during registration', error);
    }
};
  
const handleLogout = () => {
  // Implement your logout logic here
  navigate('/'); // Redirect to the home page or another appropriate page
};

  return (
    <div className="register-container">
      <div className="background-image" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
      <h1>Register</h1>
      <div className="form-group">
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
        {emailError && <span className="error-message">{emailError}</span>}
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
        {passwordError && <span className="error-message">{passwordError}</span>}
      </div>
      <div className="form-group">
        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="others">Others</option>
        </select>
      </div>
      <div className="form-group">
        <button onClick={handleRegister}>Register</button>
      </div>
      <div className="logout-button-container">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default RegisterPage;
