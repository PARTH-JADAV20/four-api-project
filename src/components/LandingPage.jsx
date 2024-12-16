import React from "react";
import "./LandingPage.css";
import { NavLink } from "react-router-dom";

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
          <span className="highlight">Banks</span>.
          Click on any of the sections above to discover more and enhance your
          experience!
        </p>
      </div>

      {/* Image Cards Section */}
      <div className="landing-images">
        <NavLink to="/meal">
        <div className="image-card meal-card1">
          <div className="img1 img">Meals</div>
          <h3>Meals</h3>
          <p>
            Discover a variety of delicious recipes, explore new cuisines, and
            learn cooking tips to elevate your meals.
          </p>
        </div>
        </NavLink>
        <NavLink to="/cocktail">
        <div className="image-card cocktail-card1">
        <div className="img2 img">Cocktails</div>
          <h3>Cocktails</h3>
          <p>
            Dive into the world of refreshing drinks, learn cocktail-making
            techniques, and surprise your friends with your bartending skills!
          </p>
        </div>
        </NavLink>
        <NavLink to="/books">
        <div className="image-card book-card">
        <div className="img3 img">Books</div>
          <h3>Books</h3>
          <p>
            Browse through a collection of amazing <b>Harry Potter</b> books, discover your next
            favorite read, and unlock the joy of reading.
          </p>
        </div>
        </NavLink>
        <NavLink to="/bank">
        <div className="image-card bank-card">
        <div className="img4 img">Banks</div>
          <h3>Banks</h3>
          <p>
            Access the imformation regarding Banks with Ifsc codes and locations
            and plan your next bank account.
          </p>
        </div>
        </NavLink>
        
      </div>
    </section>
  );
}
