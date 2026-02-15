import React from "react";
import { CollectionConfigData } from "ps99-api";
import ItemCard from "./ItemCard";

const WateringCanComponent: React.FC<{
  configData: CollectionConfigData<"WateringCans">;
}> = ({ configData }) => {
  return (
    <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>

      <div style={{ maxWidth: '300px', margin: '0 auto 15px auto' }}>
        <ItemCard
          id={configData.DisplayName}
          amount={1}
          label={configData.DisplayName}
          itemData={{
            icon: configData.Icon,
            rarity: undefined,
            name: configData.DisplayName
          }}
          rarityColor={null}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.9em', color: '#666', textAlign: 'center' }}>
        <p><strong>Time Mult:</strong> {configData.PlantTimeMultiplier}x</p>
        <p><strong>Duration:</strong> {configData.PlantTimeMultiplierDuration}</p>
      </div>
    </div>
  );
};

export default WateringCanComponent;
