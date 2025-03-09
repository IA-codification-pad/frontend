import axios from 'axios';

// Configuration de l'instance axios de base
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification aux requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Gérer les erreurs 401 (non autorisé) - token expiré ou invalide
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Gérer les erreurs 403 (interdit)
    if (error.response && error.response.status === 403) {
      console.error('Accès interdit');
    }
    
    // Gérer les erreurs 500 (erreur serveur)
    if (error.response && error.response.status >= 500) {
      console.error('Erreur serveur', error.response.data);
    }
    
    // Retourner l'erreur pour le traitement spécifique dans les services
    return Promise.reject(error);
  }
);

export default api;