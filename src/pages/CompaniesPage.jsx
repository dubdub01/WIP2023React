import { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import CompaniesAPI from "../services/CompaniesAPI";

const CompaniesPage = (props) => {
  const [companies, setCompanies] = useState([]);

  // pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const fetchCompanies = async () => {
    try {
      const data = await CompaniesAPI.findAll();
      setCompanies(data);
    } catch (error) {
      //notif à faire
      console.log(error.response);
    }
  }

  useEffect(() => {
    fetchCompanies()
  }, [])

  //pagination

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const itemsPerPage = 9

  const paginatedCompanies = Pagination.getData(
    companies,
    currentPage,
    itemsPerPage
  );

  return (
    <>
      {/* Et logique (&&) expr1 && expr2 renvoire expr1 si cette expression peut être conrtie en false, sinon renvoie expre2 */}

      {companies.length === 0 && (
        <div class="alert alert-info" role="alert">
          Aucune entreprise ne correspond à votre filtre.
        </div>
      )}

      {paginatedCompanies.map((company) => (
        <div class="row">
          <div class="col-md-4">
            <div class="card bg-light mb-3">
              <div class="card-header text-center">
                <a href="#">{company.name}</a>
              </div>
              <div class="card-body">
                <div class="card-text">
                  {company.sector.length}
                  <div class="text-center mt-3">{company.cover}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        length={companies.length}
        onPageChanged={handlePageChange}
      />
    </>
  );
};

export default CompaniesPage;
