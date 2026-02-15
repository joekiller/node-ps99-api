import React from "react";
import { CollectionConfigData } from "ps99-api";
import ItemCard from "./ItemCard";
import { useItemResolution } from "../hooks/useItemResolution";

const ZoneFlagComponent: React.FC<{
  configData: CollectionConfigData<"ZoneFlags">;
}> = ({ configData }) => {
  const { getRarityColor } = useItemResolution();
  const rarityColor = configData.Rarity ? getRarityColor(configData.Rarity) : null;

  return (
    <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>

      <div style={{ maxWidth: '300px', margin: '0 auto 15px auto' }}>
        <ItemCard
          id={configData.Name}
          amount={1}
          label={configData.Name}
          itemData={{
            icon: configData.Icon,
            rarity: configData.Rarity,
            name: configData.Name
          }}
          rarityColor={rarityColor}
        />
      </div>

      <div style={{ fontSize: '0.9em', color: '#666', textAlign: 'center' }}>
        <p>{configData.Desc}</p>
        <p style={{ fontWeight: 'bold', marginTop: '5px' }}>Duration: {configData.Duration}s</p>
      </div>
    </div>
  );
};

export default ZoneFlagComponent;
