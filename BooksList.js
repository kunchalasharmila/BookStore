import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './BookList.css';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedLoginState = localStorage.getItem('isLoggedIn');
    if (storedLoginState === 'true') {
      setIsLoggedIn(true); 
    }
    
    // Fetching the list of books
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/books');
        setBooks(response.data.data); 
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []); 

  // Logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false'); 
    navigate('/register'); 
  };

  return (
    <div className="books-list">
      <h2 className="books-list-heading">Enjoy The Books</h2>

      {isLoggedIn && (
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      )}

      <div className="book-cards">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">
              <small>Author: </small>{book.author}
            </p>
            <Link to={`/books/${book.id}`} className="view-details">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksList;
