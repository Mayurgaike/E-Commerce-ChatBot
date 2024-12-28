import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "../styles/ChatScreen.css";
import userIcon from "../icons/user.png";
import chatbotIcon from "../icons/chatbot.png";
import sendButton from "../icons/sendButton.png";

const ChatScreen = () => {
  const location = useLocation();
  const initialUserMessage = location.state?.userMessage || "";
  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState("");
  const initialMessageProcessed = useRef(false);

  useEffect(() => {
    if (initialUserMessage && !initialMessageProcessed.current) {
      const userTimestamp = new Date().toLocaleTimeString();
      setConversation((prev) => [
        ...prev,
        { type: "user", message: initialUserMessage, timestamp: userTimestamp },
      ]);

      setTimeout(() => {
        const botTimestamp = new Date().toLocaleTimeString();
        setConversation((prev) => [
          ...prev,
          {
            type: "bot",
            message: "Hey There! How can I help you today?",
            timestamp: botTimestamp,
          },
        ]);
      }, 500);

      initialMessageProcessed.current = true;
    }
  }, [initialUserMessage]);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const userTimestamp = new Date().toLocaleTimeString();
      setConversation((prev) => [
        ...prev,
        { type: "user", message, timestamp: userTimestamp },
      ]);
      setMessage("");

      setTimeout(() => {
        const botTimestamp = new Date().toLocaleTimeString();
        setConversation((prev) => [
          ...prev,
          {
            type: "bot",
            message: "Here are some suggestions for you!",
            timestamp: botTimestamp,
          },
        ]);
      }, 500);
    } else {
      alert("Please enter a message!");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-screen">
      <div className="brand-symbol"><img src={chatbotIcon} alt="Bot" className="profile-icon" /><p>E-Commerce ChatBot</p></div>
      <div className="chat-messages">
        {conversation.map((chat, index) => (
          <div
            key={index}
            className={`message-container ${
              chat.type === "user" ? "user-message" : "bot-message"
            }`}
          >
            {chat.type === "bot" && (
              <img src={chatbotIcon} alt="Bot" className="profile-icon" />
            )}
            <div className="message">
              {chat.message}
              <span className="timestamp">{chat.timestamp}</span>
            </div>
            {chat.type === "user" && (
              <img src={userIcon} alt="User" className="profile-icon" />
            )}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSendMessage}>
          <img src={sendButton} alt="Send" className="send-icon" />
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
