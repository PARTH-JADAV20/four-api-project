import React, { useState } from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
// import Meal from "./components/Meal";
// import Cocktail from "./components/Cocktail";
// import Books from "./components/Books";
// import Bank from "./components/Bank";

function App() {
  const [activeSection, setActiveSection] = useState(null);

  const onSectionClick = (section) => {
    setActiveSection(section);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "meal":
        return <Meal />;
      case "cocktail":
        return <Cocktail />;
      case "books":
        return <Books />;
      case "bank":
        return <Bank />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <>
      <Navbar onSectionClick={onSectionClick} />
      <main>{renderSection()}</main>
    </>
  );
}

export default App;
