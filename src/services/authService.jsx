import api from './api';

const authService = {
  // Connexion utilisateur
  login: async (username, password) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      
      // Stocker le token JWT dans le localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      return response.data.user;
    } catch (error) {
      // Pour le projet de démonstration, on simule une API
      // Dans une application réelle, supprimez cette partie et utilisez uniquement l'API ci-dessus
      
      // Utilisateurs de démonstration
      const demoUsers = [
        { username: 'agent', password: 'agent123', name: 'Agent PAD', role: 'agent' },
        { username: 'admin', password: 'admin123', name: 'Admin PAD', role: 'admin' }
      ];
      
      const user = demoUsers.find(
        (u) => u.username === username && u.password === password
      );
      
      if (user) {
        // Créer un token factice pour la démo
        const token = `demo-token-${Math.random().toString(36).substr(2)}`;
        
        // Stocker dans localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({
          id: Math.floor(Math.random() * 1000),
          username: user.username,
          name: user.name,
          role: user.role
        }));
        
        // Retourner les informations utilisateur
        return {
          id: Math.floor(Math.random() * 1000),
          username: user.username,
          name: user.name,
          role: user.role
        };
      }
      
      throw new Error('Nom d\'utilisateur ou mot de passe incorrect');
    }
  },
  
  // Inscription utilisateur
  register: async (name, username, password, role) => {
    try {
      const response = await api.post('/auth/register', { name, username, password, role });
      return response.data;
    } catch (error) {
      // En mode démo, simuler une inscription réussie
      console.log('Inscription simulée pour:', { name, username, role });
      return { success: true, message: 'Utilisateur créé avec succès' };
    }
  },
  
  // Déconnexion
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  // Vérifier si l'utilisateur est connecté
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
  
  // Obtenir l'utilisateur courant
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};

export default authService;