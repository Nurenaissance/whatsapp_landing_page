// ChatMessage.js
import React from 'react';

const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.isSender ? 'sender' : 'receiver'}`}>
      <span className="message">{message.text}</span>
      <span className="timestamp">{message.timestamp}</span>
    </div>
  );
};

export default ChatMessage;
