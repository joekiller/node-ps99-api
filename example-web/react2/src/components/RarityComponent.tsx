import React, { useEffect, useState } from "react";
import { PetSimulator99API, RarityData } from "ps99-api";

const RarityComponent: React.FC = () => {
  const [rarityItems, setRarityItems] = useState<RarityData[]>([]);

  useEffect(() => {
    const fetchRarityItems = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("Rarity");
      if (response.status === "ok") {
        setRarityItems(response.data);
      }
    };
    fetchRarityItems();
  }, []);

  return (
    <div>
      <h2>Rarity</h2>
      <ul>
        {rarityItems.map((item, index) => (
          <li key={index}>
            <span>{item.configData.DisplayName}</span>
            <span>Rarity Number: {item.configData.RarityNumber}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RarityComponent;
