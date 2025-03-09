import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  CardMedia
} from '@mui/material';
import ClassIcon from '@mui/icons-material/Class';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HistoryIcon from '@mui/icons-material/History';
import ChatIcon from '@mui/icons-material/Chat';
import useAuth from '../hooks/useAuth';

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const features = [
    {
      title: 'Classification automatique',
      description: 'Classifiez rapidement vos marchandises en utilisant notre système d\'IA avancé qui attribue automatiquement la classe tarifaire appropriée.',
      icon: <ClassIcon fontSize="large" />,
      path: '/classification'
    },
    {
      title: 'Classification par lot',
      description: 'Traitez plusieurs marchandises simultanément en téléchargeant un fichier CSV ou en saisissant une liste de descriptions.',
      icon: <ListAltIcon fontSize="large" />,
      path: '/batch-classification'
    },
    {
      title: 'Historique des classifications',
      description: 'Consultez l\'historique complet des classifications effectuées et accédez facilement aux informations précédentes.',
      icon: <HistoryIcon fontSize="large" />,
      path: '/history'
    },
    {
      title: 'Assistant Chatbot',
      description: 'Posez des questions et obtenez de l\'aide en temps réel grâce à notre chatbot intelligent qui comprend le langage naturel.',
      icon: <ChatIcon fontSize="large" />,
      path: '/chatbot'
    }
  ];
  
  return (
    <Container maxWidth="lg">
      {/* Section héro */}
      <Box 
        sx={{ 
          py: 8, 
          textAlign: 'center',
          backgroundImage: 'url(https://images.unsplash.com/photo-1565017058067-adf2d51cd0bb?auto=format&fit=crop&q=80&w=1000)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 2,
          position: 'relative',
          mb: 6,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: 2,
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1, px: 3 }}>
          <Typography variant="h3" component="h1" gutterBottom color="white" fontWeight="bold">
            Système de Codification IA
          </Typography>
          
          <Typography variant="h5" component="h2" color="white" gutterBottom sx={{ mb: 4 }}>
            Automatisez la classification de vos marchandises
          </Typography>
          
          {isAuthenticated ? (
            <Button 
              variant="contained" 
              size="large" 
              onClick={() => navigate('/classification')}
              sx={{ mr: 2 }}
            >
              Commencer la classification
            </Button>
          ) : (
            <Button 
              variant="contained" 
              size="large" 
              onClick={() => navigate('/login')}
              sx={{ mr: 2 }}
            >
              Se connecter
            </Button>
          )}
          
          <Button 
            variant="outlined" 
            color="inherit"
            size="large"
            sx={{ color: 'white', borderColor: 'white' }}
            onClick={() => {
              const section = document.getElementById('features');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            En savoir plus
          </Button>
        </Box>
      </Box>
      
      {/* Section fonctionnalités */}
      <Box id="features" sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
          Fonctionnalités principales
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 8
                  }
                }}
              >
                <Box 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    justifyContent: 'center',
                    color: 'primary.main'
                  }}
                >
                  {feature.icon}
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" gutterBottom align="center">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {feature.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button 
                    size="small" 
                    onClick={() => navigate(feature.path)}
                    disabled={!isAuthenticated}
                  >
                    Accéder
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      
      {/* Section comment ça marche */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
          Comment ça marche
        </Typography>
        
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h5" component="h3" gutterBottom>
                Une technologie d'IA avancée
              </Typography>
              <Typography variant="body1" paragraph>
                Notre système utilise des algorithmes d'intelligence artificielle de pointe pour analyser les descriptions des marchandises et déterminer automatiquement la classe tarifaire appropriée.
              </Typography>
              <Typography variant="body1" paragraph>
                Le modèle d'IA a été entraîné sur des milliers d'exemples de classifications précédentes, ce qui lui permet d'identifier avec précision les caractéristiques clés des marchandises et de les associer aux classes tarifaires correspondantes.
              </Typography>
              <Typography variant="body1">
                Le système s'améliore continuellement grâce à votre feedback, apprenant de chaque nouvelle classification pour devenir encore plus précis au fil du temps.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              image="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800"
              alt="IA en action"
              sx={{ 
                height: 400, 
                borderRadius: 2,
                objectFit: 'cover'
              }}
            />
          </Grid>
        </Grid>
      </Box>
      
      {/* Section de mise en avant (optionnelle) */}
      {!isAuthenticated && (
        <Box 
          sx={{ 
            py: 6, 
            textAlign: 'center',
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 2,
            mb: 6 
          }}
        >
          <Typography variant="h5" component="h3" gutterBottom>
            Prêt à simplifier votre processus de codification ?
          </Typography>
          <Typography variant="body1" paragraph>
            Connectez-vous pour commencer à utiliser notre système de classification IA dès maintenant.
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            onClick={() => navigate('/login')}
            sx={{ mt: 2 }}
          >
            Se connecter
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default HomePage;