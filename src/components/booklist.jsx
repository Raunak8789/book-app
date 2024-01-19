import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CssStyles/booklist.css';
import backgroundImage from '../images/book.jpg';

const BookListingPage = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3000/books', {
          method: 'GET',
        });

        if (response.status === 200) {
          const booksData = await response.json();
          setBooks(booksData);
        } else {
          console.error('Failed to fetch book data');
        }
      } catch (error) {
        console.error('Error fetching book data', error);
      }
    };

    fetchBooks();
  }, []); // Run this effect only once when the component mounts

  const handleDeleteBook = async (bookId) => {
    try {
      // Send a request to delete the book
      const response = await fetch(`http://localhost:3000/delete-book/${bookId}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        console.log('Book deleted successfully');
        // Update the state to remove the deleted book
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
      } else {
        console.error('Error deleting book');
      }
    } catch (error) {
      console.error('Error deleting book', error);
    }
  };

  const handleUpdateBook = (bookId) => {
    // Navigate to the update page for the selected book
    navigate(`/update-book/${bookId}`);
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="book-listing-container">
      <div className="background-image" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
      <div className="header-container2">
        <h1>Book Listing</h1></div>
        <div className="dashboard-button-container2">
          <button onClick={handleGoToDashboard}>Go to Dashboard</button>
        </div>
      <div className="book-list-container">
        {books.map((book) => (
          <div key={book.id} className="book-box">
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <div className="button-container">
              <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
              <button onClick={() => handleUpdateBook(book.id)}>Update</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BookListingPage;
