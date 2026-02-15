import React from "react";
import { CollectionConfigData } from "ps99-api";

const MerchantsComponent: React.FC<{
  configData: CollectionConfigData<"Merchants">;
}> = ({ configData }) => {
  const renderStockRange = (stockRange: number[][] | undefined) => {
    if (!stockRange) return null;
    return stockRange.map((range, index) => (
      <div key={index} style={{ background: '#e1f5fe', padding: '8px', borderRadius: '4px', textAlign: 'center' }}>
        <strong>Lvl {index + 1}</strong>
        <div>{range[0]} - {range[1]} items</div>
      </div>
    ));
  };

  const InfoRow = ({ label, value }: { label: string, value: any }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #eee', paddingBottom: '8px' }}>
      <span style={{ fontWeight: '600', color: '#777' }}>{label}</span>
      <span style={{ fontWeight: 'bold', color: '#333' }}>{value}</span>
    </div>
  );

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
        {/* Left Column: Merchant Info */}
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
            <h2 style={{ margin: 0, color: '#333', fontSize: '1.8em' }}>{configData.MachineName || "Merchant"}</h2>
            {configData.IsStatic && <span className="badge" style={{ background: '#e0f7fa', color: '#006064', marginTop: '10px', display: 'inline-block' }}>Static Merchant</span>}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <InfoRow label="Price Multiplier" value={`${configData.PriceMult}x`} />
            <InfoRow label="Refresh Rate" value={`${configData.RefreshRate}s`} />
          </div>
        </div>

        {/* Right Column: Stock & Levels */}
        <div style={{
          flex: "2 1 300px",
          background: "transparent",
          display: 'flex',
          flexDirection: 'column',
          gap: '30px'
        }}>

          {configData.StockRangeByRespectLevel && (
            <div style={{ background: '#fff', padding: '24px', borderRadius: '24px', border: '1px solid #eee', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontSize: '1.5em', marginTop: 0, marginBottom: '20px', color: '#333', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px' }}>Stock Ranges</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '15px' }}>
                {renderStockRange(configData.StockRangeByRespectLevel)}
              </div>
            </div>
          )}

          {configData.SlotRespectLevels && (
            <div style={{ background: '#fff', padding: '24px', borderRadius: '24px', border: '1px solid #eee', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontSize: '1.5em', marginTop: 0, marginBottom: '20px', color: '#333', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px' }}>Slot Respect Levels</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {configData.SlotRespectLevels.map((level, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <span style={{
                      background: '#fff9c4',
                      color: '#fbc02d',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '1.1em',
                      border: '2px solid #fbc02d',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      {level}
                    </span>
                    <span style={{ fontSize: '0.8em', color: '#888' }}>Slot {idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MerchantsComponent;
