import React, { useEffect, useState } from 'react';
import {PetSimulator99API, RankData} from 'ps99-api';

const RanksComponent: React.FC = () => {
  const [ranks, setRanks] = useState<RankData[]>([]);

  useEffect(() => {
    const fetchRanks = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("Ranks");
      if (response.status === 'ok') {
        setRanks(response.data);
      }
    };
    fetchRanks();
  }, []);

  return (
    <div>
      <h2>Ranks</h2>
      <ul>
        {ranks.map((rank, index) => (
          <li key={index}>
            <span>{rank.configData.Title}</span>
            <span>Rank Number: {rank.configData.RankNumber}</span>
            <span>Max Enchants Equipped: {rank.configData.MaxEnchantsEquipped}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RanksComponent;
