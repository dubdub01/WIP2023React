import React, { useEffect, useState } from "react";
import UserApi from "../services/UserApi";
import { BASE_URL } from "../config";
import { Link } from "react-router-dom";
import AuthAPI from "../services/AuthAPI";
import Axios from "axios";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const token = window.localStorage.getItem("authToken");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [workerRatings, setWorkerRatings] = useState({});
  const { t, i18n } = useTranslation();


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
          // Initialize worker ratings with default values
          const ratings = {};
          response.data.hasContacted.forEach((worker) => {
            ratings[worker.id] = worker.rating || 0; // Default rating is 0
          });
          setWorkerRatings(ratings);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des informations de l'utilisateur :",
            error
          );
        });
    }
  }, [token]);
  

  console.log(user);

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
  
  const handleDeleteCompany = async (companyId) => {
    try {
      // Envoyer une demande de suppression au serveur avec workerId
      await Axios.delete(`${BASE_URL}api/companies/${companyId}`);
      // Rafraîchir la liste des travailleurs après suppression
      const updatedCompanies = user.companies.filter(
        (company) => company.id !== companyId
      );
      setUser({ ...user, companies: updatedCompanies });
      // Afficher un message de succès ou utiliser une notification
      console.log(`Le travailleur avec l'ID ${companyId} a été supprimé.`);
    } catch (error) {
      // Gérer les erreurs de suppression
      console.error(
        `Erreur lors de la suppression du travailleur avec l'ID ${companyId}:`,
        error
      );
      // Afficher un message d'erreur ou utiliser une notification
    }
  };

   const handleCreateRating = async (workerId, newValue) => {
    const newRating = workerRatings[workerId];

  Axios.post(`${BASE_URL}api/ratings`, {
    value: newRating,
    worker: `/api/workers/${workerId}`,
  })
    try {
      // Envoyer la note à la base de données
      const response = await Axios.post(
        `${BASE_URL}api/ratings/${workerId}/rating`,      );
      console.log(response.data.message);
      console.log(newValue)
      // Traitez la réponse du backend si nécessaire
  
      setWorkerRatings({ ...workerRatings, [workerId]: newRating });
      const updatedHasContacted = user.hasContacted.filter(
        (worker) => worker.id !== workerId
      );
      setUser({ ...user, hasContacted: updatedHasContacted });

    } catch (error) {
      // Gérer les erreurs de création de note
      console.error(error);
      // Afficher un message d'erreur ou utiliser une notification
    }
  };

  if (!user) {
    return <div className="text-white">{t("user.chargement")}</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-white">
      <h1 className="text-3xl font-semibold mt-4">
      {t("user.info")}
      </h1>
      <div className="flex space-x-4">
  <NavLink to="/newworker" className="flex-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
  {t("user.newWorker")}
    </NavLink>
  <NavLink to="/newcompany" className="flex-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
  {t("user.newCompany")}
  </NavLink>
</div>
      <div className="bg-white shadow-md rounded p-4 mt-4 flex">
        <div className="flex-grow">
          <h5 className="text-xl font-semibold">{t("user.userUsername")}</h5>
          <p className="text-gray-700">{user.username}</p>
          <h5 className="text-xl font-semibold mt-4">{t("user.userMail")}</h5>
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
      

      <h2 className="text-3xl font-semibold mt-4">{t("user.userContacted")}</h2>
      {user.hasContacted.length > 0 ? (
        user.hasContacted.map((workerContacted, index) => (
          <div className="bg-white shadow-md rounded p-4 mt-4" key={index}>
            <h5 className="text-xl font-semibold">
              {workerContacted.firstname} {workerContacted.lastname}
            </h5>
            <p className="text-gray-700">
            {t("user.userMail")} {workerContacted.eMail}
            </p>
            {/* Affichez le champ de notation ici */}
            <div className="mt-2">
              <label
                htmlFor={`rating-${workerContacted.id}`}
                className="text-sm font-semibold"
              >
                {t("user.note")}
              </label>
              <input
                type="number"
                id={`rating-${workerContacted.id}`}
                min="0"
                max="5"
                step="0.5"
                value={workerRatings[workerContacted.id]}
                onChange={(e) => {
                  const newValue = parseFloat(e.target.value); // Convertir en nombre décimal
                  setWorkerRatings((prevRatings) => ({
                    ...prevRatings,
                    [workerContacted.id]: newValue,
                  }));
                }}
                className="w-16 border border-gray-300 rounded px-2 py-1 text-sm"
              />
              {/* Ajoutez le bouton "Créer une note" ici */}
              <button
                className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm"
                onClick={() => handleCreateRating(workerContacted.id)}
              >
                {t("user.userNote")}
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-700 mt-4">{t("user.noUserContacted")}</p>
      )}

      <h2 className="text-3xl font-semibold mt-4">{t("user.userCompany")}</h2>
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
              {t("user.userProvince")} {company.provinceName.name}
              </p>
            </div>
            <p className="text-gray-700">{company.description}</p>
            <h6 className="text-lg font-semibold mt-4">{t("user.userSector")}</h6>
            <ul className="list-disc list-inside text-gray-700">
              {company.sector.map((sector, index) => (
                <li key={index}>{sector.name}</li>
              ))}
            </ul>
            <Link to={`/companies/${company.id}/edit`}>
              <button className="block mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
              {t("user.userModifyCompany")}
              </button>
            </Link>
            <Link to={`/companies/${company.id}/uploadimage`}>
              <button className="block mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
              {t("user.userAddImage")}
              </button>
            </Link>
          </div>
        ))
      ) : (
        <p className="text-gray-700 mt-4">{t("user.userNoCompany")}</p>
      )}

      <h2 className="text-3xl font-semibold mt-4">{t("user.userWorker")}</h2>
      {user.workers.length > 0 ? (
        user.workers.map((worker, index) => (
          <div className="bg-white shadow-md rounded p-4 mt-4" key={index}>
            <h5 className="text-xl font-semibold">
              {worker.firstname} {worker.lastname}
            </h5>
            <p className="text-gray-700">{t("user.userDate")} {worker.age}</p>
            <p className="text-gray-700">{t("user.userGenre")} {worker.gender}</p>
            <p className="text-gray-700">{t("user.userDescription")} {worker.description}</p>

            <a
              href={`${BASE_URL}uploads/cv/${worker.cv}`}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 inline-block"
            >
              {t("user.userCvFrom")} {worker.firstname} {worker.lastname}
            </a>
            <Link to={`/workers/${worker.id}/edit`}>
              <button className="block mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
              {t("user.userWorkerUpdate")}
              </button>
            </Link>
            <Link to={`/workers/${worker.id}/uploadcv`}>
              <button className="block mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
              {t("user.userWorkerAddCv")}
              </button>
            </Link>
            <button
              className="block mt-4 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
              onClick={() => setShowConfirmation(true)}
            >
              {t("user.userWorkerDelete")}
            </button>
            {showConfirmation && (
              <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <p className="text-xl font-semibold mb-4">
                  {t("user.userWorkerdelConfirm")}
                  </p>
                  <div className="flex justify-between">
                    <button
                      className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                      onClick={() => handleDeleteWorker(worker.id)}
                    >
                      {t("user.userWorkerdelConfirmYes")}
                    </button>
                    <button
                      className="bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-500 transition duration-300"
                      onClick={() => setShowConfirmation(false)}
                    >
                      {t("user.userWorkerdelConfirmNo")}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-700 mt-4">{t("user.userNoWorker")}</p>
      )}
    </div>
  );
};

export default UserPage;
