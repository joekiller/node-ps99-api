import React from "react";
import { CollectionConfigData } from "ps99-api";
import ImageComponent from "./ImageComponent";
import ItemCard from "./ItemCard";
import { useItemResolution } from "../hooks/useItemResolution";

const EggsComponent: React.FC<{
  configData: CollectionConfigData<"Eggs">;
}> = ({ configData }) => {
  const { getRarityColor, resolveItem } = useItemResolution();
  const rarityColor = configData.rarity ? getRarityColor(configData.rarity) : null;


  const InfoRow = ({ label, value }: { label: string, value: any }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #eee', paddingBottom: '8px' }}>
      <span style={{ fontWeight: '600', color: '#777' }}>{label}</span>
      <span style={{ fontWeight: 'bold', color: '#333' }}>{value}</span>
    </div>
  );

  return (
    <div style={{ width: "100%", height: "100%", boxSizing: "border-box" }}>

      <style>{`
        .sticky-info-column {
          position: sticky;
          top: 20px;
        }
        @media (max-width: 800px) {
          .sticky-info-column {
            position: relative !important;
            top: 0 !important;
          }
        }
      `}</style>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "40px",
        alignItems: "start"
      }}>
        {/* Left Column: Egg Info */}
        <div className="sticky-info-column" style={{
          flex: "1 1 250px",
          background: "#fff",
          padding: "30px",
          borderRadius: "24px",
          border: "2px solid #eee",
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div style={{ width: '120px', margin: '0 auto' }}>
            <ItemCard
              id={configData.name}
              amount={1}
              label={configData.name}
              itemData={{
                icon: configData.icon,
                rarity: configData.rarity,
                name: configData.name
              }}
              rarityColor={rarityColor}
              typeId={(configData as any)._index}
            />
          </div>

          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <h2 style={{ margin: '10px 0 0 0', color: '#333', fontSize: '1.4em', lineHeight: '1.3' }}>{configData.name}</h2>
            {configData.rarity && (
              <span className="badge" style={{
                borderColor: (configData.rarity as any).Color,
                color: (configData.rarity as any).Color,
                marginTop: '10px',
                display: 'inline-block'
              }}>
                {configData.rarity.DisplayName}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <InfoRow label="Currency" value={configData.currency} />
            <InfoRow label="Override Cost" value={configData.overrideCost} />

            {configData.goldChance && <InfoRow label="Gold Chance" value={`${configData.goldChance}%`} />}
            {configData.rainbowChance && <InfoRow label="Rainbow Chance" value={`${configData.rainbowChance}%`} />}
            {configData.shinyChance && <InfoRow label="Shiny Chance" value={`${configData.shinyChance}%`} />}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
            {configData.isCustomEgg && <span className="badge" style={{ background: '#e3f2fd', color: '#1565c0' }}>Custom</span>}
            {configData.bestEgg && <span className="badge" style={{ background: '#e8f5e9', color: '#2e7d32' }}>Best Egg</span>}
            {configData.disableGold && <span className="badge" style={{ background: '#ffebee', color: '#c62828' }}>No Gold</span>}
            {configData.disableRainbow && <span className="badge" style={{ background: '#f3e5f5', color: '#7b1fa2' }}>No Rainbow</span>}
            {configData.disableShiny && <span className="badge" style={{ background: '#fff3e0', color: '#ef6c00' }}>No Shiny</span>}
            {configData.disableModifiers && <span className="badge" style={{ background: '#eceff1', color: '#546e7a' }}>No Mods</span>}
          </div>

          {configData.productIds && (
            <div style={{ marginTop: '10px', fontSize: '0.85em', color: '#888' }}>
              <h5 style={{ margin: '0 0 5px 0', textTransform: 'uppercase' }}>Product IDs</h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {Object.entries(configData.productIds).map(([key, value]) => (
                  <li key={key} style={{ marginBottom: '3px' }}>{key}: {value}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column: Pets */}
        <div style={{
          flex: "2 1 300px",
          background: "transparent"
        }}>
          <h3 style={{ fontSize: '1.8em', marginBottom: '20px', color: '#333', borderLeft: '5px solid #2196f3', paddingLeft: '15px' }}>Pets</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: '16px',
            background: '#fff',
            padding: '24px',
            borderRadius: '24px',
            border: '1px solid #eee',
            boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
          }}>
            {configData.pets.map((pet, index) => {
              const petName = pet[0];
              const chance = pet[1];
              // The 3rd element appears to be the tier (tn), based on existing code usage
              const tn = pet[2];
              const resolvedItem = resolveItem(petName, tn);
              const rarityColor = resolvedItem?.rarity ? getRarityColor(resolvedItem.rarity) : null;

              return (
                <div key={index}>
                  <ItemCard
                    id={petName}
                    // Formatting chance as string to include %
                    amount={`${chance}%`}
                    label={resolvedItem?.name || petName}
                    itemData={resolvedItem}
                    rarityColor={rarityColor}
                    tn={tn}
                  // weight or typeId not strictly needed here unless we want debug info
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EggsComponent;
