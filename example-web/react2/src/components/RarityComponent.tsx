import React from "react";
import { CollectionConfigData } from "ps99-api";

const RarityComponent: React.FC<{
  configData: CollectionConfigData<"Rarity">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>Rarity: {configData.DisplayName}</h2>
      <p>Rarity Number: {configData.RarityNumber}</p>
      <p>Color: {configData.Color}</p>
      <p>Announce: {configData.Announce ? "Yes" : "No"}</p>
    </div>
  );
};

export default RarityComponent;
