import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box,
  Paper,
  Divider,
  Breadcrumbs,
  Link as MuiLink
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ClassIcon from '@mui/icons-material/Class';
import ClassificationForm from '../components/classification/ClassificationForm';
import ClassificationResult from '../components/classification/ClassificationResult';
import AmbiguityResolver from '../components/classification/AmbiguityResolver';
import useClassification from '../hooks/useClassification';

const ClassificationPage = () => {
  const { lastResult } = useClassification();
  const [showAmbiguityDialog, setShowAmbiguityDialog] = useState(false);
  const [currentAmbiguity, setCurrentAmbiguity] = useState(null);
  const [resolvedResult, setResolvedResult] = useState(null);
  
  // Handler pour la résolution d'ambiguïté
  const handleAmbiguityResolved = (result) => {
    setResolvedResult(result);
  };
  
  // Si le résultat est ambigu, ouvrir la boîte de dialogue
  React.useEffect(() => {
    if (lastResult && lastResult.ambiguous) {
      setCurrentAmbiguity(lastResult);
      setShowAmbiguityDialog(true);
    }
  }, [lastResult]);
  
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
            <ClassIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Classification
          </Typography>
        </Breadcrumbs>
      </Box>
      
      <Typography variant="h4" component="h1" gutterBottom>
        Classification de marchandise
      </Typography>
      
      <Typography variant="body1" paragraph>
        Saisissez la description d'une marchandise pour obtenir sa classe tarifaire automatiquement. Notre système d'IA analysera la description et déterminera la classification appropriée.
      </Typography>
      
      <ClassificationForm />
      
      {(lastResult && !lastResult.ambiguous) || resolvedResult ? (
        <>
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Résultat
            </Typography>
            <ClassificationResult result={resolvedResult || lastResult} />
          </Box>
        </>
      ) : null}
      
      {/* Dialog for ambiguity resolution */}
      <AmbiguityResolver 
        open={showAmbiguityDialog}
        onClose={() => setShowAmbiguityDialog(false)}
        ambiguity={currentAmbiguity}
        onResolved={handleAmbiguityResolved}
      />
    </Container>
  );
};

export default ClassificationPage;