import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faCocktail, faBook, faUniversity } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

export default function Navbar({ onSectionClick }) {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li
          className="navbar-item meal"
          onClick={() => onSectionClick("meal")}
        >
          <FontAwesomeIcon icon={faUtensils} className="navbar-icon" />
          <span>Meal</span>
        </li>
        <li
          className="navbar-item cocktail"
          onClick={() => onSectionClick("cocktail")}
        >
          <FontAwesomeIcon icon={faCocktail} className="navbar-icon" />
          <span>Cocktail</span>
        </li>
        <li
          className="navbar-item books"
          onClick={() => onSectionClick("books")}
        >
          <FontAwesomeIcon icon={faBook} className="navbar-icon" />
          <span>Books</span>
        </li>
        <li
          className="navbar-item bank"
          onClick={() => onSectionClick("bank")}
        >
          <FontAwesomeIcon icon={faUniversity} className="navbar-icon" />
          <span>Bank</span>
        </li>
      </ul>
    </nav>
  );
}
