import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CompaniesAPI from "../services/CompaniesAPI";
import { toast } from "react-toastify";
import DeleteConfirmation from "../components/DeleteConfirmation";
import { BASE_URL } from "../config";
import { Link } from "react-router-dom";

const CompanyPage = () => {
  const { id = "new" } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState({
    name: "",
    e_mail: "",
    cover: "",
    sector: [],
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (id !== "new") {
      fetchCompany(id);
    }
  }, [id]);

  const handleDelete = async () => {
    const originalCompany = { ...company };

    try {
      await CompaniesAPI.delete(company.id);
      toast.success("La compagnie a bien été supprimée");
      navigate("/companies");
    } catch (error) {
      setCompany(originalCompany);
    }
  };

  const fetchCompany = async (id) => {
    try {
      const companyData = await CompaniesAPI.find(id);

      setCompany({
        ...companyData,
      });
    } catch (error) {
      navigate("/companies", { replace: true });
    }
  };

  return (
    <div className="container py-5">
      <div className="bg-white shadow-md rounded-md p-6">
        <h1 className="text-3xl font-semibold mb-4">{company.name}</h1>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2">
            <p className="mb-4">{company.e_mail}</p>
          </div>
          <div className="w-full md:w-1/2">
            <h5 className="text-lg font-semibold mb-2">Description :</h5>
            <p className="mb-4">{company.description}</p>
            <h5 className="text-lg font-semibold mb-2">Secteurs :</h5>
            <ul className="list-disc list-inside mb-4">
              {company.sector.map((sector, index) => (
                <li key={index}>{sector.name}</li>
              ))}
            </ul>
            <img
              src={`${BASE_URL}uploads/images/${company.cover}`}
              alt={`Couverture de ${company.name}`}
              className="w-full rounded"
            />

            <div className="mt-6">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                onClick={() => setShowConfirmation(true)}
              >
                Supprimer
              </button>

              {showConfirmation && (
                <DeleteConfirmation
                  onConfirm={handleDelete}
                  onCancel={() => setShowConfirmation(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
