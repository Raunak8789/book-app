import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CssStyles/addnewbook.css';
import backgroundImage from '../images/book.jpg';

const AddNewBookPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const navigate = useNavigate();

  const handleAddBook = async () => {
    try {
      if(!title || !author || !genre)
      {
        alert("Please fill in all the required fields!");
        return;
      }
      const response = await fetch('http://localhost:3000/add-book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author, genre }),
      });

      if (response.status === 201) {
        console.log('Book added successfully');
        navigate('/dashboard');
        // You can redirect to a book listing page or perform other actions on success
      } else {
        console.error('Error adding book');
        alert("server error");
      }
    } catch (error) {
      console.error('Error adding book', error);
    }
  };
 const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="add-new-book-container">
      <div className="background-image" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
      <div className="header-container2">
        <h1>Add New Book</h1></div>
        <div className="dashboard-button-container2">
          <button onClick={handleGoToDashboard}>Go to Dashboard</button>
        </div>
      <label>
      <strong>Title:</strong>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
    </label>
    <label>
      <strong>Author:</strong>
      <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
    </label>
    <label>
      <strong>Genre:</strong>
      <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
    </label>
    <button onClick={handleAddBook}>Add Book</button>

    </div>
  );
};

export default AddNewBookPage;