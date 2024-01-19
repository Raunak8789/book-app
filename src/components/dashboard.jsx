import React from 'react';
import { Routes, Route,useNavigate } from 'react-router-dom';
import BookList from './booklist';
import AddNewBook from './addnewbook';
import UserProfile from './userprofile';
import "../CssStyles/dashboard.css";
import backgroundImage from '../images/book.jpg';

const DashboardPage = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="background-image" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
      <h1>Dashboard</h1>
      <div className="dashboard-content">
        <div className="box">
          <button onClick={() => navigate('/booklist')}>
            Book Listing
          </button>
        </div>
        <div className="box">
          <button onClick={() => navigate('/addnewbook')}>
            Add New Book
          </button>
        </div>
        <div className="box">
          <button onClick={() => navigate('/userprofile')}>
            User Profile
          </button>
        </div>
        <div className="box">
          <button onClick={goToHome}>
            Logout
          </button>
        </div>
      </div>

      {/* Routes should be outside of the common layout */}
      <Routes>
        <Route path="books" element={<BookList />} />
        <Route path="add" element={<AddNewBook />} />
        <Route path="profile" element={<UserProfile />} />
      </Routes>
    </div>
  );
};

export default DashboardPage;
