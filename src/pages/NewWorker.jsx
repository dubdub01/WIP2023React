import { useState } from "react";
import Field from "../components/forms/Field";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { toast } from "react-toastify";
import { WORKERS_API } from "../config";

const NewWorker = () => {
  const navigate = useNavigate();

  const [worker, setWorker] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    description: "",
    visibility: "1",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    description: "",
    visibility: "",
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.currentTarget;
    // Utilisez "checked" pour gérer la valeur de "visibility" (case à cocher)
    setWorker({ ...worker, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiErrors = {};
    if (worker.firstName === "")
      apiErrors.firstName = "Le prénom est obligatoire";
    if (worker.lastName === "") apiErrors.lastName = "Le nom est obligatoire";
    if (worker.age === "") apiErrors.age = "L'âge est obligatoire";
    if (worker.gender === "") apiErrors.gender = "Le genre est obligatoire";
    if (worker.description === "")
      apiErrors.description = "La description est obligatoire";
    setErrors(apiErrors);

    try {
      await Axios.post(WORKERS_API, worker);
      toast.success("Le travailleur a bien été enregistré");
      navigate("/workers");
    } catch ({ response }) {
      const { violations } = response.data;
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
          name={"firstName"}
          label={"Prénom"}
          placeholder={"Prénom du travailleur"}
          value={worker.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />
        <Field
          name={"lastName"}
          label={"Nom"}
          placeholder={"Nom du travailleur"}
          value={worker.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />
        <Field
          type="date"
          name={"Date de naissance"}
          label={"Date de naissance"}
          placeholder={"Date de naissance du travailleur"}
          value={worker.age}
          onChange={handleChange}
          error={errors.age}
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
          value={worker.visibility}
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
