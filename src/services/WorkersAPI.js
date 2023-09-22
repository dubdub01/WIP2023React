import Axios from "axios";

function findAll() {
  return Axios.get('http://127.0.0.1:8000/api/workers').then(
    (response) => response.data["hydra:member"]
  );
}

function find(id)
{
  return Axios.get(`http://127.0.0.1:8000/api/workers/${id}`)
              .then(response => response.data)
}

function deleteWorker(id){
  return Axios.delete(`http://127.0.0.1:8000/api/workers/${id}`)
}

async function getSkills(workerId) {
  const response = await Axios.get(`http://127.0.0.1:8000/api/workers/${workerId}/skills`);
  return response.data['hydra:member'];
}


export default {
  findAll: findAll,
  find: find,
  delete: deleteWorker,
  getSkills: getSkills
};
