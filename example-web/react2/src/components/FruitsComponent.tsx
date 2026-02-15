import React from "react";
import { CollectionConfigData } from "ps99-api";
import ItemCard from "./ItemCard";
import { useItemResolution } from "../hooks/useItemResolution";

const FruitsComponent: React.FC<{
  configData: CollectionConfigData<"Fruits">;
}> = ({ configData }) => {
  const { getRarityColor } = useItemResolution();
  const rarityColor = configData.Rarity ? getRarityColor(configData.Rarity) : null;

  return (
    <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>
      <ItemCard
        id={configData.DisplayName}
        amount={1}
        label={configData.DisplayName}
        itemData={{
          icon: configData.Icon,
          rarity: configData.Rarity,
          name: configData.DisplayName
        }}
        rarityColor={rarityColor}
      />
      <div style={{ marginTop: '10px', fontSize: '0.9em', color: '#666', textAlign: 'center' }}>
        <p>Duration: {configData.Duration}s</p>
        {configData.Desc && <p>{configData.Desc}</p>}
        {configData.IgnoreFruitMachine && <p>Ignore Fruit Machine</p>}
      </div>
      <div style={{ marginTop: '15px' }}>
        <h3 style={{ textAlign: 'center', fontSize: '1.1em' }}>Boosts</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
          {configData.Boost.map((boost, index) => (
            <span key={index} style={{
              background: '#e8f5e9',
              color: '#2e7d32',
              padding: '5px 10px',
              borderRadius: '12px',
              fontSize: '0.9em',
              fontWeight: 'bold',
              border: '1px solid #a5d6a7'
            }}>
              {boost.Type}: {boost.Amount}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FruitsComponent;
