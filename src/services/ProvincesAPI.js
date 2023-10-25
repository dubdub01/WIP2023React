import Axios from "axios";
import { PROVINCE_API } from "../config";

function findAll() {
  return Axios.get(PROVINCE_API).then(
    (response) => response.data["hydra:member"]
  );
}


export default {
  findAll: findAll,
};
