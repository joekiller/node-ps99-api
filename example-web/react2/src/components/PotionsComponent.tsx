import React, { useEffect, useState } from 'react';
import { PetSimulator99API, PotionData } from 'ps99-api';
import ImageComponent from "./ImageComponent";

const PotionsComponent: React.FC = () => {
  const [potions, setPotions] = useState<PotionData[]>([]);

  useEffect(() => {
    const fetchPotions = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("Potions");
      if (response.status === 'ok') {
        setPotions(response.data);
      }
    };
    fetchPotions();
  }, []);

  return (
    <div>
      <h2>Potions</h2>
      <ul>
        {potions.map((potion, index) => (
          <li key={index}>
            <span>Base Tier: {potion.configData.BaseTier}</span>
            <span>Max Tier: {potion.configData.MaxTier}</span>
            {potion.configData.Tiers.map((tier, tierIndex) => (
              <div key={tierIndex}>
                <ImageComponent src={tier.Icon} alt={tier.DisplayName} />
                <span>Tier {tierIndex + 1}:</span>
                <span>{tier.DisplayName}</span>
                <span>Power: {tier.Power}</span>
                <span>Time: {tier.Time}</span>
                <span>Rarity: {tier.Rarity.DisplayName}</span>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PotionsComponent;
