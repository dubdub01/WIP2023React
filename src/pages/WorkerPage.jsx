import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WorkersAPI from "../services/WorkersAPI";
import { toast } from "react-toastify";
import DeleteConfirmation from "../components/DeleteConfirmation";

const WorkerPage = () => {
  const { id = "new" } = useParams();
  const navigate = useNavigate();

  const [worker, setWorker] = useState({
    lastname: "",
    firstname: "",
    gender: "",
    age: "",
    description: "",
    skills: [], // Nous stockerons les noms des compétences ici
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
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">
            {worker.firstname} {worker.lastname}
          </h1>
          <div className="row">
            <div className="col-md-6">
              <h5>Genre:</h5>
              <p>{worker.gender}</p>
              <h5>Date de naissance:</h5>
              <p>{worker.age}</p>
            </div>
            <div className="col-md-6">
              <h5>Description:</h5>
              <p>{worker.description}</p>
              <h5>Compétences:</h5>
              <ul>
                {worker.skills.map((skill, index) => (
                  <li key={index}>{skill.name}</li>
                ))}
              </ul>

              <div>
                {/* Afficher le bouton de suppression */}
                <button onClick={() => setShowConfirmation(true)}>
                  Supprimer
                </button>

                {/* Afficher la confirmation si showConfirmation est true */}
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
    </div>
  );
};

export default WorkerPage;
