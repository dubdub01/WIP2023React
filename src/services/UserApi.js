//create a POST fonction for the user

import Axios from 'axios';
import { USER_API } from '../config';


function find(id)
{
  return Axios.get(USER_API)
              .then(response => response.data)
}

function register(userData) {
return Axios.post(USER_API, userData)
}

export default {
    register: register,
    find: find
    };