import Axios from "axios";
import { SECTOR_API } from "../config";

function findAll() {
  return Axios.get(SECTOR_API).then(
    (response) => response.data["hydra:member"]
  );
}


export default {
  findAll: findAll,
};
