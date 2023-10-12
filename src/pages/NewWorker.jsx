import React, { useEffect, useState } from "react";
import Field from "../components/forms/Field";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { toast } from "react-toastify";
import { WORKERS_API } from "../config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import AuthAPI from "../services/AuthAPI";
import { BASE_URL } from "../config";

const NewWorker = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const token = window.localStorage.getItem("authToken");

  useEffect(() => {
    if (token) {
      // Utilisez le token pour récupérer les informations de l'utilisateur
      AuthAPI.getUserInfoByToken(token)
        .then((userData) => {
          // Accédez aux données de l'utilisateur dans la réponse
          const userId = userData.id;
          console.log(userData.id);

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


  const [worker, setWorker] = useState({
    firstname: "",
    lastname: "",
    age: "",
    gender: "",
    description: "",
    visibility: true,
    cv: "NULL",
    skills: ["/api/skills/581"],
    user: "",
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    age: "",
    gender: "",
    description: "",
    visibility: "",
    cv: "",
  });

  // Utilisez useEffect pour mettre à jour worker une fois que user est disponible
  useEffect(() => {
    if (user) {
      setWorker((prevWorker) => ({
        ...prevWorker,
        user: `/api/users/${user.id}`,
      }));
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.currentTarget;
    // Utilisez "checked" pour gérer la valeur de "visibility" (case à cocher)
    setWorker({ ...worker, [name]: type === "checkbox" ? checked : value });
  };

  const handleDateChange = (date) => {
    // Gérez le changement de date
    setWorker({ ...worker, age: date });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiErrors = {};
    if (worker.firstname === "")
      apiErrors.firstname = "Le prénom est obligatoire";
    if (worker.lastname === "") apiErrors.lastname = "Le nom est obligatoire";
    if (worker.age === "") apiErrors.age = "L'âge est obligatoire";
    if (worker.gender === "") apiErrors.gender = "Le genre est obligatoire";
    if (worker.description === "")
      apiErrors.description = "La description est obligatoire";
    setErrors(apiErrors);

    try {
      console.log(worker);
      await Axios.post("http://127.0.0.1:8000/api/workers",worker);
      toast.success("Le travailleur a bien été enregistré");
      navigate("/workers");
    } catch ({ response }) {
      const { violations } = response.data;
      console.log(response);
      if (violations) {
        violations.forEach((propertyPath, message) => {
          apiErrors[propertyPath] = message;
        });
        setErrors(apiErrors);
      }
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <>
      <h1>créer un worker</h1>
      <form onSubmit={handleSubmit}>
        <Field
          name={"firstname"}
          label={"Prénom"}
          placeholder={"Prénom du travailleur"}
          value={worker.firstname}
          onChange={handleChange}
          error={errors.firstname}
        />
        <Field
          name={"lastname"}
          label={"Nom"}
          placeholder={"Nom du travailleur"}
          value={worker.lastname}
          onChange={handleChange}
          error={errors.lastname}
        />
        <Field
          type="date"
          name={"age"}
          label={"Date"}
          placeholder={"Date du travailleur"}
          value={worker.age}
          onChange={handleChange}
          error={errors.age}
          dateFormat="yyyy/MM/dd"
        />
        <Field
          type="text"
          name={"gender"}
          label={"Genre"}
          placeholder="Genre du travailleur"
          value={worker.gender}
          onChange={handleChange}
          error={errors.age}
        />
        <Field
          type="text"
          name={"description"}
          label={"Description"}
          placeholder="Description du travailleur"
          value={worker.description}
          onChange={handleChange}
          error={errors.description}
        />
        <Field
          type="checkbox"
          name="visibility"
          label="Visibilité"
          checked={worker.visibility} // Assurez-vous d'utiliser "checked" pour la case à cocher
          onChange={handleChange}
          error={errors.visibility}
        />
        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Enregistrer
          </button>
          <Link to="/workers" className="btn btn-link">
            Retour à la liste
          </Link>
        </div>
      </form>
    </>
  );
};

export default NewWorker;
