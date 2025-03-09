import api from './api';

// Données de démonstration pour simuler un chatbot
const demoResponses = {
  'hello': {
    text: "Bonjour! Je suis l'assistant IA du système de codification. Comment puis-je vous aider?",
    options: ["Comment classifier une marchandise?", "Rechercher une classe tarifaire", "Générer un rapport"]
  },
  'help': {
    text: "Je peux vous aider avec la classification des marchandises, la recherche de classes tarifaires, et la génération de rapports. Que souhaitez-vous faire?",
    options: ["Comment classifier une marchandise?", "Rechercher une classe tarifaire", "Générer un rapport"]
  },
  'classification': {
    text: "Pour classifier une marchandise, vous pouvez utiliser l'onglet 'Classification' pour une seule marchandise ou 'Classification par lot' pour plusieurs marchandises à la fois.",
    options: ["Comment résoudre une ambiguïté?", "Qu'est-ce qu'une ambiguïté?"]
  },
  'ambiguity': {
    text: "Une ambiguïté se produit lorsque la description d'une marchandise peut correspondre à plusieurs classes tarifaires. Le système vous demandera alors de choisir la classe appropriée.",
    options: ["Comment résoudre une ambiguïté?"]
  },
  'resolve': {
    text: "Pour résoudre une ambiguïté, sélectionnez la classe tarifaire appropriée dans la liste proposée lorsque le système détecte une ambiguïté.",
    options: ["Merci pour l'explication", "Donner un exemple d'ambiguïté"]
  },
  'example': {
    text: "Exemple d'ambiguïté: La description 'Apple' peut faire référence à un fruit (classe 'Produits agricoles') ou à la marque d'électronique (classe 'Électronique').",
    options: ["Je comprends maintenant", "Comment améliorer mes descriptions?"]
  },
  'improve': {
    text: "Pour améliorer vos descriptions et éviter les ambiguïtés, essayez d'être plus spécifique. Par exemple, au lieu de 'Apple', précisez 'Pomme fruit' ou 'Apple iPhone'.",
    options: ["Merci pour les conseils"]
  },
  'report': {
    text: "Je peux générer différents types de rapports pour vous. Quel type de rapport souhaitez-vous?",
    options: ["Rapport quotidien", "Rapport d'ambiguïtés", "Rapport de performances"]
  },
  'daily': {
    text: "Le rapport quotidien vous montre toutes les classifications effectuées aujourd'hui. Il sera disponible au téléchargement dans quelques instants.",
    options: ["Télécharger le rapport", "Autre type de rapport"]
  },
  'thanks': {
    text: "Je vous en prie! Y a-t-il autre chose que je puisse faire pour vous?",
    options: ["Oui, j'ai une autre question", "Non, merci"]
  },
  'bye': {
    text: "Au revoir! N'hésitez pas à revenir si vous avez d'autres questions.",
    options: []
  }
};

// Fonction pour trouver la meilleure correspondance à la requête de l'utilisateur
const findBestMatch = (userInput) => {
  const input = userInput.toLowerCase();
  
  // Vérifier les correspondances exactes
  if (demoResponses[input]) {
    return demoResponses[input];
  }
  
  // Vérifier les correspondances partielles
  const keywords = {
    'bonjour': 'hello',
    'salut': 'hello',
    'aide': 'help',
    'besoin d\'aide': 'help',
    'comment': 'help',
    'classifier': 'classification',
    'classification': 'classification',
    'ambiguïté': 'ambiguity',
    'ambigu': 'ambiguity',
    'résoudre': 'resolve',
    'exemple': 'example',
    'améliorer': 'improve',
    'rapport': 'report',
    'générer': 'report',
    'quotidien': 'daily',
    'journalier': 'daily',
    'merci': 'thanks',
    'au revoir': 'bye',
    'adieu': 'bye'
  };
  
  for (const [keyword, response] of Object.entries(keywords)) {
    if (input.includes(keyword)) {
      return demoResponses[response];
    }
  }
  
  // Réponse spéciale pour les recherches de classe tarifaire
  if (input.includes('classe') || input.includes('tarif') || input.includes('quelle est')) {
    // Extraire le terme après "pour" ou à la fin de la phrase
    let term = '';
    if (input.includes('pour')) {
      term = input.split('pour')[1].trim();
      // Supprimer les guillemets et apostrophes
      term = term.replace(/['"]/g, '');
      // Supprimer le point final s'il y en a un
      term = term.replace(/\.$/, '');
    }
    
    if (term) {
      return {
        text: `D'après nos données, la marchandise "${term}" appartient généralement à la classe tarifaire "${getRandomTariffClass(term)}".`,
        options: ["Merci pour l'information", "Rechercher une autre classe"]
      };
    }
  }
  
  // Réponse par défaut
  return {
    text: "Je ne suis pas sûr de comprendre votre demande. Pouvez-vous reformuler ou choisir l'une des options suivantes?",
    options: ["Comment classifier une marchandise?", "Rechercher une classe tarifaire", "Générer un rapport", "Aide générale"]
  };
};

// Fonction pour attribuer une classe tarifaire aléatoire (mais cohérente) pour une description
const getRandomTariffClass = (description) => {
  const lowerDesc = description.toLowerCase();
  
  // Correspondances basées sur des mots-clés
  if (lowerDesc.includes('café') || lowerDesc.includes('thé') || lowerDesc.includes('fruit') || lowerDesc.includes('légume')) {
    return 'Produits agricoles';
  }
  
  if (lowerDesc.includes('téléviseur') || lowerDesc.includes('ordinateur') || lowerDesc.includes('électronique')) {
    return 'Électronique';
  }
  
  if (lowerDesc.includes('vêtement') || lowerDesc.includes('tissu') || lowerDesc.includes('textile')) {
    return 'Textiles';
  }
  
  if (lowerDesc.includes('voiture') || lowerDesc.includes('auto') || lowerDesc.includes('pièce')) {
    return 'Automobile';
  }
  
  if (lowerDesc.includes('parfum') || lowerDesc.includes('beauté') || lowerDesc.includes('cosmétique')) {
    return 'Cosmétiques';
  }
  
  // Si aucune correspondance, choisir une classe aléatoire mais de façon déterministe basée sur la chaîne
  const classes = ['Produits agricoles', 'Électronique', 'Textiles', 'Automobile', 'Cosmétiques'];
  const index = lowerDesc.length % classes.length;
  return classes[index];
};

export const chatbotService = {
  // Envoyer un message au chatbot
  sendMessage: async (message) => {
    try {
      const response = await api.post('/chatbot/message', { message });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      
      // Mode démo - Simuler une réponse du chatbot
      const response = findBestMatch(message);
      
      // Simuler un délai de réseau
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
      
      return response;
    }
  },
  
  // Récupérer l'historique de conversation
  getConversationHistory: async () => {
    try {
      const response = await api.get('/chatbot/history');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique:', error);
      
      // Mode démo - Simuler un historique vide
      return [];
    }
  },
  
  // Effacer l'historique de conversation
  clearConversation: async () => {
    try {
      await api.delete('/chatbot/history');
    } catch (error) {
      console.error('Erreur lors de l\'effacement de l\'historique:', error);
      
      // Mode démo - Simuler un effacement réussi
      return { success: true };
    }
  }
};