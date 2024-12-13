import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './BookDetail.css';  

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/books/${id}`);
        setBook(response.data.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1); 
  };

  if (!book) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="book-detail-container">
      <div className="book-detail-card">
        <h2 className="book-title">{book.title}</h2>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Description:</strong> {book.description}</p>
        <p><strong>Price:</strong> ${book.price}</p>
        
        {/* Go Back Button */}
        <button onClick={handleGoBack} className="go-back-button">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default BookDetail;
