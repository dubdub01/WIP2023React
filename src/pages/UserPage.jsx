import React, { useEffect, useState } from "react";
import UserApi from "../services/UserApi";

const UserPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Appelez votre API pour récupérer les informations de l'utilisateur
    UserApi.find()
      .then((response) => {
        // Accédez aux données de l'utilisateur dans la réponse
        const userData = response["hydra:member"];
        console.log(userData[0].company);
        // Mettez à jour l'état de l'utilisateur avec les données
        setUser(userData[0]);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des informations de l'utilisateur :",
          error
        );
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

      <h2>Entreprises</h2>
      <ul>
        {user.company.map((company, index) => (
          <div key={index}>
            <p>
              {company.name}
            </p>
          </div>
        ))}
      </ul>

      <h2>Travailleurs associés</h2>
      <ul>
        {user.workers.map((worker, index) => (
          <div key={index}>
            <p>{worker.firstname}</p>
            <p>{worker.lastname}</p>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
