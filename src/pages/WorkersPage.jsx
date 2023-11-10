import React, { useState, useEffect } from "react";
import WorkersAPI from "../services/WorkersAPI";
import SkillsAPI from "../services/SkillsAPI";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import RatingStars from "../services/RatingStars";

const WorkersPage = () => {
  const [workers, setWorkers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const [isClearable, setIsClearable] = useState(true);
  const [sortByRating, setSortByRating] = useState(false);

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

  const skillOptions = skills.map((skill) => ({
    value: skill.name,
    label: t(`skills.${skill.name}`),
  }));

  const handleSkillChange = (selectedOption) => {
    setIsClearable(true); // Toujours autoriser la suppression (clearable)

    if (selectedOption === null) {
      setSelectedSkill(""); // Réinitialisation de la compétence sélectionnée
    } else {
      setSelectedSkill(selectedOption.value);
    }
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

  const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) {
      return 0; // Retournez 0 s'il n'y a aucune évaluation.
    }

    const totalRating = ratings.reduce((sum, rating) => sum + rating.value, 0);
    return totalRating / ratings.length;
  };

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

  let sortedWorkers = [...filteredWorkers];

  if (sortByRating) {
    // Tri par note croissante
    sortedWorkers.sort((a, b) => {
      const ratingA = calculateAverageRating(a.ratings);
      const ratingB = calculateAverageRating(b.ratings);
      return ratingA - ratingB;
    });
  } else {
    // Tri par note décroissante
    sortedWorkers.sort((a, b) => {
      const ratingA = calculateAverageRating(a.ratings);
      const ratingB = calculateAverageRating(b.ratings);
      return ratingB - ratingA;
    });
  }

  const paginatedSortedWorkers = Pagination.getData(
    sortedWorkers,
    currentPage,
    itemsPerPage
  );

  if (isLoading) {
    content = (
      <div className="alert alert-info" role="alert">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, index) => (
            <div className="block bg-teal-400 border rounded-md p-4 shadow-md mb-4 hover:scale-105 transform transition-transform duration-300">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-white rounded"></div>
                  <div className="space-y-3">
                    <div className="h-2 bg-white rounded"></div>
                  </div>
                  <div className="h-2 bg-white rounded"></div>
                  <div className="h-2 bg-white rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else if (filteredWorkers.length === 0) {
    content = (
      <div className="text-white text-center">
        {t("workers.noWorker")}
      </div>
    );
  } else {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {paginatedSortedWorkers.map((worker) => (
          <Link
            to={`/workers/${worker.id}`}
            className="block bg-white border rounded-md p-4 shadow-md mb-4 hover:scale-105 transform transition-transform duration-300"
            key={worker.id}
          >
            <h5 className="text-xl font-semibold">
              {worker.firstname} {worker.lastname}
            </h5>
            <p className="text-gray-600">
              <strong>{t("worker.workerGenre")}</strong> {worker.gender}
            </p>
            <p className="text-gray-600">
              <strong>{t("worker.workerDate")}</strong> {formatDate(worker.age)}
            </p>
            <p className="text-gray-600">
              <strong>{t("worker.workerCompétence")}</strong>
            </p>
            <ul className="list-disc list-inside text-gray-600">
              {worker.skills.map((skill, index) => (
                <li key={index}>{t(`skills.${skill.name}`)}</li>
              ))}
            </ul>
            <div className="mt-4">
              {worker.ratings.length === 0 ? (
                <div>{t("workers.noNotes")}</div>
              ) : (
                <RatingStars
                  averageRating={calculateAverageRating(worker.ratings)}
                />
              )}
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-white text-3xl font-semibold mb-4">{t("workers.List")}</h1>
      {/* Afficher le message de chargement initial si isLoading est vrai */}

      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mb-4">
        <div className="flex-grow">
          <input
            type="text"
            className="border rounded-md p-2 w-full"
            placeholder={t("workers.workerSearch")}
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="flex-grow">
          <Select
            options={skillOptions}
            value={skillOptions.find(
              (option) => option.value === selectedSkill
            )}
            onChange={handleSkillChange}
            placeholder={t("workers.workerSkills")}
            isClearable={isClearable}
          />
        </div>
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          onClick={() => setSortByRating(!sortByRating)}
        >
          {sortByRating
            ? "Trier par note croissante"
            : "Trier par note décroissante"
            }
        </button>
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
