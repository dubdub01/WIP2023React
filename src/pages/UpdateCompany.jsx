import React, { useState, useEffect } from "react";
import Field from "../components/forms/Field";
import { Link, useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import { toast } from "react-toastify";
import { COMPANIES_API } from "../config";
import SectorsAPI from "../services/SectorsAPI";
import Select from "react-select";
import ProvincesAPI from "../services/ProvincesAPI";
import { useTranslation } from "react-i18next";


const UpdateCompany = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sectors, setSectors] = useState([""]);
  const [selectedSectors, setSelectedSectors] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const { t, i18n } = useTranslation();


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
    cover: "",
    description: "",
    visibility: "",
    sector: "",
    provinceName: "",
  });

  useEffect(() => {
    fetchSectors();
    fetchProvinces();
    fetchCompanyData();
  }, []);

  const fetchSectors = async () => {
    try {
      const data = await SectorsAPI.findAll();
      setSectors(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des secteurs:", error);
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

  const fetchCompanyData = async () => {
    try {
      const response = await Axios.get(`${COMPANIES_API}/${id}`);
      const companyData = response.data;
      const companySectorsIRI = companyData.sector.map(
        (sector) => `/api/sectors/${sector.id}`
      );

      console.log(companySectorsIRI);
      // Utilisez {} pour envelopper les propriétés de l'objet
      const companyProvinceIRI = `/api/provinces/${companyData.provinceName.id}`;

      setCompany({
        ...companyData,
        provinceName: companyProvinceIRI,
        sector: companySectorsIRI, // Assurez-vous que skills contient les IRI des compétences
      });

      const tabSectors = companyData.sector.map((sectors) => {
        return { value: sectors.id, label: sectors.name };
      });
      setSelectedSectors(tabSectors);
      console.log(selectedSectors);

      setSelectedProvince({
        value: companyData.provinceName.id,
        label: companyData.provinceName.name,
      });
      console.log(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données du travailleur:",
        error
      );
    }
  };

  const province = company.provinceName.name;
  console.log(province);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.currentTarget;
    // Utilisez "checked" pour gérer la valeur de "visibility" (case à cocher)
    setCompany({ ...company, [name]: type === "checkbox" ? checked : value });
  };

  const handleSectorChange = (selectedOptions) => {
    const selectedSectors = selectedOptions.map(
      (option) => `/api/sectors/${option.id}`
    );
    console.log(selectedOptions);
    setSelectedSectors(selectedOptions);
    setCompany({ ...company, sector: selectedSectors });
  };

  const handleProvinceChange = (selectedOption) => {
    const selectedProvinceIRI = `/api/provinces/${selectedOption.value}`;

    setCompany({
      ...company,
      provinceName: selectedProvinceIRI, // Mettez à jour la provinceName avec l'IRI
    });

    setSelectedProvince(selectedOption); // Mettez à jour l'état selectedProvince
  };

  const sectorOptions = sectors.map((sector) => ({
    value: sector.name,
    label: t(`sectors.${sector.name}`),
    id: sector.id,
  }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiErrors = {};
    if (company.name === "") apiErrors.name = "Le prénom est obligatoire";
    if (company.eMail === "") apiErrors.eMail = "Le nom est obligatoire";
    if (company.description === "")
      apiErrors.description = "L'âge est obligatoire";
    if (company.sector === "") apiErrors.sector = "Le genre est obligatoire";
    if (company.provinceName === "")
      apiErrors.provinceName = "La description est obligatoire";
    setErrors(apiErrors);
    try {
      // Excluez l'attribut "user" de l'objet worker envoyé dans la requête PUT
      const { user, ...updatedCompany } = company;
      await Axios.put(`${COMPANIES_API}/${id}`, updatedCompany); // Utilisez la méthode PUT pour la mise à jour
      toast.success("Le travailleur a bien été mis à jour");
      navigate("/companies");
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
      <h1 className="text-3xl font-semibold mb-4 text-white">{t("updateCompany.titre")}</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <Field
              name="name"
              label={t("newCompanyPage.nameLabel")}
              placeholder={t("newCompanyPage.namePlace")}
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
              placeholder={t("newCompanyPage.email")}
              value={company.eMail}
              onChange={handleChange}
              error={errors.eMail}
            />
          </div>
        </div>
        <div className="mb-6">
          <Field
            name="description"
            label={t("newCompanyPage.descriptionLabel")}
            placeholder={t("newCompanyPage.description")}
            value={company.description}
            onChange={handleChange}
            error={errors.description}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">{t("companiesPage.secteurs")}</label>
          <Select
            isMulti
            name="sectors"
            onChange={handleSectorChange}
            className="basic-multi-select"
            classNamePrefix="select"
            value={selectedSectors}
            options={sectorOptions}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">{t("companiesPage.provinces")}</label>

          <Select
            name="provinceName"
            onChange={handleProvinceChange}
            className="basic-single"
            classNamePrefix="select"
            value={selectedProvince}
            options={provinces.map((province) => ({
              value: province.id,
              label: province.name,
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
              checked={company.visibility}
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
            to="/companies"
            className="text-gray-500 font-bold hover:text-gray-700"
          >
            {t("newCompanyPage.retour")}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateCompany;
