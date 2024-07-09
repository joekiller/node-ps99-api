import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const FruitsComponent: React.FC<{
  configData: CollectionConfigData<"Fruits">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>{configData.DisplayName}</h2>
      <ImageComponent src={configData.Icon} alt={configData.DisplayName} />
      <p>Duration: {configData.Duration} seconds</p>
      <p>Rarity: {configData.Rarity.DisplayName}</p>
      <p>Rarity Number: {configData.Rarity.RarityNumber}</p>
      {configData.Desc && <p>Description: {configData.Desc}</p>}
      {configData.IgnoreFruitMachine && <p>Ignore Fruit Machine: Yes</p>}
      <h3>Boosts:</h3>
      <ul>
        {configData.Boost.map((boost, index) => (
          <li key={index}>
            {boost.Type}: {boost.Amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FruitsComponent;
