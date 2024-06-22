import React, { useEffect, useState } from "react";
import { CharmData, PetSimulator99API } from "ps99-api";
import ImageComponent from "./ImageComponent";

const CharmsComponent: React.FC = () => {
  const [charms, setCharms] = useState<CharmData[]>([]);

  useEffect(() => {
    const fetchCharms = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("Charms");
      if (response.status === "ok") {
        setCharms(response.data);
      }
    };
    fetchCharms();
  }, []);

  return (
    <div>
      <h2>Charms</h2>
      <ul>
        {charms.map((charm, index) => (
          <li key={index}>
            <ImageComponent
              src={charm.configData.Icon}
              alt={`Charm ${index + 1}`}
            />
            <span>Base Tier: {charm.configData.BaseTier}</span>
            <span>Max Tier: {charm.configData.MaxTier}</span>
            {charm.configData.Tiers.map((tier, tierIndex) => (
              <div key={tierIndex}>
                <span>Tier {tierIndex + 1}:</span>
                <span>{tier.DisplayName}</span>
                <span>Power: {tier.Power}</span>
                <span>Rarity: {tier.Rarity.DisplayName}</span>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharmsComponent;
