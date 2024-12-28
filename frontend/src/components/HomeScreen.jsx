import React from 'react';
import { useNavigate } from 'react-router-dom';

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
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress} // Listen for Enter key
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default HomeScreen;
