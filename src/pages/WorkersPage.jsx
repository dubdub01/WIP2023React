import { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import WorkersAPI from "../services/WorkersAPI";

const WorkersPage = (props) => {
  const [workers, setWorkers] = useState([]);

  // pour la pagination
  const [currentPage, setCurrentPage] = useState(1);

  // pour le filtre
  const [search, setSearch] = useState("");

  const fetchWorkers = async () => {
    try {
      const data = await WorkersAPI.findAll();
      setWorkers(data);
    } catch (error) {
      //notif à faire
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  //pour le filtre
  const handleSearch = (event) => {
    const value = event.currentTarget.value;
    setSearch(value);
    setCurrentPage(1);
  };

  const filteredWorkers = workers.filter(
    (c) =>
      c.firstname.toLowerCase().includes(search.toLowerCase()) ||
      c.lastname.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 9;

  const paginatedWorkers = Pagination.getData(
    filteredWorkers,
    currentPage,
    itemsPerPage
  );

  return (
    <>
      {/*  filtre */}
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher..."
          value={search}
          onChange={handleSearch}
        />
      </div>
      {/* Et logique (&&) expr1 && expr2 renvoire expr1 si cette expression peut être conrtie en false, sinon renvoie expre2 */}

      {workers.length === 0 && (
        <div class="alert alert-info" role="alert">
          Aucune entreprise ne correspond à votre filtre.
        </div>
      )}

      {paginatedWorkers.map((worker) => (
        <div class="row">
          <div class="col-md-4">
            <div class="card bg-light mb-3">
              <div class="card-header text-center">
                <a href="#">
                  {worker.firstname}
                  {worker.lastname}
                </a>
              </div>
              <div class="card-body">
                <div class="card-text">
                  {worker.age}
                  <div class="text-center mt-3">{worker.gender}</div>
                  <div class="text-center mt-3">{worker.description}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {itemsPerPage < filteredWorkers.length && 
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          length={filteredWorkers.length}
          onPageChanged={handlePageChange}
        />
      }
    </>
  );
};

export default WorkersPage;
