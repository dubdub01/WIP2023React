import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import WorkersPage from "./pages/WorkersPage";
import CompaniesPage from "./pages/CompaniesPage";
import HomePage from "./pages/HomePage";
import CompaniesPageWithPagination from "./pages/CompaniesPageWithPagination";


const App = () => {
  return (
    <Router>
      <Navbar />
      <main className="container pt-5">
        <h1>WIP</h1>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workers" element={<WorkersPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/companiespage" element={<CompaniesPageWithPagination />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
