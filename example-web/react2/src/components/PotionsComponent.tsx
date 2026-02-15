import React from "react";
import { CollectionConfigData } from "ps99-api";
import ItemCard from "./ItemCard";
import ImageComponent from "./ImageComponent";
import { useItemResolution } from "../hooks/useItemResolution";

const PotionsComponent: React.FC<{
  configData: CollectionConfigData<"Potions">;
}> = ({ configData }) => {
  const { getRarityColor } = useItemResolution();

  return (

    <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ width: '150px', height: '150px' }}>
          <ImageComponent
            src={configData.Tiers[0].Icon}
            alt={configData.Tiers[0].DisplayName}
          />
        </div>
        <div style={{ textAlign: 'left', flex: 1, minWidth: '200px' }}>
          <p style={{ marginBottom: '8px' }}><strong>Description:</strong> {configData.Tiers[0].Desc}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <p><strong>Primary:</strong> <span style={{ color: configData.PrimaryColor }}>{configData.PrimaryColor}</span></p>
            <p><strong>Secondary:</strong> <span style={{ color: configData.SecondaryColor }}>{configData.SecondaryColor}</span></p>
            <p><strong>Base Tier:</strong> {configData.BaseTier}</p>
            <p><strong>Max Tier:</strong> {configData.MaxTier}</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Tiers</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px' }}>
          {configData.Tiers.map((tier, index) => {
            const rarityColor = tier.Rarity ? getRarityColor(tier.Rarity) : null;
            return (
              <div key={index} style={{ marginBottom: '10px' }}>
                <ItemCard
                  id={tier.DisplayName}
                  amount={1}
                  label={tier.DisplayName}
                  tn={index + 1}
                  itemData={{
                    icon: tier.Icon,
                    rarity: tier.Rarity,
                    name: tier.DisplayName
                  }}
                  rarityColor={rarityColor}
                />
                <div style={{ marginTop: '10px', fontSize: '0.9em', color: '#666', textAlign: 'center' }}>
                  <p style={{ fontWeight: 'bold' }}>Power: {tier.Power}</p>
                  <p>Time: {tier.Time}s</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PotionsComponent;
