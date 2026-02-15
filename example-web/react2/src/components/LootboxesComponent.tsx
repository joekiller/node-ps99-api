import React from "react";
import { CollectionConfigData } from "ps99-api";
import ItemCard from "./ItemCard";
import { useItemResolution } from "../hooks/useItemResolution";

const LootboxesComponent: React.FC<{
  configData: CollectionConfigData<"Lootboxes">;
}> = ({ configData }) => {
  const { getRarityColor } = useItemResolution();
  const rarityColor = (configData as any).Rarity ? getRarityColor((configData as any).Rarity) : null;

  return (
    <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>
      <ItemCard
        id={configData.DisplayName}
        amount={1}
        label={configData.DisplayName}
        itemData={{
          icon: configData.Icon,
          rarity: (configData as any).Rarity,
          name: configData.DisplayName
        }}
        rarityColor={rarityColor}
        typeId={(configData as any)._index}
      />
      {/* Additional details provided by ItemCard, but we can add more if needed below */}
      <div style={{ marginTop: '10px', fontSize: '0.9em', color: '#666', textAlign: 'center' }}>
        <p>{configData.Desc}</p>
      </div>
    </div>
  );
};

export default LootboxesComponent;
