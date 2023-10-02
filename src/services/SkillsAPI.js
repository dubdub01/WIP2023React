import Axios from "axios";
import { SKILLS_API } from "../config";

function findAll() {
  return Axios.get(SKILLS_API).then(
    (response) => response.data["hydra:member"]
  );
}


export default {
  findAll: findAll,
};
