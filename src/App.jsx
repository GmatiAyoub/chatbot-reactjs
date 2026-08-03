import { useState } from 'react';
import ChatbotIcon from './components/ChatbotIcon';
import ChatForm from './components/ChatForm';
import ChatMessage from './components/ChatMessage';

const App = () => {
  const [chathistory, setChatHistory] = useState([]);

  //Fonction qui affiche juste l'historique dans la console
  const generateBotResponse = (history) => {
    console.log("Historique complet du chat:", history);
    
    // Afficher chaque message de façon détaillée
    history.forEach((msg, index) => {
      console.log(`Message ${index + 1}:`, msg);
    });
    
    // Afficher le dernier message
    const lastMessage = history[history.length - 1];
    console.log(" Dernier message:", lastMessage);
    console.log("Expéditeur:", lastMessage.sender);
    console.log("Texte:", lastMessage.text);
  };

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
        </div>
        
        {/* Chatbot footer */}
        <div className="chatbot-footer">
          <ChatForm 
            chathistory={chathistory} 
            setChatHistory={setChatHistory} 
            generateBotResponse={generateBotResponse} 
          />
        </div>
      </div>
    </div>
  );
};

export default App;