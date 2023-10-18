import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WorkersAPI from "../services/WorkersAPI";
import { toast } from "react-toastify";
import DeleteConfirmation from "../components/DeleteConfirmation";
import { BASE_URL } from "../config";
import { Link } from "react-router-dom";

const WorkerPage = () => {
  const { id = "new" } = useParams();
  const navigate = useNavigate();

  const [worker, setWorker] = useState({
    lastname: "",
    firstname: "",
    gender: "",
    age: "",
    description: "",
    skills: [],
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (id !== "new") {
      fetchWorker(id);
    }
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const handleDelete = async () => {
    const originalWorker = { ...worker };

    try {
      await WorkersAPI.delete(worker.id);
      toast.success("Le travailleur a bien été supprimé");
      navigate("/workers");
    } catch (error) {
      setWorker(originalWorker);
    }
  };

  const fetchWorker = async (id) => {
    try {
      const workerData = await WorkersAPI.find(id);

      const formattedAge = formatDate(workerData.age);

      setWorker({
        ...workerData,
        age: formattedAge,
      });
    } catch (error) {
      navigate("/workers", { replace: true });
    }
  };

  return (
    <div className="container py-5">
  <div className="bg-white shadow-md rounded-lg p-6">
    <h1 className="text-3xl font-semibold mb-4">
      {worker.firstname} {worker.lastname}
    </h1>
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/2">
        <h5 className="font-semibold">Genre:</h5>
        <p>{worker.gender}</p>
        <h5 className="font-semibold mt-2">Date de naissance:</h5>
        <p>{worker.age}</p>
      </div>
      <div className="w-full md:w-1/2">
        <h5 className="font-semibold">Description:</h5>
        <p>{worker.description}</p>
        <h5 className="font-semibold mt-2">Compétences:</h5>
        <ul className="list-disc pl-4">
          {worker.skills.map((skill, index) => (
            <li key={index}>{skill.name}</li>
          ))}
        </ul>
        <Link
          href={`${BASE_URL}uploads/cv/${worker.cv}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          CV de {worker.firstname} {worker.lastname}
        </Link>
        <div className="mt-3">
          <button
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
            onClick={() => setShowConfirmation(true)}
          >
            Supprimer
          </button>

          {showConfirmation && (
            <DeleteConfirmation
              onConfirm={handleDelete}
              onCancel={() => setShowConfirmation(false)}
            />
          )}
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default WorkerPage;
