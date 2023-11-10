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
import { useTranslation } from "react-i18next";


const UpdateWorker = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtenez l'ID du travailleur depuis l'URL
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState("");
  const { t, i18n } = useTranslation();


  const [worker, setWorker] = useState({
    firstname: "",
    lastname: "",
    age: "",
    gender: "",
    description: "",
    visibility: "",
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
      const workerSkillsIRI = workerData.skills.map((skill) => `/api/skills/${skill.id}`);
      console.log(workerData.user.id);
      // Utilisez {} pour envelopper les propriétés de l'objet
      setWorker({
        ...workerData,
        skills: workerSkillsIRI, // Assurez-vous que skills contient les IRI des compétences
      });
  
      const tabSkills = workerData.skills.map(skills => {
        return { value: skills.id, label: skills.name }
      });
      setSelectedSkills(tabSkills);
      console.log(selectedSkills);
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
    const selectedSkills = selectedOptions.map((option) => `/api/skills/${option.value}`);
    console.log(selectedOptions);
    setSelectedSkills(selectedOptions)
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
      // Excluez l'attribut "user" de l'objet worker envoyé dans la requête PUT
      const { user, ...updatedWorker } = worker;
      await Axios.put(`${WORKERS_API}/${id}`, updatedWorker); // Utilisez la méthode PUT pour la mise à jour
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
    return ({ value: skill.id, label: skill.name });
  });


  console.log(wskills);
  return (
    <div className="container mx-auto p-4">
      {/* {wskills} */}
      <h1 className="text-3xl font-semibold mb-4 text-white">
      {t("updateWorker.titre")}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <Field
              name="firstname"
              label={t("newWorkerPage.firstNameLabel")}
              placeholder={t("newWorkerPage.firstNamePlace")}
              value={worker.firstname}
              onChange={handleChange}
              error={errors.firstname}
            />
          </div>
          <div className="md:w-1/2 px-3">
            <Field
              name="lastname"
              label={t("newWorkerPage.name")}
              placeholder={t("newWorkerPage.firstNamePlace")}
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
              placeholder={t("newWorkerPage.genre")}
              value={worker.gender}
              onChange={handleChange}
              error={errors.gender}
            />
          </div>
        </div>
        <div className="mb-6">
          <Field
            name="description"
            label={t("newWorkerPage.description")}
            placeholder={t("newWorkerPage.descriptionPlace")}
            value={worker.description}
            onChange={handleChange}
            error={errors.description}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">{t("newWorkerPage.competence")}</label>
          <Select
            isMulti
            name="skills"
            onChange={handleSkillChange}
            className="basic-multi-select"
            classNamePrefix="select"
            value={selectedSkills}
            options={skills.map((skill) => ({
              value: skill.id,
              label: skill.name,
            }))}         
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">{t("newCompanyPage.visibilité")}</label>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="visibility"
              className="form-checkbox text-indigo-600 h-5 w-5"
              checked={worker.visibility}
              onChange={handleChange}
            />
            <label className="ml-2 text-gray-700">{t("newCompanyPage.visible")}</label>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {t("newCompanyPage.enregistrer")}
          </button>
          <Link
            to="/workers"
            className="text-gray-500 font-bold hover:text-gray-700"
          >
            {t("newCompanyPage.retour")}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateWorker;
