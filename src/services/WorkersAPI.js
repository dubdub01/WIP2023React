import Axios from "axios";

function findAll() {
  return Axios.get('http://127.0.0.1:8000/api/workers').then(
    (response) => response.data["hydra:member"]
  );
}

function find(id)
{
  return Axios.get(`http://127.0.0.1:8000/api/workers/${id}`)
}

function deleteWorker(id){
  return Axios.delete(`http://127.0.0.1:8000/api/workers/${id}`)
}


export default {
  findAll: findAll,
  find: find,
  delete: deleteWorker
};
