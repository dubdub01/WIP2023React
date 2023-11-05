import { NavLink, useNavigate } from "react-router-dom";
import AuthAPI from "../services/AuthAPI";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { toast } from "react-toastify";
import LanguageSelector from "../services/LanguageSelector";
import { useTranslation } from "react-i18next";

const Navbar = (props) => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    AuthAPI.logout();
    setIsAuthenticated(false);
    toast.info("Vous êtes désormais déconnecté");
    navigate("/login", { replace: true });
  };

  const { isAdmin } = useContext(AuthContext);

  console.log(isAdmin);

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
            <LanguageSelector />
            <NavLink
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              to="/"
            >
              {t("navbar.accueil")}
            </NavLink>
            <NavLink
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              to="/workers"
            >
              {t("navbar.workers")}
            </NavLink>
            <NavLink
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              to="/companies"
            >
              {t("navbar.companies")}
            </NavLink>
            <NavLink
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              to="/legal"
            >
              {t("navbar.legal")}
            </NavLink>
            {isAuthenticated && (
              <div>
                <NavLink
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  to="/newworker"
                >
                  {t("navbar.newWorker")}
                </NavLink>
                <NavLink
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  to="/newcompany"
                >
                  {t("navbar.newCompany")}
                </NavLink>
              </div>
            )}
          </div>

          <div className="lg:flex space-x-4">
            {isAdmin && (
              <NavLink
                className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                to="/admin"
              >
                Administration
              </NavLink>
            )}
            {!isAuthenticated ? (
              <div className="lg:flex lg:flex-col space-y-2">
                <NavLink
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  to="/registration"
                >
                  {t("navbar.inscription")}
                </NavLink>
                <NavLink
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  to="/login"
                >
                  {t("navbar.connexion")}
                </NavLink>
              </div>
            ) : (
              <div className="space-x-4">
                <button
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  onClick={handleLogout}
                >
                  {t("navbar.deconnexion")}
                </button>
                <NavLink
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  to="/user"
                >
                  {t("navbar.profil")}
                </NavLink>
                <a
                  href="http://wipadmin.duboismax.com/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  to="/admin"
                >
                  Administration
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
