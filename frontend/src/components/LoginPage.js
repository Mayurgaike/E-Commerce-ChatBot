import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const validUsername = 'admin';
    const validPassword = 'password';

    if (username === validUsername && password === validPassword) {
      navigate('/home');
    } else {
      alert('Invalid Username or Password');
    }
  };

  return (
    <div className="login-page">
      <p id='E-commerce-login'>E-Commerce</p>
      <p id='chatbot-login'>ChatBot</p>
      <div className="form-container">
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="btn login-btn">Login</button>
        </form>
        <p className="footer-text">
          New user? <span className="link" onClick={() => navigate('/signup')}>Register here!</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
