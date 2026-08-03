import { useRef } from 'react';

const ChatForm = ({ setChatHistory }) => {
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;
        // Réinitialiser l'input après l'envoi
        inputRef.current.value = '';
        //update the chat history with the new user message
        setChatHistory((history) => [...history, { sender: 'user', text: userMessage }]);
        //add a thinking placeholder message from the bot after a delay of 600ms
        setTimeout(() => {
            setChatHistory((history) => [...history, { sender: 'bot', text: 'Thinking...' }]);
        }, 600);
    };
    return (
        <form action="#" className="chat-form" onSubmit={handleSubmit}>
            <input 
                ref={inputRef} 
                type="text" 
                placeholder="Type your message..." 
                className="message-input" 
                required 
            />
            <button type="submit" className="material-symbols-rounded">
                arrow_upward
            </button>
        </form>
    );
};

export default ChatForm;