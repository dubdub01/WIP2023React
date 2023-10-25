import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CompaniesAPI from "../services/CompaniesAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Field from "../components/forms/Field";
import SectorsAPI from "../services/SectorsAPI";
import Select from "react-select";
import Axios from "axios";
import AuthAPI from "../services/AuthAPI";
import ProvincesAPI from "../services/ProvincesAPI";

const NewCompany = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const token = window.localStorage.getItem("authToken");
  const [sectors, setSectors] = useState([""]);
  const [selectedSectors, setSelectedSectors] = useState("");
  const [newSectors, setNewSector] = useState([""]);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvinces, setSelectedProvinces] = useState("");
  const [newProvinces, setNewProvinces] = useState([""]);

  useEffect(() => {
    fetchSectors();
    fetchProvinces();
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

  const [company, setCompany] = useState({
    name: "",
    eMail: "",
    cover: "istockphoto-517188688-612x612.jpg",
    description: "",
    visibility: true,
    user: "",
    sector: [""],
    provinceName: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    eMail: "",
    description: "",
    visibility: "",
    sector: [""],
    provinceName: "",
  });

  const fetchSectors = async () => {
    try {
      const data = await SectorsAPI.findAll();
      setSectors(data);
    } catch (error) {
      console.log("Erreur lors de la récupération des secteurs:", error);
    }
  };

  const fetchProvinces = async () => {
    try {
      const data = await ProvincesAPI.findAll();
      setProvinces(data);
    } catch (error) {
      console.log("Erreur lors de la récupération des provinces:", error);
    }
  };

  useEffect(() => {
    if (user) {
      setCompany((prevCompany) => ({
        ...prevCompany,
        user: `/api/users/${user.id}`,
      }));
    }
  }, [user]);

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setCompany({ ...company, [name]: value });
  };

  const handleSectorChange = (selectedOptions) => {
    const selectedSectors = selectedOptions.map(
      (option) => `/api/sectors/${option.value}`
    );
    setCompany({ ...company, sector: selectedSectors });
  };

  const handleProvinceChange = (selectedOption) => {
    const selectedProvinceId = selectedOption.value;
    setCompany({
      ...company,
      provinceName: `/api/provinces/${selectedProvinceId}`,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiErrors = {};
    if (company.name === "")
      apiErrors.name = "Le nom de l'entreprise est obligatoire";
    if (company.eMail === "") apiErrors.email = "L'email est obligatoire";
    if (company.description === "")
      apiErrors.description = "La description de l'entreprise est obligatoire";
    if (selectedSectors.length === 0)
      apiErrors.sector = "Le secteur de l'entreprise est obligatoire";
    if (selectedProvinces.length === 0)
      apiErrors.provinces = "La province de l'entreprise est obligatoire";
    setErrors(apiErrors);
    try {
      console.log(company);
      await Axios.post("http://127.0.0.1:8000/api/companies", company);
      toast.success("L'entreprise a bien été créée");
      navigate("/companies");
    } catch (error) {
      console.error(error.response);
      const { violations } = error.response.data;
      if (violations) {
        const apiErrors = {};
        violations.forEach((violation) => {
          apiErrors[violation.propertyPath] = violation.message;
        });
        setErrors(apiErrors);
      }
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Créer une entreprise</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <Field
              name="name"
              label="Nom"
              placeholder="Nom de l'entreprise"
              value={company.name}
              onChange={handleChange}
              error={errors.name}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <Field
              name="eMail"
              label="Email"
              placeholder="Email de l'entreprise"
              value={company.eMail}
              onChange={handleChange}
              error={errors.eMail}
            />
          </div>
        </div>
        <div className="mb-6">
          <Field
            name="description"
            label="Description"
            placeholder="Description de l'entreprise"
            value={company.description}
            onChange={handleChange}
            error={errors.description}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Secteurs :</label>
          {newSectors.map((newSector, index) => (
            <div className="input-group mb-3" key={index}>
              <Select
                isMulti
                name="sectors"
                options={sectors.map((sector) => ({
                  value: sector.id,
                  label: sector.name,
                }))}
                onChange={handleSectorChange}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
          ))}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Province :</label>
          {newProvinces.map((newProvince, index) => (
            <div className="input-group mb-3" key={index}>
              <Select
                name="provinceName"
                options={provinces.map((province) => ({
                  value: province.id,
                  label: province.name,
                }))}
                className="basic-single"
                classNamePrefix="select"
                onChange={handleProvinceChange}
              />
            </div>
          ))}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Visibilité :</label>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="visibility"
              className="form-checkbox text-indigo-600 h-5 w-5"
              checked={company.visibility}
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
            to="/companies"
            className="text-gray-500 font-bold hover:text-gray-700"
          >
            Retour à la liste
          </Link>
        </div>
      </form>
    </div>
  );
};

export default NewCompany;
