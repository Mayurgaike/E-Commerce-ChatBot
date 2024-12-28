import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"; // Import axios to handle the backend request
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
  const chatEndRef = useRef(null); // Reference for scrolling to the end

  // Effect to process the initial user message and load bot's response based on the message
  useEffect(() => {
    if (initialUserMessage && !initialMessageProcessed.current) {
      const userTimestamp = new Date().toLocaleTimeString();
      setConversation((prev) => [
        ...prev,
        { type: "user", message: initialUserMessage, timestamp: userTimestamp },
      ]);

      // Send the user's message to the bot and get a proper response
      setTimeout(async () => {
        try {
          const response = await axios.post("http://localhost:5000/chat", {
            message: initialUserMessage,
          });

          const botTimestamp = new Date().toLocaleTimeString();
          const botMessage = response.data.response; // Assuming response has 'response' field

          setConversation((prev) => [
            ...prev,
            {
              type: "bot",
              message: botMessage,
              timestamp: botTimestamp,
            },
          ]);
        } catch (error) {
          console.error("Error during chat request:", error);
          const botTimestamp = new Date().toLocaleTimeString();
          setConversation((prev) => [
            ...prev,
            {
              type: "bot",
              message: "Sorry, something went wrong. Please try again later.",
              timestamp: botTimestamp,
            },
          ]);
        }
      }, 500);

      initialMessageProcessed.current = true;
    }
  }, [initialUserMessage]);

  // Function to handle sending message to backend and updating conversation
  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      const userTimestamp = new Date().toLocaleTimeString();
      setConversation((prev) => [
        ...prev,
        { type: "user", message, timestamp: userTimestamp },
      ]);
      setMessage(""); // Clear message input

      try {
        const response = await axios.post("http://localhost:5000/chat", {
          message,
        });

        const botTimestamp = new Date().toLocaleTimeString();
        const botMessage = response.data.response; // Assuming response has 'response' field

        setConversation((prev) => [
          ...prev,
          {
            type: "bot",
            message: botMessage,
            timestamp: botTimestamp,
          },
        ]);
      } catch (error) {
        console.error("Error during chat request:", error);
        const botTimestamp = new Date().toLocaleTimeString();
        setConversation((prev) => [
          ...prev,
          {
            type: "bot",
            message: "Sorry, something went wrong. Please try again later.",
            timestamp: botTimestamp,
          },
        ]);
      }
    } else {
      alert("Please enter a message!");
    }
  };

  // Function to trigger send message when pressing "Enter" key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Scroll to the bottom when new messages are added
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  return (
    <div className="chat-screen">
      <div className="brand-symbol">
        <img src={chatbotIcon} alt="Bot" className="profile-icon" />
        <p>E-Commerce ChatBot</p>
      </div>
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
        <div ref={chatEndRef} /> {/* This is the reference to scroll to the bottom */}
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
