//create a POST fonction for the user

import Axios from 'axios';


function find(id)
{
  return Axios.get("http://127.0.0.1:8000/api/users")
              .then(response => response.data)
}

function register(userData) {
return Axios.post("http://127.0.0.1:8000/api/users", userData)
}

export default {
    register: register,
    find: find
    };