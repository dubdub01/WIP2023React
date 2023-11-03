import React, { useEffect, useState } from "react";
import UserApi from "../services/UserApi";
import { BASE_URL } from "../config";
import { Link } from "react-router-dom";
import AuthAPI from "../services/AuthAPI";
import Axios from "axios";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const token = window.localStorage.getItem("authToken");
  const [showConfirmation, setShowConfirmation] = useState(false);

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

  const handleDeleteWorker = async (workerId) => {
    try {
      // Envoyer une demande de suppression au serveur avec workerId
      await Axios.delete(`${BASE_URL}api/workers/${workerId}`);
      // Rafraîchir la liste des travailleurs après suppression
      const updatedWorkers = user.workers.filter(
        (worker) => worker.id !== workerId
      );
      setUser({ ...user, workers: updatedWorkers });
      // Afficher un message de succès ou utiliser une notification
      console.log(`Le travailleur avec l'ID ${workerId} a été supprimé.`);
    } catch (error) {
      // Gérer les erreurs de suppression
      console.error(
        `Erreur lors de la suppression du travailleur avec l'ID ${workerId}:`,
        error
      );
      // Afficher un message d'erreur ou utiliser une notification
    }
  };

  if (!user) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mt-4">
        Informations de l'utilisateur
      </h1>
      <div className="bg-white shadow-md rounded p-4 mt-4 flex">
        <div className="flex-grow">
          <h5 className="text-xl font-semibold">Nom d'utilisateur :</h5>
          <p className="text-gray-700">{user.username}</p>
          <h5 className="text-xl font-semibold mt-4">Adresse e-mail :</h5>
          <p className="text-gray-700">{user.eMail}</p>
        </div>
        <div className="w-1/2">
          <img
            src={`${BASE_URL}uploads/images/${user.image}`}
            alt="Couverture de l'utilisateur"
            className="w-auto h-30"
          />
        </div>
      </div>

      <h2 className="text-3xl font-semibold mt-4">Entreprises</h2>
      {user.company.length > 0 ? (
        user.company.map((company, index) => (
          <div className="bg-white shadow-md rounded p-4 mt-4" key={index}>
            <div className="mt-4">
              <div className="flex items-center justify-start">
                <img
                  src={`${BASE_URL}uploads/images/${company.cover}`}
                  alt="Logo de l'entreprise"
                  className="w-32 h-32 object-contain"
                />
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-xl font-semibold">{company.name}</h5>
              <p className="text-gray-700">
                Province : {company.provinceName.name}
              </p>
            </div>
            <p className="text-gray-700">{company.description}</p>
            <h6 className="text-lg font-semibold mt-4">Secteurs :</h6>
            <ul className="list-disc list-inside text-gray-700">
              {company.sector.map((sector, index) => (
                <li key={index}>{sector.name}</li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p className="text-gray-700 mt-4">Aucune entreprise associée.</p>
      )}

      <h2 className="text-3xl font-semibold mt-4">Travailleurs associés</h2>
      {user.workers.length > 0 ? (
        user.workers.map((worker, index) => (
          <div className="bg-white shadow-md rounded p-4 mt-4" key={index}>
            <h5 className="text-xl font-semibold">
              {worker.firstname} {worker.lastname}
            </h5>
            <p className="text-gray-700">Date de naissance : {worker.age}</p>
            <p className="text-gray-700">Genre : {worker.gender}</p>
            <p className="text-gray-700">Description : {worker.description}</p>
            
            <a
              href={`${BASE_URL}uploads/cv/${worker.cv}`}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 inline-block"
            >
              CV de {worker.firstname} {worker.lastname}
            </a>
            <Link to={`/workers/${worker.id}/edit`}>
              <button className="block mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                Modifier
              </button>
            </Link>
            <button
              className="block mt-4 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
              onClick={() => setShowConfirmation(true)}
            >
              Supprimer
            </button>
            {showConfirmation && (
              <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <p className="text-xl font-semibold mb-4">
                    Confirmer la suppression ?
                  </p>
                  <div className="flex justify-between">
                    <button
                      className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                      onClick={() => handleDeleteWorker(worker.id)}
                    >
                      Oui
                    </button>
                    <button
                      className="bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-500 transition duration-300"
                      onClick={() => setShowConfirmation(false)}
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-700 mt-4">Aucun travailleur associé.</p>
      )}
    </div>
  );
};

export default UserPage;
