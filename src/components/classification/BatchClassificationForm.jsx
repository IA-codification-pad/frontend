import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  CircularProgress, 
  Alert,
  LinearProgress
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SendIcon from '@mui/icons-material/Send';
import useClassification from '../../hooks/useClassification';

const BatchClassificationForm = () => {
  const [descriptions, setDescriptions] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const { batchClassify } = useClassification();
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (!selectedFile) {
      return;
    }
    
    // Vérifier si le fichier est un CSV
    if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
      setError('Veuillez sélectionner un fichier CSV');
      setFile(null);
      return;
    }
    
    setFile(selectedFile);
    setError('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!descriptions.trim() && !file) {
      setError('Veuillez saisir des descriptions ou télécharger un fichier CSV');
      return;
    }
    
    setError('');
    setSuccess('');
    setLoading(true);
    setProgress(0);
    
    try {
      let result;
      
      if (file) {
        // Traiter le fichier CSV
        const reader = new FileReader();
        
        reader.onload = async (event) => {
          try {
            const csvContent = event.target.result;
            const lines = csvContent.split('\n')
              .map(line => line.trim())
              .filter(line => line !== '');
            
            // Ignorer la première ligne si c'est un en-tête
            const descList = lines[0].includes(',') ? lines.slice(1) : lines;
            
            // Extraire les descriptions (première colonne)
            const descriptions = descList.map(line => line.split(',')[0].trim());
            
            const batchSize = 50;
            const totalBatches = Math.ceil(descriptions.length / batchSize);
            
            const allResults = [];
            
            for (let i = 0; i < totalBatches; i++) {
              const batch = descriptions.slice(i * batchSize, (i + 1) * batchSize);
              const batchResults = await batchClassify(batch);
              allResults.push(...batchResults);
              
              // Mettre à jour la progression
              setProgress(((i + 1) / totalBatches) * 100);
            }
            
            setSuccess(`Classification par lot terminée. ${allResults.length} éléments traités.`);
            setFile(null);
          } catch (err) {
            setError(`Erreur lors du traitement du fichier CSV: ${err.message}`);
          } finally {
            setLoading(false);
          }
        };
        
        reader.onerror = () => {
          setError('Erreur lors de la lecture du fichier CSV');
          setLoading(false);
        };
        
        reader.readAsText(file);
      } else {
        // Traiter les descriptions saisies manuellement
        const descList = descriptions
          .split('\n')
          .map(desc => desc.trim())
          .filter(desc => desc !== '');
        
        result = await batchClassify(descList);
        setSuccess(`Classification par lot terminée. ${result.length} éléments traités.`);
        setDescriptions('');
        setLoading(false);
      }
    } catch (err) {
      setError(err.message || 'Erreur lors de la classification par lot');
      setLoading(false);
    }
  };
  
  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Classification par lot
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
        <TextField
          label="Descriptions (une par ligne)"
          variant="outlined"
          fullWidth
          multiline
          rows={6}
          value={descriptions}
          onChange={(e) => setDescriptions(e.target.value)}
          placeholder="Entrez une description par ligne, par exemple:
Café en grains
Téléviseurs LED
Ordinateurs portables"
          disabled={loading || !!file}
          sx={{ mb: 2 }}
        />
        
        <Typography variant="body2" gutterBottom>
          ou
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadFileIcon />}
            disabled={loading}
          >
            Télécharger un CSV
            <input
              type="file"
              accept=".csv"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          
          {file && (
            <Typography variant="body2" sx={{ ml: 2 }}>
              Fichier sélectionné: {file.name}
            </Typography>
          )}
        </Box>
        
        {loading && (
          <Box sx={{ width: '100%', mb: 2 }}>
            <LinearProgress variant="determinate" value={progress} />
            <Typography variant="body2" align="center" sx={{ mt: 1 }}>
              Traitement en cours... {Math.round(progress)}%
            </Typography>
          </Box>
        )}
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading || (!descriptions.trim() && !file)}
          startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
        >
          Classifier par lot
        </Button>
      </form>
    </Paper>
  );
};

export default BatchClassificationForm;
