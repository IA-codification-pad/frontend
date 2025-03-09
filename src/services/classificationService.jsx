import api from './api';

// Données de démonstration pour simuler l'API
const demoClasses = [
  { code: 'PROD_AGRI', name: 'Produits agricoles' },
  { code: 'ELEC', name: 'Électronique' },
  { code: 'TEXT', name: 'Textiles' },
  { code: 'AUTO', name: 'Automobile' },
  { code: 'COSM', name: 'Cosmétiques' }
];

const demoData = [
  { id: 1, description: 'Café en grains', tariffClass: 'PROD_AGRI', ambiguous: false, timestamp: '2023-04-01T10:30:00Z' },
  { id: 2, description: 'Téléviseur LED 4K', tariffClass: 'ELEC', ambiguous: false, timestamp: '2023-04-01T11:15:00Z' },
  { id: 3, description: 'T-shirt en coton', tariffClass: 'TEXT', ambiguous: false, timestamp: '2023-04-02T09:45:00Z' },
  { id: 4, description: 'Pièces détachées moteur', tariffClass: 'AUTO', ambiguous: false, timestamp: '2023-04-02T14:20:00Z' },
  { id: 5, description: 'Parfum pour femme', tariffClass: 'COSM', ambiguous: false, timestamp: '2023-04-03T16:10:00Z' },
  { id: 6, description: 'Apple', tariffClass: '', ambiguous: true, possibleClasses: ['PROD_AGRI', 'ELEC'], timestamp: '2023-04-03T17:30:00Z' },
  { id: 7, description: 'Tablette de chocolat', tariffClass: 'PROD_AGRI', ambiguous: false, timestamp: '2023-04-04T10:05:00Z' },
  { id: 8, description: 'Smartphone', tariffClass: 'ELEC', ambiguous: false, timestamp: '2023-04-04T11:45:00Z' },
  { id: 9, description: 'Chemise en lin', tariffClass: 'TEXT', ambiguous: false, timestamp: '2023-04-05T09:30:00Z' },
  { id: 10, description: 'Batterie automobile', tariffClass: 'AUTO', ambiguous: false, timestamp: '2023-04-05T15:20:00Z' }
];

const demoKeywords = {
  'café': 'PROD_AGRI',
  'thé': 'PROD_AGRI',
  'riz': 'PROD_AGRI',
  'chocolat': 'PROD_AGRI',
  'fruit': 'PROD_AGRI',
  'légume': 'PROD_AGRI',
  'téléviseur': 'ELEC',
  'télé': 'ELEC',
  'smartphone': 'ELEC',
  'ordinateur': 'ELEC',
  'tablette': 'ELEC',
  'batterie': 'ELEC',
  'vêtement': 'TEXT',
  't-shirt': 'TEXT',
  'chemise': 'TEXT',
  'pantalon': 'TEXT',
  'textile': 'TEXT',
  'voiture': 'AUTO',
  'automobile': 'AUTO',
  'moteur': 'AUTO',
  'pièce': 'AUTO',
  'parfum': 'COSM',
  'cosmétique': 'COSM',
  'beauté': 'COSM',
  'maquillage': 'COSM'
};

const classificationService = {
  // Classifier un item
  classifyItem: async (description) => {
    try {
      const response = await api.post('/classification/classify', { description });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la classification:', error);
      
      // Mode démo
      // Déterminer la classe en fonction des mots-clés
      const lowerDesc = description.toLowerCase();
      
      // Rechercher une correspondance de mot-clé
      let tariffClass = null;
      let confidence = 0.7;
      
      for (const [keyword, cls] of Object.entries(demoKeywords)) {
        if (lowerDesc.includes(keyword)) {
          tariffClass = cls;
          confidence = 0.85 + Math.random() * 0.1; // Confiance entre 0.85 et 0.95
          break;
        }
      }
      
      // Si ambiguïté connue
      if (lowerDesc === 'apple') {
        return {
          description: description,
          ambiguous: true,
          possibleClasses: ['PROD_AGRI', 'ELEC'],
          confidence: 0.5
        };
      }
      
      // Si aucune correspondance trouvée
      if (!tariffClass) {
        // 20% de chance d'être ambigu
        if (Math.random() < 0.2) {
          // Choisir 2 classes aléatoires
          const shuffled = [...demoClasses].sort(() => 0.5 - Math.random());
          const possibleClasses = shuffled.slice(0, 2).map(c => c.code);
          
          return {
            description: description,
            ambiguous: true,
            possibleClasses: possibleClasses,
            confidence: 0.5 + Math.random() * 0.2
          };
        }
        
        // Sinon, choisir une classe aléatoire
        tariffClass = demoClasses[Math.floor(Math.random() * demoClasses.length)].code;
        confidence = 0.6 + Math.random() * 0.2; // Confiance plus faible entre 0.6 et 0.8
      }
      
      return {
        description: description,
        tariffClass: tariffClass,
        ambiguous: false,
        confidence: confidence
      };
    }
  },
  
  // Classification par lot
  batchClassify: async (descriptions) => {
    try {
      const response = await api.post('/classification/batch-classify', { descriptions });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la classification par lot:', error);
      
      // Mode démo - Classifier chaque description
      return Promise.all(
        descriptions.map(async (desc) => {
          return await classificationService.classifyItem(desc);
        })
      );
    }
  },
  
  // Résoudre une ambiguïté
  resolveAmbiguity: async (description, selectedClass) => {
    try {
      const response = await api.post('/classification/resolve-ambiguity', {
        description,
        selectedClass
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la résolution d\'ambiguïté:', error);
      
      // Mode démo - Simuler la résolution
      return {
        success: true,
        description: description,
        tariffClass: selectedClass,
        ambiguous: false
      };
    }
  },
  
  // Obtenir des suggestions de description
  getSuggestions: async (query) => {
    try {
      const response = await api.get(`/classification/suggest?q=${query}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des suggestions:', error);
      
      // Mode démo - Générer des suggestions basées sur les descriptions existantes
      if (query.length < 3) return [];
      
      const lowerQuery = query.toLowerCase();
      return demoData
        .filter(item => item.description.toLowerCase().includes(lowerQuery))
        .map(item => item.description)
        .slice(0, 5);
    }
  },
  
  // Obtenir l'historique des classifications
  getClassificationHistory: async () => {
    try {
      const response = await api.get('/classification/history');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique:', error);
      
      // Mode démo - Retourner les données de démonstration
      return demoData;
    }
  }
};

export default classificationService;