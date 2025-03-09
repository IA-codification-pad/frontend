import React, { createContext, useState, useCallback } from 'react';
import classificationService from '../services/classificationService';

const ClassificationContext = createContext();

export const ClassificationProvider = ({ children }) => {
  const [lastResult, setLastResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Classifier un item
  const classifyItem = useCallback(async (description) => {
    setLoading(true);
    try {
      const result = await classificationService.classifyItem(description);
      setLastResult(result);
      
      // Mettre à jour l'historique si la classification a réussi
      if (!result.ambiguous) {
        setHistory(prev => [result, ...prev]);
      }
      
      return result;
    } catch (error) {
      console.error('Erreur lors de la classification:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Classification par lot
  const batchClassify = useCallback(async (descriptions) => {
    setLoading(true);
    try {
      const results = await classificationService.batchClassify(descriptions);
      
      // Mettre à jour l'historique avec les résultats non ambigus
      const nonAmbiguousResults = results.filter(result => !result.ambiguous);
      if (nonAmbiguousResults.length > 0) {
        setHistory(prev => [...nonAmbiguousResults, ...prev]);
      }
      
      return results;
    } catch (error) {
      console.error('Erreur lors de la classification par lot:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Obtenir des suggestions de description
  const getSuggestions = useCallback(async (query) => {
    try {
      return await classificationService.getSuggestions(query);
    } catch (error) {
      console.error('Erreur lors de la récupération des suggestions:', error);
      return [];
    }
  }, []);
  
  // Résoudre une ambiguïté
  const resolveAmbiguity = useCallback(async (description, selectedClass) => {
    try {
      const result = await classificationService.resolveAmbiguity(description, selectedClass);
      
      // Mettre à jour l'historique avec la résolution
      setHistory(prev => [{
        description,
        tariffClass: selectedClass,
        ambiguous: false,
        timestamp: new Date().toISOString()
      }, ...prev]);
      
      return result;
    } catch (error) {
      console.error('Erreur lors de la résolution d\'ambiguïté:', error);
      throw error;
    }
  }, []);
  
  // Obtenir l'historique des classifications
  const getClassificationHistory = useCallback(async () => {
    try {
      const data = await classificationService.getClassificationHistory();
      setHistory(data);
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique:', error);
      throw error;
    }
  }, []);
  
  return (
    <ClassificationContext.Provider
      value={{
        lastResult,
        history,
        loading,
        classifyItem,
        batchClassify,
        getSuggestions,
        resolveAmbiguity,
        getClassificationHistory
      }}
    >
      {children}
    </ClassificationContext.Provider>
  );
};

export default ClassificationContext;