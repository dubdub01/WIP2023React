import Axios from 'axios'; // Assurez-vous d'avoir installé Axios ou un autre client HTTP


// Fonction pour récupérer toutes les compétences
async function findAll() {
  try {
    const response = await Axios.get('/api/skills');
    return response.data; // Supposons que les compétences se trouvent dans response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des compétences :', error);
    throw error; // Vous pouvez choisir de gérer l'erreur ici ou la propager à l'appelant
  }
}







// Fonction pour récupérer les données d'une compétence à partir de son URL
async function find(skillUrl) {
  try {
    const response = await Axios.get(skillUrl);
    return response.data; // Supposons que les données de la compétence se trouvent dans response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des données de la compétence :', error);
    throw error; // Vous pouvez choisir de gérer l'erreur ici ou la propager à l'appelant
  }
}

// Fonction pour récupérer le nom d'une compétence à partir de son URL
async function fetchSkillNameFromUrl(skillUrl) {
  try {
    const response = await Axios.get(skillUrl);
    return response.data.name; // Supposons que le nom de la compétence se trouve dans response.data.name
  } catch (error) {
    console.error('Erreur lors de la récupération du nom de la compétence :', error);
    throw error; // Vous pouvez choisir de gérer l'erreur ici ou la propager à l'appelant
  }
}

// Autres fonctions liées aux compétences, si nécessaire

export default {
  findAll: findAll,
  fetchSkillNameFromUrl: fetchSkillNameFromUrl,
  find: find,
  // Autres fonctions liées aux compétences, si nécessaire
};
