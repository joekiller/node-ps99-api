import React from "react";
import { CollectionConfigData } from "ps99-api";
import ItemCard from "./ItemCard";
import ImageComponent from "./ImageComponent";
import { useItemResolution } from "../hooks/useItemResolution";

const CharmsComponent: React.FC<{
  configData: CollectionConfigData<"Charms">;
}> = ({ configData }) => {
  const { getRarityColor } = useItemResolution();

  return (
    <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>

      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
        <div style={{ width: '150px' }}>
          <ImageComponent src={configData.Icon} alt={configData.Tiers[0].DisplayName} />
        </div>
        <div style={{ textAlign: 'left', minWidth: '200px' }}>
          <p><strong>Base Tier:</strong> {configData.BaseTier}</p>
          <p><strong>Max Tier:</strong> {configData.MaxTier}</p>
          {configData.DiminishPowerThreshold && <p><strong>Diminish:</strong> {configData.DiminishPowerThreshold}</p>}
          {configData.Unique && <span className="badge">Unique</span>}
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3 style={{ fontSize: '1.2em', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Tiers</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "15px", marginTop: '15px' }}>
          {configData.Tiers.map((tier, index) => {
            const rarityColor = tier.Rarity ? getRarityColor(tier.Rarity) : null;
            return (
              <div key={index}>
                <ItemCard
                  id={tier.DisplayName}
                  amount={1}
                  label={tier.DisplayName}
                  tn={index + 1}
                  itemData={{
                    icon: configData.Icon,
                    rarity: tier.Rarity,
                    name: tier.DisplayName
                  }}
                  rarityColor={rarityColor}
                />
                <div style={{ marginTop: '10px', fontSize: '0.9em', color: '#666', textAlign: 'center' }}>
                  <p>{tier.Desc}</p>
                  <p style={{ fontWeight: 'bold' }}>Power: {tier.Power}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CharmsComponent;
