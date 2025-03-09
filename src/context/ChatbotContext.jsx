import React, { createContext, useState, useCallback } from 'react';
import { chatbotService } from '../services/chatbotService';

export const ChatbotContext = createContext();

export const ChatbotProvider = ({ children }) => {
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Envoyer un message au chatbot
  const sendMessage = useCallback(async (message) => {
    setLoading(true);
    try {
      const response = await chatbotService.sendMessage(message);
      return response;
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Récupérer l'historique de conversation
  const getConversationHistory = useCallback(async () => {
    try {
      const history = await chatbotService.getConversationHistory();
      setConversation(history);
      return history;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique:', error);
      throw error;
    }
  }, []);
  
  // Effacer l'historique de conversation
  const clearConversation = useCallback(async () => {
    try {
      await chatbotService.clearConversation();
      setConversation([]);
    } catch (error) {
      console.error('Erreur lors de l\'effacement de l\'historique:', error);
      throw error;
    }
  }, []);
  
  return (
    <ChatbotContext.Provider
      value={{
        conversation,
        loading,
        sendMessage,
        getConversationHistory,
        clearConversation
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};