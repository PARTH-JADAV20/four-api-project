import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Meal from "./components/Meal";
import Cocktail from "./components/Cocktail";
import Books from "./components/Books";
import Bank from "./components/Bank";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/meal" element={<Meal />} />
          <Route path="/cocktail" element={<Cocktail />} />
          <Route path="/books" element={<Books />} />
          <Route path="/bank" element={<Bank />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
