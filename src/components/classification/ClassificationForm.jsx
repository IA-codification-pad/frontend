import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  CircularProgress, 
  Alert,
  Chip,
  Autocomplete
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useClassification } from '../../hooks/useClassification';

const ClassificationForm = () => {
  const [description, setDescription] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { classifyItem, getSuggestions } = useClassification();
  
  // Effet pour charger les suggestions lorsque la description change
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (description.trim().length >= 3) {
        try {
          const fetchedSuggestions = await getSuggestions(description);
          setSuggestions(fetchedSuggestions);
        } catch (err) {
          console.error('Erreur lors du chargement des suggestions:', err);
        }
      } else {
        setSuggestions([]);
      }
    };
    
    // Utiliser un délai pour éviter trop d'appels API pendant la saisie
    const timer = setTimeout(() => {
      fetchSuggestions();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [description, getSuggestions]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!description.trim()) {
      setError('Veuillez saisir une description de marchandise');
      return;
    }
    
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      const result = await classifyItem(description);
      
      if (result.ambiguous) {
        // Gérer l'ambiguïté - ceci serait idéalement remplacé par un composant d'ambiguïté
        setSuccess('');
        setError(`Classification ambiguë. Classes possibles: ${result.possibleClasses.join(', ')}`);
      } else {
        setSuccess(`Classification réussie: ${result.tariffClass}`);
        setDescription(''); // Réinitialiser le champ après une classification réussie
      }
    } catch (err) {
      setError(err.message || 'Erreur lors de la classification');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Classification de marchandise
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <Autocomplete
            freeSolo
            options={suggestions}
            inputValue={description}
            onInputChange={(event, newValue) => {
              setDescription(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Description de la marchandise"
                variant="outlined"
                fullWidth
                placeholder="Ex: Café en grains, Téléviseurs LED, etc."
                required
                disabled={loading}
              />
            )}
            sx={{ flexGrow: 1 }}
          />
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading || !description.trim()}
            startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
            sx={{ ml: 2, height: 56 }}
          >
            Classifier
          </Button>
        </Box>
      </form>
      
      {suggestions.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Suggestions:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {suggestions.map((suggestion, index) => (
              <Chip 
                key={index} 
                label={suggestion} 
                onClick={() => setDescription(suggestion)}
                color="primary"
                variant="outlined"
                clickable
              />
            ))}
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default ClassificationForm;