import React, { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import CompaniesAPI from "../services/CompaniesAPI";
import { Link } from "react-router-dom";
import { BASE_URL } from "../config";
import SectorsAPI from "../services/SectorsAPI";

const CompaniesPage = (props) => {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [sectors, setSectors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchCompanies();
    fetchSectors();
  }, []);

  const fetchCompanies = async () => {
    try {
      const data = await CompaniesAPI.findAll();
      setCompanies(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des entreprises:", error);
    }
  };

  const fetchSectors = async () => {
    try {
      const data = await SectorsAPI.findAll();
      setSectors(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des secteurs:", error);
    }
  };

  const handleSearch = (event) => {
    const value = event.currentTarget.value;
    setSearch(value);
    setCurrentPage(1);
  };

  const itemsPerPage = 9;

  const filteredCompanies = companies.filter((company) => {
    const isNameMatch =
      company.name.toLowerCase().includes(search.toLowerCase());

    const isSectorMatch =
      selectedSector === "" ||
      company.sector.some((sector) => sector.name === selectedSector);

    return isNameMatch && isSectorMatch;
  });

  const alertMessage = filteredCompanies.length === 0 && (
    <div className="alert alert-info" role="alert">
      Aucune entreprise ne correspond à votre filtre.
    </div>
  );

  const paginatedCompanies = Pagination.getData(
    filteredCompanies,
    currentPage,
    itemsPerPage
  );

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Liste des Entreprises</h1>

      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher par nom"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-control"
            value={selectedSector}
            onChange={(event) => setSelectedSector(event.currentTarget.value)}
          >
            <option value="">Tous les secteurs</option>
            {sectors.map((sector) => (
              <option key={sector.id} value={sector.name}>
                {sector.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {alertMessage}

      <div className="row">
        {paginatedCompanies.map((company) => (
          <div className="col-md-4" key={company.id}>
            <div className="card mb-4">
              <img
                src={`${BASE_URL}uploads/images/${company.cover}`}
                alt={`Couverture de ${company.name}`}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/companies/${company.id}`}>{company.name}</Link>
                </h5>
                <p className="card-text">{company.description}</p>
                <p className="card-text">
                  <strong>Secteurs :</strong>
                </p>
                <ul className="list-unstyled">
                  {company.sector.map((sector, index) => (
                    <li key={index}>{sector.name}</li>
                  ))}
                </ul>
                <p className="card-text">
                  <strong>Province :</strong> {company.provinceName.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {itemsPerPage < filteredCompanies.length && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          length={filteredCompanies.length}
          onPageChanged={setCurrentPage}
        />
      )}
    </div>
  );
};

export default CompaniesPage;
