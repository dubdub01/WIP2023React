import React, { useState, useEffect } from "react";
import WorkersAPI from "../services/WorkersAPI";
import SkillsAPI from "../services/SkillsAPI";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";

const WorkersPage = (props) => {
  const [workers, setWorkers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");

  useEffect(() => {
    fetchWorkers();
    fetchSkills();
  }, []);

  const fetchWorkers = async () => {
    try {
      const data = await WorkersAPI.findAll();
      setWorkers(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des travailleurs:", error);
    }
  };

  const fetchSkills = async () => {
    try {
      const data = await SkillsAPI.findAll();
      setSkills(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des compétences:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const handleSearch = (event) => {
    const value = event.currentTarget.value;
    setSearch(value);
    setCurrentPage(1);
  };

  const itemsPerPage = 9;

  const filteredWorkers = workers.filter((worker) => {
    const isNameMatch =
      worker.firstname.toLowerCase().includes(search.toLowerCase()) ||
      worker.lastname.toLowerCase().includes(search.toLowerCase());

    const isSkillMatch =
      selectedSkill === "" || // Si aucun skill n'est sélectionné, ne pas filtrer par skill
      worker.skills.some((skill) => skill.name === selectedSkill);

    return isNameMatch && isSkillMatch;
  });

  const alertMessage = filteredWorkers.length === 0 && (
    <div className="alert alert-info" role="alert">
      Aucune entreprise ne correspond à votre filtre.
    </div>
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

      <div className="form-group">
        <label htmlFor="skill">Compétence :</label>
        <select
          id="skill"
          className="form-control"
          value={selectedSkill}
          onChange={(event) => setSelectedSkill(event.currentTarget.value)}
        >
          <option value="">Toutes les compétences</option>
          {skills.map((skill) => (
            <option key={skill.id} value={skill.name}>
              {skill.name}
            </option>
          ))}
        </select>
      </div>

      {alertMessage}

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
                  {formatDate(worker.age)} {/* Formatage de la date */}
                  <div className="text-center mt-3">{worker.gender}</div>
                  <div className="text-center mt-3">{worker.description}</div>
                  <div className="text-center mt-3">
                    <h5>Compétences :</h5>
                    <ul>
                      {worker.skills.map((skill, index) => (
                        <li key={index}>{skill.name}</li>
                      ))}
                    </ul>
                  </div>
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