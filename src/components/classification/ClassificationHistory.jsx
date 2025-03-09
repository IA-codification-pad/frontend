import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  TextField,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import useClassification from '../../hooks/useClassification';

const ClassificationHistory = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  
  const { getClassificationHistory } = useClassification();
  
  // Charger l'historique des classifications
  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const data = await getClassificationHistory();
        setHistory(data);
        setFilteredHistory(data);
      } catch (err) {
        console.error('Erreur lors du chargement de l\'historique:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHistory();
  }, [getClassificationHistory]);
  
  // Filtrer l'historique lorsque le terme de recherche change
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredHistory(history);
    } else {
      const filtered = history.filter(item => 
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tariffClass.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredHistory(filtered);
    }
    
    setPage(0); // Réinitialiser la pagination lors d'une recherche
  }, [searchTerm, history]);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Calculer les lignes à afficher pour la pagination
  const paginatedHistory = filteredHistory.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          Historique des classifications
        </Typography>
        
        <TextField
          size="small"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Classe tarifaire</TableCell>
                  <TableCell align="center">Statut</TableCell>
                  <TableCell>Date/Heure</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedHistory.length > 0 ? (
                  paginatedHistory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>
                        <Chip 
                          label={item.tariffClass}
                          color="primary"
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        {item.ambiguous ? (
                          <Chip 
                            label="Ambiguë" 
                            color="warning" 
                            size="small" 
                          />
                        ) : (
                          <Chip 
                            label="Classifié" 
                            color="success" 
                            size="small" 
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(item.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton size="small" title="Voir les détails">
                          <InfoIcon fontSize="small" />
                        </IconButton>
                        {item.ambiguous && (
                          <IconButton size="small" title="Résoudre l'ambiguïté" sx={{ ml: 1 }}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Aucun résultat trouvé.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={filteredHistory.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Lignes par page:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} sur ${count}`}
          />
        </>
      )}
    </Paper>
  );
};

export default ClassificationHistory;