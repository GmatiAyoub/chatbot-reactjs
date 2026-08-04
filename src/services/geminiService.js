const API_URL = 'http://localhost:3000/api/chat';

// ✅ Ignorer l'avertissement pour history si tu ne l'utilises pas
// eslint-disable-next-line no-unused-vars
export const generateResponse = async (message, history = []) => {
  try {
    console.log("🚀 Envoi au backend:", message);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Réponse du backend:", data);

    if (!data.success) {
      throw new Error(data.error || "Erreur inconnue");
    }

    return data.response;

  } catch (error) {
    console.error("❌ Erreur:", error.message);
    
    // Fallback en cas d'erreur
    const fallbacks = [
      "I'm here to help! 😊",
      "Tell me more about that!",
      "Interesting! What else?",
      "Let me think about that... 🤔",
      "That's a great question! 💡",
      "I'm glad you asked! 😊",
      "Great point! Let me think...",
      "Hmm, that's interesting!"
    ];
    
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
};