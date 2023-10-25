import React, { useEffect, useState } from "react";
import Field from "../components/forms/Field";
import { Link, useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import { toast } from "react-toastify";
import { WORKERS_API } from "../config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthAPI from "../services/AuthAPI";
import { BASE_URL } from "../config";
import SkillsAPI from "../services/SkillsAPI";
import Select from "react-select";

const UpdateWorker = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtenez l'ID du travailleur depuis l'URL
  const [user, setUser] = useState(null);
  const token = window.localStorage.getItem("authToken");
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState("");
  const [newSkills, setNewSkills] = useState([""]);
  const [individualSelectedSkills, setIndividualSelectedSkills] = useState([]);

  const [worker, setWorker] = useState({
    firstname: "",
    lastname: "",
    age: "",
    gender: "",
    description: "",
    visibility: true,
    cv: "NULL",
    skills: [],
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

  useEffect(() => {
    fetchSkills();
    fetchWorkerData();
  }, []);

  useEffect(() => {
    if (user) {
      setWorker((prevWorker) => ({
        ...prevWorker,
        user: `{user.id}`,
      }));
    }
  }, [user]);

  const fetchSkills = async () => {
    try {
      const data = await SkillsAPI.findAll();
      setSkills(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des compétences:", error);
    }
  };

  const fetchWorkerData = async () => {
    try {
      const response = await Axios.get(`${WORKERS_API}/${id}`);
      const workerData = response.data;
      setWorker(workerData);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données du travailleur:",
        error
      );
    }
  };

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
    const selectedSkills = selectedOptions.map(
      (option) => `/api/skills/${option.value}`
      );
      console.log(selectedSkills);
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
    if (worker.skills.length === 0)
      apiErrors.skills = "Les compétences sont obligatoires";
    setErrors(apiErrors);
    try {
      console.log(worker);
      await Axios.put(`${WORKERS_API}/${id}`, worker); // Utilisez la méthode PUT pour la mise à jour
      toast.success("Le travailleur a bien été mis à jour");
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

  const wskills = worker.skills.map((skill) => {
    return { value: skill.id, label: skill.name };
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">
        Mettre à jour le travailleur
      </h1>
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
          <div className="input-group mb-3">
  <Select
    isMulti
    name="skills"
    onChange={handleSkillChange}
    className="basic-multi-select"
    classNamePrefix="select"
    defaultValue={worker.skills.map((skill) => ({
      value: skill.id,
      label: skill.name,
    }))}
    options={skills.map((skill) => ({
      value: skill.id,
      label: skill.name,
    }))}
  />
</div>
          <div className="input-group mb-3">
            {worker.skills.map((skill, index) => {
              // Trouvez l'objet de compétence correspondant dans le tableau 'skills'
              const selectedSkill = skills.find((s) => s.name === skill.name);

              return (
                <Select
                  key={index}
                  isMulti
                  name="skills"
                  onChange={handleSkillChange}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  defaultValue={
                    selectedSkill
                      ? [{ value: selectedSkill.id, label: selectedSkill.name }]
                      : []
                  }
                  options={skills.map((skill) => ({
                    value: skill.id,
                    label: skill.name,
                  }))}
                />
              );
            })}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Visibilité :</label>
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
            Enregistrer les modifications
          </button>
          <Link
            to="/workers"
            className="text-gray-500 font-bold hover:text-gray-700"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateWorker;
