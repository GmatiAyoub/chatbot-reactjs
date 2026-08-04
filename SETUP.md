# 🚀 Guide de Configuration du Chatbot React

## Prérequis
- Node.js 16+ installé
- npm ou yarn

## Installation et Démarrage

### 1️⃣ Installer les dépendances (FRONTEND)
```bash
npm install
```

### 2️⃣ Installer les dépendances (BACKEND)
```bash
cd backend
npm install
```

### 3️⃣ Configurer les variables d'environnement

Créer un fichier `.env` dans le dossier `backend/`:

```bash
# backend/.env
NINJAS_API_KEY=your_actual_api_key_here
PORT=3000
```

**Pour obtenir une clé API:**
1. Aller sur https://api-ninjas.com/register
2. Créer un compte gratuit
3. Copier votre clé API
4. La coller dans le fichier `.env`

### 4️⃣ Démarrer le backend
```bash
cd backend
npm start
# ou pour le développement
npm run dev
```

Vous devriez voir:
```
🚀 Backend sur http://localhost:3000
🔑 Clé API Ninjas: ✅ présente
📌 Mode: API + Fallback
```

### 5️⃣ Démarrer le frontend (dans un nouveau terminal)
```bash
npm run dev
```

Le chatbot devrait s'ouvrir sur `http://localhost:5173`

## 🔍 Vérification

✅ Le frontend doit afficher: "✅ Backend connecté!"
✅ Le chatbot doit répondre aux messages
✅ Vérifier la console du navigateur pour les logs

## ⚠️ Dépannage

| Problème | Solution |
|----------|----------|
| "Backend non accessible" | Vérifier que `npm start` est exécuté dans `backend/` |
| "Clé API absente" | Créer `.env` dans `backend/` avec la clé Ninjas |
| "CORS error" | Le CORS est déjà configuré dans `server.js` |
| Le chatbot ne répond pas | Vérifier les logs du backend pour les erreurs |

## 📚 Structure du Projet

```
chatbot-reactjs/
├── src/
│   ├── components/        # Composants React
│   │   ├── ChatForm.jsx    # Formulaire d'envoi
│   │   ├── ChatMessage.jsx # Affichage des messages
│   │   └── ChatbotIcon.jsx # Icône du bot
│   ├── services/
│   │   └── geminiService.js # Communication avec le backend
│   ├── App.jsx             # Composant principal
│   ├── main.jsx            # Point d'entrée React
│   └── index.css           # Styles
├── backend/
│   ├── server.js           # Serveur Express
│   ├── .env                # Variables d'environnement (À CRÉER)
│   └── package.json
├── public/                 # Assets statiques
└── index.html             # HTML principal
```

## 🎯 Fonctionnalités

✅ Chat en temps réel
✅ Réponses de l'API Ninjas
✅ Mode fallback (réponses aléatoires si API indisponible)
✅ Affichage du statut du backend
✅ Historique des messages
✅ Interface responsive

---

**Besoin d'aide ?** Vérifiez les logs du navigateur et du terminal backend pour identifier les erreurs.
