import { NavLink, useNavigate } from "react-router-dom";
import AuthAPI from "../services/AuthAPI";

const Navbar = (props) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    AuthAPI.logout();
    props.onLogout(false);
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          API-Platform React
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Accueil
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/workers">
                Worker
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/companies">
                Companies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/legal">
                Légal
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {!props.isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Inscription
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="btn btn-success" to="/login">
                    Connexion
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>
                  Déconnexion
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
