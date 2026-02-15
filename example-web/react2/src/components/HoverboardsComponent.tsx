import React from "react";
import { CollectionConfigData } from "ps99-api";
import ItemCard from "./ItemCard";
import { useItemResolution } from "../hooks/useItemResolution";

const HoverboardsComponent: React.FC<{
  configData: CollectionConfigData<"Hoverboards">;
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
        <p>{configData.Desc}</p>
        {configData.ProductId && <p>ID: {configData.ProductId}</p>}
        {configData.HoverHeight && <p>Height: {configData.HoverHeight}</p>}
        <p>Speed: {configData.DefaultJumpSpeedBoost || 'Normal'}</p>
      </div>
    </div>
  );
};

export default HoverboardsComponent;
