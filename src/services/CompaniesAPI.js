import Axios from "axios";
import { COMPANIES_API } from "../config";

function findAll() {
  return Axios.get(COMPANIES_API).then(
    (response) => response.data["hydra:member"]
  );
}

function find(id)
{
  return Axios.get(`${COMPANIES_API}/${id}`)
              .then(response => response.data)
}

function deleteCompany(id){
  return Axios.delete(`${COMPANIES_API}/${id}`)
}

async function getSector(id) {
  const response = await Axios.get(`${COMPANIES_API}/${id}/sector`);
  return response.data['hydra:member'];
}

export default {
  findAll: findAll,
  find: find,
  delete: deleteCompany,
  getSector: getSector
};
