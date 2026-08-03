import ChatbotIcon from './ChatbotIcon';
const ChatMessage = ({message}) => {
    return (
        <div className={'message ' + (message.sender === 'user' ? 'user-message' : 'bot-message')}>
            {message.sender === 'bot' && <ChatbotIcon />}
            <p className="message-text">{message.text}</p>
        </div>
    );
};

export default ChatMessage;