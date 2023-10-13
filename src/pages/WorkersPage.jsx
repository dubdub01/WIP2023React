import React, { useState, useEffect } from "react";
import WorkersAPI from "../services/WorkersAPI";
import SkillsAPI from "../services/SkillsAPI";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";

const WorkersPage = () => {
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
      selectedSkill === "" ||
      worker.skills.some((skill) => skill.name === selectedSkill);

    const isVisible = worker.visibility === true;

    return isNameMatch && isSkillMatch && isVisible;
  });

  const alertMessage = filteredWorkers.length === 0 && (
    <div className="alert alert-info" role="alert">
      Aucun travailleur ne correspond à votre filtre.
    </div>
  );

  const paginatedWorkers = Pagination.getData(
    filteredWorkers,
    currentPage,
    itemsPerPage
  );

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Liste des Travailleurs</h1>

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
      </div>

      {alertMessage}

      <div className="row">
        {paginatedWorkers.map((worker) => (
          <div className="col-md-4" key={worker.id}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/workers/${worker.id}`}>
                    {worker.firstname} {worker.lastname}
                  </Link>
                </h5>
                <p className="card-text">
                  <strong>Genre:</strong> {worker.gender}
                </p>
                <p className="card-text">
                  <strong>Date de naissance:</strong> {formatDate(worker.age)}
                </p>
                <p className="card-text">
                  <strong>Compétences:</strong>
                </p>
                <ul className="list-unstyled">
                  {worker.skills.map((skill, index) => (
                    <li key={index}>{skill.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

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
