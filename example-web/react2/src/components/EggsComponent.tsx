import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";

const EggsComponent: React.FC<{
  configData: CollectionConfigData<"Eggs">;
}> = ({ configData }) => {
  return (
    <div>
      <h2>{configData.name}</h2>
      <ImageComponent src={configData.icon} alt={configData.name} />
      <p>Currency: {configData.currency}</p>
      <p>Override Cost: {configData.overrideCost}</p>
      {configData.isCustomEgg && <p>Custom Egg: Yes</p>}
      {configData.bestEgg && <p>Best Egg: Yes</p>}
      {configData.disableGold && <p>Disable Gold: Yes</p>}
      {configData.disableRainbow && <p>Disable Rainbow: Yes</p>}
      {configData.disableShiny && <p>Disable Shiny: Yes</p>}
      {configData.disableModifiers && <p>Disable Modifiers: Yes</p>}
      {configData.goldChance && <p>Gold Chance: {configData.goldChance}</p>}
      {configData.rainbowChance && (
        <p>Rainbow Chance: {configData.rainbowChance}</p>
      )}
      {configData.shinyChance && <p>Shiny Chance: {configData.shinyChance}</p>}
      {configData.rarity && (
        <div>
          <p>Rarity: {configData.rarity.DisplayName}</p>
          <p>Rarity Number: {configData.rarity.RarityNumber}</p>
        </div>
      )}
      <h3>Pets:</h3>
      <ul>
        {configData.pets.map((pet, index) => (
          <li key={index}>
            <p>Name: {pet[0]}</p>
            <p>Chance: {pet[1]}</p>
            {pet[2] && <p>Tier: {pet[2]}</p>}
          </li>
        ))}
      </ul>
      {configData.productIds && (
        <div>
          <h3>Product IDs:</h3>
          <ul>
            {Object.entries(configData.productIds).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EggsComponent;
