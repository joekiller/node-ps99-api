import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Pet Simulator 99 API</h1>
      <p>Select a collection to get started:</p>
      <Link to="/collections">View Collections</Link>
    </div>
  );
};

export default HomePage;
