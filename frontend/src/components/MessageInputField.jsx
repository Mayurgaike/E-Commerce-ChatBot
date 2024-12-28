import React from "react";

const MessageInputField = () => {
  return (
    <div className="chat-input">
      <input type="text" placeholder="Type a message..." />
      <button className="send-button">➤</button>
    </div>
  );
};

export default MessageInputField;
