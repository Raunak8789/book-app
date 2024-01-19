import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../CssStyles/update.css';
import backgroundImage from '../images/book.jpg';

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookDetails, setBookDetails] = useState({
    title: '',
    author: '',
    genre: '',
  });

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/book-details/${id}`, {
          method: 'GET',
        });

        if (response.status === 200) {
          const fetchedBookDetails = await response.json();
          setBookDetails(fetchedBookDetails);
        } else {
          console.error('Failed to fetch book details');
        }
      } catch (error) {
        console.error('Error fetching book details', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3000/update-book/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookDetails),
      });

      if (response.status === 200) {
        console.log('Book updated successfully');
        // You can redirect to the book listing page or perform other actions on success
        navigate('/booklist');
      } else {
        alert('Please fill in all the required fields!');
        console.error('Error updating book');
      }
    } catch (error) {
      console.error('Error updating book', error);
    }
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="update-container">
      <div className="background-image" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
      <div className='header-container2'>
      <h1>Update Book</h1></div>
      <div className="dashboard-button-container2">
        <button onClick={handleGoToDashboard}>Go to Dashboard</button>
      </div>
      <label>
        <strong>Title:</strong>
        <input type="text" name="title" value={bookDetails.title} onChange={handleChange} />
      </label>
      <label>
        <strong>Author:</strong>
        <input type="text" name="author" value={bookDetails.author} onChange={handleChange} />
      </label>
      <label>
        <strong>Genre:</strong>
        <input type="text" name="genre" value={bookDetails.genre} onChange={handleChange} />
      </label>
      <button onClick={handleUpdate}>Update Book</button>
    </div>
  );
};

export default UpdateBook;
