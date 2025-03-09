import React from 'react';
import { 
  Container, 
  Typography, 
  Box,
  Breadcrumbs,
  Link as MuiLink
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BatchClassificationForm from '../components/classification/BatchClassificationForm';

const BatchClassificationPage = () => {
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
            <ListAltIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Classification par lot
          </Typography>
        </Breadcrumbs>
      </Box>
      
      <Typography variant="h4" component="h1" gutterBottom>
        Classification par lot
      </Typography>
      
      <Typography variant="body1" paragraph>
        Traitez plusieurs marchandises en une seule opération. Vous pouvez saisir une liste de descriptions (une par ligne) ou télécharger un fichier CSV contenant vos descriptions.
      </Typography>
      
      <BatchClassificationForm />
    </Container>
  );
};

export default BatchClassificationPage;
