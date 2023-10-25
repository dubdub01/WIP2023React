import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CompaniesAPI from "../services/CompaniesAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Field from "../components/forms/Field";

const NewCompany = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const token = window.localStorage.getItem("authToken");

  const [company, setCompany] = useState({
    name: "",
    description: "",
    logo: "",
    visibility: true,
    user: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    logo: "",
    visibility: "",
  });

  useEffect(() => {
    if (user) {
      setCompany((prevCompany) => ({
        ...prevCompany,
        user: `{user.id}`,
      }));
    }
  }, [user]);

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setCompany({ ...company, [name]: value });
    };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await CompaniesAPI.create(company);
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
              type="logo"
              name={"logo"}
              label={"Logo"}
              placeholder={"Logo de l'entreprise"}
              value={company.logo}
              onChange={handleChange}
              error={errors.logo}
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
