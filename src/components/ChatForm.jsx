import { useRef } from 'react';

const ChatForm = ({ chathistory, setChatHistory, generateBotResponse }) => {
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;
        
        // Réinitialiser l'input après l'envoi
        inputRef.current.value = '';
        
        // Mettre à jour l'historique avec le nouveau message utilisateur
        setChatHistory((history) => [...history, { sender: 'user', text: userMessage }]);
        
        // ✅ Ajouter un message "Thinking..." après 600ms
        setTimeout(() => {
            setChatHistory((history) => [...history, { sender: 'bot', text: 'Thinking...' }]);
        }, 600);
        
        // ✅ Appeler generateBotResponse avec l'historique complet après 700ms
        setTimeout(() => {
            // Créer l'historique complet avec le nouveau message
            const updatedHistory = [...chathistory, { sender: 'user', text: userMessage }];
            generateBotResponse(updatedHistory);
        }, 700);
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