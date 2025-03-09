import { useContext } from 'react';
import { ChatbotContext } from '../context/ChatbotContext';

const useChatbot = () => {
  return useContext(ChatbotContext);
};

export default useChatbot;