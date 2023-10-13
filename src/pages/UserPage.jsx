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
      AuthAPI.getUserInfoByToken(token)
        .then((userData) => {
          const userId = userData.id;
          const userApiUrl = `${BASE_URL}api/users/${userId}`;
          return Axios.get(userApiUrl);
        })
        .then((response) => {
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
    <div className="container">
      <h1 className="mt-4">Informations de l'utilisateur</h1>
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Nom d'utilisateur :</h5>
          <p className="card-text">{user.username}</p>
          <h5 className="card-title">Adresse e-mail :</h5>
          <p className="card-text">{user.eMail}</p>
          <h5 className="card-title">Cover :</h5>
          <img
            src={`${BASE_URL}uploads/images/${user.image}`}
            alt="Couverture de l'utilisateur"
            className="img-fluid"
          />
          {/* Affichez d'autres informations de l'utilisateur ici */}
        </div>
      </div>

      <h2 className="mt-4">Entreprises</h2>
      {user.company.length > 0 ? (
        user.company.map((company, index) => (
          <div className="card mt-4" key={index}>
            <div className="card-body">
              <h5 className="card-title">{company.name}</h5>
              <p className="card-text">{company.description}</p>
              <h6 className="card-subtitle mb-2 text-muted">Secteurs :</h6>
              <ul>
                {company.sector.map((sector, index) => (
                  <li key={index}>{sector.name}</li>
                ))}
              </ul>
              <img
                src={`${BASE_URL}uploads/images/${company.cover}`}
                alt="Couverture de l'entreprise"
                className="img-fluid"
              />
              <p className="card-text">
                Province : {company.provinceName.name}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>Aucune entreprise associée.</p>
      )}

      <h2 className="mt-4">Travailleurs associés</h2>
      {user.workers.length > 0 ? (
        user.workers.map((worker, index) => (
          <div className="card mt-4" key={index}>
            <div className="card-body">
              <h5 className="card-title">
                {worker.firstname} {worker.lastname}
              </h5>
              <p className="card-text">Date de naissance : {worker.age}</p>
              <p className="card-text">Genre : {worker.gender}</p>
              <p className="card-text">Description : {worker.description}</p>
              <Link
                className="btn btn-primary mx-2 d-block"
                to={`${BASE_URL}uploads/cv/${worker.cv}`}
              >
                CV de {worker.firstname} {worker.lastname}
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>Aucun travailleur associé.</p>
      )}
    </div>
  );
};

export default UserPage;
