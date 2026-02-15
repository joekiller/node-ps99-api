import React from "react";
import { CollectionConfigData } from "ps99-api";
import ItemCard from "./ItemCard";
import { useItemResolution } from "../hooks/useItemResolution";

const EnchantsComponent: React.FC<{
  configData: CollectionConfigData<"Enchants">;
}> = ({ configData }) => {
  const { getRarityColor } = useItemResolution();

  return (

    <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>
      <div style={{ textAlign: 'left', marginBottom: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
        <p><strong>Base Tier:</strong> {configData.BaseTier}</p>
        <p><strong>Max Tier:</strong> {configData.MaxTier}</p>
        <p><strong>Max Page:</strong> {configData.MaxPage}</p>
        {configData.DiminishPowerThreshold && (
          <p><strong>Diminish Threshold:</strong> {configData.DiminishPowerThreshold}</p>
        )}
        {configData.EmpoweredBoost && (
          <p><strong>Empowered Boost:</strong> {configData.EmpoweredBoost}</p>
        )}
        {configData.ProductId && <p><strong>Product ID:</strong> {configData.ProductId}</p>}
      </div>
      <h3>Tiers:</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1em" }}>
        {configData.Tiers.map((tier, index) => {
          const rarityColor = tier.Rarity ? getRarityColor(tier.Rarity) : null;
          return (
            <div
              key={index}
              style={{
                flex: "1 1 300px",
                maxWidth: "350px",
                margin: "0 auto"
              }}
            >
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
                <p>{tier.Desc}</p>
                <p>Power: {tier.Power}</p>
              </div>
            </div>
          );
        })}
        <h3>Tiers</h3>
        <div style={{ display: "grid", gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: "15px" }}>
          {configData.Tiers.map((tier, index) => {
            const rarityColor = tier.Rarity ? getRarityColor(tier.Rarity) : null;
            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
              >
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
                  <p>{tier.Desc}</p>
                  <p style={{ fontWeight: 'bold', color: '#333' }}>Power: {tier.Power}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EnchantsComponent;
