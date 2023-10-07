import { useState, useEffect } from "react";
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
    fetchCompanies()
    fetchSectors();
  }, [])

  const fetchCompanies = async () => {
    try {
      const data = await CompaniesAPI.findAll();
      setCompanies(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des travailleurs:", error);
    }
  };

  const fetchSectors = async () => {
    try {
      const data = await SectorsAPI.findAll();
      setSectors(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des compétences:", error);
    }
  };

  const handleSearch = (event) => {
    const value = event.currentTarget.value;
    setSearch(value);
    setCurrentPage(1);
  };


  const itemsPerPage = 9

  const filteredCompanies = companies.filter((company) => {
    const isNameMatch =
      company.name.toLowerCase().includes(search.toLowerCase())

  const isSectorMatch =
  selectedSector === "" || // Si aucun secteur n'est sélectionné, ne pas filtrer par secteur
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
    <>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div className="form-group">
        <label htmlFor="sector">Secteur :</label>
        <select
          id="sector"
          className="form-control"
          value={selectedSector}
          onChange={(event) => setSelectedSector(event.currentTarget.value)}
        >
          <option value="">Touts les secteurs</option>
          {sectors.map((sector) => (
            <option key={sector.id} value={sector.name}>
              {sector.name}
            </option>
          ))}
        </select>
      </div>

{alertMessage}


      {paginatedCompanies.map((company) => (
        <div class="row" key={company.id}>
          <div class="col-md-4">
            <div class="card bg-light mb-3">
              <div class="card-header text-center">
                <Link to={`/companies/${company.id}`}>{company.name}</Link>
              </div>
              <div class="card-body">
                <div class="card-text">
                  {company.sector.length}
                  <div class="text-center mt-3">{company.description}</div>
                  <img
  src={`${BASE_URL}uploads/images/${company.cover}`}
  alt="Couverture de l'entreprise"
/>
                  <div class="text-center mt-3">{company.cover}</div>
                  <ul>
                {company.sector.map((sector, index) => (
                  <li key={index}>{sector.name}</li>
                ))}
              </ul>
                  {company.provinceName.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {itemsPerPage < filteredCompanies.length && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          length={filteredCompanies.length}
          onPageChanged={setCurrentPage}
          />
          )}
    </>
  );
};

export default CompaniesPage;
