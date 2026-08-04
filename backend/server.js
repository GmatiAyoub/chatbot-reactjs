import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Réponses de secours (fallback)
const fallbackMessages = [
  "I'm here to help! 😊",
  "Tell me more about that!",
  "Interesting! What else?",
  "Let me think about that... 🤔",
  "That's a great question! 💡",
  "I'm glad you asked! 😊",
  "Great point! Let me think...",
  "Hmm, that's interesting!",
  "I understand completely!",
  "What a great question! 🎉"
];

// Endpoint chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    console.log("📩 Message reçu:", message);

    // Vérifier si la clé API existe
    if (!process.env.HF_API_KEY) {
      console.warn("⚠️ Clé API Hugging Face manquante, fallback");
      const random = fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)];
      return res.json({ success: true, response: random, mode: 'fallback' });
    }

    // Tentative d'appel à l'API Hugging Face
    try {
      // Remplacer la partie API par:
const response = await axios({
  method: 'POST',
  url: 'https://openrouter.ai/api/v1/chat/completions',
  headers: {
    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': 'http://localhost:3000',
    'X-Title': 'Chatbot ReactJS'
  },
  data: {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: message }],
    temperature: 0.7,
    max_tokens: 150
  }
});

const reply = response.data.choices[0]?.message?.content || null;

      const reply = response.data?.[0]?.generated_text || null;
      
      if (reply) {
        console.log("✅ Réponse API Hugging Face:", reply);
        return res.json({ success: true, response: reply, mode: 'api' });
      }
    } catch (apiError) {
      console.warn("⚠️ API Hugging Face échouée:", apiError.response?.status || apiError.message);
      // On continue vers le fallback
    }

    // Fallback : réponse aléatoire
    const random = fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)];
    console.log("🔄 Fallback utilisé");
    res.json({ success: true, response: random, mode: 'fallback' });

  } catch (error) {
    console.error("❌ Erreur serveur:", error.message);
    // Toujours renvoyer une réponse JSON même en cas d'erreur
    const random = fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)];
    res.json({ success: true, response: random, mode: 'error-fallback' });
  }
});

// Route de santé
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Backend is running!',
    hasApiKey: !!process.env.HF_API_KEY
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend sur http://localhost:${PORT}`);
  console.log(`🔑 Clé API Hugging Face: ${process.env.HF_API_KEY ? '✅ présente' : '❌ absente'}`);
  console.log(`📌 Mode: ${process.env.HF_API_KEY ? 'API + Fallback' : 'Fallback uniquement'}`);
});
