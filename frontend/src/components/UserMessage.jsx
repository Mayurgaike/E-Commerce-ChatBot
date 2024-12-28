import React from "react";
import UserIcon from "./UserIcon";

const UserMessage = ({ message, timestamp }) => {
  return (
    <div className="message user">
      <UserIcon />
      <div>
        <div>{message}</div>
        <span className="timestamp">{timestamp}</span>
      </div>
    </div>
  );
};

export default UserMessage;
