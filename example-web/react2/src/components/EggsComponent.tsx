import React from "react";
import { CollectionConfigData } from "ps99-api";
import { GenericFetchComponent } from "./GenericFetchComponent";
import ImageComponent from "./ImageComponent";

const EggsComponent: React.FC<{
  configData?: CollectionConfigData<"Eggs">;
}> = ({ configData }) => {
  return (
    <GenericFetchComponent<CollectionConfigData<"Eggs">>
      collectionName="Eggs"
      configData={configData}
      render={(data) => (
        <div>
          <h2>{data.name}</h2>
          <ImageComponent src={data.icon} alt={data.name} />
          <p>Currency: {data.currency}</p>
          <p>Override Cost: {data.overrideCost}</p>
          {data.isCustomEgg && <p>Custom Egg: Yes</p>}
          {data.bestEgg && <p>Best Egg: Yes</p>}
          {data.disableGold && <p>Disable Gold: Yes</p>}
          {data.disableRainbow && <p>Disable Rainbow: Yes</p>}
          {data.disableShiny && <p>Disable Shiny: Yes</p>}
          {data.disableModifiers && <p>Disable Modifiers: Yes</p>}
          {data.goldChance && <p>Gold Chance: {data.goldChance}</p>}
          {data.rainbowChance && <p>Rainbow Chance: {data.rainbowChance}</p>}
          {data.shinyChance && <p>Shiny Chance: {data.shinyChance}</p>}
          {data.rarity && (
            <div>
              <p>Rarity: {data.rarity.DisplayName}</p>
              <p>Rarity Number: {data.rarity.RarityNumber}</p>
            </div>
          )}
          <h3>Pets:</h3>
          <ul>
            {data.pets.map((pet, index) => (
              <li key={index}>
                <p>Name: {pet[0]}</p>
                <p>Chance: {pet[1]}</p>
                {pet[2] && <p>Tier: {pet[2]}</p>}
              </li>
            ))}
          </ul>
          {data.productIds && (
            <div>
              <h3>Product IDs:</h3>
              <ul>
                {Object.entries(data.productIds).map(([key, value]) => (
                  <li key={key}>
                    {key}: {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    />
  );
};

export default EggsComponent;
