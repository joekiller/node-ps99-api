import React, { useEffect, useState } from 'react';
import {GuildBattleData, PetSimulator99API} from 'ps99-api';

const GuildBattlesComponent: React.FC = () => {
  const [guildBattles, setGuildBattles] = useState<GuildBattleData[]>([]);

  useEffect(() => {
    const fetchGuildBattles = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("GuildBattles");
      if (response.status === 'ok') {
        setGuildBattles(response.data);
      }
    };
    fetchGuildBattles();
  }, []);

  return (
    <div>
      <h2>Guild Battles</h2>
      <ul>
        {guildBattles.map((battle, index) => (
          <li key={index}>
            <span>Title: {battle.configData.Title}</span>
            <span>Start Time: {new Date(battle.configData.StartTime).toLocaleString()}</span>
            <span>Finish Time: {new Date(battle.configData.FinishTime).toLocaleString()}</span>
            <span>Rewards: {battle.configData.Rewards.Gold.map(reward => reward._data.id).join(', ')}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuildBattlesComponent;
