import { useState, useEffect } from 'react';
import ChatbotIcon from './components/ChatbotIcon';
import ChatForm from './components/ChatForm';
import ChatMessage from './components/ChatMessage';
import { generateResponse } from './services/geminiService';

const App = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isBackendReady, setIsBackendReady] = useState(false);

  // Vérifier si le backend est accessible
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/health');
        if (response.ok) {
          setIsBackendReady(true);
          console.log("✅ Backend connecté!");
        } else {
          console.warn("⚠️ Backend répond mais pas en bonne santé");
          setIsBackendReady(false);
        }
      } catch (error) {
        console.warn("⚠️ Backend non accessible:", error.message);
        console.log("💡 Assure-toi que le backend tourne sur http://localhost:3000");
        setIsBackendReady(false);
      }
    };
    
    checkBackend();
  }, []);

  // Fonction pour générer la réponse du bot
  const generateBotResponse = async (userMessage, history) => {
    setIsWaiting(true);

    try {
      // Filtrer l'historique pour enlever les "Thinking..."
      const filteredHistory = history.filter(
        msg => msg.text !== 'Thinking...'
      );

      // Obtenir la réponse du backend
      const responseText = await generateResponse(
        userMessage,
        filteredHistory
      );

      // Remplacer "Thinking..." par la vraie réponse
      setChatHistory((currentHistory) => {
        const newHistory = [...currentHistory];
        const lastIndex = newHistory.length - 1;
        
        // Si le dernier message est "Thinking...", le remplacer
        if (newHistory[lastIndex]?.text === 'Thinking...') {
          newHistory[lastIndex] = { sender: 'bot', text: responseText };
        } else {
          // Sinon, ajouter un nouveau message
          newHistory.push({ sender: 'bot', text: responseText });
        }
        return newHistory;
      });
    } catch (error) {
      console.error("❌ Erreur lors de la génération de la réponse:", error);
      
      // En cas d'erreur, remplacer "Thinking..." par un message d'erreur
      setChatHistory((currentHistory) => {
        const newHistory = [...currentHistory];
        const lastIndex = newHistory.length - 1;
        if (newHistory[lastIndex]?.text === 'Thinking...') {
          newHistory[lastIndex] = { 
            sender: 'bot', 
            text: "Désolé, je rencontre un problème technique. 😅" 
          };
        }
        return newHistory;
      });
    } finally {
      setIsWaiting(false);
    }
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
          <button className="material-symbols-outlined">
            keyboard_arrow_down
          </button>
        </div>
        
        {/* Chatbot body */}
        <div className="chatbot-body">
          {/* Message initial du bot */}
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              hey there! How can I help you today? 😊
              {!isBackendReady && (
                <span style={{ display: 'block', fontSize: '0.7rem', color: '#999', marginTop: '5px' }}>
                  ⚠️ Mode hors-ligne (backend non disponible)
                </span>
              )}
            </p>  
          </div>
          
          {/* Affichage dynamique de l'historique des messages */}
          {chatHistory.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
        
        {/* Chatbot footer */}
        <div className="chatbot-footer">
          <ChatForm 
            chatHistory={chatHistory} 
            setChatHistory={setChatHistory} 
            generateBotResponse={generateBotResponse}
            isWaiting={isWaiting}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
