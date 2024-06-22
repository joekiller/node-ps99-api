import React, { useEffect, useState } from "react";
import { LootboxData, PetSimulator99API } from "ps99-api";
import ImageComponent from "./ImageComponent";

const LootboxesComponent: React.FC = () => {
  const [lootboxes, setLootboxes] = useState<LootboxData[]>([]);

  useEffect(() => {
    const fetchLootboxes = async () => {
      const api = new PetSimulator99API();
      const response = await api.getCollection("Lootboxes");
      if (response.status === "ok") {
        setLootboxes(response.data);
      }
    };
    fetchLootboxes();
  }, []);

  return (
    <div>
      <h2>Lootboxes</h2>
      <ul>
        {lootboxes.map((lootbox, index) => (
          <li key={index}>
            <ImageComponent
              src={lootbox.configData.Icon}
              alt={lootbox.configData.DisplayName}
            />
            <span>{lootbox.configData.DisplayName}</span>
            <span>{lootbox.configData.Desc}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LootboxesComponent;
