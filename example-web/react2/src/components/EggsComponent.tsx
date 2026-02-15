import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";
import ItemCard from "./ItemCard";
import { useItemResolution } from "../hooks/useItemResolution";

const EggsComponent: React.FC<{
  configData: CollectionConfigData<"Eggs">;
}> = ({ configData }) => {
  const { getRarityColor, resolveItem } = useItemResolution();
  const rarityColor = configData.rarity ? getRarityColor(configData.rarity) : null;

  return (
    <div style={{ width: "100%", height: "100%", boxSizing: "border-box" }}>
      <div style={{ width: '300px', margin: '0 auto 20px auto' }}>
        <ItemCard
          id={configData.name}
          amount={1}
          label={configData.name}
          itemData={{
            icon: configData.icon,
            rarity: configData.rarity,
            name: configData.name
          }}
          rarityColor={rarityColor}
          typeId={(configData as any)._index}
        />
      </div>
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
      <div style={{ marginTop: '15px' }}>
        <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Pets</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '16px' }}>
          {configData.pets.map((pet, index) => {
            const petName = pet[0];
            const chance = pet[1];
            // The 3rd element appears to be the tier (tn), based on existing code usage
            const tn = pet[2];
            const resolvedItem = resolveItem(petName, tn);
            const rarityColor = resolvedItem?.rarity ? getRarityColor(resolvedItem.rarity) : null;

            return (
              <div key={index} style={{
                // Auto-sizing handled by grid
              }}>
                <ItemCard
                  id={petName}
                  // Formatting chance as string to include %
                  amount={`${chance}%`}
                  label={resolvedItem?.name || petName}
                  itemData={resolvedItem}
                  rarityColor={rarityColor}
                  tn={tn}
                // weight or typeId not strictly needed here unless we want debug info
                />
              </div>
            );
          })}
        </div>
      </div>
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
