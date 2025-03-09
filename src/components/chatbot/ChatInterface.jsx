import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  IconButton, 
  CircularProgress,
  Divider,
  Button
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ChatMessage from './ChatMessage';
import { useChatbot } from '../../hooks/useChatbot';

const ChatInterface = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  const { sendMessage, conversation } = useChatbot();
  
  // Synchroniser l'historique de conversation du contexte
  useEffect(() => {
    if (conversation && conversation.length > 0) {
      setChatHistory(conversation);
    }
  }, [conversation]);
  
  // Faire défiler jusqu'au dernier message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);
  
  const handleSendMessage = async (e) => {
    e?.preventDefault();
    
    if (!message.trim()) {
      return;
    }
    
    // Ajouter le message de l'utilisateur à l'historique
    const userMessage = {
      id: Date.now(),
      content: message,
      type: 'user',
      timestamp: new Date().toISOString()
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setLoading(true);
    
    try {
      // Envoyer le message au chatbot et obtenir la réponse
      const response = await sendMessage(message);
      
      // Ajouter la réponse du chatbot à l'historique
      const botMessage = {
        id: Date.now() + 1,
        content: response.text,
        type: 'bot',
        timestamp: new Date().toISOString(),
        options: response.options || []
      };
      
      setChatHistory(prev => [...prev, botMessage]);
    } catch (error) {
      // Ajouter un message d'erreur
      const errorMessage = {
        id: Date.now() + 1,
        content: "Désolé, je n'ai pas pu traiter votre demande. Veuillez réessayer.",
        type: 'bot',
        isError: true,
        timestamp: new Date().toISOString()
      };
      
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleOptionClick = (optionText) => {
    setMessage(optionText);
    handleSendMessage();
  };
  
  const handleReset = () => {
    const confirmReset = window.confirm("Voulez-vous vraiment effacer cette conversation?");
    if (confirmReset) {
      setChatHistory([]);
    }
  };
  
  // Ajouter un message d'accueil initial si l'historique est vide
  useEffect(() => {
    if (chatHistory.length === 0) {
      const welcomeMessage = {
        id: Date.now(),
        content: "Bonjour! Je suis l'assistant du système de codification. Comment puis-je vous aider aujourd'hui?",
        type: 'bot',
        timestamp: new Date().toISOString(),
        options: [
          "Comment classifier une marchandise?",
          "Quelle est la classe tarifaire pour 'café en grains'?",
          "Comment résoudre une ambiguïté?",
          "Générer un rapport de classifications"
        ]
      };
      
      setChatHistory([welcomeMessage]);
    }
  }, []);
  
  return (
    <Paper sx={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
      {/* Entête du chat */}
      <Box sx={{ 
        p: 2, 
        backgroundColor: 'primary.main', 
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h6">
          Assistant IA
        </Typography>
        <IconButton 
          color="inherit" 
          size="small" 
          onClick={handleReset}
          title="Nouvelle conversation"
        >
          <AutorenewIcon />
        </IconButton>
      </Box>
      
      <Divider />
      
      {/* Zone de messages */}
      <Box sx={{ 
        p: 2, 
        flexGrow: 1, 
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {chatHistory.map((msg) => (
          <ChatMessage 
            key={msg.id} 
            message={msg} 
            onOptionClick={handleOptionClick} 
          />
        ))}
        
        {loading && (
          <Box sx={{ 
            alignSelf: 'flex-start', 
            display: 'flex', 
            alignItems: 'center', 
            mb: 2, 
            ml: 2 
          }}>
            <CircularProgress size={20} />
            <Typography variant="body2" sx={{ ml: 1 }}>
              En train d'écrire...
            </Typography>
          </Box>
        )}
        
        <div ref={messagesEndRef} />
      </Box>
      
      <Divider />
      
      {/* Zone de saisie */}
      <Box 
        component="form" 
        onSubmit={handleSendMessage}
        sx={{ 
          p: 2, 
          backgroundColor: 'background.default',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Saisissez votre message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
          size="small"
          sx={{ mr: 1 }}
          autoComplete="off"
        />
        <IconButton 
          color="primary" 
          type="submit"
          disabled={!message.trim() || loading}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ChatInterface;