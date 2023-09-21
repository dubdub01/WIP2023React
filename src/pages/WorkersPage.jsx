import React, { useState, useEffect } from "react";
import WorkersAPI from "../services/WorkersAPI";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";

const WorkersPage = (props) => {
  const [workers, setWorkers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const data = await WorkersAPI.findAll();
      setWorkers(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des travailleurs:", error);
    }
  };

  const handleDelete = async (id) => {
    const originalWorkers = [...workers];

    setWorkers(workers.filter((worker) => worker.id !== id));

    try {
      await WorkersAPI.delete(id);
    } catch (error) {
      setWorkers(originalWorkers);
    }
  };

  const handleSearch = (event) => {
    const value = event.currentTarget.value;
    setSearch(value);
    setCurrentPage(1);
  };

  const itemsPerPage = 9;

  const filteredWorkers = workers.filter(
    (c) =>
      c.firstname.toLowerCase().includes(search.toLowerCase()) ||
      c.lastname.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedWorkers = Pagination.getData(
    filteredWorkers,
    currentPage,
    itemsPerPage
  );

  return (
    <div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      {filteredWorkers.length === 0 && (
        <div className="alert alert-info" role="alert">
          Aucune entreprise ne correspond à votre filtre.
        </div>
      )}

      {paginatedWorkers.map((worker) => (
        <div className="row" key={worker.id}>
          <div className="col-md-4">
            <div className="card bg-light mb-3">
              <div className="card-header text-center">
                <Link to={`/workers/${worker.id}`}>
                  {worker.firstname} {worker.lastname}
                </Link>
              </div>
              <div className="card-body">
                <div className="card-text">
                  {worker.age}
                  <div className="text-center mt-3">{worker.gender}</div>
                  <div className="text-center mt-3">{worker.description}</div>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(worker.id)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {itemsPerPage < filteredWorkers.length && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          length={filteredWorkers.length}
          onPageChanged={setCurrentPage}
        />
      )}
    </div>
  );
};

export default WorkersPage;
