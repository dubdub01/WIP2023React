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
  const [isLoading, setIsLoading] = useState(true);
  let content;

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
    const isNameMatch = company.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const isSectorMatch =
      selectedSector === "" ||
      company.sector.some((sector) => sector.name === selectedSector);

    const isVisible = company.visibility === true;

    return isNameMatch && isSectorMatch && isVisible;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await CompaniesAPI.findAll();
        setCompanies(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des entreprises:", error);
      }
    };
    fetchData();
  }, []);

  const paginatedCompanies = Pagination.getData(
    filteredCompanies,
    currentPage,
    itemsPerPage
  );

  if (isLoading) {
    content = (
      <div className="alert alert-info" role="alert">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, index) => (
            <div className="block bg-white border rounded-md p-4 shadow-md mb-4 hover:scale-105 transform transition-transform duration-300">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-700 rounded"></div>
                  <div className="space-y-3">
                    <div className="h-2 bg-slate-700 rounded"></div>
                  </div>
                  <div className="h-2 bg-slate-700 rounded"></div>
                  <div className="h-2 bg-slate-700 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else if (filteredCompanies.length === 0) {
    content = (
      <div className="text-gray-600 text-center">
        Aucune entreprise ne correspond à votre recherche...
      </div>
    );
  } else {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {paginatedCompanies.map((company) => (
          <Link
          to={`/companies/${company.id}`}
            className="bg-white border rounded-md p-4 shadow-md mb-4 hover:scale-105 transform transition-transform duration-300">
              <img
                src={`${BASE_URL}uploads/images/${company.cover}`}
                alt={`Couverture de ${company.name}`}
                className="w-full h-auto mb-4"
              />
              <h5 className="text-xl font-semibold mb-2">
                <Link to={`/companies/${company.id}`}>{company.name}</Link>
              </h5>
              <p className="text-gray-600 mb-2">{company.description}</p>
              <p className="text-gray-600 mb-2">
                <strong>Secteurs :</strong>
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-2">
                {company.sector.map((sector, index) => (
                  <li key={index}>{sector.name}</li>
                ))}
              </ul>
              <p className="text-gray-600">
                <strong>Province :</strong> {company.provinceName.name}
              </p>
            </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Liste des entreprises</h1>
      {/* Afficher le message de chargement initial si isLoading est vrai */}

      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mb-4">
        <div className="flex-grow">
          <input
            type="text"
            className="border rounded-md p-2 w-full"
            placeholder="Rechercher par nom"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="flex-grow">
          <select
            className="border rounded-md p-2 w-full"
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

      {content}

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
