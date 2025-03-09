import React from 'react';
import { 
  Container, 
  Typography, 
  Box,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Breadcrumbs,
  Link as MuiLink
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import HelpIcon from '@mui/icons-material/Help';
import SearchIcon from '@mui/icons-material/Search';
import DescriptionIcon from '@mui/icons-material/Description';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ChatInterface from '../components/chatbot/ChatInterface';
import { ChatbotProvider } from '../context/ChatbotContext';

const ChatbotPage = () => {
  return (
    <ChatbotProvider>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <MuiLink
              component={RouterLink}
              to="/"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Accueil
            </MuiLink>
            <Typography
              sx={{ display: 'flex', alignItems: 'center' }}
              color="text.primary"
            >
              <ChatIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Assistant Chatbot
            </Typography>
          </Breadcrumbs>
        </Box>
        
        <Typography variant="h4" component="h1" gutterBottom>
          Assistant Chatbot
        </Typography>
        
        <Typography variant="body1" paragraph>
          Posez vos questions et recevez de l'aide instantanée pour vos besoins de codification. L'assistant peut vous aider à trouver des classes tarifaires, comprendre les processus et générer des rapports.
        </Typography>
        
        <Grid container spacing={3}>
          {/* Chatbot */}
          <Grid item xs={12} md={8}>
            <ChatInterface />
          </Grid>
          
          {/* Suggestions */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ 
                p: 2, 
                backgroundColor: 'primary.main', 
                color: 'white'
              }}>
                <Typography variant="h6">
                  Suggestions
                </Typography>
              </Box>
              
              <Divider />
              
              <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <HelpIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Aide générale" 
                      secondary="Demandez des explications sur le fonctionnement du système."
                    />
                  </ListItem>
                  
                  <Divider variant="inset" component="li" />
                  
                  <ListItem>
                    <ListItemIcon>
                      <SearchIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Recherche de classe tarifaire" 
                      secondary="Exemple: 'Quelle est la classe tarifaire pour les téléviseurs LED?'"
                    />
                  </ListItem>
                  
                  <Divider variant="inset" component="li" />
                  
                  <ListItem>
                    <ListItemIcon>
                      <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Génération de rapports" 
                      secondary="Demandez la génération de rapports sur les classifications."
                    />
                  </ListItem>
                  
                  <Divider variant="inset" component="li" />
                  
                  <ListItem>
                    <ListItemIcon>
                      <TipsAndUpdatesIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Conseils et astuces" 
                      secondary="Obtenez des conseils pour une classification efficace."
                    />
                  </ListItem>
                </List>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ChatbotProvider>
  );
};

export default ChatbotPage;
