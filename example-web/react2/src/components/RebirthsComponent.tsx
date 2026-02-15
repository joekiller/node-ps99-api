
import React from "react";
import { CollectionConfigData, RebirthUnlock } from "ps99-api";
import ItemCard from "./ItemCard";

const RebirthComponent: React.FC<{
  configData: CollectionConfigData<"Rebirths">;
}> = ({ configData }) => {
  return (
    <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>

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
        {/* Left Column: Stats */}
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
          <div style={{ textAlign: 'center', borderBottom: '2px solid #f0f0f0', paddingBottom: '20px', marginBottom: '10px' }}>
            {/* Placeholder for Rebirth visual if available in future */}
            <h2 style={{ margin: 0, color: '#333', fontSize: '2em' }}>Rebirth Info</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <InfoRow label="Zone Required" value={configData.ZoneNumberRequired} />
            <InfoRow label="Strength Boost" value={`${configData.StrengthPowerBoost}%`} highlight />
            {configData.ResetZone && <InfoRow label="Reset To Zone" value={configData.ResetZone} />}
          </div>

          {configData.BoostDesc && (
            <div style={{ background: '#fff8e1', padding: '15px', borderRadius: '12px', border: '1px solid #ffe082' }}>
              <h4 style={{ margin: '0 0 5px 0', color: '#f57f17' }}>Special Boost</h4>
              <p style={{ margin: 0, color: '#555', fontSize: '0.95em' }}>{configData.BoostDesc}</p>
            </div>
          )}
        </div>

        {/* Right Column: Unlocks */}
        <div style={{
          flex: "2 1 300px",
          background: "transparent"
        }}>
          <h3 style={{ fontSize: '1.8em', marginBottom: '20px', color: '#333', borderLeft: '5px solid #ff9800', paddingLeft: '15px' }}>Unlocks</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "20px" }}>
            {configData.RebirthUnlocks.map(
              (unlock: RebirthUnlock, index: number) => (
                <div key={index} style={{
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  border: '1px solid #eee',
                  height: '100%',
                  boxSizing: 'border-box'
                }}>
                  <div style={{ width: '80px', height: '80px', marginBottom: '15px' }}>
                    <ItemCard
                      id={unlock.Title}
                      amount={1}
                      label={unlock.GuiTitle || unlock.Title}
                      itemData={{
                        icon: unlock.Icon,
                        rarity: undefined,
                        name: unlock.GuiTitle || unlock.Title
                      }}
                      rarityColor={null}
                    />
                  </div>
                  <h4 style={{ margin: '0 0 10px 0', textAlign: 'center', color: '#333' }}>{unlock.GuiTitle || unlock.Title}</h4>
                  <div style={{ textAlign: 'center', fontSize: '0.9em', color: '#666', lineHeight: '1.4' }}>
                    {unlock.Desc}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value, highlight = false }: { label: string, value: any, highlight?: boolean }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #eee', paddingBottom: '8px' }}>
    <span style={{ fontWeight: '600', color: '#777' }}>{label}</span>
    <span style={{ fontWeight: 'bold', color: highlight ? '#2e7d32' : '#333', fontSize: '1.1em' }}>{value}</span>
  </div>
);

export default RebirthComponent;
