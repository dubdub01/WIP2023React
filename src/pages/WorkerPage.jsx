import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WorkersAPI from "../services/WorkersAPI";
import { toast } from "react-toastify";
import DeleteConfirmation from "../components/DeleteConfirmation";
import { BASE_URL } from "../config";
import { Link } from "react-router-dom";
import axios from "axios";
import Rating from "../services/Rating";
import RatingStars from "../services/RatingStars";
import AuthAPI from "../services/AuthAPI";
import { useTranslation } from "react-i18next";


const WorkerPage = () => {
  const { id = "new" } = useParams();
  const navigate = useNavigate();
  const [isLoadingRating, setIsLoadingRating] = useState(true);
  const [user, setUser] = useState(null);
  const token = window.localStorage.getItem("authToken");
  const { t, i18n } = useTranslation();


  const [worker, setWorker] = useState({
    lastname: "",
    firstname: "",
    gender: "",
    age: "",
    description: "",
    skills: [],
    ratings: [],
  });

  useEffect(() => {
    if (token) {
      // Utilisez le token pour récupérer les informations de l'utilisateur
      AuthAPI.getUserInfoByToken(token)
        .then((userData) => {
          // Accédez aux données de l'utilisateur dans la réponse
          const userId = userData.id;
          // Mettez à jour l'état de l'utilisateur avec les données
          setUser(userData);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des informations de l'utilisateur :",
            error
          );
        });
    }
  }, [token]);

  useEffect(() => {
    if (id !== "new") {
      fetchWorker(id);
    }
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const handleDelete = async () => {
    const originalWorker = { ...worker };

    try {
      await WorkersAPI.delete(worker.id);
      toast.success("Le travailleur a bien été supprimé");
      navigate("/workers");
    } catch (error) {
      setWorker(originalWorker);
    }
  };

  const handleSendEmail = async () => {
    try {
      // Effectuez une requête POST vers votre API Symfony pour envoyer l'e-mail.
      const response = await axios.post(
        `${BASE_URL}api/workers/${id}/email`,
        {}
      );
      console.log(response.data.message);
      // Traitez la réponse (par exemple, affichez un message de confirmation).
      if (response.data.message === "E-mail envoyé avec succès") {
        toast.success("E-mail envoyé avec succès");
      } else {
        toast.error("Erreur lors de l'envoi de l'e-mail");
      }
    } catch (error) {
      // Gérez les erreurs ici (par exemple, affichez un message d'erreur).
      toast.error("Erreur lors de l'envoi de l'e-mail");
    }
  };

  const fetchWorker = async (id) => {
    try {
      const workerData = await WorkersAPI.find(id);

      const formattedAge = formatDate(workerData.age);
      const averageRating = calculateAverageRating(workerData.ratings);

      setWorker({
        ...workerData,
        age: formattedAge,
        averageRating: averageRating, // Ajoutez la moyenne des évaluations à l'état du travailleur.
      });
      setIsLoadingRating(false);
    } catch (error) {
      navigate("/workers", { replace: true });
    }
  };

  const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) {
      return "ce travailleur n'a aucune note pour le moment"; // Retournez 0 s'il n'y a aucune évaluation.
    }

    const totalRating = ratings.reduce((sum, rating) => sum + rating.value, 0);
    return totalRating / ratings.length;
  };

  return (
    <div className="container mx-auto p-4">
    <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-semibold mb-4">
          {worker.firstname} {worker.lastname}
        </h1>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2">
            <h5 className="font-semibold">{t("worker.workerGenre")}
</h5>
            <p>{worker.gender}</p>
            <h5 className="font-semibold mt-2">{t("worker.workerDate")}</h5>
            <p>{worker.age}</p>
          </div>
          <div className="w-full md:w-1/2">
            <h5 className="font-semibold">{t("worker.workerDescription")}</h5>
            <p>{worker.description}</p>
            <h5 className="font-semibold mt-2">{t("worker.workerCompétence")}</h5>
            <ul className="list-disc pl-4">
              {worker.skills.map((skill, index) => (
                <li key={index}>{skill.name}</li>
              ))}
            </ul>

            {worker.cv ? (
              // Si le travailleur a un CV, affichez le lien
              <a
                href={`${BASE_URL}uploads/cv/${worker.cv}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                CV de {worker.firstname} {worker.lastname}
              </a>
            ) : (
              // Sinon, affichez un message indiquant qu'il n'y a pas de CV
              <div>{t("worker.workerNoCv")}</div>
            )}
                      {user && (

            <button
              className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
              onClick={() => {
                handleSendEmail();
              }}
            >
              Envoyer un e-mail
            </button>
                      )}
            <div className="mt-4">
              <span className="text-lg font-semibold">{t("worker.workerNoCv")}</span>
              {isLoadingRating ? (
                <div>{t("worker.workerNoCv")}</div>
              ) : (
                <div>
                  {typeof worker.averageRating === "string" ? (
                    <p>{worker.averageRating}</p>
                  ) : (
                    <RatingStars averageRating={worker.averageRating} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerPage;
