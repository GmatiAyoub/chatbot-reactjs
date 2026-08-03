import { useRef } from 'react';

const ChatForm = (setChatHistory) => {
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;
        // Réinitialiser l'input après l'envoi
        inputRef.current.value = '';
        //update the chat history with the new user message
        setChatHistory((history) => [...history, { sender: 'user', text: userMessage }]);
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