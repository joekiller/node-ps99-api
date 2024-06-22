import React, { useEffect, useState } from 'react';
import {FishingRodData, PetSimulator99API} from 'ps99-api';
import ImageComponent from "./ImageComponent";

const FishingRodsComponent: React.FC = () => {
  const [fishingRods, setFishingRods] = useState<FishingRodData[]>([]);

  useEffect(() => {
    const fetchFishingRods = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("FishingRods");
      if (response.status === 'ok') {
        setFishingRods(response.data);
      }
    };
    fetchFishingRods();
  }, []);

  return (
    <div>
      <h2>Fishing Rods</h2>
      <ul>
        {fishingRods.map((rod, index) => (
          <li key={index}>
            <ImageComponent src={rod.configData.Icon} alt={rod.configData.DisplayName} />
            <span>{rod.configData.DisplayName}</span>
            <span>Fishing Chance: {rod.configData.FishingChance}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FishingRodsComponent;
