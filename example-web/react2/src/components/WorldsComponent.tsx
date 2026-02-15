import React from "react";
import { CollectionConfigData } from "ps99-api";

const WorldComponent: React.FC<{
  configData: CollectionConfigData<"Worlds">;
}> = ({ configData }) => {
  return (
    <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>
      <div style={{ textAlign: 'left', width: '100%' }}>
        <p><strong>World #:</strong> {configData.WorldNumber}</p>
        <p><strong>Spawn ID:</strong> {configData.SpawnId}</p>
        <p><strong>Currency:</strong> {configData.WorldCurrency}</p>
        <p><strong>Place ID:</strong> {configData.PlaceId}</p>
      </div>

      {configData.AdditionalMusic && configData.AdditionalMusic.length > 0 && (
        <div style={{ marginTop: '15px', width: '100%' }}>
          <h4>Additional Music</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
            {configData.AdditionalMusic.map((music, index) => (
              <span key={index} style={{
                background: '#e0f7fa',
                color: '#006064',
                padding: '5px 10px',
                borderRadius: '15px',
                fontSize: '0.9em',
                fontWeight: 'bold'
              }}>
                {music}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorldComponent;
