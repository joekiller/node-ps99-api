import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const BoxesComponent: React.FC<{
  configData: CollectionConfigData<"Boxes">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>{configData.DisplayName}</h2>
      <p>Description: {configData.Desc}</p>
      <p>Capacity: {configData.Capacity}</p>
      <p>Rarity: {configData.Rarity.DisplayName}</p>
      <p>Rarity Number: {configData.Rarity.RarityNumber}</p>
      <h3>Icons:</h3>
      <ul>
        {configData.Icons.map((icon, index) => (
          <li key={index}>
            <ImageComponent src={icon.Icon} alt={icon.Name} />
            <span>{icon.Name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoxesComponent;
