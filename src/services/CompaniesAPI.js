import Axios from "axios";
import { COMPANIES_API } from "../config";

function findAll() {
  return Axios.get(COMPANIES_API).then(
    (response) => response.data["hydra:member"]
  );
}

export default {
  findAll: findAll,
};
