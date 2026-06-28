import React from "react";
import { CollectionConfigData } from "ps99-api";
import ItemCard from "./ItemCard";
import { useItemResolution } from "../hooks/useItemResolution";

const CardItemsComponent: React.FC<{
  configData: CollectionConfigData<"CardItems">;
}> = ({ configData }) => {
  const { getRarityColor } = useItemResolution();
  const rarityColor = configData.Rarity ? getRarityColor(configData.Rarity) : null;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '30px' }}>

      <div style={{ width: '100%', maxWidth: '400px' }}>
        <ItemCard
          id={configData.DisplayName}
          amount={1}
          label={configData.DisplayName}
          itemData={{
            icon: configData.GoldIcon || configData.Icon,
            rarity: configData.Rarity,
            name: configData.DisplayName
          }}
          rarityColor={rarityColor}
        />
      </div>

      <div style={{ fontSize: '1.1em', color: '#555', textAlign: 'center', maxWidth: '600px', lineHeight: '1.6' }}>
        <p style={{ marginBottom: '20px', background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eee' }}>"{configData.Desc}"</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {configData.AssociatedPetId && (
            <span style={{ background: '#1976d2', color: 'white', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold' }}>
              Pet: {configData.AssociatedPetId}
            </span>
          )}
          {configData.titanic && (
            <span style={{ background: '#f57c00', color: 'white', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold' }}>Titanic</span>
          )}
          {configData.Tradable && (
            <span style={{ background: '#9c27b0', color: 'white', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold' }}>Tradable</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardItemsComponent;
