import { useState } from "react";
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

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="relative z-50">
      <div className="p-7 container mx-auto">
        <div className="flex items-center justify-between">
          <NavLink className="text-gray-200 text-lg font-semibold" to="/">
            WIP
          </NavLink>
          <LanguageSelector />

          {/* Menu burger pour les écrans de téléphone et de tablette */}
          <div className="lg:hidden">
            <button
              className="text-gray-300 hover:text-teal-400 px-3 py-2 text-sm font-medium"
              onClick={toggleMenu}
            >
              Menu
            </button>
          </div>

          {/* Afficher le menu burger ouvert en dessous de la barre de navigation */}
          {menuOpen && (
            <div className="lg:hidden">
              <div className="bg-gray-800 absolute top-16 right-0 left-0">
                <div className="space-y-2">
                  {/* Liens "Travailleurs", "Entreprises", "Accueil" et "Mentions légales" */}
                  <NavLink
                    className="text-gray-300 hover:bg-teal-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium block"
                    to="/workers"
                  >
                    {t("navbar.workers")}
                  </NavLink>
                  <NavLink
                    className="text-gray-300 hover:bg-teal-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium block"
                    to="/companies"
                  >
                    {t("navbar.companies")}
                  </NavLink>
                  <NavLink
                    className="text-gray-300 hover:bg-teal-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium block"
                    to="/"
                  >
                    {t("navbar.accueil")}
                  </NavLink>
                  <NavLink
                    className="text-gray-300 hover:bg-teal-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium block"
                    to="/legal"
                  >
                    {t("navbar.legal")}
                  </NavLink>
                  {/* Fin des liens */}
                  {isAdmin && (
                    <NavLink
                      className="text-gray-300 hover:teal-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium block"
                      to="/admin"
                    >
                      Administration
                    </NavLink>
                  )}
                  {!isAuthenticated ? (
                    <>
                      <NavLink
                        className="text-gray-300 hover:bg-teal-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium block"
                        to="/registration"
                      >
                        {t("navbar.inscription")}
                      </NavLink>
                      <NavLink
                        className="text-gray-300 hover:bg-teal-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium block"
                        to="/login"
                      >
                        {t("navbar.connexion")}
                      </NavLink>
                    </>
                  ) : (
                    <>
                      <NavLink
                        className="text-gray-300 hover:bg-teal-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium block"
                        onClick={handleLogout}
                      >
                        {t("navbar.deconnexion")}
                      </NavLink>
                      <NavLink
                        className="text-gray-300 hover:bg-teal-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium block"
                        to="/user"
                      >
                        {t("navbar.profil")}
                      </NavLink>
                      <a
                        href="http://wipadmin.duboismax.com/"
                        className="text-gray-300 hover:bg-teal-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium block"
                        to="/admin"
                      >
                        Administration
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Barre de navigation principale pour les écrans plus grands */}
          <div
            className={`lg:flex lg:items-center lg:justify-center space-x-4 ${
              menuOpen ? "block" : "hidden"
            }`}
          >
            <NavLink
              className={`text-gray-300 hover:bg-teal-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium ${
                menuOpen ? "hidden" : "block"
              }`}
              to="/"
            >
              {t("navbar.accueil")}
            </NavLink>
            <NavLink
              className={`text-gray-300 hover:bg-teal-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium ${
                menuOpen ? "hidden" : "block"
              }`}
              to="/workers"
            >
              {t("navbar.workers")}
            </NavLink>
            <NavLink
              className={`text-gray-300 hover:bg-teal-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium ${
                menuOpen ? "hidden" : "block"
              }`}
              to="/companies"
            >
              {t("navbar.companies")}
            </NavLink>
            <NavLink
              className={`text-gray-300 hover:bg-teal-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium ${
                menuOpen ? "hidden" : "block"
              }`}
              to="/legal"
            >
              {t("navbar.legal")}
            </NavLink>
            {!isAuthenticated ? (
              <>
                <NavLink
                  className={`text-gray-300 hover:bg-teal-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium ${
                    menuOpen ? "hidden" : "block"
                  }`}
                  to="/registration"
                >
                  {t("navbar.inscription")}
                </NavLink>
                <NavLink
                  className={`text-gray-300 hover:bg-teal-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium ${
                    menuOpen ? "hidden" : "block"
                  }`}
                  to="/login"
                >
                  {t("navbar.connexion")}
                </NavLink>
              </>
            ) : (
              <>
                <button
                  className={`text-gray-300 hover:bg-teal-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium ${
                    menuOpen ? "hidden" : "block"
                  }`}
                  onClick={handleLogout}
                >
                  {t("navbar.deconnexion")}
                </button>
                <NavLink
                  className={`text-gray-300 hover:bg-teal-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium ${
                    menuOpen ? "hidden" : "block"
                  }`}
                  to="/user"
                >
                  {t("navbar.profil")}
                </NavLink>
                <a
                  href="http://wipadmin.duboismax.com/"
                  className={`text-gray-300 hover:bg-teal-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium ${
                    menuOpen ? "hidden" : "block"
                  }`}
                  to="/admin"
                >
                  Administration
                </a>
                
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
