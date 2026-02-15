import React from "react";
import { useLocation, Link } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="game-header">
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="/node-ps99-api/icons/icon-192x192.png"
            alt="Home"
            style={{ width: "40px", height: "40px", marginRight: "0.5em", border: "2px solid white", borderRadius: "50%" }}
          />
        </Link>
      </div>
      <h1 style={{ margin: 0, fontSize: '1.5rem', color: 'white' }}>
        <Link to="/">
          Pet Simulator 99
        </Link>
      </h1>
    </nav>
  );
};

export default Header;
