import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WorkersAPI from '../services/WorkersAPI';
import SkillsAPI from '../services/SkillsAPI';
  
const WorkerPage = () => {
  const { id = 'new' } = useParams();
  const navigate = useNavigate();

  const [worker, setWorker] = useState({
    lastname: '',
    firstname: '',
    gender: '',
    age: '',
    description: '',
    skills: [], // Nous stockerons les noms des compétences ici
  });

  useEffect(() => {
    if (id !== 'new') {
      fetchWorker(id);
    }
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const fetchWorker = async (id) => {
    try {
      const workerData = await WorkersAPI.find(id);
      // const skillsData = await Promise.all(
      //   workerData.skills.map(async (skillUrl) => {
      //     try {
      //       console.log('Récupération des données de la compétence :', skillUrl);
      //       const skillData = await SkillsAPI.find(skillUrl);
      //       return skillData.name;
      //     } catch (error) {
      //       console.error('Erreur lors de la récupération du nom de la compétence :', error);
      //       return 'Nom de compétence non disponible'; // Vous pouvez gérer l'erreur comme vous le souhaitez
      //     }
      //   })
      // );
  
      const formattedAge = formatDate(workerData.age);
  
      // Mettez à jour l'état worker avec les noms des compétences
      setWorker({
        ...workerData,
        age: formattedAge,
        // skills: skillsData,
      });
    } catch (error) {
      // Gérez l'erreur ici (par exemple, redirigez vers la liste des travailleurs)
      navigate('/workers', { replace: true });
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
              {/* <ul>
                {worker.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerPage;
