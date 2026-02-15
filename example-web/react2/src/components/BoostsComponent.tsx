import React from "react";
import { CollectionConfigData } from "ps99-api";
import ItemCard from "./ItemCard";

const BoostsComponent: React.FC<{
  configData: CollectionConfigData<"Boosts">;
}> = ({ configData }) => {
  return (
    <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>
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
      <div style={{ marginTop: '10px', fontSize: '0.9em', color: '#666', textAlign: 'center' }}>
        <p>Max Percent: {configData.MaximumPercent}%</p>
      </div>
    </div>
  );
};

export default BoostsComponent;
