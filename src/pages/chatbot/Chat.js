import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [currentContact, setCurrentContact] = useState(null);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Add user message to conversation
    setConversation([...conversation, { text: message, sender: 'user' }]);
    setMessage('');

    try {
      // Send user message to backend
      const response = await axios.post('/api/send-message', { message });
      const data = response.data;

      // Add chatbot response to conversation
      setConversation([...conversation, { text: data.message, sender: 'chatbot' }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const selectContact = async (contactName) => {
    setCurrentContact(contactName);
    try {
      // Fetch conversation with selected contact from backend
      const response = await axios.get(`/api/conversation/${contactName}`);
      const data = response.data;
      setConversation(data.conversation);
    } catch (error) {
      console.error('Error fetching conversation:', error);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Left side - Contacts */}
      <div className="contacts card">
        <h2>Contacts</h2>
        <ul>
          <li onClick={() => selectContact('John')}>John</li>
          <li onClick={() => selectContact('Jane')}>Jane</li>
          {/* Add more contacts as needed */}
        </ul>
      </div>

      {/* Center - Chat messages */}
      <div className="chat card">
        <div className="conversation">
          {conversation.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="input-area">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={handleMessageChange}
            onKeyPress={(event) => event.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>

      {/* Right side - Contact details */}
      <div className="contact-details card">
        <h2>Contact Details</h2>
        {currentContact && <p>{currentContact}</p>}
        {/* Add more contact details as needed */}
      </div>
    </div>
  );
};

export default Chatbot;
