import React from "react";
import { useLocation, Link } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const isCollectionsRoute = location.pathname.startsWith("/collections");
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  if (isMobile && isCollectionsRoute) {
    return null;
  }

  return (
    <nav className="game-header" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
      <div style={{ display: "flex", alignItems: "center", width: '100%', justifyContent: 'space-between' }}>
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
          <h1 style={{ margin: 0, fontSize: '1.5rem', color: 'white', lineHeight: 1 }}>
            <Link to="/">
              Pet Simulator 99
            </Link>
          </h1>
        </div>

        {/* Placeholder for potential mobile menu burger if needed later */}
      </div>
    </nav>
  );
};

export default Header;
