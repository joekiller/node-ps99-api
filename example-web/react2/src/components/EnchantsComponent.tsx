import React from "react";
import { CollectionConfigData } from "ps99-api";
import ItemCard from "./ItemCard";
import { useItemResolution } from "../hooks/useItemResolution";

const EnchantsComponent: React.FC<{
  configData: CollectionConfigData<"Enchants">;
}> = ({ configData }) => {
  const { getRarityColor } = useItemResolution();


  const isSingleTier = configData.Tiers.length === 1;

  if (isSingleTier) {
    const tier = configData.Tiers[0];
    const rarityColor = tier.Rarity ? getRarityColor(tier.Rarity) : null;

    return (
      <div style={{ width: '100%', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20px' }}>
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '16px',
          border: rarityColor ? `4px solid ${rarityColor}` : '4px solid #eee',
          padding: '10px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <img src={tier.Icon} alt={tier.DisplayName} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>

        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          {configData.BaseTier !== 1 && <p><strong>Base Tier:</strong> {configData.BaseTier}</p>}
          {configData.MaxTier !== 1 && <p><strong>Max Tier:</strong> {configData.MaxTier}</p>}
          {configData.DiminishPowerThreshold && <p><strong>Diminish:</strong> {configData.DiminishPowerThreshold}</p>}
          {configData.EmpoweredBoost && <p><strong>Empowered Boost:</strong> {configData.EmpoweredBoost}</p>}

          <h3 style={{ margin: '10px 0', fontSize: '1.5em', color: '#333' }}>{tier.DisplayName}</h3>
          <p style={{ color: '#666', fontSize: '1.1em', marginBottom: '15px' }}>{tier.Desc}</p>
          <p style={{ fontWeight: '900', fontSize: '1.2em', color: '#333' }}>Power: {tier.Power}</p>
        </div>
      </div>
    );
  }

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
      <h3>Tiers</h3>
      <div style={{ display: "grid", gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: "15px" }}>
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
  );
};

export default EnchantsComponent;
