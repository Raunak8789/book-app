// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Register from './components/register';
import Login from './components/login';
import Dashboard from './components/dashboard';
import BookList from './components/booklist';
import AddNewBook from './components/addnewbook';
import UserProfile from './components/userprofile';
import UpdateBook from './components/update';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/booklist" element={<BookList />} />
          <Route path="/addnewbook" element={<AddNewBook />} />
          <Route path="/userprofile" element={<UserProfile />} /> 
          <Route path="/update-book/:id" element={<UpdateBook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
