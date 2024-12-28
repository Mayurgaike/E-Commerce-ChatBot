import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sendButton from "../icons/sendButton.png";
import "../styles/HomeScreen.css";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    navigate('/chat', { state: { userMessage: message } });
    setMessage('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="home-screen">
      <div className="brand-title">
        <p id="E-commerce">E-Commerce</p>
        <p id="chatbot">ChatBot</p>
        <p id="help-you">How can I help you today!?</p>
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSendMessage}>
          <img src={sendButton} alt="Send" className="send-icon" />
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
