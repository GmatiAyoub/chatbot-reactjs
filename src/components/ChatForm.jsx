import { useRef } from 'react';

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse, isWaiting }) => {
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Empêcher l'envoi si le bot est en train de répondre
        if (isWaiting) return;
        
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;
        
        // Réinitialiser l'input après l'envoi
        inputRef.current.value = '';
        
        // Mettre à jour l'historique avec le nouveau message utilisateur
        setChatHistory((history) => [...history, { sender: 'user', text: userMessage }]);
        
        // Ajouter un message "Thinking..." après 600ms
        setTimeout(() => {
            setChatHistory((history) => [...history, { sender: 'bot', text: 'Thinking...' }]);
        }, 600);
        
        // Appeler la fonction pour générer la réponse après 700ms
        setTimeout(() => {
            const updatedHistory = [...chatHistory, { sender: 'user', text: userMessage }];
            generateBotResponse(updatedHistory);
        }, 700);
    };

    return (
        <form action="#" className="chat-form" onSubmit={handleSubmit}>
            <input 
                ref={inputRef} 
                type="text" 
                placeholder={isWaiting ? "Le bot répond..." : "Type your message..."} 
                className="message-input" 
                required 
                disabled={isWaiting}
            />
            <button 
                type="submit" 
                className="material-symbols-rounded"
                disabled={isWaiting}
            >
                arrow_upward
            </button>
        </form>
    );
};

export default ChatForm;