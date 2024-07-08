import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "2em" }}>
      <h1>Welcome to Pet Simulator 99 API</h1>
      <p>Your one-stop solution for accessing all Pet Simulator 99 data.</p>
      <p>Select a collection to get started:</p>
      <Link
        to="/collections"
        style={{
          padding: "0.5em 1em",
          background: "#007bff",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "4px",
        }}
      >
        View Collections
      </Link>
    </div>
  );
};

export default HomePage;
