import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';  
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', username: '', password: '' });
    const navigate = useNavigate();

    // Validate form fields
    const validateForm = () => {
        let hasErrors = false;
        setErrors({ email: '', username: '', password: '' });

        // Email validation
        if (!email || email.trim().toLowerCase() === 'null' || email === 'null@gmail.com') {
            setErrors(prev => ({ ...prev, email: 'Email cannot be null or empty' }));
            hasErrors = true;
        } else if (!email.includes('@')) {
            setErrors(prev => ({ ...prev, email: 'Email must contain "@"' }));
            hasErrors = true;
        } else if (!email.match(/^[A-Za-z0-9+_.-]+@gmail\.com$/)) {
            setErrors(prev => ({ ...prev, email: 'Email must be valid and end with @gmail.com' }));
            hasErrors = true;
        }

        // Username validation
        if (!username || username.trim().toLowerCase() === 'null') {
            setErrors(prev => ({ ...prev, username: 'Username cannot be empty or null' }));
            hasErrors = true;
        } else if (username.length < 4 || username.length > 20) {
            setErrors(prev => ({ ...prev, username: 'Username must be between 4 to 20 characters' }));
            hasErrors = true;
        }

        // Password validation
        if (!password || password.trim().toLowerCase() === 'null') {
            setErrors(prev => ({ ...prev, password: 'Password is required' }));
            hasErrors = true;
        } else if (password.length < 4) {
            setErrors(prev => ({ ...prev, password: 'Password must be at least 4 characters' }));
            hasErrors = true;
        }

        return !hasErrors;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }
        try {
          const response=  await axios.post('http://localhost:8080/api/users/register', {
                email,
                username,
                password,
            });
            console.log(response.data);
            toast.success('Registration successful!', {
                position: 'top-right',
                autoClose: 2000,
            });

            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed. Please try again.';
            toast.error(message, {
                position: 'top-right',
                autoClose: 2000,
            });
        }
    };

    return (
        <div className="auth-container">
            <ToastContainer />
            <div className="auth-form">
                <h2 className="auth-heading">Register</h2>
                <form onSubmit={handleSubmit}>
                    {/* Email input */}
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-input"
                            value={email}
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    {/* Username input */}
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-input"
                            value={username}
                            placeholder="Choose a username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {errors.username && <span className="error-text">{errors.username}</span>}
                    </div>

                    {/* Password input */}
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-input"
                            value={password}
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>

                    {/* Submit button */}
                    <button type="submit" className="submit-btn">Register</button>

                    <div className="register-link">
                        <small>Already have an account? <a href="/login">Log in here</a></small>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
