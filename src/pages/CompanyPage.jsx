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
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">{company.name}</h1>
          <div className="row">
            <div className="col-md-6">
              <p>{company.e_mail}</p>
            </div>
            <div className="col-md-6">
              <h5>Description:</h5>
              <p>{company.description}</p>
              <h5>Secteurs:</h5>
              <ul>
                {company.sector.map((sector, index) => (
                  <li key={index}>{sector.name}</li>
                ))}
              </ul>
              <img
                src={`${BASE_URL}uploads/images/${company.cover}`}
                alt={`Couverture de ${company.name}`}
                className="img-fluid rounded"
              />

              <div className="mt-3">
                <button
                  className="btn btn-danger"
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
    </div>
  );
};

export default CompanyPage;
