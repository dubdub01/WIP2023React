import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import WorkersPage from "./pages/WorkersPage";
import CompaniesPage from "./pages/CompaniesPage";
import HomePage from "./pages/HomePage";
import Legal from "./pages/Legal";


const App = () => {
  return (
    <Router>
      <Navbar />
      <main className="container pt-5">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workers" element={<WorkersPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/legal" element={<Legal />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
