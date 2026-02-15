import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "4em", marginTop: "50px" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "0.5em", color: "var(--primary-color)", textShadow: "4px 4px 0px var(--border-color)" }}>
        Pet Simulator 99
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2em" }}>
        Explore the world of Pet Simulator 99! Check out all the items, pets, and collections.
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <Link
          to="/collections"
          className="game-button"
        >
          Collections
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
