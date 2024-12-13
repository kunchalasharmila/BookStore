import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import './AuthForm.css';

const Login = ({ setIsLoggedIn, setUsername }) => {
  const [username, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '', server: '' });
  const navigate = useNavigate();

  // Validate the form
  const validateForm = () => {
    let hasErrors = false;
    setErrors({ username: '', password: '', server: '' });

    if (!username || username.trim().toLowerCase() === 'null') {
      setErrors(prev => ({ ...prev, username: 'Username cannot be empty or null' }));
      hasErrors = true;
    } else if (username.length < 4 || username.length > 20) {
      setErrors(prev => ({ ...prev, username: 'Username must be between 4 to 20 characters' }));
      hasErrors = true;
    }

    if (!password || password.trim().toLowerCase() === 'null') {
      setErrors(prev => ({ ...prev, password: 'Password cannot be empty or null' }));
      hasErrors = true;
    } else if (password.length < 4) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 4 characters long' }));
      hasErrors = true;
    }

    return !hasErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ username: '', password: '', server: '' }); 

    // Validate the form before submitting
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        username,
        password,
      });

      console.log('Response from backend:', response.data); 

      if (response.data?.message === 'Login successful') {
        const { username: returnedUsername } = response.data.data;
        setIsLoggedIn(true);
        setUsername(returnedUsername);

        toast.success('Login successful.', { position: 'top-right' });

        setTimeout(() => {
          navigate('/books'); 
        }, 2000); 
      } else {
        setErrors(prev => ({ ...prev, server: 'Invalid credentials.' }));
      }
    } catch (error) {
      console.error('Error during login:', error);
      const message = error.response?.data?.message || 'Invalid Credentials.';
      setErrors(prev => ({ ...prev, server: message }));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 className="auth-heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-input"
              value={username}
              placeholder="Enter username"
              onChange={(e) => setUsernameInput(e.target.value)}
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <button type="submit" className="submit-btn">Login</button>
          {errors.server && <div className="error-text">{errors.server}</div>}

          <div className="register-link">
            <small>Don't have an account? <a href="/register">Register here</a>.</small>
          </div>
        </form>
      </div>
      <ToastContainer /> 
    </div>
  );
};

export default Login;
