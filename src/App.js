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
import UploadCV from "./pages/UploadCV";
import UploadImage from "./pages/UploadImage";
import PrivateRoute from "./components/PrivateRoute";

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/workers" element={<WorkersPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/workers/:id" element={<WorkerPage />} />
          <Route path="/companies/:id" element={<CompanyPage />} />
          
          <Route path="/newworker" element={
          <PrivateRoute>
            <NewWorker />
          </PrivateRoute>
          } />
          <Route path="/workers/:id/edit" element={
          <PrivateRoute>
            <UpdateWorker />
          </PrivateRoute>
          } />
          <Route path="/workers/:id/uploadcv" element={
          <PrivateRoute>
            <UploadCV />
          </PrivateRoute>
          } />
          <Route path="/newcompany" element={
          <PrivateRoute>
            <NewCompany />
          </PrivateRoute>
          } />
          <Route path="/companies/:id/edit" element={
          <PrivateRoute>
            <UpdateCompany />
          </PrivateRoute>
          
          } />
          <Route path="/companies/:id/uploadimage" element={
          <PrivateRoute>
            <UploadImage />
          </PrivateRoute>
          } />
          <Route path="/user" element={
          <PrivateRoute>
            <UserPage />
          </PrivateRoute>
          } />
        </Routes>
      </Router>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </AuthContext.Provider>
  );
};

export default App;
