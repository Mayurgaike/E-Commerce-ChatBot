import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    alert('Sign up functionality coming soon!');
  };

  return (
    <div className="login-page">
        <p id='E-commerce-login'>E-Commerce</p>
        <p id='chatbot-login'>ChatBot</p>
      <div className="form-container">
        <form onSubmit={handleSignUp}>
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
        <p className="footer-text">
          Already registered? <span className="link" onClick={() => navigate('/login')}>Login here!</span>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
