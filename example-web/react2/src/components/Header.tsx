import React from "react";
import { useLocation, Link } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav
      style={{
        padding: "1em",
        background: "#f8f9fa",
        borderBottom: "1px solid #e7e7e7",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#007bff",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="/node-ps99-api/icons/icon-192x192.png"
            alt="Home"
            style={{ width: "40px", height: "40px", marginRight: "0.5em" }}
          />
        </Link>
        <ol
          style={{ display: "flex", listStyle: "none", padding: 0, margin: 0 }}
        >
          <li style={{ margin: "0 0.5em" }}>
            <Link to="/" style={{ textDecoration: "none", color: "#007bff" }}>
              Home
            </Link>
          </li>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            return (
              <li key={to} style={{ margin: "0 0.5em" }}>
                <Link
                  to={to}
                  style={{ textDecoration: "none", color: "#007bff" }}
                >
                  {decodeURIComponent(value)}
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
      <h1 style={{ margin: 0 }}>
        <Link to="/" style={{ textDecoration: "none", color: "#007bff" }}>
          Pet Simulator 99 API
        </Link>
      </h1>
    </nav>
  );
};

export default Header;
