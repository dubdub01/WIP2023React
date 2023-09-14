import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import WorkersPage from "./pages/WorkersPage";
import CompaniesPage from "./pages/CompaniesPage";
import HomePage from "./pages/HomePage";
import CompaniesPageWithPagination from "./pages/CompaniesPageWithPagination";
import WorkersPageWithPagination from "./pages/WorkersPageWithPagination";


const App = () => {
  return (
    <Router>
      <Navbar />
      <main className="container pt-5">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workers" element={<WorkersPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/companiespage" element={<CompaniesPageWithPagination />} />
          <Route path="/workerspage" element={<WorkersPageWithPagination />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
