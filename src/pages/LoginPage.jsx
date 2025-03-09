import React from 'react';
import { 
  Container, 
  Typography, 
  Box,
  Paper,
  Grid,
  Link
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Login from '../components/auth/Login';

const LoginPage = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} sx={{ height: '80vh' }}>
        <Grid 
          item 
          xs={12} 
          md={6}
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center' 
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Bienvenue sur le Système de Codification IA
          </Typography>
          
          <Typography variant="body1" paragraph>
            Connectez-vous pour accéder à notre système d'IA avancé qui automatise la classification des marchandises selon les classes tarifaires du système Cargo.
          </Typography>
          
          <Typography variant="body1" paragraph>
            Pas encore de compte? <Link component={RouterLink} to="/">Contactez l'administrateur</Link> pour obtenir un accès.
          </Typography>
          
          <Box sx={{ mt: 4 }}>
            <Typography variant="body2" color="text.secondary">
              Pour ce projet de démonstration, utilisez l'un des comptes suivants:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              - Utilisateur: <strong>agent</strong> | Mot de passe: <strong>agent123</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              - Utilisateur: <strong>admin</strong> | Mot de passe: <strong>admin123</strong>
            </Typography>
          </Box>
        </Grid>
        
        <Grid 
          item 
          xs={12} 
          md={6} 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          <Login />
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;