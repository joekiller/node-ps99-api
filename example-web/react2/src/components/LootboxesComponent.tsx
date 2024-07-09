import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const LootboxesComponent: React.FC<{
  configData: CollectionConfigData<"Lootboxes">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>{configData.DisplayName}</h2>
      <ImageComponent src={configData.Icon} alt={configData.DisplayName} />
      <p>Description: {configData.Desc}</p>
      <p>Rarity: {configData.Rarity.DisplayName}</p>
      <p>Rarity Number: {configData.Rarity.RarityNumber}</p>
    </div>
  );
};

export default LootboxesComponent;
