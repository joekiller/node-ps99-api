import React from "react";
import { CollectionConfigData } from "ps99-api";
import ItemCard from "./ItemCard";
import ImageComponent from "./ImageComponent";
import { useItemResolution } from "../hooks/useItemResolution";
import { formatGigantix } from "../utils/gigantix";

const PotionsComponent: React.FC<{
  configData: CollectionConfigData<"Potions">;
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
          <ImageComponent src={tier.Icon} alt={tier.DisplayName} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>

        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '10px', fontSize: '0.9em' }}>
            <p><strong>Primary:</strong> <span style={{ color: configData.PrimaryColor }}>{configData.PrimaryColor}</span></p>
            <p><strong>Secondary:</strong> <span style={{ color: configData.SecondaryColor }}>{configData.SecondaryColor}</span></p>
          </div>
          {configData.BaseTier !== 1 && <p><strong>Base Tier:</strong> {configData.BaseTier}</p>}
          {configData.MaxTier !== 1 && <p><strong>Max Tier:</strong> {configData.MaxTier}</p>}

          <h3 style={{ margin: '10px 0', fontSize: '1.5em', color: '#333' }}>{tier.DisplayName}</h3>
          <p style={{ color: '#666', fontSize: '1.1em', marginBottom: '15px' }}>{tier.Desc}</p>
          <div style={{ fontWeight: '900', fontSize: '1.2em', color: '#333' }}>
            <p>Power: {tier.Power}</p>
            <p>Time: {tier.Time}s</p>
          </div>
        </div>
      </div>
    );
  }

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {configData.Tiers.map((tier, index) => {
            const rarityColor = tier.Rarity ? getRarityColor(tier.Rarity) : '#eee';
            return (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 15px',
                background: '#fff',
                borderRadius: '12px',
                border: `1px solid ${rarityColor}`,
                borderLeftWidth: '6px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
              }}>
                {/* Icon */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  minWidth: '48px',
                  marginRight: '15px',
                  borderRadius: '8px',
                  background: '#f5f5f5',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ImageComponent
                    src={tier.Icon}
                    alt={tier.DisplayName}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>

                {/* Info */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '1.1em', color: '#333' }}>
                    {tier.DisplayName}
                  </div>
                  <div style={{ fontSize: '0.85em', color: '#888' }}>
                    Tier {index + 1}
                  </div>
                </div>

                {/* Stats */}
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8em', color: '#999', textTransform: 'uppercase', fontWeight: '600' }}>Power</div>
                    <div style={{ fontWeight: 'bold', color: '#1976d2' }}>{formatGigantix(tier.Power)}%</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8em', color: '#999', textTransform: 'uppercase', fontWeight: '600' }}>Time</div>
                    <div style={{ fontWeight: 'bold', color: '#333' }}>{formatGigantix(tier.Time)}s</div>
                  </div>
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
