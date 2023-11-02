import React, { useEffect, useState } from "react";
import Field from "../components/forms/Field";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { toast } from "react-toastify";
import { WORKERS_API } from "../config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthAPI from "../services/AuthAPI";
import { BASE_URL } from "../config";
import SkillsAPI from "../services/SkillsAPI";
import Select from "react-select";

const NewWorker = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const token = window.localStorage.getItem("authToken");
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState("");
  const [newSkills, setNewSkills] = useState([""]);
  const [individualSelectedSkills, setIndividualSelectedSkills] = useState(
    newSkills.map(() => [])
  );

  useEffect(() => {
    fetchSkills();
  }, []);

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
    visibility: "",
    cv: "NULL",
    skills: [""],
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

  const fetchSkills = async () => {
    try {
      const data = await SkillsAPI.findAll();
      setSkills(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des compétences:", error);
    }
  };

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

  const handleSkillChange = (selectedOptions) => {
    const selectedSkills = selectedOptions.map((option) => `/api/skills/${option.value}`);
    setWorker({ ...worker, skills: selectedSkills });
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
    if (selectedSkills.length === 0)
      apiErrors.skills = "Les compétences sont obligatoires";
    setErrors(apiErrors);
    try {
      console.log(worker);
      await Axios.post(`${WORKERS_API}`, worker);
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Créer un travailleur</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <Field
              name="firstname"
              label="Prénom"
              placeholder="Prénom du travailleur"
              value={worker.firstname}
              onChange={handleChange}
              error={errors.firstname}
            />
          </div>
          <div className="md:w-1/2 px-3">
            <Field
              name="lastname"
              label="Nom"
              placeholder="Nom du travailleur"
              value={worker.lastname}
              onChange={handleChange}
              error={errors.lastname}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <Field
              type="date"
              name={"age"}
              label={"Date"}
              placeholder={"Date du travailleur"}
              value={worker.age}
              onChange={handleChange}
              error={errors.age}
            />
          </div>
          <div className="md:w-1/2 px-3">
            <Field
              name="gender"
              label="Genre"
              placeholder="Genre du travailleur"
              value={worker.gender}
              onChange={handleChange}
              error={errors.gender}
            />
          </div>
        </div>
        <div className="mb-6">
          <Field
            name="description"
            label="Description"
            placeholder="Description du travailleur"
            value={worker.description}
            onChange={handleChange}
            error={errors.description}
          />
        </div>

        <div className="mb-6">
      <label className="block text-gray-700 mb-2">Compétences :</label>
      {newSkills.map((newSkill, index) => (
        <div className="input-group mb-3" key={index}>
          <Select
            isMulti
            name="skills"
            options={skills.map((skill) => ({
              value: skill.id,
              label: skill.name,
            }))}
            
            onChange={handleSkillChange}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
      ))}
    </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            Visibilité :
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="visibility"
              className="form-checkbox text-indigo-600 h-5 w-5"
              checked={worker.visibility}
              onChange={handleChange}
            />
            <label className="ml-2 text-gray-700">Visible</label>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Enregistrer
          </button>
          <Link
            to="/workers"
            className="text-gray-500 font-bold hover:text-gray-700"
          >
            Retour à la liste
          </Link>
        </div>
      </form>
    </div>
  );
};

export default NewWorker;
