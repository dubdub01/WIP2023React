import React, { useEffect, useState } from 'react';
import UserApi from '../services/UserApi';

const UserPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
  // Appelez votre API pour récupérer les informations de l'utilisateur
  UserApi.find()
    .then((response) => {
      console.log('Réponse complète de la requête AJAX :', response);
      setUser(response.data);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error);
    });
}, []);

  if (!user) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div>
      <h1>Informations de l'utilisateur</h1>
      <p>Nom d'utilisateur : {user.username}</p>
      <p>Adresse e-mail : {user.eMail}</p>
      {/* Affichez d'autres informations de l'utilisateur ici */}
    </div>
  );
};

export default UserPage;
