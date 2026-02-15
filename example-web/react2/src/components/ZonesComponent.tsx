import React from "react";
import { CollectionConfigData } from "ps99-api";

const ZoneComponent: React.FC<{
  configData: CollectionConfigData<"Zones">;
}> = ({ configData }) => {
  return (
    <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', width: '100%', textAlign: 'left' }}>
        <p><strong>Zone #:</strong> {configData.ZoneNumber}</p>
        <p><strong>World #:</strong> {configData.WorldNumber}</p>
        <p><strong>Currency:</strong> {configData.Currency}</p>
        <p><strong>Max Egg:</strong> {configData.MaximumAvailableEgg}</p>
        {configData.Price && <p><strong>Price:</strong> {configData.Price}</p>}
        {configData.GateHealth && <p><strong>Gate Health:</strong> {configData.GateHealth}</p>}
        {configData.TeleportToZoneOnFall && (
          <p><strong>Teleport on Fall:</strong> Yes</p>
        )}
        {configData.Ambience && (
          <p><strong>Ambience ID:</strong> {configData.Ambience.SoundId}</p>
        )}
      </div>

      {configData.QuestsRequired && configData.QuestsRequired.length > 0 && (
        <div style={{ width: '100%', marginTop: '20px' }}>
          <h4>Quests Required</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {configData.QuestsRequired.map((quest, index) => (
              <div key={index} style={{
                background: '#f0f0f0',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}>
                <strong>{quest.Type}</strong>: {quest.Amount}
              </div>
            ))}
          </div>
        </div>
      )}

      {configData.Lighting && (
        <div style={{ width: '100%', marginTop: '20px', textAlign: 'left', background: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
          <h4 style={{ textAlign: 'center' }}>Lighting Settings</h4>
          <p>Brightness: {configData.Lighting.Brightness}</p>
          <p>Clock Time: {configData.Lighting.ClockTime}</p>

          {configData.Lighting.Bloom && (
            <div style={{ marginTop: '10px' }}>
              <strong>Bloom:</strong>
              <span style={{ fontSize: '0.9em', marginLeft: '10px' }}>
                Enabled: {configData.Lighting.Bloom.Enabled.toString()},
                Intensity: {configData.Lighting.Bloom.Intensity}
              </span>
            </div>
          )}

          {configData.Lighting.Sky && (
            <div style={{ marginTop: '10px' }}>
              <strong>Sky:</strong>
              <span style={{ fontSize: '0.9em', marginLeft: '10px' }}>
                Stars: {configData.Lighting.Sky.StarCount}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ZoneComponent;
