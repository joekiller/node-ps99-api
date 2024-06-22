import React, { useState, useEffect } from 'react';
import { PetSimulator99API, ClanResponseBody } from 'ps99-api';
import './App.css';
import ImageComponent from "./Image";

interface ClanDetailsProps {
  clanName: string;
}

const ClanDetails: React.FC<ClanDetailsProps> = ({ clanName }) => {
  const [clanData, setClanData] = useState<ClanResponseBody | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const api = new PetSimulator99API();
      try {
        const response = await api.getClan(clanName);
        setClanData(response.data);
      } catch (error) {
        console.error('Error fetching clan data:', error);
      }
    };
    fetchData();
  }, [clanName]);

  if (!clanData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container clan-details">
      <h2>{clanData.Name}</h2>
      <ImageComponent rbxassetid={clanData.Icon}/>
      <p><strong>Description:</strong> {clanData.Desc}</p>
      <p><strong>Country:</strong> {clanData.CountryCode}</p>
      <p><strong>Created:</strong> {new Date(clanData.Created * 1000).toLocaleString()}</p>
      <p><strong>Members:</strong> {clanData.Members.length}/{clanData.MemberCapacity}</p>
      <p><strong>Officer Capacity:</strong> {clanData.OfficerCapacity}</p>
      <p><strong>Owner:</strong> {clanData.Owner}</p>
      <p><strong>Bronze Medals:</strong> {clanData.BronzeMedals}</p>
      <p><strong>Silver Medals:</strong> {clanData.SilverMedals}</p>
      <p><strong>Gold Medals:</strong> {clanData.GoodMedals}</p>
      <p><strong>Guild Level:</strong> {clanData.GuildLevel}</p>
      <p><strong>Status:</strong> {clanData.Status} (updated
        by {clanData.StatusUsername} on {new Date(clanData.StatusTimestamp * 1000).toLocaleString()})</p>
      <p><strong>Deposited Diamonds:</strong> {clanData.DepositedDiamonds}</p>
      <div className="diamond-contributions">
        <h3>Diamond Contributions</h3>
        <p><strong>Total:</strong> {clanData.DiamondContributions.AllTime.Sum}</p>
        <ul>
          {clanData.DiamondContributions.AllTime.Data.map((contribution, index) => (
            <li key={index}>User {contribution.UserID}: {contribution.Diamonds} diamonds</li>
          ))}
        </ul>
      </div>
      <div className="battles">
        <h3>Battles</h3>
        {Object.entries(clanData.Battles).map(([battleId, battle], index) => (
          <div key={index} className="battle">
            <h4>{battleId}</h4>
            <p><strong>Points:</strong> {battle.Points}</p>
            <p><strong>Place:</strong> {battle.Place || 'N/A'}</p>
            <div className="battle-contributions">
              <h5>Contributions</h5>
              <ul>
                {battle.PointContributions.map((contribution, idx) => (
                  <li key={idx}>User {contribution.UserID}: {contribution.Points} points</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClanDetails;
