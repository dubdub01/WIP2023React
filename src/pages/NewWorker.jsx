import { useState } from "react";
import Field from "../components/forms/Field";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { toast } from "react-toastify";
import { WORKERS_API } from "../config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

const NewWorker = () => {
  const navigate = useNavigate();

  const [worker, setWorker] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    description: "",
    visibility: "true",
    cv: "NULL",
    skills: ["1", "2"],
    user: "/api/users/1",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    description: "",
    visibility: "",
    cv: "",
  });

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
    if (worker.firstName === "")
      apiErrors.firstName = "Le prénom est obligatoire";
    if (worker.lastName === "") apiErrors.lastName = "Le nom est obligatoire";
    if (worker.age === "") apiErrors.age = "L'âge est obligatoire";
    if (worker.gender === "") apiErrors.gender = "Le genre est obligatoire";
    if (worker.description === "")
      apiErrors.description = "La description est obligatoire";
    setErrors(apiErrors);

    try {
      await Axios.post("http://127.0.0.1:8000/api/worker/upload", worker);
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
        <div className="form-group">
          <label>Date de naissance</label>
          <DatePicker
            selected={worker.age} // Utilisez la date dans l'état
            onChange={handleDateChange} // Gérez le changement de date
            dateFormat="yyyy-MM-dd" // Format de date souhaité
          />
          {errors.age && <div className="text-danger">{errors.age}</div>}
        </div>
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
