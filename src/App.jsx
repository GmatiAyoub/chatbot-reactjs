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
        {/* Chatbot body */}
        <div className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">hey there! How can I help you today?</p>  
          </div>
          <div className="message user-message">
            <p className="message-text">Lorem ipsum dolor sit amet consectetur adipiscing.</p>  
          </div>
        </div>

        {/* Chatbot footer */}
        <div className="chat-footer">
          <form action="#" className="chat-form">
            <input type="text" placeholder="Type your message..." className="message-input" required />
            <button className="matrial-symbols-rounded">arrow_upward</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;