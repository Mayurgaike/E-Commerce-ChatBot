import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.status === 'success') {
        alert("Successfully registered! Please Login using your Username and Password")
        navigate("/login");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <p id='E-commerce-login'>E-Commerce</p>
      <p id='chatbot-login'>ChatBot</p>
      <div className="form-container">
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn signup-btn">Sign Up</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p className="footer-text">
          Already registered? <span className="link" onClick={() => navigate('/login')}>Login here!</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
