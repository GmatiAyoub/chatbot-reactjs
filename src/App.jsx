import { useState } from 'react';
import ChatbotIcon from './components/ChatbotIcon';
import ChatForm from './components/ChatForm';
import ChatMessage from './components/ChatMessage';

const App = () => {
  const [chathistory, setChatHistory] = useState([]);
  return (
    <div className="container">
      <div className="chatbot-popup">
        {/* Chatbot header */}
        <div className="chatbot-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">chatbot</h2>
          </div>
          <button className="material-symbols-outlined">keyboard_arrow_down</button>
        </div>
        {/* Chatbot body */}
        <div className="chatbot-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">hey there! How can I help you today?</p>  
          </div>
          {/* Chat history dynamically */}
          {chathistory.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}

          <div className="message user-message">
            <p className="message-text">Lorem ipsum dolor sit amet consectetur adipiscing.</p>  
          </div>
        </div>

        {/* Chatbot footer */}
        <div className="chatbot-footer">
          <ChatForm setChatHistory={setChatHistory} />
        </div>
      </div>
    </div>
  );
};

export default App;