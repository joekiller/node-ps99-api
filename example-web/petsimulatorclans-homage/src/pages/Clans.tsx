import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCachedClans, getClans24HAgo } from "../api";
import { Search } from "lucide-react";
import ClanIcon from "../components/ClanIcon";

const Clans: React.FC = () => {
  const [clans, setClans] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      const data = await getCachedClans(100);
      setClans(data);
      const hData = await getClans24HAgo();
      setHistory(hData);
    }
    loadData();
  }, []);

  const handleSearch = () => {
    if (search.trim()) navigate(`/clan?clan=${search.trim()}`);
  }

  return (
    <>
      <header>
        <div className="guild-header">
          <img id="icon" src="https://andreyondemand.github.io/psclansassets/images/clans.webp" alt="Icon" style={{ width: "80px" }} />
          <div className="guild-info">
            <h1 id="name">Top Clans</h1>
            <h3 id="desc">The top 30 clans have advanced member point history</h3>
          </div>
          <div className="search-container">
            <input
              type="text"
              id="searchInput"
              placeholder="Enter clan name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSearch()}
            />
            <button id="searchButton" onClick={handleSearch}>Search</button>
          </div>
        </div>
      </header>

      <div className="content">
        <h2>Clans</h2>
        <div id="clans">
            <table className="clans-table" style={{ width: "100%", background: "#111", borderRadius: "15px", borderCollapse: "separate", borderSpacing: 0, overflow: "hidden" }}>
               <thead>
                   <tr style={{ background: "#0a0a0a", textAlign: "left" }}>
                       <th style={{ padding: "15px" }}>Place</th>
                       <th>Clan</th>
                       <th>24HR Member Changes</th>
                       <th>Points</th>
                       <th>Members</th>
                   </tr>
               </thead>
               <tbody>
                   {clans.map((clan, idx) => {
                       const hClan = history.find(c => c.Name === clan.Name);
                       const netChange = hClan ? clan.Members - hClan.Members : 0;
                       
                       return (
                       <tr key={clan.Name} style={{ borderBottom: "1px solid #222" }}>
                           <td style={{ padding: "20px" }}>
                               {idx < 3 ? (
                                   <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                       #{idx + 1}
                                       {idx === 0 && <img src="https://andreyondemand.github.io/psclansassets/images/icon_medal_gold.png" style={{width:"20px"}}/>}
                                       {idx === 1 && <img src="https://andreyondemand.github.io/psclansassets/images/icon_medal_silver.png" style={{width:"20px"}} onError={(e) => { e.currentTarget.style.display='none' }}/>}
                                       {idx === 2 && <img src="https://andreyondemand.github.io/psclansassets/images/icon_medal_bronze.png" style={{width:"20px"}}/>}
                                   </div>
                               ) : <span>#{idx + 1}</span>}
                           </td>
                           <td style={{ padding: "20px" }}>
                               <Link to={`/clan?clan=${clan.Name}`} style={{ display: "flex", alignItems: "center", gap: "10px", color: "white", textDecoration: "none", fontWeight: "bold" }}>
                                   <ClanIcon iconStr={clan.Icon} style={{ width: "40px", borderRadius: "8px" }} />
                                   {clan.Name}
                               </Link>
                           </td>
                           <td style={{ color: netChange > 0 ? "green" : netChange < 0 ? "red" : "#888" }}>{netChange > 0 ? "+" : ""}{netChange} ♻️</td>
                           <td>{clan.Points ? clan.Points.toLocaleString() : "0"}</td>
                           <td>{clan.Members}</td>
                       </tr>
                   )})}
               </tbody>
            </table>
        </div>
      </div>
    </>
  );
};

export default Clans;
