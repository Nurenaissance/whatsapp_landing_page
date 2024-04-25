import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './Chatbot.css';

const Chatbot = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const [aiReplies, setAiReplies] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  

  

  const fetchContacts = async () => {
    try {
      const response = await axios.get('https://whatsappbotserver.azurewebsites.net/get-contacts/', {
        headers: {
          'Accept': 'application/json'
        }
      });

      setContacts(response.data);
      
      console.log("response is, ", response); 
      
      response.data.forEach((innerArray, index) => {
        console.log(`Array ${index}:`, innerArray);
      });
  
      // Now you can analyze the inner arrays and determine which one contains the contacts data
      // Once identified, you can setContacts with that data
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const fetchConversation = async (phoneNumber) => {
    try {
      const response = await axios.get(`https://whatsappbotserver.azurewebsites.net/get-map?phone=$(phoneNumber)`);
      const { bot_replies, user_replies } = response.data;
      const newConversation = [];
      for (let i = 0; i < bot_replies.length; i++) {
        if (bot_replies[i] !== '.') {
          newConversation.push({ text: bot_replies[i], sender: 'bot' });
        }
        if (user_replies[i] && user_replies[i] !== '.') {
          newConversation.push({ text: user_replies[i], sender: 'user' });
        }
      }
      setConversation(newConversation);
    } catch (error) {
      console.error('Error fetching conversation:', error);
    }
  };

  useEffect(() => {
    const socket = io('https://whatsappbotserver.azurewebsites.net/');
    socket.on('new-message', (data) => {
      // Check if the received data has a "message" property
      if (data && data.message) {
        // Append the new message to the existing conversation array
        setConversation([...conversation, data.message]);
        console.log('New message received:', data);
        console.log('New Conversation', conversation);
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    fetchConversation(contact.phone_number);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleAiReplies = () => {
    axios.patch('https://whatsappbotserver.azurewebsites.net/toggleAiReplies');
    setAiReplies(!aiReplies);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
    setConversation([...conversation, event.target.value]);
  };

  const sendMessage = async (phoneNumber) => {
    if (!message.trim() || message.trim() === '.') return;

    // Add the user's message to the conversation (excluding '.')
    const newMessage = { text: message, sender: 'user' };
   
    setMessage('');

    try {
      // Make a POST request to send the message
      const response = await axios.post('https://whatsappbotserver.azurewebsites.net/send-message', {phoneNumber, message });
      const data = response.data;

      // Add the chatbot's response to the conversation (excluding '.')
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
        {contacts.map((contact, index) => (
          <p key={index} className="contact-name" onClick={() => handleContactClick(contact)}>
            {contact.name}
          </p>
        ))}
      </div>

      <div className="chat card">
        <div className="conversation">
          <h2>Conversation</h2>
          {selectedContact && (
          <div className="conversation-text">
            {conversation.map((msg, index) => (
              <div key={index} className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}>
                {msg.text !== '.' && msg.text}
              </div>
            ))}
          </div>
          )}
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
        {selectedContact && (
          <div>
            <p><strong>Name:</strong> {selectedContact.name}</p>
            <p><strong>Phone Number:</strong> {selectedContact.phone_number}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
