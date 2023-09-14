import { useState, useEffect } from "react";
import Axios from "axios";
import Pagination from "../components/Pagination";

const WorkersPageWithPagination = (props) => {
  const [workers, setWorkers] = useState([]);

  // pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, settotalItems] = useState(0);
  // définir le nombre d'items par page
  const itemsPerPage = 10;

  const handlePageChange = (page) => {
    setWorkers([]);
    setCurrentPage(page);
  };

  useEffect(() => {
    Axios.get(
      `http://127.0.0.1:8000/api/workers?pagination=true&count=${itemsPerPage}&page=${currentPage}`
    )
      .then((response) => {
        setWorkers(response.data["hydra:member"]);
        settotalItems(response.data["hydra:totalItems"]);
      })
      .catch((error) => console.log(error.response));
  }, [currentPage]);

  return (
    <>
      {/* Et logique (&&) expr1 && expr2 renvoire expr1 si cette expression peut être conrtie en false, sinon renvoie expre2 */}

      {workers.length === 0 && (
        <div class="alert alert-info" role="alert">
          Aucune entreprise ne correspond à votre filtre.
        </div>
      )}

      {workers.map((worker) => (
        <div class="row">
          <div class="col-md-4">
            <div class="card bg-light mb-3">
              <div class="card-header text-center">
                <a href="#">{worker.name}</a>
              </div>
              <div class="card-body">
                <div class="card-text">
                  {worker.sector.length}
                  <div class="text-center mt-3">{worker.cover}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        length={totalItems}
        onPageChanged={handlePageChange}
      />
    </>
  );
};

export default WorkersPageWithPagination;
