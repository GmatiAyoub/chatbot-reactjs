import ChatbotIcon from './components/ChatbotIcon';
const App = () => {
  return (
    <div className="container">
      <div className="chatbot-popup">
        {/* Chatbot header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">chatbot</h2>
          </div>
          <button className="material-symbols-outlined">keyboard_arrow_down</button>
        </div>
      </div>
    </div>
  );
};

export default App;