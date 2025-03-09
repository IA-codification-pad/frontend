import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  Box,
  Breadcrumbs,
  Link as MuiLink,
  CircularProgress
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import ClassificationHistory from '../components/classification/ClassificationHistory';
import useClassification  from '../hooks/useClassification';

const HistoryPage = () => {
  const { getClassificationHistory } = useClassification();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        await getClassificationHistory();
      } catch (err) {
        setError('Erreur lors du chargement de l\'historique. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchHistory();
  }, [getClassificationHistory]);
  
  return (
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
            <HistoryIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Historique
          </Typography>
        </Breadcrumbs>
      </Box>
      
      <Typography variant="h4" component="h1" gutterBottom>
        Historique des classifications
      </Typography>
      
      <Typography variant="body1" paragraph>
        Consultez l'historique complet des classifications effectuées. Vous pouvez rechercher, filtrer et consulter les détails de chaque classification.
      </Typography>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ my: 4 }}>
          {error}
        </Typography>
      ) : (
        <ClassificationHistory />
      )}
    </Container>
  );
};

export default HistoryPage;