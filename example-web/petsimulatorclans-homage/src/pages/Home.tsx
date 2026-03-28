import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCachedClans, getCachedPinnedClans } from "../api";
import ClanIcon from "../components/ClanIcon";

const Home: React.FC = () => {
  const [search, setSearch] = useState("");
  const [topClans, setTopClans] = useState<any[]>([]);
  const [pinnedClans, setPinnedClans] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      // Use our custom caching api
      const clansData = await getCachedClans(10); 
      setTopClans(clansData.slice(0, 10));

      const pinned = await getCachedPinnedClans();
      setPinnedClans(pinned);
    }
    fetchData();
  }, []);

  const handleSearch = () => {
    if (search.trim()) navigate(`/clan?clan=${search.trim()}`);
  }

  return (
    <>
      <header className="guild-header">
        <img id="guild-icon" src="https://andreyondemand.github.io/psclansassets/images/clans.webp" alt="clan" />
        <div className="guild-info">
            <h1>Pet Simulator Clans</h1>
            <a href="#" className="button discontinuation">Discontinuation</a>
        </div>
      </header>

      <div className="search-container">
          <input type="text" id="searchInput" placeholder="Enter clan name..." value={search} onChange={e => setSearch(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSearch()} />
          <button id="searchButton" type="button" className="button search" onClick={handleSearch}>Search</button>
      </div>

      <div className="carousel-container">
          <div className="carousel top-clans">
              <div className="carousel-header">
                  <h2>Top Clans</h2>
              </div>
              <div className="carousel-content">
                  {topClans.map((clan, i) => (
                      <Link to={`/clan?clan=${clan.Name}`} key={clan.Name} className="nav-card top-clan" style={{ position: "relative", overflow: "hidden" }}>
                          <ClanIcon iconStr={clan.Icon} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
                          <div className="card-content" style={{ zIndex: 2, position: "relative" }}>
                              <p>#{i + 1}</p>
                              <p>{clan.Name}</p>
                          </div>
                      </Link>
                  ))}
              </div>
              <div className="navigation">
                  <Link to="/clans" className="button">View all clans</Link>
              </div>
          </div>

          <div className="carousel pinned-clans">
              <div className="carousel-header">
                  <h2>Pinned Clans</h2>
                  <div className="subtext">
                  <p>Want your clan pinned? <a href="https://discord.petsimulatorclans.com/" target="_blank" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>Join the Discord</a> and message andreyondemand!</p>
              </div>
              </div>
              <div className="carousel-content">
                  {pinnedClans.map((clan, i) => (
                      <Link to={`/clan?clan=${clan.Name}`} key={clan.Name} className="nav-card pinned-clan" style={{ position: "relative", overflow: "hidden" }}>
                          <ClanIcon iconStr={clan.Icon} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
                          <div className="card-content" style={{ zIndex: 2, position: "relative" }}>
                              <p>#{i + 1}</p>
                              <p>{clan.Name}</p>
                          </div>
                      </Link>
                  ))}
              </div>
          </div>
      </div>
    </>
  );
};

export default Home;
