import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import WorkersPage from "./pages/WorkersPage";
import CompaniesPage from "./pages/CompaniesPage";
import HomePage from "./pages/HomePage";
import Legal from "./pages/Legal";
import LoginPage from "./pages/LoginPage";
import AuthAPI from "./services/AuthAPI";
import WorkerPage from "./pages/WorkerPage";
import AuthContext from "./contexts/AuthContext";
import RegistrationPage from "./pages/RegistrationPage";
import UserPage from "./pages/UserPage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'


AuthAPI.setup()

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated)

  const contextValue = {
    isAuthenticated: isAuthenticated,
    setIsAuthenticated: setIsAuthenticated
  }


  return (
    
    <AuthContext.Provider value={contextValue}>

    <Router>
      <Navbar />
      <main className="container pt-5">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workers" element={<WorkersPage />} />
          <Route path="/workers/:id" element={
              <WorkerPage />
          }/>
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </main>
    </Router>
    <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </AuthContext.Provider>
    
  );
};

export default App;
