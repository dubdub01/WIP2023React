import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import WorkersPage from "./pages/WorkersPage";
import CompaniesPage from "./pages/CompaniesPage";
import NewCompany from "./pages/NewCompany";
import CompanyPage from "./pages/CompanyPage";
import HomePage from "./pages/HomePage";
import Legal from "./pages/Legal";
import LoginPage from "./pages/LoginPage";
import AuthAPI from "./services/AuthAPI";
import WorkerPage from "./pages/WorkerPage";
import AuthContext from "./contexts/AuthContext";
import RegistrationPage from "./pages/RegistrationPage";
import UserPage from "./pages/UserPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import NewWorker from "./pages/NewWorker";
import UpdateWorker from "./pages/UpdateWorker";
import UpdateCompany from "./pages/UpdateCompany";

AuthAPI.setup();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthAPI.isAuthenticated
  );

  const contextValue = {
    isAuthenticated: isAuthenticated,
    setIsAuthenticated: setIsAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workers" element={<WorkersPage />} />
          <Route path="/newworker" element={<NewWorker />} />
          <Route path="/workers/:id" element={<WorkerPage />} />
          <Route path="/workers/:id/edit" element={<UpdateWorker />} />

          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/newcompany" element={<NewCompany />} />
          <Route path="/companies/:id/edit" element={<UpdateCompany />} />
          <Route path="/companies/:id" element={<CompanyPage />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </Router>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </AuthContext.Provider>
  );
};

export default App;
