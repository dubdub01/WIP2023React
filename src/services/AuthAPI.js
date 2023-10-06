import Axios from "axios";
import jwtDecode from "jwt-decode";
import { LOGIN_API } from "../config";

function authenticate(credentials)

{
    return Axios.post(LOGIN_API, credentials)
        .then(response => response.data.token)
        .then(token => {
            window.localStorage.setItem('authToken', token)
            Axios.defaults.headers["Authorization"]="Bearer " + token
            return true
        })
}

function logout()
{
    window.localStorage.removeItem('authToken')
    delete Axios.defaults.headers['Authorization']
}

function setup()
    {
        const token = window.localStorage.getItem('authToken')
        if(token)
        {
            const jwtData = jwtDecode(token)
            // millisecondes vs secondes
            if((jwtData.exp * 1000) > new Date().getTime())
            {
                Axios.defaults.headers["Authorization"]="Bearer " + token
            }
        }   
    }

    function isAuthenticated()
    {
        const token = window.localStorage.getItem('authToken')
        if(token)
        {
            const jwtData = jwtDecode(token)
            // millisecondes vs secondes
            if((jwtData.exp * 1000) > new Date().getTime())
            {
                return true // ok
            }
            return false // token expiré
        }
        return false // pas de token
    }

    function getUserInfoByToken(token) {
        try {
          // Décodage du token JWT pour obtenir les données de l'utilisateur
          const userData = jwtDecode(token);
          
          // Vous pouvez maintenant utiliser userData pour obtenir des informations spécifiques de l'utilisateur
          // userData contiendra les données du token telles que l'ID de l'utilisateur, le nom d'utilisateur, etc.
      
          return Promise.resolve(userData);
        } catch (error) {
          // En cas d'erreur lors du décodage du token
          return Promise.reject(error);
        }
      }

    export default {
        authenticate: authenticate, 
        logout: logout,
        setup: setup,
        isAuthenticated : isAuthenticated,
        getUserInfoByToken: getUserInfoByToken
    }