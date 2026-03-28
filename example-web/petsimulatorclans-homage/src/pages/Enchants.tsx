import React, { useEffect, useState } from "react";
import ClanIcon from "../components/ClanIcon";
import { getCachedEnchants } from "../api";

const Enchants: React.FC = () => {
  const [enchants, setEnchants] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCachedEnchants().then(data => {
        // filter out invalid ones
        setEnchants((data || []).filter((e: any) => e && e.configData && (e.configData.Icon || e.configData.Tiers)));
    });
  }, []);

  const filtered = enchants.filter((e: any) => e.configName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ padding: "0 10px", marginTop: "20px" }}>
      <header>
        <div className="guild-header" style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "20px", padding: "20px", background: "var(--card-bg)", borderRadius: "15px", border: "1px solid rgba(255,255,255,0.05)" }}>
          {enchants.length > 0 ? (
            <ClanIcon iconStr={enchants[0].configData.Tiers ? enchants[0].configData.Tiers[enchants[0].configData.Tiers.length - 1].Icon : enchants[0].configData.Icon} style={{ width: "80px", borderRadius: "10px" }} />
          ) : (
            <img id="icon" src="https://andreyondemand.github.io/psclansassets/images/clans.webp" alt="Icon" style={{ width: "80px", borderRadius: "10px" }} />
          )}
          <div className="guild-info">
            <h1 id="name" style={{ margin: "0 0 10px 0", color: "var(--primary-blue)" }}>Enchants</h1>
            <h3 id="desc" style={{ margin: "0", fontWeight: "normal" }}>The maximum amount of the same book you can use at a time</h3>
          </div>
        </div>
      </header>

      <section style={{ background: "var(--card-bg)", padding: "20px", borderRadius: "15px", border: "1px solid rgba(255,255,255,0.05)" }}>
        <input 
          type="text" 
          placeholder="Search Enchants..." 
          style={{ width: "100%", padding: "10px", marginBottom: "20px", background: "transparent", border: "1px solid #333", color: "white", borderRadius: "5px" }}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div id="enchantsGrid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
          {filtered.map(enchant => {
             const maxTier = enchant.configData.Tiers ? enchant.configData.Tiers.length : 1;
             const pwr = enchant.configData.Tiers ? enchant.configData.Tiers[maxTier - 1].Power : 0;
             const powerLabel = pwr ? Number(pwr).toFixed(2) : 'NaN';
             const maxPower = (enchant.configData.DiminishPowerThreshold || 0);
             const totalBooks = (pwr && pwr > 0) ? (Math.round((maxPower / pwr) * 10) / 10) : 0;
             const iconPath = enchant.configData.Icon || (enchant.configData.Tiers && enchant.configData.Tiers[maxTier - 1].Icon) || "";
             const title = enchant.configName.replace("Enchant | ", "");
             
             return (
              <div key={enchant.configName} className="member-card" style={{ padding: "15px", textAlign: "center", background: "#0c0d11", borderRadius: "15px", display: "flex", flexDirection: "column", gap: "5px", border: "1px solid rgba(255,255,255,0.02)" }}>
                <ClanIcon iconStr={iconPath} style={{ width: "80px", margin: "0 auto", borderRadius: "10px" }} />
                <h4 style={{ color: "var(--primary-blue)", margin: "5px 0 0 0", fontSize: "1.1rem" }}>{title}</h4>
                <p style={{ margin: 0, fontSize: "0.85em", color: "var(--text-secondary)" }}>Maximum power: {maxPower}</p>
                <p style={{ margin: 0, fontSize: "0.85em", color: "var(--text-secondary)" }}>Power per each tier {maxTier} book: {powerLabel}</p>
                <p style={{ margin: 0, fontSize: "0.9em", color: "var(--text-secondary)" }}>Total tier {maxTier} books possible at the same time: {totalBooks}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
export default Enchants;
