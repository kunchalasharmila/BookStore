import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import Login from './Login';
import BooksList from './BooksList';
import BookDetail from './BookDetail';
import './App.css';

const App = () => {

  const storedLoginStatus = localStorage.getItem('isLoggedIn') === 'true';
  const [isLoggedIn, setIsLoggedIn] = useState(storedLoginStatus);
  const [username, setUsername] = useState('');

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('isLoggedIn');  // Remove login status from localStorage
  };

  // Set the logged-in status in localStorage whenever it changes
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('isLoggedIn', 'true');  // Save login state to localStorage
    } else {
      localStorage.removeItem('isLoggedIn');  // Clear login state from localStorage
    }
  }, [isLoggedIn]);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<RegisterForm />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
          
          {/* Only show BooksList if logged in, otherwise redirect to Login */}
          <Route path="/books" element={isLoggedIn ? <BooksList /> : <Navigate to="/login" />} />
          
          {/* Only show BookDetail if logged in, otherwise redirect to Login */}
          <Route path="/books/:id" element={isLoggedIn ? <BookDetail /> : <Navigate to="/login" />} />
          
          {/* If logged in, redirect to books, else show register page */}
          <Route path="/register" element={isLoggedIn ? <Navigate to="/books" /> : <RegisterForm />} />
        </Routes>

        {/* Show logout button only if user is logged in and on books/list pages */}
        {isLoggedIn && (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
      </div>
    </Router>
  );
};

export default App;
