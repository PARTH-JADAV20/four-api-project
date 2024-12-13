import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faCocktail, faBook, faUniversity } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li className="navbar-item meal">
          <NavLink to="/meal">
            <FontAwesomeIcon icon={faUtensils} className="navbar-icon" />
            <div className="navbar-itemName">Meal</div>
          </NavLink>
        </li>
        <li className="navbar-item cocktail">
          <NavLink  to="/cocktail">
            <FontAwesomeIcon icon={faCocktail} className="navbar-icon" />
            <div className="navbar-itemName">Cocktail</div>
          </NavLink>
        </li>
        <li className="navbar-item books">
          <NavLink to="/books">
            <FontAwesomeIcon icon={faBook} className="navbar-icon" />
            <div className="navbar-itemName">Books</div>
          </NavLink>
        </li>
        <li className="navbar-item bank">
          <NavLink to="/bank">
            <FontAwesomeIcon icon={faUniversity} className="navbar-icon" />
            <div className="navbar-itemName">Bank</div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
