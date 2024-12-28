import React from "react";
import BotIcon from "./BotIcon";

const BotMessage = ({ message, timestamp }) => {
  return (
    <div className="message bot">
      <BotIcon />
      <div>
        <div>{message}</div>
        <span className="timestamp">{timestamp}</span>
      </div>
    </div>
  );
};

export default BotMessage;
