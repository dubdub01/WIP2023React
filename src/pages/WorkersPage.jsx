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
  const [isLoading, setIsLoading] = useState(true);
  let content;

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await WorkersAPI.findAll();
        setWorkers(data);
        setIsLoading(false);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des travailleurs:",
          error
        );
      }
    };
    fetchData();
  }, []);

  const paginatedWorkers = Pagination.getData(
    filteredWorkers,
    currentPage,
    itemsPerPage
  );

  if (isLoading) {
    content = (
      <div className="alert alert-info" role="alert">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, index) => (
            <div class="block bg-white border rounded-md p-4 shadow-md mb-4 hover:scale-105 transform transition-transform duration-300">
              <div class="animate-pulse flex space-x-4">
                <div class="flex-1 space-y-6 py-1">
                  <div class="h-2 bg-slate-700 rounded"></div>
                  <div class="space-y-3">
                    <div class="h-2 bg-slate-700 rounded"></div>
                  </div>
                  <div class="h-2 bg-slate-700 rounded"></div>
                  <div class="h-2 bg-slate-700 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else if (filteredWorkers.length === 0) {
    content = (
      <div className="text-gray-600 text-center">
        Aucun travailleur ne correspond à votre recherche...
      </div>
    );
  } else {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {paginatedWorkers.map((worker) => (
          <Link
            to={`/workers/${worker.id}`}
            className="block bg-white border rounded-md p-4 shadow-md mb-4 hover:scale-105 transform transition-transform duration-300"
            key={worker.id}
          >
            <h5 className="text-xl font-semibold">
              {worker.firstname} {worker.lastname}
            </h5>
            <p className="text-gray-600">
              <strong>Genre:</strong> {worker.gender}
            </p>
            <p className="text-gray-600">
              <strong>Date de naissance:</strong> {formatDate(worker.age)}
            </p>
            <p className="text-gray-600">
              <strong>Compétences:</strong>
            </p>
            <ul className="list-disc list-inside text-gray-600">
              {worker.skills.map((skill, index) => (
                <li key={index}>{skill.name}</li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Liste des Travailleurs</h1>
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
      
      {content}

      

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
