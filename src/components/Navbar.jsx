import { NavLink, useNavigate } from "react-router-dom";
import AuthAPI from "../services/AuthAPI";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Navbar = (props) => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    AuthAPI.logout();
    setIsAuthenticated(false);
    toast.info("Vous êtes désormais déconnecté");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="bg-gradient-to-r from-slate-950 to-slate-600">
    <div className="container mx-auto">
      <div className="flex items-center justify-between py-4">
        <NavLink className="text-white text-2xl font-semibold" to="/">
          WIP
        </NavLink>
        <button
          className="lg:hidden block text-white text-xl focus:outline-none"
          // onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div className="lg:flex lg:items-center lg:justify-center space-x-4">
          <NavLink
            className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            to="/"
          >
            Accueil
          </NavLink>
          <NavLink
            className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            to="/workers"
          >
            Worker
          </NavLink>
          <NavLink
            className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            to="/companies"
          >
            Companies
          </NavLink>
          <NavLink
            className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            to="/legal"
          >
            Légal
          </NavLink>
          {isAuthenticated && (
            <div>
            <NavLink
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              to="/newworker"
            >
              Nouveau Worker
            </NavLink>
            <NavLink
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              to="/newcompany"
            >
              Nouvelle Entreprise
            </NavLink>
              
            </div>
            
          )}
        </div>
  
        <div className="lg:flex space-x-4">
          {!isAuthenticated ? (
            <div className="lg:flex lg:flex-col space-y-2">
              <NavLink
                className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                to="/registration"
              >
                Inscription
              </NavLink>
              <NavLink
                className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                to="/login"
              >
                Connexion
              </NavLink>
            </div>
          ) : (
            <div className="space-x-4">
              <button
                className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                onClick={handleLogout}
              >
                Déconnexion
              </button>
              <NavLink
                className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                to="/user"
              >
                Mon compte
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  </nav>
  

  );
};

export default Navbar;
