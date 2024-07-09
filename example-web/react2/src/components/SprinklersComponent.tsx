import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const SprinklerComponent: React.FC<{
  configData: CollectionConfigData<"Sprinklers">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>Sprinkler: {configData.Name}</h2>
      <p>Description: {configData.Desc}</p>
      <p>Color: {configData.Color}</p>
      <p>Duration: {configData.Duration} seconds</p>
      <h3>Rarity</h3>
      <p>Rarity Number: {configData.Rarity.RarityNumber}</p>
      <p>Display Name: {configData.Rarity.DisplayName}</p>
      <ImageComponent src={configData.Icon} alt={configData.Name} />
    </div>
  );
};

export default SprinklerComponent;
