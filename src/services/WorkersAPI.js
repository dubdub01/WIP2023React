import Axios from "axios";
import { WORKERS_API } from "../config";

function findAll() {
  return Axios.get(WORKERS_API).then(
    (response) => response.data["hydra:member"]
  );
}

function find(id)
{
  return Axios.get(`${WORKERS_API}/${id}`)
              .then(response => response.data)
}

function deleteWorker(id){
  return Axios.delete(`${WORKERS_API}/${id}`)
}

async function getSkills(id) {
  const response = await Axios.get(`${WORKERS_API}/${id}/skills`);
  return response.data['hydra:member'];
}


export default {
  findAll: findAll,
  find: find,
  delete: deleteWorker,
  getSkills: getSkills
};
