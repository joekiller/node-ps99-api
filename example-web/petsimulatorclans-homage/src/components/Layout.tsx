import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../App.css";
import "../inline.css";
import "../round1.css";

const Layout: React.FC = () => {
  const [topBarMsg, setTopBarMsg] = useState({ text: "petsimulatorclans.com", color: "", visible: false });
  const location = useLocation();

  // Simulate their original message extension fetch
  useEffect(() => {
    fetch('https://api.petsimulatorclans.com/message')
      .then(res => res.json())
      .then(data => {
        if (data.visible) {
            setTopBarMsg({ text: data.message, color: data.color, visible: true });
        }
      })
      .catch();
  }, []);

  return (
    <>
      <header className="topbar">
        <Link to="/">
          <img src="https://andreyondemand.github.io/psclansassets/images/clans.webp" alt="Pet Simulator Clans Logo" style={{ height: "40px", marginRight: "20px" }} />
        </Link>
        <div className="nav-links">
          <a href="#" className="button discontinuation">Discontinuation</a>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/clans" className={location.pathname === '/clans' ? 'active' : ''}>Clans</Link>
          <Link to="/enchants" className={location.pathname === '/enchants' ? 'active' : ''}>Enchants</Link>
        </div>
      </header>

      <div className={`message-extension ${!topBarMsg.visible ? 'hidden' : ''}`} style={{ backgroundColor: topBarMsg.color }}>
        {topBarMsg.text}
      </div>

      <Outlet />

      <footer className="bottom-nav">
        <nav>
            <p>Information shown on Pet Simulator Clans is from the public Pet Simulator 99 and Pets GO! APIs maintained by the BIG Games team. petsimulatorclans.com is not affiliated with BIG Games.</p>
        </nav>
      </footer>
    </>
  );
};

export default Layout;
