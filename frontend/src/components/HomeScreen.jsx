import React from 'react';
import { useNavigate } from 'react-router-dom';
import sendButton from "../icons/sendButton.png";
import "../styles/HomeScreen.css";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState('');

  const handleSendMessage = () => {
    if (message.trim() === '') return; // Avoid sending empty messages

    // Navigate to ChatScreen with the user's message under "userMessage" key
    navigate('/chat', { state: { userMessage: message } });
    setMessage(''); // Clear input field after sending
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="home-screen">
      <div className="brand-title">
        <p id='E-commerce'>E-Commerce</p>
        <p id='chatbot'>ChatBot</p>
        <p id='help-you'>How can I help you today!?</p>
      </div>
      <div className="input-container">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress} // Listen for Enter key
      />
      <button onClick={handleSendMessage}>
        <img src={sendButton} alt="Send" className="send-icon" />
      </button>
      </div>
    </div>
  );
};

export default HomeScreen;
