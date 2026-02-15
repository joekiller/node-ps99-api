import React from "react";
import { CollectionConfigData } from "ps99-api";
import ItemCard from "./ItemCard";
import { useItemResolution } from "../hooks/useItemResolution";

const UltimateComponent: React.FC<{
  configData: CollectionConfigData<"Ultimates">;
}> = ({ configData }) => {
  const { getRarityColor } = useItemResolution();
  const rarityColor = configData.Rarity ? getRarityColor(configData.Rarity) : null;

  return (
    <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>

      <div style={{ maxWidth: '300px', margin: '0 auto 15px auto' }}>
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
      </div>

      <div style={{ fontSize: '0.9em', color: '#666', textAlign: 'center' }}>
        <p style={{ marginBottom: '10px' }}>{configData.Desc}</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <span className="badge">Max Tier: {configData.MaxTier}</span>
          {configData.Tradable && <span className="badge">Tradable</span>}
        </div>
      </div>
    </div>
  );
};

export default UltimateComponent;
