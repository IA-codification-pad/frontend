import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button,
  Chip,
  Link,
  Avatar
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ErrorIcon from '@mui/icons-material/Error';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const ChatMessage = ({ message, onOptionClick }) => {
  const { content, type, timestamp, options, isError } = message;
  
  // Formatter l'horodatage
  const formattedTime = format(new Date(timestamp), 'HH:mm', { locale: fr });
  
  // Vérifier si le message contient des liens (simpliste, à améliorer avec regex)
  const formatContentWithLinks = (text) => {
    if (!text.includes('http')) {
      return text;
    }
    
    // Diviser le texte en parties pour séparer les liens
    const parts = text.split(/\b(https?:\/\/[^\s]+)\b/);
    
    return parts.map((part, i) => {
      if (part.match(/^https?:\/\//)) {
        return (
          <Link key={i} href={part} target="_blank" rel="noopener noreferrer">
            {part}
          </Link>
        );
      }
      return part;
    });
  };
  
  // Styles basés sur le type de message
  const messageStyles = {
    user: {
      alignSelf: 'flex-end',
      backgroundColor: 'primary.main',
      color: 'white',
      borderRadius: '18px 18px 4px 18px',
      maxWidth: '75%'
    },
    bot: {
      alignSelf: 'flex-start',
      backgroundColor: isError ? 'error.light' : 'grey.100',
      color: isError ? 'white' : 'text.primary',
      borderRadius: '18px 18px 18px 4px',
      maxWidth: '75%'
    }
  };
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: type === 'user' ? 'row-reverse' : 'row',
        mb: 2,
        alignItems: 'flex-start'
      }}
    >
      {/* Avatar */}
      <Avatar 
        sx={{ 
          ml: type === 'user' ? 1 : 0,
          mr: type === 'user' ? 0 : 1,
          bgcolor: type === 'user' ? 'secondary.main' : isError ? 'error.main' : 'primary.main'
        }}
      >
        {type === 'user' ? <PersonIcon /> : isError ? <ErrorIcon /> : <SmartToyIcon />}
      </Avatar>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: type === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
        {/* Message */}
        <Paper 
          elevation={1} 
          sx={{ 
            p: 2, 
            ...messageStyles[type],
            wordBreak: 'break-word'
          }}
        >
          <Typography variant="body1">
            {formatContentWithLinks(content)}
          </Typography>
        </Paper>
        
        {/* Horodatage */}
        <Typography 
          variant="caption" 
          color="text.secondary"
          sx={{ mt: 0.5, mx: 1 }}
        >
          {formattedTime}
        </Typography>
        
        {/* Options (boutons de réponse rapide) */}
        {type === 'bot' && options && options.length > 0 && (
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1,
            mt: 1,
            maxWidth: '100%'
          }}>
            {options.map((option, index) => (
              <Chip
                key={index}
                label={option}
                onClick={() => onOptionClick(option)}
                clickable
                color="primary"
                variant="outlined"
                size="small"
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatMessage;
