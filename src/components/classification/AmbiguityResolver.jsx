import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  Radio, 
  Typography, 
  CircularProgress,
  Alert
} from '@mui/material';
import { useClassification } from '../../hooks/useClassification';

const AmbiguityResolver = ({ open, onClose, ambiguity, onResolved }) => {
  const [selectedClass, setSelectedClass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { resolveAmbiguity } = useClassification();
  
  if (!ambiguity) {
    return null;
  }
  
  const handleSelect = (classValue) => {
    setSelectedClass(classValue);
  };
  
  const handleResolve = async () => {
    if (!selectedClass) {
      setError('Veuillez sélectionner une classe tarifaire');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      await resolveAmbiguity(ambiguity.description, selectedClass);
      
      if (onResolved) {
        onResolved({
          ...ambiguity,
          tariffClass: selectedClass,
          ambiguous: false
        });
      }
      
      onClose();
    } catch (err) {
      setError(err.message || 'Erreur lors de la résolution de l\'ambiguïté');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Résoudre l'ambiguïté</DialogTitle>
      
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Typography variant="body1" gutterBottom>
          La description <strong>"{ambiguity.description}"</strong> peut correspondre à plusieurs classes tarifaires. Veuillez sélectionner la classe appropriée :
        </Typography>
        
        <List>
          {ambiguity.possibleClasses.map((classValue) => (
            <ListItem 
              key={classValue}
              button 
              onClick={() => handleSelect(classValue)}
              dense
            >
              <ListItemIcon>
                <Radio
                  checked={selectedClass === classValue}
                  onChange={() => handleSelect(classValue)}
                  value={classValue}
                  name="class-radio-button"
                />
              </ListItemIcon>
              <ListItemText 
                primary={classValue}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Annuler
        </Button>
        <Button 
          onClick={handleResolve} 
          color="primary" 
          variant="contained"
          disabled={!selectedClass || loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Confirmer'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AmbiguityResolver;