import React from "react";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <section className="landing-page">
      <div className="landing-intro">
        <h1>Welcome to My Application</h1>
        <p>
          Explore the world of <span className="highlight">Meals</span>, 
          <span className="highlight"> Cocktails</span>, 
          <span className="highlight"> Books</span>, and 
          <span className="highlight"> Banking</span>. 
          Click on any section above to dive deeper!
        </p>
      </div>

      <div className="landing-images">
        <div className="image-card meal-card">
          <h3>Meals</h3>
          <p>Discover delicious recipes and cuisines.</p>
        </div>
        <div className="image-card cocktail-card">
          <h3>Cocktails</h3>
          <p>Explore refreshing cocktail recipes.</p>
        </div>
        <div className="image-card book-card">
          <h3>Books</h3>
          <p>Find your next favorite read.</p>
        </div>
        <div className="image-card bank-card">
          <h3>Banking</h3>
          <p>Access financial tools and resources.</p>
        </div>
      </div>
    </section>
  );
}
