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

  return (
    <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>
      <div style={{ textAlign: 'left', width: '100%', marginBottom: '15px' }}>
        <p><strong>Machine:</strong> {configData.MachineName}</p>
        <p><strong>Price Mult:</strong> {configData.PriceMult}x</p>
        <p><strong>Refresh:</strong> {configData.RefreshRate}s</p>
        {configData.IsStatic && <p><strong>Type:</strong> Static Merchant</p>}
      </div>

      {configData.StockRangeByRespectLevel && (
        <div style={{ width: '100%', marginBottom: '15px' }}>
          <h4>Stock Ranges</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px' }}>
            {renderStockRange(configData.StockRangeByRespectLevel)}
          </div>
        </div>
      )}

      {configData.SlotRespectLevels && (
        <div style={{ width: '100%' }}>
          <h4>Slot Respect Levels</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
            {configData.SlotRespectLevels.map((level, idx) => (
              <span key={idx} style={{
                background: '#fff9c4',
                color: '#fbc02d',
                padding: '5px 10px',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                border: '2px solid #fbc02d'
              }}>
                {level}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MerchantsComponent;
