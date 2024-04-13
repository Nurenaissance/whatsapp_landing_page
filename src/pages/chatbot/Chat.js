import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
  const [contact, setContact] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const [aiReplies, setAiReplies] = useState(false);

  useEffect(() => {
    fetchConversation();
    fetchContact();
  }, []);

  const fetchConversation = async () => {
    try {
      const response = await axios.get('https://climbing-ripple-angora.glitch.me/get-map/919528227181/');
      const { bot_replies, user_replies } = response.data;
      const newConversation = [];
      for (let i = 0; i < bot_replies.length; i++) {
        newConversation.push({ text: bot_replies[i], sender: 'bot' });
        if (user_replies[i]) {
          newConversation.push({ text: user_replies[i], sender: 'user' });
        }
      }
      setConversation(newConversation);
    } catch (error) {
      console.error('Error fetching conversation:', error);
    }
  };

  const fetchContact = async () => {
    try {
      const response = await axios.get('https://climbing-ripple-angora.glitch.me/get-map/919528227181/');
      setContact(response.data.contact);
    } catch (error) {
      console.error('Error fetching contact:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleAiReplies = () => {
    setAiReplies(!aiReplies);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Add the user's message to the conversation
    const newMessage = { text: message, sender: 'user' };
    setConversation([...conversation, newMessage]);
    setMessage('');

    try {
      // Make a POST request to send the message
      const response = await axios.post('/api/send-message', { message });
      const data = response.data;

      // Add the chatbot's response to the conversation
      const chatbotResponse = { text: data.message, sender: 'chatbot' };
      setConversation([...conversation, chatbotResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="contacts card">
        <h2>Contacts</h2>
        <input type="text" placeholder="Search contacts..." value={searchQuery} onChange={handleSearch} />
        {/* Render contacts list here */}
      </div>

      <div className="chat card">
        <div className="conversation">
          <h2>Conversation</h2>
          <div className="conversation-text">
            {/* Render conversation messages here */}
            {conversation.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
        </div>
        <div className="input-area">
          <input
            type="text"
            placeholder={aiReplies ? 'Waiting for AI response...' : 'Type your message...'}
            value={message}
            onChange={handleMessageChange}
            disabled={aiReplies}
          />
          <button onClick={toggleAiReplies}>AI Replies: {aiReplies ? 'On' : 'Off'}</button>
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>

      <div className="contact-details card">
        <h2>Contact Details</h2>
        {contact && (
          <div>
            <p><strong>Name:</strong> {contact.name}</p>
            <p><strong>Phone Number:</strong> {contact.phone_number}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
