import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCachedClanDetails, getClanDetail24HAgo, getCachedClans } from "../api";
import ClanIcon from "../components/ClanIcon";
import AvatarIcon from "../components/AvatarIcon";

const ClanDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const clanName = searchParams.get("clan");
  const [clan, setClan] = useState<any>(null);
  const [history, setHistory] = useState<any>(null);
  const [globalRank, setGlobalRank] = useState<any>(null);
  const [sortOrder, setSortOrder] = useState("Highest to Lowest");
  const [gridLayout, setGridLayout] = useState("Grid Layout");

  useEffect(() => {
    if (clanName) {
      getCachedClanDetails(clanName).then(data => setClan(data));
      getClanDetail24HAgo(clanName).then(data => setHistory(data));
      getCachedClans(250).then(clans => {
         const idx = clans.findIndex((c:any) => c.Name === clanName);
         if(idx >= 0) {
            setGlobalRank({
               idx,
               nextClan: idx > 0 ? clans[idx - 1] : null,
               lowerClan: idx < clans.length - 1 ? clans[idx + 1] : null
            });
         }
      });
    }
  }, [clanName]);

  if (!clan) {
    return (
      <div className="center-content" style={{ marginTop: "50px" }}>
        <h2>Loading {clanName}...</h2>
      </div>
    );
  }

  const latestBattleKey = clan.Battles && (Object.keys(clan.Battles).find(b => !clan.Battles[b].ProcessedAwards) || Object.keys(clan.Battles)[0]);
  const currentBattle = latestBattleKey ? clan.Battles[latestBattleKey] : null;
  const clanTotalPoints = currentBattle ? currentBattle.Points : 0;

  const mergedMembers = clan.Members?.map((m: any) => {
      const pc = currentBattle?.PointContributions?.find((p: any) => p.UserID === m.UserID);
      return { ...m, PointContributions: pc ? pc.Points : 0 };
  }) || [];

  const historyLatestBattleKey = history?.Battles && (Object.keys(history.Battles).find(b => !history.Battles[b].ProcessedAwards) || Object.keys(history.Battles)[0]);
  const historyBattle = historyLatestBattleKey ? history.Battles[historyLatestBattleKey] : null;
  const historyMergedMembers = history?.Members?.map((m: any) => {
      const pc = historyBattle?.PointContributions?.find((p: any) => p.UserID === m.UserID);
      return { ...m, PointContributions: pc ? pc.Points : 0 };
  }) || [];
  
  // 24HR Telemetry Logic
  let memberChangesText = "N/A (No history)";
  let kickCooldownText = "Ended on N/A";
  if (history && history.Members && clan.Members) {
      const oldUserIds = history.Members.map((hm:any) => hm.UserID);
      const newUserIds = clan.Members.map((cm:any) => cm.UserID);
      const joins = newUserIds.filter((id:any) => !oldUserIds.includes(id)).length;
      const leaves = oldUserIds.filter((id:any) => !newUserIds.includes(id)).length;
      memberChangesText = `${joins} Joined, ${leaves} Left`;
      if (leaves > 0) kickCooldownText = "Active (Recent Roster Changes)";
      else kickCooldownText = "Ended safely";
  }

  const pointsToNext = globalRank?.nextClan ? `${(globalRank.nextClan.Points - clanTotalPoints).toLocaleString()} Points` : "None";
  const pointsToLower = globalRank?.lowerClan ? `${(clanTotalPoints - globalRank.lowerClan.Points).toLocaleString()} Points` : "N/A";

  return (
    <div style={{ padding: "0 10px" }}>
      <div className="details-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "20px" }}>
        <div className="guild-header" style={{ padding: "20px", background: "var(--card-bg)", borderRadius: "15px", display: "flex", alignItems: "center", gap: "20px", border: "1px solid rgba(255,255,255,0.05)" }}>
          <ClanIcon iconStr={clan.Icon} style={{ width: "120px", borderRadius: "15px" }} />
          <div className="guild-info">
              <h1 id="clan-name" style={{ margin: "0 0 10px 0", color: "var(--primary-blue)" }}>[{clan.Name}]</h1>
              <h3 id="clan-desc" style={{ margin: "0", fontWeight: "normal" }}>GG/{clan.Name}</h3>
              <p style={{ marginTop: "10px", fontWeight: "bold" }}>👑 Battle Leaderboard Place: {globalRank ? `#${globalRank.idx + 1}` : (clan.battlePlace || "N/A")}</p>
          </div>
        </div>

        <div className="stats-card" style={{ padding: "20px", width: "100%", border: "0", display: "grid", gridTemplateColumns: "1fr", gap: "10px" }}>
            <div className="stat-item" style={{display:"flex", alignItems:"center", gap:"5px", fontSize:"0.9rem"}}><img src="https://andreyondemand.github.io/psclansassets/images/recycle.png" style={{width:"20px", height:"20px"}}/> Member changes in the last 24 hours: <strong>{memberChangesText}</strong></div>
            <div className="stat-item" style={{display:"flex", alignItems:"center", gap:"5px", fontSize:"0.9rem"}}><img src="https://andreyondemand.github.io/psclansassets/images/clans.webp" style={{width:"20px", height:"20px"}}/> Clan Level: {clan.GuildLevel}</div>
            <div className="stat-item" style={{display:"flex", alignItems:"center", gap:"5px", fontSize:"0.9rem"}}><img src="https://andreyondemand.github.io/psclansassets/images/clock.png" style={{width:"20px", height:"20px"}}/> Kick Cooldown: {kickCooldownText}</div>
            <div className="stat-item" style={{display:"flex", alignItems:"center", gap:"5px", fontSize:"0.9rem", color:"var(--primary-color)"}}><strong>⭐️ Battle Points: {clanTotalPoints.toLocaleString()}</strong></div>
            <div className="stat-item" style={{display:"flex", alignItems:"center", gap:"5px", fontSize:"0.9rem"}}><img src="https://andreyondemand.github.io/psclansassets/images/uparrow.png" style={{width:"12px"}}/> Points needed to surpass next clan: {pointsToNext}</div>
            <div className="stat-item" style={{display:"flex", alignItems:"center", gap:"5px", fontSize:"0.9rem"}}><img src="https://andreyondemand.github.io/psclansassets/images/downarrow.png" style={{width:"12px"}}/> Points needed for lower clan to surpass us: {pointsToLower}</div>
        </div>
      </div>

      <div style={{ background: "var(--card-bg)", padding: "20px", borderRadius: "15px", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px", alignItems: "center" }}>
              <select style={{ background: "transparent", color: "white", padding: "8px", border: "1px solid #444", borderRadius: "5px", cursor: "pointer" }} value={gridLayout} onChange={e => setGridLayout(e.target.value)}>
                  <option>Grid Layout</option>
                  <option>List Layout</option>
              </select>
              <span>Sort:</span>
              <select style={{ background: "transparent", color: "white", padding: "8px", border: "1px solid #444", borderRadius: "5px", cursor: "pointer" }} value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                  <option>Highest to Lowest</option>
                  <option>Lowest to Highest</option>
              </select>
          </div>
          
          <div className="members-grid" style={{ display: "grid", gridTemplateColumns: gridLayout === "Grid Layout" ? "repeat(auto-fill, minmax(260px, 1fr))" : "1fr", gap: "1.5rem" }}>
              {[...mergedMembers].sort((a: any, b: any) => sortOrder === "Highest to Lowest" ? b.PointContributions - a.PointContributions : a.PointContributions - b.PointContributions).map((m: any, idx: number) => {
                  const oldMember = historyMergedMembers.find((hm:any) => hm.UserID === m.UserID);
                  const pointsGained = oldMember ? (m.PointContributions - oldMember.PointContributions) : 0;
                  const absRank = sortOrder === "Highest to Lowest" ? idx + 1 : mergedMembers.length - idx;
                  
                  return (
                  <div key={m.UserID} className="member-card" style={{ background: "rgba(0,0,0,0.3)", borderRadius:"15px", display: "flex", flexDirection: gridLayout === "Grid Layout" ? "column" : "row", alignItems: "center", padding:"15px", border:"1px solid rgba(255,255,255,0.05)" }}>
                      <div style={{position:"relative", width: gridLayout === "Grid Layout" ? "100%" : "120px", marginRight: gridLayout === "Grid Layout" ? "0" : "20px"}}>
                         <AvatarIcon userId={m.UserID} style={{ width: "100%", borderRadius: "10px", marginBottom: gridLayout === "Grid Layout" ? "10px" : "0", background: "#111" }} />
                         {absRank <= 3 && <img src={`https://andreyondemand.github.io/psclansassets/images/icon_medal_${absRank === 1 ? "gold" : absRank === 2 ? "silver" : "bronze"}.png`} style={{position:"absolute", top:"-10px", left:"-10px", width:"30px"}} onError={(e) => { e.currentTarget.style.display='none' }} />}
                      </div>
                      <div style={{ flex: 1, textAlign: gridLayout === "Grid Layout" ? "center" : "left" }}>
                          <h3 style={{ margin: "5px 0", fontSize: "1.2rem", fontWeight:"900" }}>#{absRank}</h3>
                          <p style={{ margin: "0 0 5px 0", fontSize: "1rem" }}>User_{m.UserID}</p>
                          <p style={{ margin: "0", fontSize: "1rem", color: "#ffae00", fontWeight:"bold" }}>⭐️ {m.PointContributions ? m.PointContributions.toLocaleString() : "0"} Points</p>
                          <p style={{ margin: "5px 0 0 0", fontSize: "0.8rem", color: pointsGained >= 0 ? "#5fc65f" : "#ff5c5c" }}>
                             {history ? `${pointsGained >= 0 ? '+' : ''}${pointsGained.toLocaleString()} points in the last 24h` : "Gained 0 points in the last day"}
                          </p>
                      </div>
                  </div>
                  );
              })}
          </div>
      </div>
    </div>
  );
};

export default ClanDetails;
