import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = async () => {
    if (inputMessage) {
      const response = await axios.post(
        'https://green-api.com/api/sendmessage',
        {
          phone: '1101852976',
          text: inputMessage,
          token: '3e4822062bc147b5b173e784b88709d97cee7dd9dd474d31a4',
        }
      );
      if (response.data.success) {
        setMessages([
          ...messages,
          { text: inputMessage, timestamp: moment().format('LT') },
        ]);
        setInputMessage('');
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'https://green-api.com/api/receiving?token=YOUR_GREEN_API_TOKEN'
      );
      if (response.data.success) {
        setMessages(response.data.data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat">
          {messages.map((message, index) => (
            <div className="message" key={index}>
              <div className="message-text">{message.text}</div>
              <div className="message-timestamp">{message.timestamp}</div>
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
