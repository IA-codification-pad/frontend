import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Chip,
  Card,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

const ClassificationResult = ({ result }) => {
  if (!result) {
    return null;
  }
  
  return (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="div">
            Résultat de classification
          </Typography>
          {result.ambiguous ? (
            <Chip 
              icon={<WarningIcon />} 
              label="Ambiguë" 
              color="warning" 
              sx={{ ml: 2 }} 
            />
          ) : (
            <Chip 
              icon={<CheckCircleIcon />} 
              label="Classifié" 
              color="success" 
              sx={{ ml: 2 }} 
            />
          )}
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell component="th" variant="head" width="30%">
                  Description
                </TableCell>
                <TableCell>
                  {result.description}
                </TableCell>
              </TableRow>
              
              {result.ambiguous ? (
                <TableRow>
                  <TableCell component="th" variant="head">
                    Classes possibles
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {result.possibleClasses.map((cls, index) => (
                        <Chip 
                          key={index}
                          label={cls}
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell component="th" variant="head">
                    Classe tarifaire
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={result.tariffClass}
                      color="primary"
                    />
                  </TableCell>
                </TableRow>
              )}
              
              {result.confidence && (
                <TableRow>
                  <TableCell component="th" variant="head">
                    Confiance
                  </TableCell>
                  <TableCell>
                    {(result.confidence * 100).toFixed(1)}%
                  </TableCell>
                </TableRow>
              )}
              
              {result.timestamp && (
                <TableRow>
                  <TableCell component="th" variant="head">
                    Date/Heure
                  </TableCell>
                  <TableCell>
                    {new Date(result.timestamp).toLocaleString()}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default ClassificationResult;