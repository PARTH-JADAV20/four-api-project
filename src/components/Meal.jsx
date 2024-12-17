import React, { useState, useEffect } from 'react';
import './Meal.css';

const Meal = () => {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [area, setArea] = useState('');
  const [category, setCategory] = useState('');

  // Predefined areas and categories
  const areas = ['British', 'Chinese', 'French', 'Mexican', 'Thai', 'American', 'Indian', 'Italian'];
  const categories = ['Breakfast', 'Dessert', 'Pasta', 'Vegan', 'Vegetarian', 'Seafood'];

  // Fetch meals based on search term, area, or category
  useEffect(() => {
    const fetchMeals = async () => {
      let url = '';

      if (searchTerm) {
        if (searchTerm.length === 1) {
          url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchTerm}`;
        } else {
          url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
        }
      } else if (area) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
      } else if (category) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      } else {
        url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      }

      const response = await fetch(url);
      const data = await response.json();
      setMeals(data.meals || []);
    };

    fetchMeals();
  }, [searchTerm, area, category]);

  // Show all meals initially
  useEffect(() => {
    setFilteredMeals(meals);
  }, [meals]);

  // Show meal details in modal
  const showMealDetails = (id) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => setSelectedMeal(data.meals[0]));
  };

  // Close the modal
  const closeModal = () => {
    setSelectedMeal(null);
  };

  // Close modal if clicked outside
  const handleClickOutside = (e) => {
    if (e.target.classList.contains('modal')) {
      closeModal();
    }
  };

  // Reset other filters when search term is updated
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setArea(''); // Reset area
    setCategory(''); // Reset category
  };

  // Reset other filters when area is selected
  const handleAreaChange = (e) => {
    setArea(e.target.value);
    setSearchTerm(''); // Reset search term
    setCategory(''); // Reset category
  };

  // Reset other filters when category is selected
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSearchTerm(''); // Reset search term
    setArea(''); // Reset area
  };

  return (
    <div className="meal-section">
      <div className="filters">
        <input
          type="text"
          className="mealsearch"
          placeholder="Search meals"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={area} onChange={handleAreaChange}>
          <option value="">Select Area</option>
          {areas.map((area, index) => (
            <option key={index} value={area}>
              {area}
            </option>
          ))}
        </select>
        <select value={category} onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="meal-cards">
        {filteredMeals.length > 0 ? (
          filteredMeals.map((meal) => (
            <div key={meal.idMeal} className="meal-card">
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <h3>{meal.strMeal}</h3>
              <button onClick={() => showMealDetails(meal.idMeal)}>More</button>
            </div>
          ))
        ) : (
          <p>No meals found for your search.</p>
        )}
      </div>

      {/* Modal for meal details */}
      {selectedMeal && (
        <div className="modal open" onClick={handleClickOutside}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <div className="modal-details">
              <div className="modal-image">
                <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} />
                <h2 className="mealname">{selectedMeal.strMeal}</h2>
                {selectedMeal.strYoutube ? (
                  <a className="linktoyt" href={selectedMeal.strYoutube}>
                    Link to Video
                  </a>
                ) : null}
              </div>
              <div className="modal-info">
                <p>
                  <strong>Area:</strong> {selectedMeal.strArea}
                </p>
                <h4>Ingredients</h4>
                <ul>
                  {Array.from({ length: 20 }).map((_, index) => {
                    const ingredient = selectedMeal[`strIngredient${index + 1}`];
                    const measure = selectedMeal[`strMeasure${index + 1}`];
                    return ingredient ? (
                      <li key={index}>
                        {ingredient} - {measure}
                      </li>
                    ) : null;
                  })}
                </ul>
                <h4>Instructions</h4>
                <p>{selectedMeal.strInstructions}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Meal;
