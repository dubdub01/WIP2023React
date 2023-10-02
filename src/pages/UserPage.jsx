import React, { useEffect, useState } from "react";
import UserApi from "../services/UserApi";
import { BASE_URL } from "../config";

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
      <p>cover : {user.image}</p>
      <img
        src={`${BASE_URL}uploads/images/${user.image}`}
        alt="Couverture de l'utilisateur"
      />
      {/* Affichez d'autres informations de l'utilisateur ici */}

      <h2>Entreprises</h2>
      <ul>
        {user.company.map((company, index) => (
          <div key={index}>
            <p>
              {company.name}
              <br />
              {company.description}
              <br />
              {company.sector.map((sector, index) => (
                <li key={index}>{sector.name}</li>
              ))}
              <br />
              <img
                src={`${BASE_URL}uploads/images/${company.cover}`}
                alt="Couverture de l'utilisateur"
              />
              <br />
              {company.provinceName.name}
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
            <p>{worker.age}</p>
            <p>{worker.gender}</p>
            <p>{worker.description}</p>
            <a>{worker.cv}</a>


          </div>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
