import React from "react";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <section className="landing-page">
      {/* Intro Section */}
      <div className="landing-intro">
        <h1>Welcome to My Application</h1>
        <p>
          Explore the exciting world of <span className="highlight">Meals</span>,{" "}
          <span className="highlight">Cocktails</span>,{" "}
          <span className="highlight">Books</span>, and{" "}
          <span className="highlight">Banking</span>.
          Click on any of the sections above to discover more and enhance your
          experience!
        </p>
      </div>

      {/* Image Cards Section */}
      <div className="landing-images">
        <div className="image-card meal-card">
          <img
            src="https://via.placeholder.com/400x250/ff6f61/fff?text=Meals"
            alt="Meal"
            className="card-image"
          />
          <h3>Meals</h3>
          <p>
            Discover a variety of delicious recipes, explore new cuisines, and
            learn cooking tips to elevate your meals.
          </p>
        </div>
        <div className="image-card cocktail-card">
          <img
            src="https://via.placeholder.com/400x250/6b5b95/fff?text=Cocktails"
            alt="Cocktail"
            className="card-image"
          />
          <h3>Cocktails</h3>
          <p>
            Dive into the world of refreshing drinks, learn cocktail-making
            techniques, and surprise your friends with your bartending skills!
          </p>
        </div>
        <div className="image-card book-card">
          <img
            src="https://via.placeholder.com/400x250/88b04b/fff?text=Books"
            alt="Books"
            className="card-image"
          />
          <h3>Books</h3>
          <p>
            Browse through a collection of amazing books, discover your next
            favorite read, and unlock the joy of reading.
          </p>
        </div>
        <div className="image-card bank-card">
          <img
            src="https://via.placeholder.com/400x250/f7cac9/fff?text=Banking"
            alt="Banking"
            className="card-image"
          />
          <h3>Banking</h3>
          <p>
            Access tools and resources to manage your finances, make payments,
            and plan for the future with confidence.
          </p>
        </div>
      </div>
    </section>
  );
}
