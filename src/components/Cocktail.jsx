import React, { useState, useEffect } from 'react';
import './Cocktail.css';

const Cocktail = () => {
  const [cocktails, setCocktails] = useState([]);
  const [filteredCocktails, setFilteredCocktails] = useState([]);
  const [selectedCocktail, setSelectedCocktail] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [alcoholic, setAlcoholic] = useState('');
  const [category, setCategory] = useState('Other / Unknown');

  const categories = ['Ordinary Drink', 'Cocktail', 'Shot', 'Coffee / Tea', 'Punch / Party Drink', 'Homemade Liqueur'];

  // Fetch cocktails based on filters
  useEffect(() => {
    const fetchCocktails = async () => {
      let url = '';

      if (searchTerm) {
        if (searchTerm.length === 1) {
          url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchTerm}`;
        } else {
          url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`;
        }
      } else if (alcoholic) {
        url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${alcoholic}`;
      } else if (category) {
        url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
      } else {
        url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      }

      const response = await fetch(url);
      const data = await response.json();
      setCocktails(data.drinks || []);
    };

    fetchCocktails();
  }, [searchTerm, alcoholic, category]);

  // Reset other filters when a filter changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setAlcoholic('');
    setCategory('Other / Unknown');
  };

  const handleAlcoholicChange = (e) => {
    setAlcoholic(e.target.value);
    setSearchTerm('');
    setCategory('Other / Unknown');
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSearchTerm('');
    setAlcoholic('');
  };

  // Update filteredCocktails when cocktails data changes
  useEffect(() => {
    setFilteredCocktails(cocktails);
  }, [cocktails]);

  const showCocktailDetails = (id) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(response => response.json())
      .then(data => setSelectedCocktail(data.drinks[0]));
  };

  const closeModal = () => {
    setSelectedCocktail(null);
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains('modal')) {
      closeModal();
    }
  };

  return (
    <div className="cocktail-section">
      <div className="filters">
        <input
          type="text"
          className="cocktailsrch"
          placeholder="Search cocktails"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select onChange={handleAlcoholicChange} value={alcoholic}>
          <option value="">Select Alcoholic Type</option>
          <option value="Alcoholic">Alcoholic</option>
          <option value="Non_Alcoholic">Non Alcoholic</option>
        </select>
        <select onChange={handleCategoryChange} value={category}>
          <option value="">Select Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="cocktail-cards">
        {Array.isArray(filteredCocktails) && filteredCocktails.length > 0 ? (
          filteredCocktails.map(cocktail => (
            <div key={cocktail.idDrink} className="cocktail-card">
              <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
              <h3>{cocktail.strDrink}</h3>
              <button onClick={() => showCocktailDetails(cocktail.idDrink)}>More</button>
            </div>
          ))
        ) : (
          <p>No cocktails found for your search.</p>
        )}
      </div>

      {/* Modal for cocktail details */}
      {selectedCocktail && (
        <div className="modal open" onClick={handleClickOutside}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <div className="modal-details">
              <div className="modal-image">
                <img src={selectedCocktail.strDrinkThumb} alt={selectedCocktail.strDrink} />
                <h2 className="cocktname">{selectedCocktail.strDrink}</h2>
              </div>
              <div className="modal-info">
                <p><strong>Category:</strong> {selectedCocktail.strCategory}</p>
                <p><strong>Alcoholic:</strong> {selectedCocktail.strAlcoholic}</p>
                <h4>Ingredients</h4>
                <ul>
                  {Array.from({ length: 15 }).map((_, index) => {
                    const ingredient = selectedCocktail[`strIngredient${index + 1}`];
                    const measure = selectedCocktail[`strMeasure${index + 1}`];
                    return ingredient ? <li key={index}>{ingredient} - {measure}</li> : null;
                  })}
                </ul>
                <h4>Instructions</h4>
                <p>{selectedCocktail.strInstructions}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cocktail;
