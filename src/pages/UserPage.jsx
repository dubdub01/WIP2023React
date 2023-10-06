import React, { useEffect, useState } from "react";
import UserApi from "../services/UserApi";
import { BASE_URL } from "../config";
import { Link } from "react-router-dom";
import AuthAPI from "../services/AuthAPI";
import Axios from "axios";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const token = window.localStorage.getItem("authToken");

  useEffect(() => {
    if (token) {
      // Utilisez le token pour récupérer les informations de l'utilisateur
      AuthAPI.getUserInfoByToken(token)
        .then((userData) => {
          // Accédez aux données de l'utilisateur dans la réponse
          const userId = userData.id;
          // Utilisez l'ID de l'utilisateur pour construire l'URL API
          const userApiUrl = `${BASE_URL}api/users/${userId}`;
          // Envoyez une requête GET à l'URL pour obtenir les informations de l'utilisateur spécifique
          return Axios.get(userApiUrl);
        })
        .then((response) => {
          // Mettez à jour l'état de l'utilisateur avec les données
          setUser(response.data);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des informations de l'utilisateur :",
            error
          );
        });
    }
  }, [token]);

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

            <Link
              className="btn btn-primary mx-2 d-block"
              to={`${BASE_URL}uploads/cv/${worker.cv}`}
            >
              cv de {worker.firstname} {worker.lastname}
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
